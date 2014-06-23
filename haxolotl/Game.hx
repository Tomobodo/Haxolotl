package haxolotl;
import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;

/**
 * ...
 * @author Thomas B
 */
class Game extends Sprite
{

	var m_currentScreen : Screen;
	var m_lastTime : UInt;
	
	var m_pastScreen : List<Screen>;
	
	public static var instance : Game;
	
	public function new() 
	{
		super();
		
		m_pastScreen = new List<Screen>();
		
		Lib.current.stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
		
		m_lastTime = Lib.getTimer();
		instance = this;
	}
	
	public function gotoScreen(screen : Screen)
	{
		if (m_currentScreen != null)
		{
			m_currentScreen.stop();
			removeChild(m_currentScreen);
		}
		
		m_currentScreen = screen;
		addChild(screen);
		m_currentScreen.start();
	}
	
	public function pushScreen(screen : Screen)
	{
		m_pastScreen.push(m_currentScreen);
		gotoScreen(screen);
	}
	
	public function popScreen()
	{
		var screen = m_pastScreen.pop();
		gotoScreen(screen);
	}
	
	function onEnterFrame(e:Event):Void 
	{
		var time : UInt = Lib.getTimer();
		var delta : Float = (time - m_lastTime) / 1000;
		m_lastTime = time;
		
		if (m_currentScreen != null)
			m_currentScreen.update(delta);
	}
	
}