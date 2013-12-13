package com.pixodrome.ld28.meshes;

import com.pixodrome.ld28.Mesh;
import com.pixodrome.ld28.Color;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane extends Mesh
{

	public function new(width : Float, height : Float, color : UInt = 0xffffff) 
	{
		var col : Color = new Color(color);
		
		var dWidth = width / 2;
		var dHeight = height / 2;
		
		var vertices = [
			-dWidth, -dHeight, 0.0,
			dWidth, -dHeight, 0.0,
			dWidth, dHeight, 0.0,
			
			dWidth, dHeight, 0.0,
			-dWidth, dHeight, 0.0,
			-dWidth, -dHeight, 0.0
		];
		
		var texCoords = [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0
		];
		
		var colors = [
			col.r, col.g, col.b, col.a,
			col.r, col.g, col.b, col.a,
			col.r, col.g, col.b, col.a,
			
			col.r, col.g, col.b, col.a,
			col.r, col.g, col.b, col.a,
			col.r, col.g, col.b, col.a
		];
		
		super(vertices, texCoords, colors);
	}
	
}