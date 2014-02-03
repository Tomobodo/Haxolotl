package ld28.display;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import ld28.core.TextureRegion;
import ld28.prim.Plane;
import ld28.core.IDrawable;
import ld28.prim.Plane;
import ld28.core.Stage;
import ld28.shaders.ShaderManager;
import ld28.core.Program;
import ld28.shaders.Basic2DTextureShader;
import ld28.shaders.SpriteBatch2DShader;
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
		texture = _texture;
		prim = new Plane();
		
		texCoordtransform = new Matrix3D();
		setTextureRegion(textureRegion);
		
		super(new Plane2D(region.width, region.height), ShaderManager.get().program(Basic2DTextureShader));
	}
	
	public function setTextureRegion(region : Rectangle) : Void
	{
		textureRegion = region;
		
		texCoordtransform.rawData[0] = region.width / texture.width;
		texCoordtransform.rawData[12] = region.x / texture.width;
		texCoordtransform.rawData[5] = region.height / texture.height;
		texCoordtransform.rawData[13] = region.y / texture.height;
	}
	
	override function initAttributes() 
	{
		super.initAttributes();
		texCoordAttr = GL.getAttribLocation(program.program, "aTexCoord");
	}
	
	override function initUniforms() 
	{
		super.initUniforms();
		imageUniform = GL.getUniformLocation(program.program, "uImage0");
		texCoordMatrixUniform = GL.getUniformLocation(program.program, "texCoordMatrix");
	}
	
	public function getTextureMatrix() : Matrix3D
	{
		setTextureRegion(textureRegion);
		return texCoordtransform;
	}
	
	override function initRender(scene : Scene)
	{
		super.initRender(scene);
		
		GL.enableVertexAttribArray(texCoordAttr);
		
		GL.uniformMatrix3D(texCoordMatrixUniform, false, texCoordtransform);
		GL.uniform1i(imageUniform, 0);
		
		#if desktop
		GL.enable(GL.TEXTURE_2D);
		#end
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
	}
	
	override function endDraw() : Void
	{
		super.endDraw();
		
		#if desktop
		GL.disable(GL.TEXTURE_2D);
		#end
	}
	
}