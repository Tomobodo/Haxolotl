package haxolotl.core;
import flash.display.Stage;
import flash.events.MouseEvent;
import flash.events.TouchEvent;

/**
 * ...
 * @author Thomas B
 */
class EventHandler
{
	
	var touchX : Float;
	var touchY : Float;
	
	var scenes : List<haxolotl.core.Scene>;
	
	var m_stage : Stage;

	public function new(_stage : flash.display.Stage, _stages : List<haxolotl.core.Scene>) 
	{
		m_stage = _stage;
		
		#if mobile
			_stage.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
			_stage.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
			_stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
		#else
			_stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			_stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
			_stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
		#end
		
		scenes = _stages;
	}
	
	
	private function onMouseMove(e:MouseEvent):Void 
	{
		moved(e.localX, e.localY);
	}
	
	private function onTouchMove(e:TouchEvent):Void 
	{
		moved(e.localX, e.localY);
	}
	
	private function onMouseDown(e:MouseEvent):Void 
	{
		began(e.localX, e.localY);
	}
	
	private function onTouchBegin(e:TouchEvent):Void 
	{
		began(e.localX, e.localY);
	}
	
	private function onMouseUp(e:MouseEvent):Void 
	{
		ended(e.localX, e.localY);
	}
	
	private function onTouchEnd(e:TouchEvent):Void 
	{
		ended(e.localX, e.localY);
	}
	
	///////////////////////////////////////////////
	
	private function moved(x : Float, y : Float) : Void
	{
		x = convertX(x);
		y = convertY(y);
		setTouchPos(x, y);
		for (a in scenes) a.hovered(x, y);
	}
	
	private function began(x : Float, y : Float) : Void
	{
		x = convertX(x);
		y = convertY(y);
		setTouchPos(x, y);
		for (a in scenes) a.pressed(x, y);
	}
	
	private function ended(x : Float, y : Float) : Void
	{
		x = convertX(x);
		y = convertY(y);
		setTouchPos(x,y);
		for (a in scenes)a.released(x,y);
	}
	
	function setTouchPos(x : Float, y : Float):Void 
	{
		touchX = x;
		touchY = y;
	}
	
	/////////
	function convertX(x : Float):Float
	{
		if(scenes.first() != null)
			return x / (m_stage.stageWidth / scenes.first().baseWidth);
		else
			return x;
	}
	
	function convertY(y : Float):Float
	{
		if(scenes.first() != null)
			return y / (m_stage.stageHeight / scenes.first().baseHeight);
		else
			return y;
	}
	
}