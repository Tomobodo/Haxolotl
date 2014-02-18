package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import flash.text.TextField;
import haxolotl.core.Engine;
import haxolotl.core.Font;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;
import haxolotl.utils.FPS;

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
		sampleStage.UPDATED.add(stageEnterFrame);
		engine.add(sampleStage);
		
		mouth = new Image(atlas.get("lol2"));
		mouth.interactive = true;
		
		sampleStage.add(mouth);
		
		mouth.PRESSED.add(mouthPressed);
		mouth.RELEASED.add(mouthReleased);
		mouth.LEAVED.add(mouthReleased);
		
		sampleStage.add(new FPS(Font.get("arial")));
	}
	
	function stageEnterFrame(deltaTime : Float) 
	{
		if (mouseDown)
			for (i in 0 ... 20)
				sampleStage.add(new Bunny());
	}
	
	function mouthReleased(target : InteractiveObject) 
	{
		mouth.updateFrame(atlas.get("lol2"));
		mouseDown = false;
	}
	
	function mouthPressed(target : InteractiveObject) 
	{
		mouth.updateFrame(atlas.get("lol"));
		mouseDown = true;
	}

	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
