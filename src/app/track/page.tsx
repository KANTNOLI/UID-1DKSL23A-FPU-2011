'use client'

import { useEffect, useRef, useState } from "react";
// import Frame3D from "../components/Frame3D";
import style from "./Track.module.scss"
import { useSearchParams } from 'next/navigation';
import axios from "axios";

type TrackVariateKey = "Planning" | "Payment" | "Architecture" | "Design" | "Approval" | "Implementation" | "Delivery";

interface trackListIntf {
    name: TrackVariateKey,
    left: string,
    top: string
}

interface trackDataIntf {
    trackID: string,
    taskActive: 1 | 2 | 3 | 4 | 5 | 6 | 7, // 1-7
    taskReady: 1 | 2 | 3 | 4 | 5, // 1-5
    logs: string[]
}

export default function Home() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

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
            name: "Planning",
            left: "28px",
            top: "16px"
        },
        {
            name: "Payment",
            left: "24px",
            top: "17px"
        },
        {
            name: "Architecture",
            left: "26px",
            top: "15px"
        },
        {
            name: "Design",
            left: "25px",
            top: "16px"
        },
        {
            name: "Approval",
            left: "26px",
            top: "14px"
        },
        {
            name: "Implementation",
            left: "24px",
            top: "17px"
        },
        {
            name: "Delivery",
            left: "22px",
            top: "17px"
        }
    ]
    const trackDesc = [
        "Erstellung und Abstimmung des Lastenhefts, Planung von Terminen und Ressourcen",
        "Warten auf Zahlungsbestätigung und Start der Projekt-Transaktion",
        "Entwicklung der Systemarchitektur, Planung der Schemata und Datenstrukturen",
        "Erstellung des visuellen Designs für Oberflächen, Stile und Layouts",
        "Abstimmung und Freigabe des Designs mit dem Kunden, Einarbeitung von Änderungen",
        "Programmierung, Testing, Integration der Systemkomponenten",
        "Finale Projektübergabe und Inbetriebnahme"
    ]

    useEffect(() => {
        const getTrakingData = async (TrackID: string) => {
            axios.get(`https://api.chazen.de/getTrackingData?id=${TrackID}`).then((body) => {
                setDataTraking(body.data)
            })
        }
        getTrakingData(id || "")
    }, [])

    return (
        <section className={style.body}>
            <p className={style.mainTitle}>Traking: <span>{DataTraking.trackID}</span></p>
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
                <p className={style.logsTitle}>Bestellschritt:</p>
                <p className={style.logsDesc}>{trackDesc[DataTraking.taskActive - 1]}</p>

                <p className={style.logsTitle}>Logdateien:</p>
                {DataTraking.logs.map((logLine, logID) => (
                    <p key={logID} className={style.logsDesc}>{logLine}</p>
                ))}

            </div>

        </section>
    );
}
