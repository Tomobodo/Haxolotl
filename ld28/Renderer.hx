package ld28;

import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import openfl.gl.GL;

/**
 * ...
 * @author Thomas B
 */
class Renderer
{
	var models : Array<Model>;
	
	var numChildren : Int;
	
	public var projectionMatrix : Matrix3D;
	
	public function new() 
	{
		models = new Array<Model>();
		
		projectionMatrix = Matrix3D.createOrtho(0, 800, 480, 0, 1000, -1000);
	}
	
	public function add(_model : Model) : Void
	{
		models.push(_model);
		numChildren = models.length;
	}
	
	public function remove(_model : Model) : Void
	{
		models.remove(_model);
		numChildren = models.length;
	}
	
	public function render(viewport : Rectangle) : Void
	{
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		projectionMatrix = Matrix3D.createOrtho(0, 480, 768, 0, 1000, -1000);
		
		GL.clearColor (0.0, 0.0, 0.0, 1.0);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		for (i in 0 ... numChildren)
			models[i].draw(this);
	}
	
}