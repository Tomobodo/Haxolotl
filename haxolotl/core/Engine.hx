package haxolotl.core;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Scene;
import haxolotl.geom.Rectangle;
import haxolotl.utils.Color;
import openfl.display.OpenGLView;
import openfl.gl.GL;

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
	
	var scenes : List<Scene>;
	
	var viewport : Rectangle;
	
	var spriteBatch : SpriteBatch;
	
	var lastTime:Int = 0;
	
	static private inline var TIME_STEP : Int = 16;
	
	public function new(_stage : flash.display.Stage) 
	{
		scaleMode = Scale;
		
		scenes = new List<Scene>();
		
		touchDevice = false;
		
		stage = _stage;
		
		backGroundColor = new Color(stage.color);
		
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
		
		spriteBatch = new SpriteBatch();
		
		new EventHandler(stage, scenes);
	}
	
	function render(viewport : flash.geom.Rectangle) : Void
	{
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		GL.clearColor (backGroundColor.r, backGroundColor.g, backGroundColor.b, 1);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		for (scene in scenes)
		{
			spriteBatch.setViewport(scene.viewport);
			spriteBatch.start();
			spriteBatch.render(scene);
			spriteBatch.end();
		}
		
		#if debug
		var glError = GL.getError();
		if (glError != 0)
			trace(glError);
		#end
	}
	
	function onResize(e:Event):Void 
	{
		initEventCatcher();
		if (scaleMode == NoScale)
		{
			viewport = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
			for (scene in scenes)
				scene.setViewport(viewport);
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
	
	public function add(scene : Scene)
	{
		this.scenes.push(scene);
		scene.setViewport(viewport);
		scene.ADDED.dispatch();
	}
	
	public function remove(scene : Scene)
	{
		this.scenes.remove(scene);
		scene.REMOVED.dispatch();
	}
}