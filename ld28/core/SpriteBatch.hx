package ld28.core;

import flash.geom.Matrix3D;
import ld28.display.DisplayObject;
import ld28.shaders.SpriteBatch2DShader;
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
	
	var vertex : Float32Array;
	var index : Int16Array;
	
	var vertexBuffer : GLBuffer;
	var indexBuffer : GLBuffer;
	
	var projectionUniform : GLUniformLocation;
	
	var program : Program;
	var projectionMatrix:Matrix3D;
	
	public function new(_texture : Texture) 
	{
		texture = _texture;
		
		vertex = new Float32Array([]);
		index = new Int16Array([]);
		
		vertexBuffer = GL.createBuffer();
		indexBuffer = GL.createBuffer();
		
		program = new SpriteBatch2DShader();
		
		program.use();
		
		initUniform();
	}
	
	function initUniform() 
	{
		projectionUniform = GL.getUniformLocation(program.program, "projectionMatrix");
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
	}
	
	public function remove(object : DisplayObject)
	{
		var element : BatchElement = findElement(object);
		element.previous.next = element.next;
		element.next.previous = element.previous;
		element.next = null;
		element.previous = null;
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
		
	}
	
	public function draw()
	{
		initDraw();
		
		endDraw();
	}
	
	function initDraw() 
	{
		program.use();
		
		GL.uniformMatrix3D(projectionUniform, false, projectionMatrix);
		
		//GL.vertexAttribPointer(
	}
	
	function endDraw() 
	{
		program.release();
	}
}