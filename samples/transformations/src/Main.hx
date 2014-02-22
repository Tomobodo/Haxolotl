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

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine : Engine;
	var sampleStage : Scene;
	var bunny : Image;
	var time : Float;
	
	public function new()
	{
		super();
		
		var app = new Haxolotl();
		app.gotoScreen(new SampleScreen());
	}
	
	
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
