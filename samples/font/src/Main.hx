package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.display.TextField;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine : Engine;
	
	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		engine = new Engine(stage);
		
		var sampleStage : Stage = new Stage();
		engine.add(sampleStage);
		
		var a = new TextField("arial", "Hi!");
		sampleStage.add(a);
		
		a.x = 100;
		a.y = 200;
		a.HOVERED.add(click);
		a.rotation = 0.1;
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
