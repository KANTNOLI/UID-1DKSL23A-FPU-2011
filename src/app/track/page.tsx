'use client'

import { useEffect, useRef, useState } from "react";
import Frame3D from "../components/Frame3D";
import style from "./Track.module.scss"

type TrackVariateKey = "Planning" | "Payment" | "Architecture" | "Design" | "Approval" | "Implementation" | "Delivery";

interface trackListIntf {
    name: TrackVariateKey,
    left: string,
    top: string
}

type trackDesclIntf = {
    [key in TrackVariateKey]?: string;
}

interface trackDataIntf {
    trackID: string,
    taskActive: number, // 1-7
    taskReady: number, // 1-5
    logs: string[] 
}

export default function Home() {
    const [Sizes, setSizes] = useState<DOMRect>()
    const canvas = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])

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
    const trackDesc: trackDesclIntf = {
        "Planning": "Planning describe",
        "Payment": "Payment describe",
        "Architecture": "Architecture describe",
        "Design": "Design describe",
        "Approval": "Approval describe",
        "Implementation": "Implementation describe",
        "Delivery": "Delivery describe",
    }

    return (
        <section className={style.body}>
            <p className={style.mainTitle}>Traking: <span>GE-240307-000L1</span></p>
            {/* <div ref={canvas} className={style.mainCanvas}>
                <Frame3D position={{ x: 0, y: 0.5, z: 1.8 }} height={Sizes?.height} width={Sizes?.width} modelPath="./aspider.glb"></Frame3D>
            </div> */}

            <div className={style.track}>
                {trackList.map((task, task_id) => (
                    <div key={task_id} className={style.trackType}>
                        <div className={style.tTypeImgs}>
                            <img className={style.tTIsL} src={`icons/loadState/load${5}.png`} alt="load" />
                            <img className={style.tTIsP} src={`icons/part${task_id + 1}${false ? "-2" : ""}.png`} alt="part" style={{ top: task.top, left: task.left }}
                            />
                        </div>

                        <p className={style.tTypeTitleOn}>{task.name}</p>

                        {task_id < 6 ?
                            <span className={style.tTypePReady}></span> :
                            null}

                    </div>
                ))}
            </div>

        </section>
    );
}
