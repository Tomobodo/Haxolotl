package haxolotl.display;
import haxolotl.core.Primitive;
import haxolotl.core.TextureRegion;


/**
 * ...
 * @author Thomas B
 */
class Image extends DisplayObject
{
	public function new(_texture : TextureRegion)
	{
		super();
		
		if(_texture != null)
			changeFrame(_texture);
		prim = Primitive.getPlane();
	}
	
	public function updateFrame(_texture : TextureRegion)
	{
		changeFrame(_texture);
	}
	
	function changeFrame(_texture : TextureRegion):Void 
	{
		texture = _texture;
		baseWidth = texture.region.width * texture.texture.width;
		baseHeight = texture.region.height * texture.texture.height;
	}
}