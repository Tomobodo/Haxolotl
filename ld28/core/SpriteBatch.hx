package ld28.core;

import ld28.display.DisplayObject;
/**
 * ...
 * @author Thomas B
 */
class SpriteBatch implements IDrawable
{
	var texture : Texture;
	
	var first : BatchElement;
	var last : BatchElement;
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
	}
	
	public function add(object : DisplayObject)
	{
		var element = new BatchElement(object);
		if (first == null)
		{
			first = element;
			last = element;
		}
		else
		{
			last.next = element;
			element.previous = last;
			last = element;
		}
	}
	
	public function remove(object : DisplayObject)
	{
		var element : BatchElement = findElement(object);
		element.previous.next = element.next;
		element.next.previous = element.previous;
		element.next = null;
		element.previous = null;
	}
	
	public function findElement(object : DisplayObject) : BatchElement
	{
		var element = first;
		while (element)
			if (element.object == object)
				return element;
			else
				element = element.next;
	}
	
	
}