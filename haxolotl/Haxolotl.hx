package haxolotl;
import flash.display.Stage;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.app.Screen;

/**
 * ...
 * @author Thomas B
 */
class Haxolotl
{

	var m_engine : Engine;
	var m_stage : Stage;
	var m_lastTime : Int;
	
	var m_screen : Screen;
	
	public static var current : Haxolotl;
	
	public function new() 
	{
		current = this;
		
		m_stage = Lib.current.stage;
		m_engine = new Engine(m_stage);
		
		m_lastTime = 0;
		
		m_stage.addEventListener(Event.ENTER_FRAME, update);
	}
	
	public function gotoScreen(screen : Screen)
	{
		if (m_screen != null)
			m_screen.__removed();
		m_screen = screen;
		m_screen.__added(m_engine);
	}
	
	function update(e : Event = null)
	{
		var deltaTime : Float = (Lib.getTimer() - m_lastTime) / 1000;
		m_lastTime = Lib.getTimer();
		m_screen.__updated(deltaTime);
	}
	
}