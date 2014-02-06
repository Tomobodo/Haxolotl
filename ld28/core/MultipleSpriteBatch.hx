package ld28.core;
import ld28.display.DisplayObject;
import flash.geom.Matrix3D;

/**
 * ...
 * @author Thomas B
 */
class MultipleSpriteBatch implements IDrawable
{
	
	public var texture : Texture;

	var first : SpriteBatch;
	var last : SpriteBatch;
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
		
		var e = new SpriteBatch(texture);
		
		first = e;
		last = e;
	}
	
	public function setProjectionMatrix(projection:Matrix3D):Void 
	{
		var e = first;
		while (e != null)
		{
			e.setProjectionMatrix(projection);
			e = e.next;
		}
	}
	
	public function update():Void 
	{
		var e = first;
		while (e != null)
		{
			e.update();
			e = e.next;
		}
	}
	
	public function draw():Void 
	{
		var e = first;
		while (e != null)
		{
			e.draw();
			e = e.next;
		}
	}
	
	public function add(object : DisplayObject)
	{
		if (!last.full)
			last.add(object);
		else
		{
			var e = new SpriteBatch(texture);
			e.prev = last;
			last.next = e;
			last = e;
			e.add(object);
		}
	}
	
	public function remove(object : DisplayObject)
	{
		var e = first;
		var found : DisplayObject = null;
		while (e != null && found == null)
		{
			found = e.findObject(object);
			e = e.next;
		}
		
		if (found != null)
			e.remove(found);
	}
	
}