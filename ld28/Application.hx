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
	
	var renderer : Renderer;
	
	var screens : ScreenManager;
	var firstScreen : Screen;
	
	public function new(initialScreen : Screen) 
	{
		super();
		
		current = this;
		touchDevice = false;
		firstScreen = initialScreen;
		
		renderer = new Renderer();
		
		glView = new OpenGLView();
		addChild(glView);
		
		glView.render = renderer.render;
		
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		stage.addEventListener(Event.RESIZE, onResize);
		
		initEventCatcher();

		screens = new ScreenManager(stage);
		screens.gotoScreen(firstScreen);
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