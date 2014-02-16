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
		
		texture = _texture;
		baseWidth = texture.region.width * texture.texture.width;
		baseHeight = texture.region.height * texture.texture.height;
		prim = Primitive.getPlane();
	}
}