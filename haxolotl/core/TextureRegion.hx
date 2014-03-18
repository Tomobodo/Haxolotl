package haxolotl.core;
import flash.display.BitmapData;
import flash.geom.Point;
import flash.geom.Rectangle;
import haxolotl.Haxolotl;

/**
 * ...
 * @author Thomas B
 */
class TextureRegion
{
	public var texture : Texture;
	public var region : Rectangle;
	
	public var bitmapData : BitmapData;
	
	public function new(_texture : Texture, _region : Rectangle = null) 
	{
		texture = _texture;
		if (_region == null)
			_region = new Rectangle(0, 0, 1, 1);
		else
		{
			var ratioX = texture.width;
			var ratioY = texture.height;
			
			if (Haxolotl.current.openglAllowed)
			{
				_region.x /= ratioX;
				_region.y /= ratioY;
				_region.width /= ratioX;
				_region.height /= ratioY;
			}
		}
		
		region = _region;
		
		bitmapData = new BitmapData(cast region.width,cast region.height);
		bitmapData.copyPixels(texture.bitmapData, region, new Point());
	}
}