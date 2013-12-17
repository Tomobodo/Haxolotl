package com.pixodrome.ld28;

import com.pixodrome.ld28.App;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.events.TouchEvent;
import flash.Lib;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;
import openfl.display.FPS;
import openfl.display.OpenGLView;

/**
 * ...
 * @author Thomas BAUDON
 */

class Main extends Sprite 
{
	var app : App;
	var fps:openfl.display.FPS;
	var touchDevice : Bool;
	var forEvent:Sprite;
	
	public static function main() 
	{
		Lib.current.stage.align = flash.display.StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		Lib.current.addChild(new Main());
		
		
		
	}
	
	public function new() 
	{
		super();	
		touchDevice = false;
		addEventListener(Event.ADDED_TO_STAGE, added);
	}

	function added(e) 
	{
		removeEventListener(Event.ADDED_TO_STAGE, added);
		
		forEvent = new Sprite();
		drawForevent();
		
		addChild(forEvent);
		
		var glView = new OpenGLView();

		app = new App();
		glView.render = app.render;
		
		addChild(glView);
		
		fps = new FPS(0, 0, 0xffffff);
		fps.defaultTextFormat = new TextFormat("arial", 14, 0xffffff, true);
		fps.autoSize = TextFieldAutoSize.LEFT;
		
		var fpsBackground = new Shape();
		fpsBackground.graphics.beginFill(0x000033);
		fpsBackground.graphics.drawRect(0, 0, 50, fps.height);
		fpsBackground.graphics.endFill();
		
		addChild(fpsBackground);
		
		addChild(fps);
		
		stage.addEventListener(Event.ENTER_FRAME, onEnterframe);
		stage.addEventListener(Event.RESIZE, onResize);
		
		stage.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
		stage.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
		stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
		
		stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
	}
	
	private function onResize(e:Event):Void 
	{
		if (forEvent != null)
		{
			forEvent.graphics.clear();
			drawForevent();
		}
	}
	
	private function onMouseMove(e:MouseEvent):Void 
	{
		trace(stage.stageHeight);
		if (!touchDevice)
			app.onTouchMove(cast e.stageX, cast e.stageY);
	}
	
	private function onTouchMove(e:TouchEvent):Void 
	{
		setTouchDevice();
			app.onTouchMove(cast e.stageX, cast e.stageY);
	}
	
	private function onMouseDown(e:MouseEvent):Void 
	{
		if(!touchDevice)
			app.onTouchDown(cast e.stageX,cast e.stageY);
	}
	
	private function onMouseUp(e:MouseEvent):Void
	{
		if (!touchDevice)
			app.onTouchUp(cast e.stageX, cast e.stageY);
	}
	
	private function onTouchBegin(e:TouchEvent):Void 
	{
		setTouchDevice();	
		app.onTouchDown(cast e.stageX,cast e.stageY);
	}
	
	private function onTouchEnd(e:TouchEvent) : Void
	{
		setTouchDevice();	
		app.onTouchUp(cast e.stageX, cast e.stageY);
	}
	
	private function onEnterframe(e:Event):Void 
	{
		app.update();
	}
	
	function setTouchDevice():Void 
	{
		if (!touchDevice)
		{
			touchDevice = true;
			stage.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			stage.removeEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		}
	
	}
	
	function drawForevent():Void 
	{
		forEvent.graphics.beginFill(0x000000, 0);
		forEvent.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
		forEvent.graphics.endFill();
	}
}
