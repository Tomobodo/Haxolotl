package com.pixodrome.ld28.meshes;

import openfl.gl.GLBuffer;
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
		for (i in 0 ... quadList.length)
		{
			var quad : Quad = quadList[i];

			if (quad.needUpdate)
				quad.update();
			
			vertices[i * 18 + 0] = quad.points[0].x;
			vertices[i * 18 + 1] = quad.points[0].y;
			
			vertices[i * 18 + 3] = quad.points[1].x;
			vertices[i * 18 + 4] = quad.points[1].y;
			
			vertices[i * 18 + 6] = quad.points[2].x;
			vertices[i * 18 + 7] = quad.points[2].y;
			
			vertices[i * 18 + 9] = quad.points[3].x;
			vertices[i * 18 + 10] = quad.points[3].y;
			
			vertices[i * 18 + 12] = quad.points[4].x;
			vertices[i * 18 + 13] = quad.points[4].y;
			
			vertices[i * 18 + 15] = quad.points[5].x;
			vertices[i * 18 + 16] = quad.points[5].y;
		}
		
		updateBuffer();
	}
	
	public function generate() : Void
	{
		vertices = new Array<Float>();
		
		for (i in 0 ... quadList.length)
		{
			var quad : Quad = quadList[i];

			if (quad.needUpdate)
				quad.update();
			
			var quadPoints : Array<Float> = [
				quad.points[0].x, quad.points[0].y, 0,
				quad.points[1].x, quad.points[1].y, 0,
				quad.points[2].x, quad.points[2].y, 0,
				
				quad.points[3].x, quad.points[3].y, 0,
				quad.points[4].x, quad.points[4].y, 0,
				quad.points[5].x, quad.points[5].y, 0
			];
			
			vertices = vertices.concat(quadPoints);
		}
		
		updateBuffer();
	}
}