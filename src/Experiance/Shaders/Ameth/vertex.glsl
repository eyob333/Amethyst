 #include ./../includes/simplexNoise4d.glsl

uniform float uTime;
uniform float uSpeed;
void main(){
    float time = uTime * uSpeed * 0.02;
    float simple = simplexNoise4d(vec4(position.xyz * .5, time * .02));
    // simple = smoothstep(-1., 1., simple);

    vec3 newPosition = position;
    newPosition.x  += smoothstep(-1., 1., simple) * 1.5 ;
    newPosition.y  += smoothstep(0., 1., simple) * 2.5 ;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.);
}