/**
 *
 * @author dwclake
 */

import { createProgram } from "../utils";
import { FlowerShader } from "./FlowerShader";

export function init(gl: WebGL2RenderingContext) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

export function render(gl: WebGL2RenderingContext, t: number) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const program = createProgram(gl, FlowerShader.vertex, FlowerShader.fragment)!;
    gl.useProgram(program);

    // Fullscreen quad vertices
    const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = 0;
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime")!;
    const uResolution = gl.getUniformLocation(program, "uResolution")!;
    const startTime = performance.now();

    const elapsed = t - startTime;
    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}