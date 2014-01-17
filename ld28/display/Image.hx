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
class Image implements IDrawable
{
	var mesh : Mesh;
	var texture : Texture;
	var program : Program;
	
	var vtxPosAttr : Int;
	var texCoordAttr : Int;
	
	var projectionMatrixUniform : GLUniformLocation;
	
	var imageUniform : GLUniformLocation;
	var texCoordMatrixUniform : GLUniformLocation;
	
	var texCoordtransform : Float32Array;
	
	var transform : Matrix;
	
	var textureRegion : Rectangle;
	
	public var rotation : Float;
	
	public var x : Float;
	public var y : Float;
	
	public var scaleX : Float;
	public var scaleY : Float;
	
	public function new(_texture : Texture, region : Rectangle = null) 
	{
		texture = _texture;
		mesh = new Plane2D(texture.width, texture.height);
		
		rotation = 0;
		
		x = 0;
		y = 0;
		
		scaleX = 1;
		scaleY = 1;
		
		program = ShaderManager.get().program(SpriteBatch2DShader);
		
		GL.useProgram(program.program);
		initAttributes();
		initUniforms();
		
		transform = new Matrix();
		
		if (region == null)
			region = new Rectangle(0, 0, texture.width, texture.height);
		textureRegion = region;
			
		texCoordtransform = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
		setTextureRegion(textureRegion);
	}
	
	public function setTextureRegion(region : Rectangle) : Void
	{
		textureRegion = region;
		
		texCoordtransform[0] = region.width / texture.width;
		texCoordtransform[2] = region.x / texture.width;
		texCoordtransform[4] = region.height / texture.height;
		texCoordtransform[5] = region.y / texture.height;
	}
	
	function initAttributes() 
	{
		vtxPosAttr = GL.getAttribLocation(program.program, "vertexPosition");
		texCoordAttr = GL.getAttribLocation(program.program, "aTexCoord");
	}
	
	function initUniforms() 
	{
		projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");

		imageUniform = GL.getUniformLocation(program.program, "uImage0");
		texCoordMatrixUniform = GL.getUniformLocation(program.program, "texCoordMatrix");
	}
	
	public function getMesh() : Mesh
	{
		return mesh;
	}
	
	public function getTransform() : Matrix
	{
		transform.identity();
		transform.rotate(rotation);
		transform.scale(scaleX, scaleY);
		transform.translate(x, y);
		return transform;
	}
	
	public function getTextureMatrix() : Float32Array
	{
		setTextureRegion(textureRegion);
		return texCoordtransform;
	}
	
	public function draw(scene:Scene):Void 
	{
		program.use();
		
		GL.enableVertexAttribArray(vtxPosAttr);
		GL.enableVertexAttribArray(texCoordAttr);
		
		GL.uniformMatrix3D(projectionMatrixUniform, false, scene.projectionMatrix);
		GL.uniform1i(imageUniform, 0);
		GL.uniformMatrix3fv(texCoordMatrixUniform, false, texCoordtransform);
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 2, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, mesh.getIndexBuffer());
		
		GL.drawElements(GL.TRIANGLES, mesh.indexes.length, GL.UNSIGNED_SHORT, 0);
	}
	
}