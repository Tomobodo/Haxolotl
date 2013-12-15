attribute vec3 vertexPosition;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
	
void main(void) {
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
}