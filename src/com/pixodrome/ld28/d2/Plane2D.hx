package com.pixodrome.ld28.d2;
import com.pixodrome.ld28.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane2D extends Mesh
{
	public function new(_w : Int, _h : Int) 
	{
		vertices = [
			0, 0,
			_w, 0,
			_w, _h,
			0, _h
		];
		
		texCoord = [
			0, 1,
			1, 1,
			1, 0,
			0, 0
		];
		
		indexes = [0, 1, 2, 2, 3, 0];
		
		super(vertices, texCoord, indexes);
	}
}