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
	public var vertices : Array<Float>;
	public var texCoord : Array<Float>;
	
	var vertexBuffer : GLBuffer;
	var textCoordBuffer:GLBuffer;

	public function new(_vertices : Array<Float> = null, _texCoord : Array<Float> = null) 
	{
		vertexBuffer = GL.createBuffer();
		textCoordBuffer = GL.createBuffer();
		
		if (_vertices == null)
			_vertices = new Array<Float>();
		vertices = _vertices;
		
		if (_texCoord == null)
			_texCoord = new Array<Float>();
		texCoord = _texCoord;
				
		updateBuffer();
	}
	
	public function getBuffer() : GLBuffer
	{
		return this.vertexBuffer;
	}
	
	public function getTextCoord() : GLBuffer
	{
		return this.textCoordBuffer;
	}
	
	function updateBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(cast vertices), GL.DYNAMIC_DRAW);
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, textCoordBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(cast texCoord), GL.STATIC_DRAW);
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
	}
}