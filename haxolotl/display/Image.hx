package haxolotl.display;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import haxolotl.core.Primitive;
import haxolotl.core.TextureRegion;
import haxolotl.prim.Plane;
import haxolotl.core.IDrawable;
import haxolotl.prim.Plane;
import haxolotl.core.Stage;
import haxolotl.shaders.ShaderManager;
import haxolotl.core.Program;
import haxolotl.core.Texture;

import openfl.gl.GL;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;

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