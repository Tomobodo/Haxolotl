package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.text.Font;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine:Engine;
	var testScene:Stage;
	
	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		engine = new Engine(stage);
		engine.backGroundColor.set(0x6666ff);
		testScene = new Stage();
		engine.add(testScene);
		
		var atlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		var regionA = atlas.get("bunny");
		
		var bunny = new Image(regionA);
		bunny.x = 50;
		
		var font = new Font("arial");
		var text = new Text("Hello, dis iz a layer sample!", new TextFormat("pr_agamemnon", 0xff9999));
		
		var bunnyB = new Image(regionA);
		bunnyB.x = 100;
		
		testScene.add(bunny);
		testScene.add(text);
		testScene.add(bunnyB);
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
