package ld28.core;
import flash.events.FocusEvent;
import msignal.Signal;

/**
 * ...
 * @author Thomas B
 */
class InteractiveObject
{
	private var stage : Stage;
	
	// signal addedToScene;
	// signal removedFromScene;
	
	// signal enterFrame;
	
	public var ENTER_FRAME : Signal0; 

	public function new() 
	{
		ENTER_FRAME = new Signal0();
	}
	
	public function addedToStage(_stage : Stage) : Void
	{
		stage = _stage;
		// dispatch signal addedToScene(scene);
	}
	
	public function removedFromStage(_stage : Stage) : Void
	{
		stage = null;
		// dispatch signal removedFromScene(scene);
	}
	
	public function enteredFrame() : Void
	{
		ENTER_FRAME.dispatch();
	}
}