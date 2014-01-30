package ld28.core;

import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Mesh
{
	public var vertices : Float32Array;
	public var texCoord : Float32Array;
	public var indexes  : Int16Array;
	
	public var vertexDrawMode : Int;

	var vertexBuffer : GLBuffer;
	var textCoordBuffer:GLBuffer;
	var indexBuffer : GLBuffer;

	public function new(_vertices : Array<Float> = null, _texCoord : Array<Float> = null, _indexes : Array<Int> = null) 
	{
		vertexBuffer = GL.createBuffer();
		textCoordBuffer = GL.createBuffer();
		indexBuffer = GL.createBuffer();
		
		if (_vertices == null)
			_vertices = new Array<Float>();
		vertices = new Float32Array(_vertices);
		
		if (_texCoord == null)
			_texCoord = new Array<Float>();
		texCoord = new Float32Array(_texCoord);
		
		if (_indexes == null)
			_indexes = new Array<Int>();
		indexes = new Int16Array(_indexes);
		
		vertexDrawMode = GL.STATIC_DRAW;
				
		genVertexBuffer();
		genTexCoordBuffer();
		genIndexBuffer();
	}
	
	
	public function getBuffer() : GLBuffer
	{
		return this.vertexBuffer;
	}
	
	public function getTextCoord() : GLBuffer
	{
		return this.textCoordBuffer;
	}
	
	public function getIndexBuffer() : GLBuffer
	{
		return this.indexBuffer;
	}
	
	function genVertexBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, vertices, vertexDrawMode);
	}
	
	function updateVertexBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, 0, vertices);
	}
	
	function genTexCoordBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, textCoordBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, texCoord, GL.STATIC_DRAW);
	}
	
	function updateTexCoordBuffer() : Void
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, textCoordBuffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, 0, texCoord);
	}
	
	function genIndexBuffer() 
	{
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, indexes, GL.STATIC_DRAW);
	}
	
	function updateIndexBuffer() 
	{
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferSubData(GL.ELEMENT_ARRAY_BUFFER, 0, indexes);
	}
}