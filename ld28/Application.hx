package ld28;

import flash.display.Sprite;
import flash.events.Event;
import openfl.display.OpenGLView;

/**
 * ...
 * @author Thomas BAUDON
 */
class Application extends Sprite
{
	public static var current : Application;
	
	var eventCatcher : Sprite;
	
	var touchDevice : Bool;
	
	var glView : OpenGLView;
	
	var screens : ScreenManager;
	
	public function new() 
	{
		super();
		
		current = this;
		touchDevice = false;
		
		glView = new OpenGLView();
		screens = new ScreenManager(stage);
		glView.render = screens.render;
		addChild(glView);
		
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
		
		initEventCatcher();
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
}