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
		
		var runnerApp = new Haxolotl();
		atlas = new TextureAtlas(Texture.get("img/RunnerMark.png"), "img/RunnerMark.xml");
		runnerApp.gotoScreen(new RunnerScreen());
		/*
		var data = Assets.getBitmapData("img/RunnerMark.png");
		var test = new BitmapData(1000, 1000, true, 0);
		var bitmap = new Bitmap(test);
		
		var mat = new Matrix();
		mat.translate(10, 10);
		mat.rotate(1);
		
		test.draw(data,mat, null, null, new Rectangle(190,197,72,90));
		addChild(bitmap);*/
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
