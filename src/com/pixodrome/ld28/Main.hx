package com.pixodrome.ld28;

import com.pixodrome.ld28.App;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;
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
	
	public static function main() 
	{
		Lib.current.stage.align = flash.display.StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		Lib.current.addChild(new Main());
	}
	
	public function new() 
	{
		super();	
		addEventListener(Event.ADDED_TO_STAGE, added);
	}

	function added(e) 
	{
		removeEventListener(Event.ADDED_TO_STAGE, added);
		
		var glView = new OpenGLView();

		app = new App();
		glView.render = app.render;
		
		addChild(glView);
		
		var fps = new FPS(0, 0, 0xffffff);
		fps.defaultTextFormat = new TextFormat("arial", 14, 0xffffff, true);
		fps.autoSize = TextFieldAutoSize.LEFT;
		
		var fpsBackground = new Shape();
		fpsBackground.graphics.beginFill(0x000033);
		fpsBackground.graphics.drawRect(0, 0, fps.width, fps.height);
		fpsBackground.graphics.endFill();
		
		addChild(fpsBackground);
		
		addChild(fps);
		
		stage.addEventListener(Event.ENTER_FRAME, onEnterframe);
	}
	
	private function onEnterframe(e:Event):Void 
	{
		app.update();
	}
}
