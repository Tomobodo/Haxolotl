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
	
	public var enabled(default, set_enabled) : Bool;

	public function new() 
	{
		enabled = false;
	}
	
	public function addedToStage(_stage : Stage) : Void
	{
		stage = _stage;
	}
	
	public function removedFromStage(_stage : Stage) : Void
	{
		stage = null;
	}
	
	function set_enabled(value : Bool) : Bool
	{
		return enabled = value;
	}
}