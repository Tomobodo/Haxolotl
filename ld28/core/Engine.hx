package ld28.core;

import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Rectangle;
import ld28.utils.Color;
import openfl.display.OpenGLView;
import openfl.gl.GL;
import ld28.core.IDrawable;

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
	
	var eventCatcher : Sprite;
	
	var touchDevice : Bool;
	
	var stage : flash.display.Stage;
	
	var glView : OpenGLView;
	
	var stages : List<ld28.core.Stage>;
	
	var viewport : Rectangle;
	
	public function new(_stage : flash.display.Stage) 
	{
		scaleMode = Scale;
		
		stages = new List<ld28.core.Stage>();
		
		touchDevice = false;
		
		stage = _stage;
		
		backGroundColor = new Color(0xffffff);
		
		init();
	}
	
	function init() : Void
	{
		stage.addEventListener(Event.RESIZE, onResize);
		
		glView = new OpenGLView();
		glView.render = render;
		stage.addChild(glView);
		viewport = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
		
		initEventCatcher();
		
		new EventHandler(stage, stages);
	}
	
	function render(viewport : Rectangle) : Void
	{
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
	
	function onResize(e:Event):Void 
	{
		initEventCatcher();
		if (scaleMode != NoScale)
		{
			viewport = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
			for (stage in stages)
				stage.setViewport(viewport);
		}
	}
	
	function initEventCatcher() 
	{
		if (eventCatcher == null)
		{
			eventCatcher = new Sprite();
			stage.addChild(eventCatcher);
		}
		else
			eventCatcher.graphics.clear();
			
		eventCatcher.graphics.beginFill(0, 0);
		eventCatcher.graphics.drawRect(0, 0,stage.stageWidth,stage.stageHeight);
		eventCatcher.graphics.endFill();
		
	}
	
	public function add(stage : ld28.core.Stage)
	{
		this.stages.push(stage);
		stage.setViewport(viewport);
	}
	
	public function remove(stage : ld28.core.Stage)
	{
		this.stages.remove(stage);
	}
}