package haxolotl.app;
import haxolotl.core.Scene;

/**
 * ...
 * @author Thomas B
 */
class Screen
{
	public var scenes : Array<Scene>;

	public function new() 
	{
		scenes = new Array<Scene>();
	}
	
	public function add(scene : Scene)
	{
		scenes.push(scene);
	}
	
	public function remove(scene : Scene)
	{
		scenes.remove(scene);
	}
}