package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
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
		
		var a = new TextField("arial", "What does the fox says?");
		sampleStage.add(a);
		
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
