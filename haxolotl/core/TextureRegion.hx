package haxolotl.core;
import flash.geom.Rectangle;

/**
 * ...
 * @author Thomas B
 */
class TextureRegion
{

	public var texture : Texture;
	public var region : Rectangle;
	
	public function new(_texture : Texture, _region : Rectangle = null) 
	{
		texture = _texture;
		if (_region == null)
			_region = new Rectangle(0, 0, 1, 1);
		else
		{
			var ratioX = texture.width;
			var ratioY = texture.height;
			
			_region.x /= ratioX;
			_region.y /= ratioY;
			_region.width /= ratioX;
			_region.height /= ratioY;
		}
		region = _region;
	}
	
}