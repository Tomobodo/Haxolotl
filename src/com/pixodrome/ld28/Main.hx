package com.pixodrome.ld28;

import com.pixodrome.ld28.App;
import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
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
		
		addChild(new OpenGLView());
		
		app = new App();
		
		stage.addEventListener(Event.ENTER_FRAME, onEnterframe);
	}
	
	private function onEnterframe(e:Event):Void 
	{
		app.update();
		app.render();
	}
}
