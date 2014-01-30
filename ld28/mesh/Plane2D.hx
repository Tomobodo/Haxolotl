package ld28.mesh;
import ld28.core.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class Plane2D extends Mesh
{
	public function new(_w : Float, _h : Float) 
	{
		var _vertices = [
			0.0, _h,
			_w, _h,
			_w, 0,
			0.0, 0
		];
		
		var _texCoord = [
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0,
			0.0, 0.0
		];
		
		var _indexes = [0, 1, 2, 2, 3, 0];
		
		super(_vertices, _texCoord, _indexes);
	}
}