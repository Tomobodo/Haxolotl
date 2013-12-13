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
	
	public function new() 
	{
		super();
		
		needUpdate = true;
		
		quadList = new Array<Quad>();
	}
	
	public function add(quad : Quad) : Void
	{
		quadList.push(quad);
		needUpdate = true;
	}
	
	override public function getBuffer() : GLBuffer
	{
		for (i in 0 ... quadList.length)
			if (quadList[i].needUpdate)
				needUpdate = true;
		
		if (needUpdate)
		{
			update();
			needUpdate = false;
		}
			
		return super.getBuffer();
	}
	
	public function update() : Void
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
			];
			
			vertices = vertices.concat(quadPoints);
		}
		
		updateBuffer();
	}
}