package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.Haxolotl;
import models.World;
import screens.MainScreen;
import tools.AtlasLoader;

/**
 * ...
 * @author Ynk33
 */

class Main extends Sprite 
{
	private var inited:Bool;
	
	private var engine:Haxolotl;
	public static var atlasLoader:AtlasLoader;

	/* ENTRY POINT */
	
	function resize(e) 
	{
		if (!inited) init();
		// else (resize or orientation change)
	}
	
	function init() 
	{
		if (inited) return;
		inited = true;
		
		trace ("Main inited");
		
		engine = new Haxolotl(800,480);
		
		trace ("Engine inited");
		
		Main.atlasLoader = new AtlasLoader();
		Main.atlasLoader.add(new TextureAtlas(Texture.get("img/sheet.png"), "img/sheet.xml"), "main");
		
		trace ("Atlases inited");
		
		engine.gotoScreen(new MainScreen());
		
		trace("Game inited");
	}

	/* SETUP */

	public function new() 
	{
		super();	
		addEventListener(Event.ADDED_TO_STAGE, added);
	}

	function added(e) 
	{
		removeEventListener(Event.ADDED_TO_STAGE, added);
		stage.addEventListener(Event.RESIZE, resize);
		#if ios
		haxe.Timer.delay(init, 100); // iOS 6
		#else
		init();
		#end
	}
	
	public static function main() 
	{
		// static entry point
		Lib.current.stage.align = flash.display.StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		Lib.current.addChild(new Main());
	}
}
