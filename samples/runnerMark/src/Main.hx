package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.Haxolotl;
import haxolotl.text.Font;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;
import haxolotl.utils.FPS;

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
