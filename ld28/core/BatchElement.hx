package ld28.core;

import ld28.display.DisplayObject;

/**
 * ...
 * @author Thomas B
 */
class BatchElement
{
	
	public var previous : BatchElement;
	public var next : BatchElement;
	
	public var object : DisplayObject;

	public function new(_object : DisplayObject) 
	{
		object = _object;
	}
	
}