package com.pixodrome.ld28;
import openfl.gl.GLBuffer;
import openfl.gl.GL;
import openfl.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Mesh
{
	public var vertices : Array<Float>;
	public var texCoord : Array<Float>;
	public var colors : Array<Float>;
	
	var vertexBuffer : GLBuffer;
	var textCoordBuffer:GLBuffer;

	public function new(vertices : Array<Float> = null, texCoord : Array<Float> = null, colors : Array<Float> = null) 
	{
		vertexBuffer = GL.createBuffer();
		textCoordBuffer = GL.createBuffer();
		
		if (vertices == null)
			vertices = new Array<Float>();
		this.vertices = vertices;
		
		if (texCoord == null)
			texCoord = new Array<Float>();
		this.texCoord = texCoord;
		
		if (colors == null)
			colors = new Array<Float>();
		this.colors = colors;
		
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