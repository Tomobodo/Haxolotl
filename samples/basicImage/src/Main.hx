package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;

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
		engine.scaleMode = Scale;
		
		var sampleStage = new Scene();
		engine.add(sampleStage);
		
		var image = new Image(new TextureRegion(Texture.get("img/atlas.png")));
		sampleStage.add(image);
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
