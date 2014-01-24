package ld28.display;
import flash.geom.Matrix;
import flash.geom.Rectangle;
import ld28.mesh.Plane2D;
import ld28.core.IDrawable;
import ld28.Mesh;
import ld28.Scene;
import ld28.ShaderManager;
import ld28.core.Program;
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
	var texture : Texture;
	
	var texCoordAttr : Int;
	
	var imageUniform : GLUniformLocation;
	var texCoordMatrixUniform : GLUniformLocation;
	
	var texCoordtransform : Float32Array;
	
	var textureRegion : Rectangle;
	
	public function new(_texture : Texture, region : Rectangle = null) 
	{
		texture = _texture;
		
		if (region == null)
			region = new Rectangle(0, 0, texture.width, texture.height);
		textureRegion = region;
		
		texCoordtransform = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
		setTextureRegion(textureRegion);
		
		super(new Plane2D(region.width, region.height), ShaderManager.get().program(SpriteBatch2DShader));
	}
	
	public function setTextureRegion(region : Rectangle) : Void
	{
		textureRegion = region;
		
		texCoordtransform[0] = region.width / texture.width;
		texCoordtransform[2] = region.x / texture.width;
		texCoordtransform[4] = region.height / texture.height;
		texCoordtransform[5] = region.y / texture.height;
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
	
	public function getTextureMatrix() : Float32Array
	{
		setTextureRegion(textureRegion);
		return texCoordtransform;
	}
	
	override function initRender(scene : Scene)
	{
		super.initRender(scene);
		
		GL.enableVertexAttribArray(texCoordAttr);
		
		GL.uniform1i(imageUniform, 0);
		GL.uniformMatrix3fv(texCoordMatrixUniform, false, texCoordtransform);
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
	}
	
}