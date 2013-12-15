package com.pixodrome.ld28;
import openfl.Assets;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Int16Array;

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
		
		indexBuffer = GL.createBuffer();
		
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Int16Array(indexs), GL.STATIC_DRAW);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		
		super(new Mesh(points, coords), tex, new Program("test"));
	}
	
	override public function draw(renderer : Renderer)
	{
		updateMatrix();
		
		GL.useProgram(program.program);
		GL.enableVertexAttribArray(vtxPosAttr);
		
		var projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		var modelViewMatrixUniform = GL.getUniformLocation(program.program, "modelViewMatrix");
	
		GL.uniformMatrix3D(projectionMatrixUniform, false, renderer.projectionMatrix);
		GL.uniformMatrix3D(modelViewMatrixUniform, false, transform);

		GL.bindBuffer(GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 3, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		
		GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);		
			
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		
		GL.disableVertexAttribArray(vtxPosAttr);
		GL.useProgram(null);
	}
	
}