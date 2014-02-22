package ;

import flash.display.Sprite;
import flash.Lib;
import haxolotl.Haxolotl;


/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{

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
