package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.display.TextField;
import haxolotl.core.Font;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine : Engine;
	var text:haxolotl.display.TextField;
	var sampleStage:Stage;
	
	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		engine = new Engine(stage);
		
		sampleStage = new Stage();
		engine.add(sampleStage);
		
		text = new TextField(Font.get("arial"), "Hey!", 0xff0000);
		sampleStage.add(text);
		
		text.x = 100;
		text.y = 200;
		text.rotation = 0.1;
		text.PRESSED.add(onTextPressed);
	}
	
	function onTextPressed(target : InteractiveObject) 
	{
		text.text = "lolilol";
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
