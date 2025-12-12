'use client'

import { useEffect, useRef, useState } from "react";
// import Frame3D from "../components/Frame3D";
import style from "./Track.module.scss"
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TrackVariateKey = "Planning" | "Payment" | "Architecture" | "Design" | "Approval" | "Implementation" | "Delivery";

interface trackListIntf {
    name: TrackVariateKey,
    left: string,
    top: string
}

type active = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type ready = 1 | 2 | 3 | 4 | 5;

interface trackDataIntf {
    trackID: string,
    taskActive: active, // 1-7
    taskReady: ready, // 1-5
    logs: string[]
}

function GetLogs(taskActive: active, taskReady: ready, LANG_: any) {
    const LogsSnippets = [
        LANG_["task1-1"],
        LANG_["task1-2"],
        LANG_["task1-3"],
        LANG_["task1-4"],
        LANG_["task1-5"],
        LANG_["task2-1"],
        LANG_["task2-2"],
        LANG_["task2-3"],
        LANG_["task2-4"],
        LANG_["task2-5"],
        LANG_["task3-1"],
        LANG_["task3-2"],
        LANG_["task3-3"],
        LANG_["task3-4"],
        LANG_["task3-5"],
        LANG_["task4-1"],
        LANG_["task4-2"],
        LANG_["task4-3"],
        LANG_["task4-4"],
        LANG_["task4-5"],
        LANG_["task5-1"],
        LANG_["task5-2"],
        LANG_["task5-3"],
        LANG_["task5-4"],
        LANG_["task5-5"],
        LANG_["task6-1"],
        LANG_["task6-2"],
        LANG_["task6-3"],
        LANG_["task6-4"],
        LANG_["task6-5"],
        LANG_["task7-1"],
        LANG_["task7-2"],
        LANG_["task7-3"],
        LANG_["task7-4"],
        LANG_["task7-5"]]

    return LogsSnippets.slice(0, ((taskActive - 1) * 5) + taskReady)
}

export default function Home() {
    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.track

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        document.title = `Chazen | Track ${id}`
    }, [searchParams])

    const [DataTraking, setDataTraking] = useState<trackDataIntf>({
        trackID: "Laden...",
        taskActive: 6, //1-7
        taskReady: 2, // 1-5
        logs: ["Laden..."]
    })
    // const [Sizes, setSizes] = useState<DOMRect>()
    // const canvas = useRef<HTMLDivElement>(null)
    // useEffect(() => {
    //     setSizes(canvas.current?.getBoundingClientRect())
    // }, [canvas])

    const trackList: trackListIntf[] = [
        {
            name: LANG_.Planning,
            left: "28px",
            top: "16px"
        },
        {
            name: LANG_.Payment,
            left: "24px",
            top: "17px"
        },
        {
            name: LANG_.Architecture,
            left: "26px",
            top: "15px"
        },
        {
            name: LANG_.Design,
            left: "25px",
            top: "16px"
        },
        {
            name: LANG_.Approval,
            left: "26px",
            top: "14px"
        },
        {
            name: LANG_.Implementation,
            left: "24px",
            top: "17px"
        },
        {
            name: LANG_.Delivery,
            left: "22px",
            top: "17px"
        }
    ]
    const trackDesc = [LANG_.desc1, LANG_.desc2, LANG_.desc3, LANG_.desc4, LANG_.desc5, LANG_.desc6, LANG_.desc7]

    useEffect(() => {
        const getTrakingData = async (TrackID: string) => {
            axios.get(`https://api.chazen.de/getTrackingData?id=${TrackID}`).then((body) => {
                setDataTraking(body.data)
            })
        }
        getTrakingData(id || "")
    }, [])

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <div>Loading...</div>
    }

    return (
        <section className={style.body}>
            <p className={style.mainTitle}>{LANG_.traking}: <span>{DataTraking.trackID}</span></p>
            {/* <div ref={canvas} className={style.mainCanvas}>
                <Frame3D position={{ x: 0, y: 0.5, z: 1.8 }} height={Sizes?.height} width={Sizes?.width} modelPath="./aspider.glb"></Frame3D>
            </div> */}

            <div className={style.track}>
                {trackList.map((task, task_id) => (
                    <div key={task_id} className={style.trackType}>
                        <div className={style.tTypeImgs}>
                            <img className={style.tTIsL}
                                src={`icons/loadState/load${task_id + 1 < DataTraking.taskActive ? 5 : task_id + 1 == DataTraking.taskActive ? DataTraking.taskReady : 1}.png`}
                                alt="load" />
                            <img className={style.tTIsP}
                                src={`icons/part${task_id + 1}${task_id + 1 < DataTraking.taskActive ? "" : task_id + 1 == DataTraking.taskActive && DataTraking.taskReady == 5 ? "" : "-2"}.png`}
                                alt="part" style={{ top: task.top, left: task.left }}
                            />
                        </div>

                        <p className={task_id + 1 < DataTraking.taskActive ? style.tTypeTitleOn : task_id + 1 == DataTraking.taskActive && DataTraking.taskReady == 5 ? style.tTypeTitleOn : style.tTypeTitleOff}>{task.name}</p>

                        {task_id >= 6 ? null : task_id + 1 < DataTraking.taskActive ?
                            <span className={style.tTypePReady}></span> : task_id + 1 == DataTraking.taskActive && DataTraking.taskReady == 5 ? <span className={style.tTypePReady}></span> : <span className={style.tTypePWait}></span>
                        }
                    </div>
                ))}
            </div>

            <div className={style.logs}>
                <p className={style.logsTitle}>{LANG_.MainDesc}:</p>
                <p className={style.logsDesc}>{trackDesc[DataTraking.taskActive - 1]}</p>

                <p className={style.logsTitle}>{LANG_.Logs}:</p>
                {GetLogs(DataTraking.taskActive, DataTraking.taskReady, LANG_).map((logLine, logID) => (
                    <p key={logID} className={style.logsDesc}>{logLine}</p>
                ))}
            </div>

        </section>
    );
}
