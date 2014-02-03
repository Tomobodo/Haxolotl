package ld28.core;

import flash.display.Sprite;
import flash.display.Stage;
import flash.events.Event;
import flash.geom.Rectangle;
import haxe.Constraints.Function;
import openfl.display.OpenGLView;
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
	
	var eventCatcher : Sprite;
	
	var touchDevice : Bool;
	
	var stage : Stage;
	
	var glView : OpenGLView;
	
	var drawlist : List<IDrawable>;
	
	public function new(_stage : Stage) 
	{
		scaleMode = Scale;
		
		drawlist = new List<IDrawable>();
		
		touchDevice = false;
		
		stage = _stage;
		
		init();
	}
	
	function init() : Void
	{
		stage.addEventListener(Event.RESIZE, onResize);
		
		glView = new OpenGLView();
		glView.render = render;
		stage.addChild(glView);
		
		initEventCatcher();
	}
	
	function render(viewport : Rectangle) : Void
	{
		for (drawable in drawlist)
		{
			drawable.update();
			drawable.draw();
		}
	}
	
	function onResize(e:Event):Void 
	{
		initEventCatcher();
	}
	
	function initEventCatcher() 
	{
		if (eventCatcher == null)
			eventCatcher = new Sprite();
		else
			eventCatcher.graphics.clear();
			
		eventCatcher.graphics.beginFill(0, 0);
		eventCatcher.graphics.drawRect(0, 0,stage.stageWidth,stage.stageHeight);
		eventCatcher.graphics.endFill();
	}
	
	public function add(object : IDrawable)
	{
		this.drawlist.push(object);
	}
	
	public function remove(object : IDrawable)
	{
		this.drawlist.remove(object);
	}
}