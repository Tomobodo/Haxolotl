package com.pixodrome.ld28.d3.meshes;

import flash.Lib;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

import com.pixodrome.ld28.Mesh;
import com.pixodrome.ld28.Quad;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch extends Mesh
{
	var quadList : Array<Quad>;
	var recreateBuffer : Bool;
	
	var needUpdate : Bool;
	var needGeneration : Bool;
	
	public function new() 
	{
		super();
		
		needUpdate = true;
		needGeneration = true;
		
		quadList = new Array<Quad>();
	}
	
	public function add(quad : Quad) : Void
	{
		quadList.push(quad);
		needGeneration = true;
	}
	
	public function remove(quad : Quad) : Void
	{
		quadList.remove(quad);
		needGeneration = true;
	}
	
	override public function getBuffer() : GLBuffer
	{
		for (i in 0 ... quadList.length)
			if (quadList[i].needUpdate)
				needUpdate = true;
		
		if (needGeneration)
		{
			generate();
			needGeneration = false;
			needUpdate = false;
		}
				
		if (needUpdate)
		{
			update();
			needUpdate = false;
		}
		
		vertexDrawMode = GL.STREAM_DRAW;
			
		return super.getBuffer();
	}
	
	public function update() : Void
	{
		var startTime = Lib.getTimer();
		for (i in 0 ... quadList.length)
		{
			var quad : Quad = quadList[i];

			if (quad.needUpdate)
				quad.update();
				
			var nb = quad.points.length;
			var a = i * nb;
			
			for (j in 0 ... nb)
				vertices[a + j] = quad.points[j];
		}
		
		updateVertexBuffer();
	}
	
	public function generate() : Void
	{
		var tempsVert = new Array<Float>();
		var tempCoord = new Array<Float>();
		var tempIndex = new Array<Int>();
		
		for (i in 0 ... quadList.length)
		{
			var quad : Quad = quadList[i];

			if (quad.needUpdate)
				quad.update();
			
			var index = [
				0 + i * 4, 
				1 + i * 4, 
				2 + i * 4, 
				2 + i * 4, 
				3 + i * 4, 
				0 + i * 4
			];
			
			tempIndex = tempIndex.concat(index);
			
			for (j in 0 ... quad.points.length)
				tempsVert.push(quad.points[j]);
			
			
			var quadCoord : Array<Float> = [
				0, 0,
				1, 0,
				1, 1,
				0, 1
			];
			
			tempCoord = tempCoord.concat(quadCoord);
		}
		
		vertices = new Float32Array(tempsVert);
		texCoord = new Float32Array(tempCoord);
		indexes = new Int16Array(tempIndex);
		
		genVertexBuffer();
		genTexCoordBuffer();
		genIndexBuffer();
	}
}