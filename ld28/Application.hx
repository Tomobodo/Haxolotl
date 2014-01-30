package ld28;

import flash.display.Sprite;
import flash.display.Stage;
import flash.events.Event;
import flash.geom.Rectangle;
import openfl.display.OpenGLView;

/**
 * ...
 * @author Thomas BAUDON
 */

enum ScaleMode
{
	NoScale;
	Scale;
}
 
class Application extends Sprite
{
	public static var current : Application;
	
	public var scaleMode : ScaleMode;
	
	var eventCatcher : Sprite;
	
	var touchDevice : Bool;
	
	var glView : OpenGLView;
	
	var screens : ScreenManager;
	
	public function new() 
	{
		super();
		
		scaleMode = Scale;
		
		current = this;
		touchDevice = false;
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	public function start(_firstScreen : Screen)
	{
		screens.gotoScreen(_firstScreen);
	}
	
	function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		stage.addEventListener(Event.RESIZE, onResize);
		
		glView = new OpenGLView();
		screens = new ScreenManager(stage);
		updateViewport();
		glView.render = screens.render;
		addChild(glView);
		
		initEventCatcher();
	}
	
	function updateViewport() : Void
	{
		screens.setViewport(new Rectangle(0,0,stage.stageWidth,stage.stageHeight));
	}
	
	function onResize(e:Event):Void 
	{
		initEventCatcher();
		if(scaleMode == NoScale)
			updateViewport();
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
}