/**
 *
 * @author dwclake
 */

export const FlowerShader = {
    vertex: `#version 300 es
    precision highp float;

    layout(location = 0) in vec2 aPosition;
    out vec2 vPosition;

    void main() {
        vPosition = aPosition;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`,

    fragment: `#version 300 es
    precision highp float;

    in vec2 vPosition;
    out vec4 fragColor;
    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
        vec2 uv = vPosition;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;

        // Polar coordinates
        float r = length(uv);
        float angle = atan(uv.y, uv.x);

        // Number of petals and animation speed
        float petals = 3.0;
        float speed = 0.0015;
        angle += uTime * speed;

        // Petal shape: sin curve repeated radially
        float petalShape = abs(sin(angle * petals)) * smoothstep(0.8, 0.0, r);

        // Glow and pulse effect
        float pulse = 0.5 + 0.5 * sin(uTime * 0.002);
        float glow = pow(1.0 - r, 3.0) * 2.0;
        float brightness = (petalShape + glow) * pulse;
        float alpha = brightness * smoothstep(1.0, 0.4, 1.0 - r);

        // Color palette (pink → orange)
        vec3 color = mix(
            vec3(1.0, 0.2, 0.5),
            vec3(1.0, 0.8, 0.3),
            brightness
        );

        // Final composite
        fragColor = vec4(color * brightness, alpha);
    }`,
};