attribute vec3 vertexPosition;
attribute vec4 vertexColor;

attribute vec2 aTexCoord;

varying vec2 vTexCoord;
	
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
	
void main(void) {
	vTexCoord = aTexCoord;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
}