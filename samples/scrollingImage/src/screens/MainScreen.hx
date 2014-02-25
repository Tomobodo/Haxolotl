package screens;
import haxolotl.app.Screen;
import haxolotl.core.Scene;
import haxolotl.core.TextureAtlas;
import models.World;
import tools.StaticSettings;

/**
 * ...
 * @author Ynk33
 */
class MainScreen extends Screen
{
	private var scene:Scene;
	
	private var world:World;
	
	public function new() 
	{
		super();
		init();
	}
	
	private function init()
	{
		scene = new Scene();
		add(scene);
		
		world = new World();
		scene.add(world);
		
		StaticSettings.IS_PLAYING = true;
		ADDED.add(onAdded);
	}
	
	override function update(deltaTime : Float)
	{
		//world.update(deltaTime);
	}
	
	private function onAdded()
	{
		world.init();
	}
}