package ;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.geom.Matrix;
import flash.geom.Rectangle;
import flash.Lib;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.Haxolotl;
import openfl.Assets;

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
		
		var runnerApp = new Haxolotl(600,320);
		atlas = new TextureAtlas(Texture.get("img/RunnerMark.png"), "img/RunnerMark.xml");
		runnerApp.gotoScreen(new RunnerScreen());
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
