package haxolotl.core;

import haxolotl.prim.Plane;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

import haxolotl.utils.BoundingBox;

/**
 * ...
 * @author Thomas B
 */
class Primitive
{
	public var vertices : Float32Array;
	public var texCoord : Float32Array;
	public var indexes : Int16Array;
	
	public var vertexDrawMode : Int;
	
	public  var boundingBox : BoundingBox;
	
	private static var s_plane : Plane;
	
	public static function getPlane() : Plane
	{
		if (s_plane == null)
			s_plane = new Plane();
		return s_plane;
	}

	public function new(_vertices : Array<Float> = null, _texCoord : Array<Float>, _indexes : Array<Int> = null) 
	{
		if (_vertices == null)
			_vertices = new Array<Float>();
		vertices = new Float32Array(_vertices);
		
		if (_texCoord == null)
			_texCoord = new Array<Float>();
		texCoord = new Float32Array(_texCoord);
		
		if (_indexes == null)
			_indexes = new Array<Int>();
		indexes = new Int16Array(_indexes);
		
		genBounding(_vertices);
	}
	
	function genBounding(_vertices : Array<Float>) 
	{
		var minX : Float = 100000;
		var minY : Float = 100000;
		var minZ : Float = 100000;
		
		var maxX : Float = -100000;
		var maxY : Float = -100000;
		var maxZ : Float = -100000;
		
		var nbVertex : Int = Std.int(_vertices.length / 3);
		
		for (i in 0 ... nbVertex)
		{
			var currentX = _vertices[i * 3];
			if (currentX < minX)
				minX = currentX;
			if (currentX > maxX)
				maxX = currentX;
				
			var currentY = _vertices[i * 3 + 1];
			if (currentY < minY)
				minY = currentY;
			if (currentY > maxY)
				maxY = currentY;
				
			var currentZ = _vertices[i * 3 + 2];
			if (currentZ < minZ)
				minZ = currentZ;
			if (currentZ > maxZ)
				maxZ = currentZ;
		}
		
		var x : Float = minX;
		var y : Float = minY;
		var z : Float = minZ;
		
		var width : Float = maxX - minX;
		var heigth : Float = maxY - minY;
		var depth : Float = maxZ - minZ;
		
		boundingBox = new BoundingBox(x, y, z, width, heigth, depth);
	}
}