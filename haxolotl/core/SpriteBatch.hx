package haxolotl.core;

import flash.geom.Matrix;
import flash.geom.Matrix3D;
import haxolotl.geom.Rectangle;
import haxolotl.display.DisplayObject;
import haxolotl.shaders.SpriteBatchShader;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch
{
	var texture : Texture;
	
	var vertex : Float32Array;
	var index : Int16Array;
	
	var vertexBuffer : GLBuffer;
	var indexBuffer : GLBuffer;
	
	var viewportUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	
	var vertexPosAttribute : Int;
	var texCoordAttribute : Int;
	var colorAttribute : Int;
	
	var program : Program;
	var viewport : Rectangle;
	
	var needGeneration : Bool;
	
	var dataPerVertex : Int = 6;
	var stride : Int;
	
	var nbSprite : Int = 0;
	
	// update loop var
	var x1 : Float;
	var x2 : Float;
	var y1 : Float;
	var y2 : Float;
		
	var u1 : Float;
	var u2 : Float;
	var v1 : Float;
	var v2 : Float;
	
	var color : Float;
	var alpha : Float;
	
	// vertex data index
	var vdi : Int;
	
	var t : Matrix;
	
	public var empty : Bool;
	
	// maximum sprite number for a single draw call (max 16383 : 0xffff / 4)
	private static inline var MAX_SPRITE : Int = 2500;
	
	var tRegion : Rectangle;
	var indexes:Array<Int>;
	var nbDrawCall : Int;
	var vertexOffset : Int;
	
	public function new() 
	{
		stride = dataPerVertex * 4;
		
		vertexBuffer = GL.createBuffer();
		indexBuffer = GL.createBuffer();
		
		program = new SpriteBatchShader();
		
		vertex = new Float32Array(dataPerVertex * 4 * MAX_SPRITE);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, vertex, GL.DYNAMIC_DRAW);
		
		index = new Int16Array(MAX_SPRITE * 6);
		vertexOffset = 0;
		indexes = [0, 1, 2, 2, 3, 0];
		
		var j : Int = 0;
		var k : Int = 0;
		
		// Fill the index buffer as it never need to change
		for (i in 0 ... MAX_SPRITE)
		{
			for (a in indexes)
				index[j++] = a + k * 4;
			k++;
		}
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, index, GL.STATIC_DRAW);
		
		empty = true;
		
		program.use();
		
		initUniforms();
		initAttributes();
	}
	
	function initUniforms() 
	{
		viewportUniform = GL.getUniformLocation(program.program, "viewport");
		textureUniform = GL.getUniformLocation(program.program, "uImage0");
	}
	
	function initAttributes()
	{
		vertexPosAttribute = GL.getAttribLocation(program.program, "aVertPos");
		texCoordAttribute = GL.getAttribLocation(program.program, "aTexCoord");
		colorAttribute = GL.getAttribLocation(program.program, "aColor");
	}
	
	public function setViewport(_viewport : Rectangle) : Void
	{
		viewport = _viewport;
	}
	
	public function start()
	{
		vdi = 0;
		nbDrawCall = 0;
		tRegion = null;
		
		program.use();
		
		//GL.disable(GL.DEPTH_TEST);
		
		GL.enable(GL.BLEND);
		//GL.blendFunc(GL.ONE, GL.ONE_MINUS_SRC_ALPHA);
		GL.blendFuncSeparate(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA, GL.ONE, GL.ONE_MINUS_SRC_ALPHA);
		
		GL.uniform1i(textureUniform, 0);
		GL.uniform2f(viewportUniform, viewport.width, viewport.height);
		
		GL.enableVertexAttribArray(vertexPosAttribute);
		GL.enableVertexAttribArray(texCoordAttribute);
		GL.enableVertexAttribArray(colorAttribute);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		
		GL.vertexAttribPointer(vertexPosAttribute, 2, GL.FLOAT, false, stride, 0);
		GL.vertexAttribPointer(texCoordAttribute, 2, GL.FLOAT, false, stride, 2 * 4);
		GL.vertexAttribPointer(colorAttribute, 2, GL.FLOAT, false, stride, 4 * 4);
	}
	
	private function flush()
	{
		// bind texture and buffer
		GL.bufferData(GL.ARRAY_BUFFER, vertex, GL.DYNAMIC_DRAW);
		
		if (texture != null)
		{
			GL.bindTexture(GL.TEXTURE_2D, texture.texture);
			GL.activeTexture(GL.TEXTURE0);
		}
		else 
		{
			GL.bindTexture(GL.TEXTURE_2D, null);
			GL.activeTexture(GL.TEXTURE0);
		}
		
		// draw
		GL.drawElements(GL.TRIANGLES, nbSprite * 6, GL.UNSIGNED_SHORT, 0);
		
		nbDrawCall++;
		
		nbSprite = 0;
		vdi = 0;
	}
	
	public function end()
	{
		flush();
		
		program.release();
		
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		GL.bindTexture(GL.TEXTURE_2D, null);
		
		GL.disable(GL.BLEND);
		
		GL.disableVertexAttribArray(vertexPosAttribute);
		GL.disableVertexAttribArray(texCoordAttribute);
		GL.disableVertexAttribArray(colorAttribute);
	}
	
	public function render(object : DisplayObject)
	{
		if (object.texture != null)
		{
			if (object.texture.texture != texture)
			{
				// don't need to flush if there is nothing to draw
				if(vdi!=0)flush();
				texture = object.texture.texture;
			}
			
			nbSprite++;
			
			t = object.transform;
			
			x1 = 0;
			x2 = object.baseWidth;
			y1 = 0;
			y2 = object.baseHeight;
				
			u1 = 0.0;
			v1 = 0.0;
			u2 = 1.0;
			v2 = 1.0;
			
			color = object.color;
			alpha = object.alpha;
			
			if(object.texture != null)
				tRegion = object.texture.region;
			
			if (tRegion != null)
			{
				u1 = tRegion.x;
				v1 = tRegion.y;
				u2 = tRegion.x + tRegion.width;
				v2 = tRegion.y + tRegion.height;
			}
			
			// top left
			vertex[vdi++] = x1 * t.a + y1 * t.c + t.tx;
			vertex[vdi++] = x1 * t.b + y1 * t.d + t.ty;
			vertex[vdi++] = u1;
			vertex[vdi++] = v1;
			vertex[vdi++] = alpha;
			vertex[vdi++] = color;
			
			// top right
			vertex[vdi++] = x2 * t.a + y1 * t.c + t.tx;
			vertex[vdi++] = x2 * t.b + y1 * t.d + t.ty;
			vertex[vdi++] = u2;
			vertex[vdi++] = v1;
			vertex[vdi++] = alpha;
			vertex[vdi++] = color;
			
			// bottom right
			vertex[vdi++] = x2 * t.a + y2 * t.c + t.tx;
			vertex[vdi++] = x2 * t.b + y2 * t.d + t.ty;
			vertex[vdi++] = u2;
			vertex[vdi++] = v2;
			vertex[vdi++] = alpha;
			vertex[vdi++] = color;
			
			// bottom left
			vertex[vdi++] = x1 * t.a + y2 * t.c + t.tx;
			vertex[vdi++] = x1 * t.b + y2 * t.d + t.ty;
			vertex[vdi++] = u1;
			vertex[vdi++] = v2;
			vertex[vdi++] = alpha;
			vertex[vdi++] = color;
			
			if (nbSprite >= MAX_SPRITE) flush();
		}
		
		if (object.children != null && object.children.length > 0)
			for (child in object.children)
				render(child);
	}
}