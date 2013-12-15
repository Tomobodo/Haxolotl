package com.pixodrome.ld28;

import com.pixodrome.ld28.meshes.Plane;
import lime.utils.Vector.Vector;
import lime.geometry.Vector3D;
import lime.geometry.Matrix3D;

/**
 * ...
 * @author Thomas B
 */
class Quad
{
	
	public var width : Float;
	public var height : Float;
	
	public var x(get_x, set_x):Float;
	public var y(get_y, set_y):Float;
	public var rotation(get_rotation, set_rotation):Float;
	
	public var points : Vector<Float>;
	
	public var needUpdate : Bool;

	var _position : Vector3D;
	var _rotation : Float;
	
	var mesh : Mesh;
	
	var transformMatrix : Matrix3D;

	public function new(width : Float = 10, height : Float = 10) 
	{
		this.width = width;
		this.height = height;
		
		this.transformMatrix = new Matrix3D();
		
		this._position = new Vector3D();
		
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		
		this.mesh = new Plane(width, height);
		
		points = new Vector<Float>();
		
		needUpdate = true;
	}
	
	public function update() : Void
	{
		transformMatrix.identity();
		transformMatrix.appendRotation(_rotation, Vector3D.Z_AXIS);
		transformMatrix.position = _position;
		
		var input = new Vector<Float>();
		var nbVertex = mesh.vertices.length;
		for(i in 0 ... nbVertex)
			input[i] = mesh.vertices[i];
		
		transformMatrix.transformVectors(input, points);
			
		needUpdate = false;
	}
	
	function get_x():Float 
	{
		return _position.x;
	}
	
	function set_x(value:Float):Float 
	{
		needUpdate = true;
		return _position.x = value;
	}
	
	function get_y():Float 
	{
		return _position.y;
	}
	
	function set_y(value:Float):Float 
	{
		needUpdate = true;
		return _position.y = value;
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