/**
 *
 * @author dwclake
 */

const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export const createProgram = (gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string) => {
    const vShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc)!;
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)!;
    const program = gl.createProgram()!;

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}