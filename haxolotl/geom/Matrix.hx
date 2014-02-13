package haxolotl.geom;

import lime.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Matrix
{
	
	public var a : Float;
	public var b : Float;
	public var c : Float;
	public var d : Float;
	public var tx : Float;
	public var ty : Float;
	
	var data : Float32Array;

	public function new(_a : Float = 1.0, _b : Float = 0.0, _c : Float = 0.0, _d : Float = 1.0, _tx : Float = 0.0, _ty : Float = 0.0) 
	{
		data = new Float32Array([
			_a, _c, 0.0,
			_b, _d, 0.0,
			_tx, _ty, 1.0]);
	}
	
	inline public function clone() : Matrix
	{
		return new Matrix(a, b, c, d, tx, ty);
	}
	
	public function invert() : Matrix
	{
		return this;
	}
	
	inline public function identity()
	{
		var i = 0;
		data[i++] = 1.0;
		data[i++] = 0.0;
		data[i++] = 0.0;
		data[i++] = 0.0;
		data[i++] = 1.0;
		data[i++] = 0.0;
		data[i++] = 0.0;
		data[i++] = 0.0;
		data[i++] = 1.0;
	}
	
	inline public function translate(_x : Float, _y : Float)
	{
		data[2] += _x;
		data[5] += _y;
	}
	
	inline public function rotate(angle : Float)
	{
		data[0] *= Math.cos(angle);
		data[1] *= Math.sin(angle);
		data[3] *= -Math.sin(angle);
		data[4] *= Math.cos(angle);
	}
	
	inline public function scale(_x : Float, _y : Float)
	{
		data[0] *= _x;
		data[4] *= _y;
	}
	
	inline public function concat(mat : Matrix)
	{
		
	}
	
	inline public function transformPoint(point : Point) : Point
	{
		var x = point.x * data[0] + point.y * data[1] + data[2];
		var y = point.x * data[3] + point.y * data[4] + data[5];
		
		return new Point(x, y);
	}
	
}