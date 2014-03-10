package haxolotl.text;

import haxolotl.core.TextureRegion;
import flash.geom.Rectangle;
import haxolotl.core.Texture;

/**
 * ...
 * @author Thomas B
 */
class Glyph
{
	public var id : Int;
	public var x : Int;
	public var y : Int;
	public var width : Int;
	public var height : Int;
	public var xOffset : Int;
	public var yOffset : Int;
	public var xAdvance : Int;
	
	public var region : TextureRegion;
	
	public function new(_id : Int, _x:Int, _y :Int, _width:Int, _height:Int, _xOffset:Int, _yOffset:Int, _xAdvance:Int)
	{
		id = _id;
		x = _x;
		y = _y;
		width = _width;
		height = _height;
		xOffset = _xOffset;
		yOffset = _yOffset;
		xAdvance = _xAdvance;
	}
	
	public function initRegion(texture : Texture)
	{
		var tRegion = new Rectangle(x, y, width, height);
		region = new TextureRegion(texture, tRegion);
	}
	
	public function getRegion() : TextureRegion
	{
		return region;
	}
}