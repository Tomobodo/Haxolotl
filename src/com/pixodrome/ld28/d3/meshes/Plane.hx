package com.pixodrome.ld28.d3.meshes;

import com.pixodrome.ld28.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane extends Mesh
{
	public function new(width : Float, height : Float) 
	{
		var dWidth = width / 2;
		var dHeight = height / 2;
		
		var vertices = [
			-dWidth, -dHeight, 0.0,
			dWidth, -dHeight, 0.0,
			dWidth, dHeight, 0.0,
			-dWidth, dHeight, 0.0
		];
		
		var texCoords = [
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0,
			0.0, 0.0
		];
		
		var indexes = [0, 1, 2, 2, 3, 0];
		
		super(vertices, texCoords, indexes);
	}
}