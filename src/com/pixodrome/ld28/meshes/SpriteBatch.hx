package com.pixodrome.ld28.meshes;

import flash.Lib;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;

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
				
			var index = [0, 1, 2, 2, 3, 0];
				
			for (j in 0 ... 6)
			{
				var a = i * 18 + j * 3;
				var b = index[j] * 3;
				
				for (k in 0 ... 3)
					vertices[a + k] = quad.points[b + k];
			}
		}
		trace(Lib.getTimer() - startTime);
		
		updateVertexBuffer();
	}
	
	public function generate() : Void
	{
		var tempsVert = new Array<Float>();
		var tempCoord = new Array<Float>();
		
		for (i in 0 ... quadList.length)
		{
			var quad : Quad = quadList[i];

			if (quad.needUpdate)
				quad.update();
			
			var index = [0, 1, 2, 2, 3, 0];
			
			for (i in 0 ... index.length)
			{
				var k = index[i];
				tempsVert.push(quad.points[k * 3 + 0]);
				tempsVert.push(quad.points[k * 3 + 1]);
				tempsVert.push(quad.points[k * 3 + 2]);
			}
			
			var quadCoord : Array<Float> = [
				0, 0,
				1, 0,
				1, 1,
				
				1, 1,
				0, 1,
				0, 0
			];
			
			tempCoord = tempCoord.concat(quadCoord);
		}
		
		vertices = new Float32Array(tempsVert);
		texCoord = new Float32Array(tempCoord);
		
		updateVertexBuffer();
		updateTexCoordBuffer();
	}
}