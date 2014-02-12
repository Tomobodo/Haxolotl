package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import flash.text.TextField;
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
	
	public static var atlas : TextureAtlas;
	
	var engine : Engine;
	
	var sampleStage : Stage;
	
	var mouth : Image;
	
	var mouseDown : Bool;
	
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
		
		atlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		
		sampleStage = new Stage();
		sampleStage.ENTER_FRAME.add(stageEnterFrame);
		engine.add(sampleStage);
		
		mouth = new Image(atlas.get("lol2"));
		sampleStage.add(mouth);
		
		mouth.PRESSED.add(mouthPressed);
		mouth.RELEASED.add(mouthReleased);
		mouth.LEAVED.add(mouthReleased);
	}
	
	function stageEnterFrame() 
	{
		if (mouseDown)
		{
			for (i in 0 ... 20)
				sampleStage.add(new Bunny());
		}
	}
	
	function mouthReleased(target : InteractiveObject) 
	{
		mouth.texture = atlas.get("lol2");
		mouseDown = false;
	}
	
	function mouthPressed(target : InteractiveObject) 
	{
		mouth.texture = atlas.get("lol");
		mouseDown = true;
	}

	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
