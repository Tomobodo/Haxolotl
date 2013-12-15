attribute vec2 vertexPosition;
attribute vec4 vertexColor;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;
	
uniform mat2 modelViewMatrix;
uniform mat4 projectionMatrix;
	
void main(void) {
	vTexCoord = aTexCoord;
	gl_Position = projectionMatrix * modelViewMatrix * vec2(vertexPosition);
}