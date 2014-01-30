package ld28;
import flash.display.Stage;
import flash.events.MouseEvent;
import flash.geom.Matrix3D;
import flash.geom.Point;
import flash.geom.Vector3D;
import ld28.display.DisplayObject;

/**
 * ...
 * @author Thomas B
 */
class EventManager
{
	var stage : Stage;
	var scene : Scene;
	
	var inputPoint : Vector3D;
	
	var inputDown : Bool;
	var inputUp : Bool;
	
	public function new(_stage : Stage, _scene : Scene) 
	{
		stage = _stage;
		scene = _scene;
		
		inputPoint = new Vector3D(0, 0, 0);
		
		stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
	}
	
	private function onMouseMove(e:MouseEvent):Void 
	{
		inputPoint.x = e.stageX;
		inputPoint.y = e.stageY;
		
		trace(inputPoint);
	}
	
	public function checkEvent(object : DisplayObject)
	{
		
	}
}