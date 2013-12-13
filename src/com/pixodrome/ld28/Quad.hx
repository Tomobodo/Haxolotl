package com.pixodrome.ld28;
import com.pixodrome.ld28.meshes.Plane;
import flash.geom.Matrix;
import flash.geom.Point;

/**
 * ...
 * @author Thomas B
 */
class Quad
{
	
	public var width : Float;
	public var height : Float;
	public var color : Float;
	
	public var x(get_x, set_x):Float;
	public var y(get_y, set_y):Float;
	public var rotation(get_rotation, set_rotation):Float;
	
	public var points : Array<Point>;
	
	public var needUpdate : Bool;

	var _x : Float;
	var _y : Float;
	var _rotation : Float;
	
	var mesh : Mesh;
	
	var transformMatrix : Matrix;

	public function new(width : Float = 10, height : Float = 10 , color : UInt = 0xffffff) 
	{
		this.width = width;
		this.height = height;
		this.color = color;
		
		this.transformMatrix = new Matrix();
		
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		
		this.mesh = new Plane(width, height, color);
		
		points = new Array<Point>();
		
		for(i in 0 ... cast(mesh.vertices.length / 3))
			points.push(new Point());
		
		needUpdate = true;
	}
	
	public function update() : Void
	{
		transformMatrix.identity();
		
		transformMatrix.rotate(_rotation);
		transformMatrix.translate(_x, _y);
		
		for (i in 0 ... points.length)
			points[i] = transformMatrix.transformPoint(new Point(mesh.vertices[i * 3], mesh.vertices[i * 3 + 1]));
			
		needUpdate = false;
	}
	
	function get_x():Float 
	{
		return _x;
	}
	
	function set_x(value:Float):Float 
	{
		needUpdate = true;
		return _x = value;
	}
	
	function get_y():Float 
	{
		return _y;
	}
	
	function set_y(value:Float):Float 
	{
		needUpdate = true;
		return _y = value;
	}
	function get_rotation():Float 
	{
		return _rotation;
	}
	
	function set_rotation(value:Float):Float 
	{
		needUpdate = true;
		return _rotation = value;
	}
}