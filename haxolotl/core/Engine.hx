package haxolotl.core;


#if cpp
import cpp.vm.Thread;
#end

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
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
	
	var stages : List<haxolotl.core.Scene>;
	
	var viewport : Rectangle;
	
	var spriteBatch : SpriteBatch;
	
	var lastTime:Int = 0;
	
	#if cpp
	var t : Thread;
	#end
	
	static private inline var TIME_STEP : Int = 16;
	
	public function new(_stage : flash.display.Stage) 
	{
		scaleMode = Scale;
		
		stages = new List<haxolotl.core.Scene>();
		
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
		
		new EventHandler(stage, stages);
		
		#if cpp
		t = Thread.create(updateThread);
		#else
		stage.addEventListener(Event.ENTER_FRAME, update);
		#end
	}
	
	function update(e : Event = null)
	{
		var deltaTime : Float = (Lib.getTimer() - lastTime) / 1000;
		lastTime = Lib.getTimer();
		for (stage in stages)
			stage.update(deltaTime);
	}
	
	#if cpp
	function updateThread()
	{
		var a = true;
		while (a)
		{
			var updateGame = Thread.readMessage(false);
			if (updateGame)
				update();
			Sys.sleep(.015);
		}
	}
	#end
	
	function render(viewport : flash.geom.Rectangle) : Void
	{
		//GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		GL.clearColor (backGroundColor.r, backGroundColor.g, backGroundColor.b, 1);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		#if cpp
		t.sendMessage(true);
		#end
		
		for (stage in stages)
		{
			spriteBatch.setProjectionMatrix(stage.projectionMatrix);
			spriteBatch.start();
			spriteBatch.render(stage);
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
	
	public function add(stage : haxolotl.core.Scene)
	{
		this.stages.push(stage);
		stage.setViewport(viewport);
	}
	
	public function remove(stage : haxolotl.core.Scene)
	{
		this.stages.remove(stage);
	}
}