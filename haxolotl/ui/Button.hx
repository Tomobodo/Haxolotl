package haxolotl.ui;
import flash.display.DisplayObject;
import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.events.TouchEvent;

/**
 * ...
 * @author Thomas B
 */
class Button extends Sprite
{

	var m_upState : DisplayObject;
	var m_overState : DisplayObject;
	var m_downState : DisplayObject;
	
	var m_currentState : DisplayObject;
	
	public var onClick : Dynamic;
	
	public function new(up : DisplayObject, over : DisplayObject = null, down : DisplayObject = null) 
	{
		super();
		m_upState = up;
		
		if (over == null) m_overState = m_upState
		else m_overState = over;
		
		if (down == null && over == null) m_downState = m_upState;
		else if (down == null && over != null) m_downState = m_overState;
		else m_downState = m_upState;
		
		m_currentState = m_upState;
		
		addChild(m_currentState);
		
		addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		addEventListener(TouchEvent.TOUCH_BEGIN, onTouchDown);
		addEventListener(MouseEvent.MOUSE_UP, onMouseUp);	
	}
	
	private function onMouseDown(e:MouseEvent):Void 
	{
		e.stopPropagation();
		gotoDownState();
		onClick();
	}
	
	private function onTouchDown(e:TouchEvent):Void
	{
		removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		e.stopPropagation();
		gotoDownState();
		onClick();
	}
	
	private function onMouseUp(e:MouseEvent):Void 
	{
		gotoupState();
	}
	
	function gotoDownState():Void 
	{
		removeChild(m_currentState);
		m_currentState = m_downState;
		addChild(m_currentState);
	}
	
	function gotoupState():Void 
	{
		removeChild(m_currentState);
		m_currentState = m_upState;
		addChild(m_currentState);
	}
}