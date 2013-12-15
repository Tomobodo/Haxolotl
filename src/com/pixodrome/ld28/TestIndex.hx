package com.pixodrome.ld28;
import openfl.Assets;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.UInt8Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class TestIndex extends Model
{
	var indexs : Array<Int>;
	var indexBuffer : GLBuffer;

	public function new() 
	{
		var points = [
			0.0, 0.0, 0.0,
			100.0, 0.0, 0.0,
			100.0, 100.0, 0.0,
			0.0, 100.0, 0.0
		];
		
		var coords = [
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0,
			0.0, 0.0
		];
		
		indexs = [0, 1, 2, 2, 3, 0];
		
		var tex = new Texture("img/avatar.png");
		
		var prog = new Program("test");
		
		var mesh = new Mesh(points, coords);
		
		super(mesh, tex, prog);
		
		indexBuffer = GL.createBuffer();
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new UInt8Array(indexs), GL.STATIC_DRAW);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
	}
	
	override public function draw(renderer : Renderer)
	{
		updateMatrix();
		
		GL.useProgram(program.program);
		GL.enableVertexAttribArray(vtxPosAttr);
		GL.enableVertexAttribArray(texCoordAttr);
		
		var projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		var modelViewMatrixUniform = GL.getUniformLocation(program.program, "modelViewMatrix");
	
		GL.uniformMatrix3D(projectionMatrixUniform, false, renderer.projectionMatrix);
		GL.uniformMatrix3D(modelViewMatrixUniform, false, transform);
		GL.uniform1i(imageUniform, 0);
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 3, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
			
		GL.bindBuffer (GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		
		GL.drawElements(GL.TRIANGLES, cast(indexs.length/3), GL.UNSIGNED_SHORT, 0);		
		//GL.drawArrays (GL.TRIANGLES, 0, cast(mesh.vertices.length / 3));
			
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		GL.bindTexture(GL.TEXTURE_2D, null);
		
		GL.disableVertexAttribArray(vtxPosAttr);
		GL.disableVertexAttribArray(texCoordAttr);
		GL.useProgram(null);
	}
	
}