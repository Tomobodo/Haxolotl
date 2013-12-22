package ld28.d2;
import ld28.IDrawable;
import d28.Program;
import ld28.Renderer;
import ld28.Texture;
import flash.geom.Matrix;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject implements IDrawable
{
	
	public var mesh : Plane2D;
	
	public var texture : Texture;
	
	public var x : Int;
	public var y : Int;
	
	public var rotation : Float;
	
	var transform : Matrix;
	
	var program : Program;

	public function new(_w : Int, _h : Int, _texture : Texture) 
	{
		mesh = new Plane2D(_w, _h);
		texture = _texture;
		transform = new Matrix();
		program = Program.get("basic_2d");
	}
	
	public function draw(renderer : Renderer) 
	{
		
	}
	
}