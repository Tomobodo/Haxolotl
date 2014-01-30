package ld28;
import flash.display.Stage;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import openfl.gl.GL;
import ld28.core.IDrawable;


/**
 * ...
 * @author Thomas BAUDON
 */
class Scene
{
	var displayObjects : List<IDrawable>;
	
	var viewport : Rectangle;
	var stage:Stage;
	
	public var projectionMatrix : Matrix3D;
	
	public var eventManager : EventManager;

	public function new() 
	{
		displayObjects = new List<IDrawable>();
		stage = Application.current.stage;
		eventManager = new EventManager(stage, this);
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
	}
	
	public function draw():Void 
	{
		for (model in displayObjects)
			model.draw(this);
	}
	
	public function add(_model : IDrawable)
	{
		displayObjects.push(_model);
	}
	
	public function remove(_model : IDrawable)
	{
		displayObjects.remove(_model);
	}
}