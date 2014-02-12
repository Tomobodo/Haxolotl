package haxolotl.core;

import flash.geom.Matrix;
import flash.geom.Matrix3D;
import haxolotl.display.DisplayObject;
import haxolotl.shaders.SpriteBatchShader;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;
import openfl.utils.Int32Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch implements IDrawable
{
	var texture : Texture;
	
	var first : DisplayObject;
	var last : DisplayObject;
	
	var vertex : Float32Array;
	var index : Int16Array;
	
	var vertexBuffer : GLBuffer;
	var indexBuffer : GLBuffer;
	
	var projectionUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	
	var vertexPosAttribute : Int;
	var texCoordAttribute : Int;
	var colorAttribute : Int;
	
	var program : Program;
	var projectionMatrix:Matrix3D;
	
	var needGeneration : Bool;
	
	var dataPerVertex : Int = 8;
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
	
	var current:DisplayObject;
	
	var mat : Matrix;
	
	var i:Int;
	var j:Int;
	var k:Int;
	
	var t : Matrix;
	
	public var next : SpriteBatch;
	public var prev : SpriteBatch;
	
	public var full : Bool;
	public var empty : Bool;
	
	private static inline var MAX_SPRITE : Int = 16383;
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
		
		stride = dataPerVertex * 4;
		
		vertexBuffer = GL.createBuffer();
		indexBuffer = GL.createBuffer();
		
		program = new SpriteBatchShader();
		
		vertex = new Float32Array(dataPerVertex * 4 * MAX_SPRITE);
		index = new Int16Array(MAX_SPRITE * 6);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, vertex, GL.DYNAMIC_DRAW);
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, index, GL.DYNAMIC_DRAW);
		
		full = false;
		empty = true;
		
		program.use();
		
		initUniforms();
		initAttributes();
	}
	
	function initUniforms() 
	{
		projectionUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		textureUniform = GL.getUniformLocation(program.program, "uImage0");
	}
	
	function initAttributes()
	{
		vertexPosAttribute = GL.getAttribLocation(program.program, "aVertPos");
		texCoordAttribute = GL.getAttribLocation(program.program, "aTexCoord");
		colorAttribute = GL.getAttribLocation(program.program, "aColor");
	}
	
	public function add(object : DisplayObject) : Bool
	{
		if (nbSprite < MAX_SPRITE)
		{
			if (first == null)
			{
				first = object;
				last = object;
			}
			else
			{
				last.next = object;
				object.prev = last;
				last = object;
			}
			
			nbSprite++;
			empty = false;
			return true;
		}
		full = true;
		return false;
	}
	
	public function remove(object : DisplayObject)
	{
		var element : DisplayObject = findObject(object);
	
		if(element != first)
			element.prev.next = element.next;
		else
			first = element.next;
			
		if(element != last)
			element.next.prev = element.prev;
		else
			last = element.prev;
		
		element.next = null;
		element.prev = null;
		
		nbSprite--;
		
		if (nbSprite == 0)
			empty = true;
		full = false;
	}
	
	public function findObject(object : DisplayObject) : DisplayObject
	{
		var element = first;
		while (element != null)
			if (element == object)
				return element;
			else
				element = element.next;
		return null;
	}
	
	public function setProjectionMatrix(projection : Matrix3D) : Void
	{
		projectionMatrix = projection;
	}
	
	public function update()
	{
		var indexes : Array<Int> = [0, 1, 2, 2, 3, 0];

		current = first;
		
		i = 0;
		j = 0;
		k = 0;
		
		while (current != null)
		{
			
			t = current.transform;
			
			x1 = 0;
			x2 = current.baseWidth;
			y1 = 0;
			y2 = current.baseHeight;
				
			u1 = 0.0;
			v1 = 0.0;
			u2 = 1.0;
			v2 = 1.0;
			
			var tRegion = current.texture.region;
			
			if (tRegion != null)
			{
				u1 = tRegion.x;
				v1 = tRegion.y;
				u2 = tRegion.x + tRegion.width;
				v2 = tRegion.y + tRegion.height;
			}
			
			// top left
			vertex[i++] = x1 * t.a + y1 * t.c + t.tx; //x1;
			vertex[i++] = x1 * t.b + y1 * t.d + t.ty; //y1;
			vertex[i++] = u1;
			vertex[i++] = v1;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.alpha ;
			
			// top right
			vertex[i++] = x2 * t.a + y1 * t.c + t.tx;//x2;
			vertex[i++] = x2 * t.b + y1 * t.d + t.ty;//y1;
			vertex[i++] = u2;
			vertex[i++] = v1;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.alpha ;
			
			// bottom right
			vertex[i++] = x2 * t.a + y2 * t.c + t.tx;//x2;
			vertex[i++] = x2 * t.b + y2 * t.d + t.ty;//y2;
			vertex[i++] = u2;
			vertex[i++] = v2;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.alpha ;
			
			// bottom left
			vertex[i++] = x1 * t.a + y2 * t.c + t.tx;//x1;
			vertex[i++] = x1 * t.b + y2 * t.d + t.ty;//y2;
			vertex[i++] = u1;
			vertex[i++] = v2;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.alpha ;
			
			for (a in indexes)
				index[j++] = a + k * 4;
			
			k++;
			
			current = current.next;
		}
			
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, 0, vertex);
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		GL.bufferSubData(GL.ELEMENT_ARRAY_BUFFER, 0, index);
	}
	
	public function draw()
	{
		initDraw();
		GL.drawElements(GL.TRIANGLES, nbSprite * 6, GL.UNSIGNED_SHORT, 0);
		endDraw();
	}
	
	function initDraw() 
	{
		update();
		
		#if desktop
		GL.enable(GL.TEXTURE_2D);
		#end
		
		program.use();
		
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		//GL.disable(GL.DEPTH_TEST);
		
		GL.uniformMatrix3D(projectionUniform, false, projectionMatrix);
		GL.uniform1i(textureUniform, 0);
		
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		GL.activeTexture(GL.TEXTURE0);
		
		GL.enableVertexAttribArray(vertexPosAttribute);
		GL.enableVertexAttribArray(texCoordAttribute);
		GL.enableVertexAttribArray(colorAttribute);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
		
		GL.vertexAttribPointer(vertexPosAttribute, 2, GL.FLOAT, false, stride, 0);
		GL.vertexAttribPointer(texCoordAttribute, 2, GL.FLOAT, false, stride, 2 * 4);
		GL.vertexAttribPointer(colorAttribute, 4, GL.FLOAT, false, stride, 4 * 4);
	}
	
	function endDraw() 
	{
		program.release();
		
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		GL.bindTexture(GL.TEXTURE_2D, null);
		
		GL.disable(GL.BLEND);
		
		GL.disableVertexAttribArray(vertexPosAttribute);
		GL.disableVertexAttribArray(texCoordAttribute);
		GL.disableVertexAttribArray(colorAttribute);
		
		#if desktop
		GL.disable(GL.TEXTURE_2D);
		#end
	}
}