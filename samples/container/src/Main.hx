package ;

import flash.display.Sprite;
import flash.Lib;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.Haxolotl;

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
		var myApp = new Haxolotl();
		atlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		myApp.gotoScreen(new SampleScreen());
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
