package ld28.display;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import ld28.core.Primitive;
import ld28.core.TextureRegion;
import ld28.prim.Plane;
import ld28.core.IDrawable;
import ld28.prim.Plane;
import ld28.core.Stage;
import ld28.shaders.ShaderManager;
import ld28.core.Program;
import ld28.shaders.Basic2DTextureShader;
import ld28.core.Texture;

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
		width = texture.region.width * texture.texture.width;
		height = texture.region.height * texture.texture.height;
		prim = Primitive.getPlane();
	}
}