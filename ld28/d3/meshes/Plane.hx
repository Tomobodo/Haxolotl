package ld28.d3.meshes;

import ld28.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane extends Mesh
{
	public function new(width : Float, height : Float) 
	{
		var vertices = [
			0,0, 0.0,
			width, 0, 0.0,
			width, height, 0.0,
			0, height, 0.0
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