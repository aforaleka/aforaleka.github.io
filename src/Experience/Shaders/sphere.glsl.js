import psrdnoise from './psrdnoise.glsl.js';

export const vertex = /* glsl */`
uniform float uTime;
uniform float uMouse;
varying vec2 vUv;

${psrdnoise}

void main() {
  vec3 v = vec3(normal + position.y * position.x);
  vec3 p = vec3(0.0);
  vec3 g;
  float alpha = uTime * 4.;

  float noisy = uMouse * pow(psrdnoise(v, p, alpha, g), 2.);
  vec3 newPosition = position + noisy * normal;
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

  vUv = uv;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragment = /* glsl */`
uniform float uBrightness;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = vec4(color * uBrightness);
}
`;


