/* Ashima's 3D simplex noise — shared by the particle and core shaders. */
export const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

/**
 * Particle cloud. Each point sits on a sphere, gets pushed outward by animated
 * noise, and is nudged away from the pointer so the shape reacts to the cursor.
 */
export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform vec3  uPointer;
uniform float uScrollFade;

attribute float aScale;
attribute float aSeed;

varying float vNoise;
varying float vSeed;

${simplexNoise}

void main() {
  vec3 pos = position;

  // animated surface displacement
  float n = snoise(pos * 0.85 + vec3(0.0, uTime * 0.14, 0.0));
  float n2 = snoise(pos * 2.1 - vec3(uTime * 0.09));
  pos *= 1.0 + n * 0.22 + n2 * 0.06;

  // pointer repulsion, falling off with distance
  vec3 toPointer = pos - uPointer;
  float d = length(toPointer);
  float push = smoothstep(1.6, 0.0, d) * 0.55;
  pos += normalize(toPointer + 0.0001) * push;

  // gentle collapse toward the centre as the hero scrolls away
  pos *= mix(1.0, 0.82, uScrollFade);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float twinkle = 0.7 + 0.3 * sin(uTime * 1.6 + aSeed * 28.0);
  // uSize already carries the device pixel ratio, so this lands in CSS pixels
  gl_PointSize = uSize * aScale * twinkle * (1.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 0.5, 9.0);

  vNoise = n;
  vSeed = aSeed;
}
`;

export const particleFragment = /* glsl */ `
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform float uOpacity;

varying float vNoise;
varying float vSeed;

void main() {
  // round, soft-edged point
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.18, dist);

  vec3 color = mix(uColorB, uColorA, smoothstep(-0.5, 0.75, vNoise));
  // a small fraction of points burn brighter
  color += step(0.985, vSeed) * 0.4;

  gl_FragColor = vec4(color, alpha * uOpacity);
  #include <colorspace_fragment>
}
`;

/** Slowly breathing wireframe core that sits inside the particle cloud. */
export const coreVertex = /* glsl */ `
uniform float uTime;
varying float vNoise;

${simplexNoise}

void main() {
  float n = snoise(position * 1.1 + vec3(uTime * 0.18));
  vec3 pos = position * (1.0 + n * 0.16);
  vNoise = n;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const coreFragment = /* glsl */ `
uniform vec3  uColor;
uniform float uOpacity;
varying float vNoise;

void main() {
  float g = 0.45 + 0.55 * smoothstep(-0.6, 0.8, vNoise);
  gl_FragColor = vec4(uColor * g, uOpacity * g);
  #include <colorspace_fragment>
}
`;
