package haxolotl.core;

import haxolotl.utils.Color;
import haxolotl.core.IDrawable;
import haxolotl.geom.Rectangle;

import lime.gl.GL;
import lime.Lime;

/**
 * ...
 * @author Thomas BAUDON
 */

enum ScaleMode
{
	NoScale;
	Scale;
}
 
class Engine
{
	public var scaleMode : ScaleMode;
	public var backGroundColor : Color;
	
	var touchDevice : Bool;
	
	var stages : List<haxolotl.core.Stage>;
	
	var viewport : Rectangle;
	
	var lime : Lime;
	
	public function new(_lime : Lime) 
	{
		lime = _lime;
		
		scaleMode = Scale;
		
		stages = new List<haxolotl.core.Stage>();
		
		touchDevice = false;
		
		backGroundColor = new Color(0xffffff);
		
		init();
	}
	
	function init() : Void
	{
		
	}
	
	private function render(viewport : Rectangle) : Void
	{
		viewport = new Rectangle(0, 0, lime.config.width, lime.config.height);
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		GL.clearColor (backGroundColor.r, backGroundColor.g, backGroundColor.b, 1);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		for (stage in stages)
		{
			stage.update();
			stage.draw();
		}
		
		var glError = GL.getError();
		if (glError != 0)
			trace(glError);
	}
	
	public function add(stage : haxolotl.core.Stage)
	{
		this.stages.push(stage);
		stage.setViewport(viewport);
	}
	
	public function remove(stage : haxolotl.core.Stage)
	{
		this.stages.remove(stage);
	}
}