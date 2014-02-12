package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine : Engine;
	var sampleStage : Stage;
	var bunny : Image;
	var time : Float;
	
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
		
		var atlas : TextureAtlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		bunny = new Image(atlas.get("bunny"));
		
		sampleStage.add(bunny);
		
		bunny.x = 200;
		bunny.y = 200;
		
		bunny.pivotX = bunny.width;// / 2;
		bunny.pivotY = bunny.height;// / 2;
		
		time = 0;
		
		sampleStage.ENTER_FRAME.add(onEnterFrame);
		
		bunny.PRESSED.add(click);
	}
	
	function click(target : InteractiveObject)
	{
		trace("click");
	}
	
	function onEnterFrame() 
	{
		time += 0.03;
		bunny.scaleX = Math.sin(time);
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
