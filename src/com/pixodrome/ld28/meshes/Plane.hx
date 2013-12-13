package com.pixodrome.ld28.meshes;

import com.pixodrome.ld28.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane extends Mesh
{

	public function new(color : Color) 
	{
		var vertices = [
			100.0, 100.0, 0.0,
			-100.0, 100.0, 0.0,
			100.0, -100.0, 0.0,
			-100.0, -100.0, 0.0
		];
		
		var texCoords = [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		];
		
		var colors = [
			color.r, color.g, color.b, color.a,
			color.r, color.g, color.b, color.a,
			color.r, color.g, color.b, color.a,
			color.r, color.g, color.b, color.a
		];
		
		super(vertices, texCoords, colors);
	}
	
}