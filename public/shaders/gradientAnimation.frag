uniform vec3 colorA;
uniform vec3 colorB;
varying vec3 vUv;

uniform float time;
uniform vec2 resolution;

void main() {
    // gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);

    vec2 st = gl_FragCoord.xy/resolution;
    gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}