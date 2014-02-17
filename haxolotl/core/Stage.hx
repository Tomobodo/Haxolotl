package haxolotl.core;
import flash.geom.Matrix3D;
import haxolotl.geom.Rectangle;
import haxolotl.display.DisplayObject;
import openfl.gl.GL;
import haxolotl.core.IDrawable;
import haxolotl.core.Engine;
import haxolotl.display.DisplayObjectContainer;
import openfl.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Stage extends DisplayObjectContainer implements IDrawable
{
	var drawableChildren : List<IDrawable>;
	
	var interractiveChildren : List<InteractiveObject>;
	
	var viewport : Rectangle;
	
	var spriteBatch : SpriteBatch;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		super();
		interactive = true;
		stage = this;
		spriteBatch = new SpriteBatch();
		drawableChildren = new List<IDrawable>();
		interractiveChildren = new List<InteractiveObject>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
		spriteBatch.setProjectionMatrix(projectionMatrix);
		baseWidth = _viewport.width;
		baseHeight = _viewport.height;
	}
	
	public function draw():Void 
	{
		spriteBatch.start();
		spriteBatch.render(this);
		spriteBatch.end();
	}
	
	override public function update()
	{
		for (child in children)
			child.update();
		super.update();
	}
	
	override public function add(_child : DisplayObject)
	{
		super.add(_child);
		if (_child.interactive)
			interractiveChildren.push(_child);
	}
	
	override public function remove(_child : DisplayObject)
	{
		super.remove(_child);
		interractiveChildren.remove(_child);
	}
	
	override public function pressed(_x : Float, _y : Float)
	{
		super.pressed(_x, _y);
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				a.pressed(_x, _y);
				break;
			}
		}
	}
	
	override public function released(_x : Float, _y : Float)
	{
		super.released(_x, _y);
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				a.released(_x, _y);
				break;
			}
		}
	}
	
	override public function hovered(_x : Float, _y : Float)
	{
		super.hovered(_x, _y);
		var firstHovered : Bool = false;
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				if(!firstHovered)
					a.hovered(_x, _y);
				else
					a.leaved(_x, _y);
			}
		}
	}
	
	override public function get_width() : Float
	{
		return baseWidth;
	}
	
	override public function get_height() : Float
	{
		return baseHeight;
	}
	
	/* INTERFACE haxolotl.core.IDrawable */
	
	public function setProjectionMatrix(projection:Matrix3D):Void 
	{
		
	}
}