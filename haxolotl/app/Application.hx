package haxolotl.app;
import flash.Lib;
import haxolotl.core.Engine;
import js.html.Screen;

/**
 * ...
 * @author Thomas B
 */
class Application
{

	var m_engine : Engine;
	
	public function new() 
	{
		m_engine = new Engine(Lib.current.stage);
	}
	
	public function gotoScreen(screen : Screen)
	{
	}
	
}