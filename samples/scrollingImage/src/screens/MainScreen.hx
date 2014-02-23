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
		scene.UPDATED.add(onUpdate);
		add(scene);
		
		world = new World();
		scene.add(world);
		
		StaticSettings.IS_PLAYING = true;
		ADDED.add(onAdded);
	}
	
	private function onAdded()
	{
		world.init();
	}
	
	
	private function onUpdate(_deltaTime:Float)
	{
		world.update(_deltaTime);
	}
}