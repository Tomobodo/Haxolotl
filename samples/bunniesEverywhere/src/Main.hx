package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;
import haxolotl.Haxolotl;
import haxolotl.text.TextFormat;
import haxolotl.utils.FPS;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	public static var atlas : TextureAtlas;
	
	public function new()
	{
		super();
		
		var sample = new Haxolotl();
		atlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		
		sample.gotoScreen(new BunnyScreen());
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
