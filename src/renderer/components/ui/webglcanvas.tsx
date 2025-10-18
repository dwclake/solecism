/* @author: dwclake
 * @created: 10-17-2025
 *
 * The component responsible for rendering a WebGL2 canvas
 */

import { useEffect, useRef } from "react"

type Props = {
    width: string,
    height: string,
    className?: string,
    onRender: (gl: WebGL2RenderingContext, time: number) => void,
    onInit?: (gl: WebGL2RenderingContext) => void
}

export const WebGLCanvas = ({ width, height, className = "canvas", onRender, onInit }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current!
        const gl = canvas.getContext("webgl2", {
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: true,
        })
        if (!gl) {
            throw new Error("WebGL2 Not Supported")
        }

        onInit?.(gl)

        let animationFrameId: number
        const start = performance.now()

        function render(time: number) {
            const elapsed = (time - start) / 1000

            onRender(gl!, elapsed)

            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => cancelAnimationFrame(animationFrameId)
    }, [onRender, onInit])

    return <canvas className={className} ref={ref} width={width} height={height}></canvas>
}
