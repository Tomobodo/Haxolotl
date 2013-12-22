package ld28;

import ld28.d3.meshes.Plane;
import ld28.Model;
import ld28.Texture;
import flash.geom.Rectangle;

/**
 * ...
 * @author Thomas B
 */
class Pawn extends Model
{

	public var color : Int;
	
	public var checked : Bool = false;
	
	private var boudingBox : Rectangle;
	
	static var plane : Plane;
	
	public function new(_color : Int) 
	{
		color = _color;
		if (plane == null)
			plane = new Plane(48, 48);
		super(plane, Texture.get("img/pawn" + _color + ".png"));
		
		boudingBox = new Rectangle(0, 0, 48, 48);
		
		pivotPoint.x = 24;
		pivotPoint.y = 24;
	}
	
	public function getBoundingBox() : Rectangle
	{
		boudingBox.x = position.x;
		boudingBox.y = position.y;
		return boudingBox;
	}
	
}