varying vec2 vUv;
uniform float previz;

void main()
{
    vUv = uv;

    vec4 oPos;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 previzPos = projectionMatrix * mvPosition;

    vec4 quadPos = vec4( position, 1.0 );

    oPos = mix(quadPos, previzPos, previz);

    gl_Position = oPos;
}

/*
varying vec3 vUv;
varying vec4 modelViewPosition;
varying vec3 vecNormal;

uniform float time;

void main() {
    vUv = position;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
    gl_Position = projectionMatrix * modelViewPosition;

    // gl_Position = vec4( position, 1.0 );
}
*/