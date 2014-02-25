package haxolotl;
import flash.display.Stage;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.app.Screen;

#if cpp
import cpp.vm.Thread;
#end

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
		
		#if cpp
		Thread.create(update);
		#else
		m_stage.addEventListener(Event.ENTER_FRAME, update);
		#end
	}
	
	public function gotoScreen(screen : Screen)
	{
		if (m_screen != null)
			m_screen.__removed();
		m_screen = screen;
		m_screen.__added(m_engine);
	}
	
	#if cpp
	function update()
	{
		while(true)
		{
			var deltaTime : Float = (Lib.getTimer() - m_lastTime) / 1000;
			m_lastTime = Lib.getTimer();
			if(m_screen != null)
				m_screen.update(deltaTime);
			
			
			var maxSleep = 1 / 60;
			var minSleep = 0.005;
			var sleepTime = maxSleep;
			if (deltaTime < maxSleep)
				sleepTime = maxSleep - deltaTime;
			else
				sleepTime = 0.005;
			Sys.sleep(sleepTime);
		}
	}
	#else
	function update(e : Event)
	{
		var deltaTime : Float = (Lib.getTimer() - m_lastTime) / 1000;
		m_lastTime = Lib.getTimer();
		if(m_screen != null)
			m_screen.update(deltaTime);
	}
	#end
	
	
}