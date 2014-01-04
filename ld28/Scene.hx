package ld28;
import flash.geom.Matrix3D;
import openfl.gl.GL;

/**
 * ...
 * @author Thomas BAUDON
 */
class Scene
{
	
	var models : List<Model>;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		models = new List<Model>();
		
		projectionMatrix = Matrix3D.createOrtho(0, 800, 480, 0, 1000, -1000);
		GL.enable(GL.DEPTH_TEST);
	}
	
	public function draw():Void 
	{
		for (model in models)
			model.draw(this);
	}
	
	public function add(_model : Model)
	{
		models.push(_model);
	}
	
	public function remove(_model : Model)
	{
		models.remove(_model);
	}
	
}