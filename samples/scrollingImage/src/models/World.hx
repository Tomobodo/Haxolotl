package models;
import haxolotl.core.Scene;
import haxolotl.engine2d.ScrollableTileFiller;
import haxolotl.engine2d.SimpleScrollableTileFiller;
import tools.StaticSettings;

/**
 * ...
 * @author Ynk33
 */
class World extends Scene
{
	var background:SimpleScrollableTileFiller;
	var ground:SimpleScrollableTileFiller;
	
	public function new()
	{
		super();
	}
	
	public function init()
	{
		background = new SimpleScrollableTileFiller(Main.atlasLoader.get("main").get("background.png"), -1, 0);
		ground = new SimpleScrollableTileFiller(Main.atlasLoader.get("main").get("groundGrass.png"), -1, 0, -1, 71);
		ground.y = scene.height - 71;
		add(background);
		add(ground);
		
		UPDATED.add(onUpdate);
	}
	
	private function onUpdate(_deltaTime:Float)
	{
		background.scroll(-StaticSettings.GAME_SPEED * _deltaTime, 0);
		ground.scroll((-StaticSettings.GAME_SPEED * 3) * _deltaTime, 0);
	}
}