package com.pixodrome.ld28;

import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Mesh
{
	public var vertices : Float32Array;
	public var texCoord : Float32Array;
	
	var vertexBuffer : GLBuffer;
	var textCoordBuffer:GLBuffer;

	public function new(_vertices : Array<Float> = null, _texCoord : Array<Float> = null) 
	{
		vertexBuffer = GL.createBuffer();
		textCoordBuffer = GL.createBuffer();
		
		if (_vertices == null)
			_vertices = new Array<Float>();
		vertices = new Float32Array(_vertices);
		
		if (_texCoord == null)
			_texCoord = new Array<Float>();
		texCoord = new Float32Array(_texCoord);
				
		updateVertexBuffer();
		updateTexCoordBuffer();
	}
	
	public function getBuffer() : GLBuffer
	{
		return this.vertexBuffer;
	}
	
	public function getTextCoord() : GLBuffer
	{
		return this.textCoordBuffer;
	}
	
	function updateVertexBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, vertices, GL.DYNAMIC_DRAW);
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
	}
	
	function updateTexCoordBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, textCoordBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, texCoord, GL.STATIC_DRAW);
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
	}
}