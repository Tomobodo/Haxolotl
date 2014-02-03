package ld28.core;

import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

import ld28.utils.BoundingBox;

/**
 * ...
 * @author Thomas B
 */
class Primitive
{
	
	public var vertices : Float32Array;
	public var texCoord : Float32Array;
	public var indexes : Int16Array;
	
	public var vertexDrawMode : Int;
	
	public  var boundingBox : BoundingBox;
	
	var vertexBuffer : GLBuffer;
	var textCoordBuffer:GLBuffer;
	var indexBuffer : GLBuffer;

	public function new(_vertices : Array<Float> = null, _texCoord : Array<Float>, _indexes : Array<Int> = null) 
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
		
		genBounding(_vertices);
	}
	
	function genBounding(_vertices : Array<Float>) 
	{
		var minX : Float = 100000;
		var minY : Float = 100000;
		var minZ : Float = 100000;
		
		var maxX : Float = -100000;
		var maxY : Float = -100000;
		var maxZ : Float = -100000;
		
		var nbVertex : Int = Std.int(_vertices.length / 3);
		
		for (i in 0 ... nbVertex)
		{
			var currentX = _vertices[i * 3];
			if (currentX < minX)
				minX = currentX;
			if (currentX > maxX)
				maxX = currentX;
				
			var currentY = _vertices[i * 3 + 1];
			if (currentY < minY)
				minY = currentY;
			if (currentY > maxY)
				maxY = currentY;
				
			var currentZ = _vertices[i * 3 + 2];
			if (currentZ < minZ)
				minZ = currentZ;
			if (currentZ > maxZ)
				maxZ = currentZ;
		}
		
		var x : Float = minX;
		var y : Float = minY;
		var z : Float = minZ;
		
		var width : Float = maxX - minX;
		var heigth : Float = maxY - minY;
		var depth : Float = maxZ - minZ;
		
		boundingBox = new BoundingBox(x, y, z, width, heigth, depth);
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