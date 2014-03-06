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
	
	public static var atlas:TextureAtlas;
	
	public function new()
	{
		super();
		
		var runnerApp = new Haxolotl();
		atlas = new TextureAtlas(Texture.get("img/RunnerMark.png"), "img/RunnerMark.xml");
		runnerApp.gotoScreen(new RunnerScreen());
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
