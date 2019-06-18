varying vec3 vUv;
varying vec4 modelViewPosition;
varying vec3 vecNormal;

uniform float time;
uniform vec2 resolution;

void main() {
    // vUv = position;
    // vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    // vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
    // gl_Position = projectionMatrix * modelViewPosition;

    gl_Position = vec4( position, 1.0 );
}