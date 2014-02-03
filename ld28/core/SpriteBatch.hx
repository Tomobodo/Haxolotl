package ld28.core;

import flash.geom.Matrix3D;
import ld28.display.DisplayObject;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch implements IDrawable
{
	var texture : Texture;
	
	var first : BatchElement;
	var last : BatchElement;
	
	var vertexBuffer : Float32Array;
	var indexBuffer : Int16Array;
	
	var program : Program;
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
		
		vertexBuffer = new Float32Array([]);
		indexBuffer = new Int16Array([]);
		indexBuffer[5] = 5;
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
		while (element != null)
			if (element.object == object)
				return element;
			else
				element = element.next;
		return null;
	}
	
	public function setProjectionMatrix(projection : Matrix3D) : Void
	{
		
	}
	
	public function update()
	{
		trace(indexBuffer[5]);
	}
	
	public function draw()
	{
		
	}
}