attribute vec2 vertexPosition;
attribute vec4 vertexColor;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;
	
uniform mat3 modelViewMatrix;
uniform mat3 projectionMatrix;
	
void main(void) {
	vTexCoord = aTexCoord;
	gl_Position = projectionMatrix * modelViewMatrix * vec2(vertexPosition);
}