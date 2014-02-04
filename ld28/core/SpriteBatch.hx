package ld28.core;

import flash.geom.Matrix3D;
import ld28.display.DisplayObject;
import ld28.shaders.SpriteBatchShader;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch implements IDrawable
{
	var texture : Texture;
	
	var first : BatchElement;
	var last : BatchElement;
	
	var vertex : Array<Float>;
	var index : Array<Int>;
	
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
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
		
		stride = dataPerVertex * 4;
		
		vertex = new Array<Float>();
		index = new Array<Int>();
		
		vertexBuffer = GL.createBuffer();
		indexBuffer = GL.createBuffer();
		
		needGeneration = true;
		
		program = new SpriteBatchShader();
		
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
	
	public function add(object : DisplayObject)
	{
		var element = new BatchElement(object);
		
		if (first == null)
		{
			first = element;
			last = element;
		}
		else
		{
			last.next = element;
			element.previous = last;
			last = element;
		}
		
		needGeneration = true;
		nbSprite++;
	}
	
	public function remove(object : DisplayObject)
	{
		var element : BatchElement = findElement(object);
		element.previous.next = element.next;
		element.next.previous = element.previous;
		element.next = null;
		element.previous = null;
		
		needGeneration = true;
		nbSprite--;
	}
	
	public function findElement(object : DisplayObject) : BatchElement
	{
		var element = first;
		while (element != null)
			if (element.object == object)
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
		var current : BatchElement = first;
		var indexes : Array<Int> = [0, 1, 2, 2, 3, 0];
		var i : Int = 0;
		var j : Int = 0;
		var k : Int = 0;
		while (current != null)
		{
			current.update();
			
			// top left
			vertex[i++] = current.x1;
			vertex[i++] = current.y1;
			vertex[i++] = current.u1;
			vertex[i++] = current.v1;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.color.a;
			
			// top right
			vertex[i++] = current.x2;
			vertex[i++] = current.y1;
			vertex[i++] = current.u2;
			vertex[i++] = current.v1;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.color.a;
			
			// bottom right
			vertex[i++] = current.x2;
			vertex[i++] = current.y2;
			vertex[i++] = current.u2;
			vertex[i++] = current.v2;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.color.a;
			
			// bottom left
			vertex[i++] = current.x1;
			vertex[i++] = current.y2;
			vertex[i++] = current.u1;
			vertex[i++] = current.v2;
			vertex[i++] = current.color.r;
			vertex[i++] = current.color.g;
			vertex[i++] = current.color.b;
			vertex[i++] = current.color.a;
			
			for (a in indexes)
				index[j++] = a + k * 4;
			
			k++;
			
			current = current.next;
		}
		
		if (needGeneration)
		{
			needGeneration = false;
			GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
			GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertex), GL.DYNAMIC_DRAW);
			
			GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
			GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Int16Array(index), GL.DYNAMIC_DRAW);
			
		}	
		else
		{
			GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
			GL.bufferSubData(GL.ARRAY_BUFFER, 0, new Float32Array(vertex));
			
			GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
			GL.bufferSubData(GL.ELEMENT_ARRAY_BUFFER, 0, new Int16Array(index));
		}
	}
	
	public function draw()
	{
		initDraw();
		GL.drawElements(GL.TRIANGLES, nbSprite * 6, GL.UNSIGNED_SHORT, 0);
		endDraw();
	}
	
	function initDraw() 
	{
		#if desktop
		GL.enable(GL.TEXTURE_2D);
		#end
		
		program.use();
		
		GL.blendFunc(GL.ONE, GL.ONE_MINUS_SRC_ALPHA);
		GL.enable(GL.BLEND);
		GL.disable(GL.DEPTH_TEST);
		
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