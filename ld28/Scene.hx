package ld28;
import flash.geom.Matrix3D;
import openfl.gl.GL;
import ld28.core.IDrawable;


/**
 * ...
 * @author Thomas BAUDON
 */
class Scene
{
	
	var models : List<IDrawable>;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		models = new List<IDrawable>();
		
		projectionMatrix = Matrix3D.createOrtho(0, 800, 480, 0, 1000, -1000);
		GL.enable(GL.DEPTH_TEST);
	}
	
	public function draw():Void 
	{
		for (model in models)
			model.draw(this);
	}
	
	public function add(_model : IDrawable)
	{
		models.push(_model);
	}
	
	public function remove(_model : IDrawable)
	{
		models.remove(_model);
	}
	
}