uniform vec3 colorA;
uniform vec3 colorB;
varying vec2 vUv;

uniform float time;
uniform vec2 resolution;
uniform float previz;

void main() {
    // gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);

    vec4 oColor = vec4(1., 0., 1., 1.);

    vec4 previzColor = vec4(vUv.x,vUv.y,0.0,1.0);

    vec2 st = gl_FragCoord.xy/resolution;
    vec4 quadColor = vec4(st.x, st.y, 0.0, 1.0);

    oColor = mix(quadColor, previzColor, previz);

    gl_FragColor = oColor;
}