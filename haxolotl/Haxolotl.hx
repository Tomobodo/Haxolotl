package haxolotl;
import flash.display.Stage;
import flash.events.Event;
import flash.events.FocusEvent;
import flash.Lib;
import haxolotl.core.render.CanvasRenderer;
import haxolotl.core.render.GLRenderer;
import haxolotl.core.render.Renderer;
import haxolotl.app.Screen;
import haxolotl.core.ScaleMode;
import openfl.display.OpenGLView;

/**
 * ...
 * @author Thomas B
 */
class Haxolotl
{
	var m_renderer : Renderer;
	var m_stage : Stage;
	var m_lastTime : Int;
	
	var m_screen : Screen;
	var m_focused : Bool;
	
	public var updateTime : Float;
	public var renderTime : Float;
	public var multiThreaded : Bool;
	public var scaleMode : ScaleMode;
	public var openglAllowed : Bool;
	
	public var width : UInt;
	public var height : UInt;
	
	public static var current : Haxolotl;
	
	public function new(_width : UInt, _height : UInt) 
	{
		current = this;
		
		m_stage = Lib.current.stage;
		width = _width;
		height = _height;
		
		if (OpenGLView.isSupported)
		{
			trace("Opengl Renderer");
			openglAllowed = true;
			m_renderer = new GLRenderer(m_stage);
		}
		else
		{
			trace("Canvas Renderer");
			openglAllowed = false;
			m_renderer = new CanvasRenderer(m_stage);
		}
		
		scaleMode = Scale;
		
		m_renderer.scaleMode = Scale;
			
		m_renderer.start();
		
		m_lastTime = 0;
		
		updateTime = 0;
		renderTime = 0;
		
		m_focused = true;
		
		multiThreaded = false;
		
		m_stage.addEventListener(Event.ENTER_FRAME, update);
		
		m_stage.addEventListener(Event.DEACTIVATE, onDeactivate);
		m_stage.addEventListener(Event.ACTIVATE, onActivate);
		m_stage.addEventListener(FocusEvent.FOCUS_IN, onActivate);
		m_stage.addEventListener(FocusEvent.FOCUS_OUT, onDeactivate);
	}
	
	private function onActivate(e:FocusEvent):Void 
	{
		trace("activated");
		m_renderer.start();
		m_focused = true;
		m_lastTime = Lib.getTimer();
	}
	
	private function onDeactivate(e:FocusEvent):Void 
	{
		trace("deactivated");
		m_renderer.stop();
		m_focused = false;
	}
	
	public function gotoScreen(screen : Screen)
	{
		if (m_screen != null)
			m_screen.__removed();
		m_screen = screen;
		m_screen.__added(m_renderer);
	}
	
	function update(e : Event)
	{
		if (m_focused)
		{
			var deltaTime : Float = (Lib.getTimer() - m_lastTime) / 1000;
			updateTime = deltaTime;
			m_lastTime = Lib.getTimer();
			if(m_screen != null)
				m_screen.update(deltaTime);
		}
	}
}