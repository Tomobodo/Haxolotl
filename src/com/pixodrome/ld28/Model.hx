package com.pixodrome.ld28;
import flash.geom.Matrix3D;
import lime.gl.GLUniformLocation;
import openfl.gl.GL;

/**
 * ...
 * @author Thomas BAUDON
 */
class Model
{
	
	public var transform : Matrix3D;
	public var program : Program;
	
	var mesh : Mesh;
	var texture : Texture;
	
	var vtxPosAttr : Int;
	var texCoordAttr : Int;
	
	var imageUniform : GLUniformLocation;

	public function new(_mesh : Mesh, _texture : Texture, _program : Program = null) 
	{
		mesh = _mesh;
		texture = _texture;
		transform = new Matrix3D();
		
		if (_program == null)
			program = new Program("basic");
		
		initAttributes();
		initUniforms();
	}
	
	function initAttributes() 
	{
		vtxPosAttr = GL.getAttribLocation(program.program, "vertexPosition");
		texCoordAttr = GL.getAttribLocation(program.program, "aTexCoord");
	}
	
	function initUniforms() 
	{
		imageUniform = GL.getUniformLocation(program.program, "uImage0");
	}
	
	public function draw(renderer : Renderer)
	{
		GL.useProgram(program);
		GL.enableVertexAttribArray(vtxPosAttr);
		GL.enableVertexAttribArray(texCoordAttr);
		
		var projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		var modelViewMatrixUniform = GL.getUniformLocation(program.program, "modelViewMatrix");
	
		GL.uniformMatrix3D(projectionMatrixUniform, renderer.projectionMatrix);
		GL.uniformMatrix3D(modelViewMatrixUniform, transform);
		GL.uniform1i(imageUniform, 0);
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 3, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
			
		GL.drawArrays (GL.TRIANGLES, 0, cast(mesh.vertices.length / 3));
			
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture(GL.TEXTURE_2D, null);
		
		GL.disableVertexAttribArray(vtxPosAttr);
		GL.disableVertexAttribArray(texCoordAttr);
		GL.useProgram(null);
	}
	
}