/* @author: dwclake
 * @created: 10-17-2025
 */

import { useRef, useState } from "react"

import { WebGLCanvas } from "./ui/webglcanvas"
import { init, render } from "../animations/flower/RainbowFlower"

export default function WebGLRecorder() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const recorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const [recording, setRecording] = useState(false)
    const [duration, setDuration] = useState(5)

    const startRecording = () => {
        const canvas = canvasRef.current!
        const stream = canvas.captureStream(60)

        const mimeType = "video/mp4;codecs=avc1"
        const recorder = new MediaRecorder(stream, { mimeType })

        chunksRef.current = []
        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data)
        }

        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: mimeType })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "webgl-animation.mp4"
            a.click()
            URL.revokeObjectURL(url)
        };

        recorder.start()
        recorderRef.current = recorder
        setRecording(true)

        setTimeout(() => stopRecording(), duration * 1000);
    };

    const stopRecording = () => {
        recorderRef.current?.stop();
        setRecording(false);
    };

    return (
        <div>
            <WebGLCanvas
            width="600"
            height="600"
            ref={canvasRef}
            onInit={init}
            onRender={render}
            />

            <div style={{ marginTop: "10px" }}>
                <label>
                    Duration (seconds):{" "}
                    <input
                    type="number"
                    value={duration}
                    min={1}
                    max={60}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{ width: "4em" }}
                    />
                </label>
            </div>

            <div style={{ marginTop: "10px" }}>
                {!recording ? (
                    <button onClick={startRecording}>Start Recording</button>
                ) : (
                    <button onClick={stopRecording}>Stop Early</button>
                )}
            </div>
        </div>
    );
}