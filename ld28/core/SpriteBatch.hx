package ld28.core;

import flash.geom.Matrix;
import flash.geom.Matrix3D;
import ld28.display.Image;
import ld28.Mesh;
import ld28.Model;
import flash.Lib;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.ArrayBufferView;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;
import openfl.utils.UInt8Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch extends Mesh
{
	var children : Array<Image>;
	var needGenerate : Bool;
	
	public function new() 
	{
		super();
		
		needGenerate = true;
		
		children = new Array<Image>();
	}
	
	public function add(child : Image) : Void
	{
		children.push(child);
		needGenerate = true;
	}
	
	public function remove(child : Image) : Void
	{
		children.remove(child);
		needGenerate = true;
	}
	
	override public function getBuffer() : GLBuffer
	{		
		if (needGenerate)
		{
			generate();
			needGenerate = false;
		}
		
		update();
	
		vertexDrawMode = GL.STREAM_DRAW;
			
		return super.getBuffer();
	}
	
	public function update() : Void
	{
		var lastVertexIndex = 0;
		for (child in children)
		{
			var mesh = child.getMesh();
			
			transformVertices(lastVertexIndex, mesh.vertices, child.getTransform());
			transformCoord(lastVertexIndex, mesh.texCoord, child.getTextureMatrix());
			
			lastVertexIndex += mesh.vertices.length;
		}
		
		updateVertexBuffer();
		updateTexCoordBuffer();
	}
	
	function transformVertices(startIndex : Int, _vertices : Float32Array, matrix : Matrix)
	{
		var nbVertex : Int = cast _vertices.length / 2;
		for (i in 0 ... nbVertex)
		{
			var x = _vertices[i * 2];
			var y = _vertices[i * 2 + 1];
			
			var newX = x * matrix.a + y * matrix.b + matrix.tx;
			var newY = x * matrix.c + y * matrix.d + matrix.ty;
			
			vertices[startIndex + i * 2] = newX;
			vertices[startIndex + i * 2 + 1] = newY;
		}
	}
	
	function transformCoord(startIndex : Int, _coords : Float32Array, matrix : Float32Array)
	{
		var nbCoord : Int = cast _coords.length / 2;
		for (i in 0 ... nbCoord)
		{
			var x = _coords[i * 2];
			var y = _coords[i * 2 + 1];
			
			var newX = x * matrix[0] + y * matrix[1] + matrix[2];
			var newY = x * matrix[3] + y * matrix[4] + matrix[5];
			
			texCoord[startIndex + i * 2] = newX;
			texCoord[startIndex + i * 2 + 1] = newY;
		}
	}
	
	public function generate() : Void
	{
		var tempsVert = new Array<Float>();
		var tempCoord = new Array<Float>();
		var tempIndex = new Array<Int>();
		
		var lastIndexPos = 0;
		
		for (child in children)
		{
			
			var mesh = child.getMesh();
			var meshIndexes = mesh.indexes;
			var meshVertices = mesh.vertices;
			var meshCoord = mesh.texCoord;
			
			var index = new Array<Int>();
			
			for (meshIndex in meshIndexes)
				index.push(meshIndex + lastIndexPos);
			
			lastIndexPos += cast meshVertices.length / 2;
			
			tempIndex = tempIndex.concat(index);
			
			for (i in 0 ... meshVertices.length)
				tempsVert.push(meshVertices[i]);
			
			var tTrans : Float32Array = child.getTextureMatrix();
			
			for (i in 0 ... cast meshCoord.length / 2)
			{
				var x = meshCoord[i * 2];
				var y = meshCoord[i * 2 + 1];
				
				tempCoord.push(x * tTrans[0] + y * tTrans[1] + tTrans[2]);
				tempCoord.push(x * tTrans[3] + y * tTrans[4] + tTrans[5]);
			}
		}
		
		indexes = new Int16Array(tempIndex);
		vertices = new Float32Array(tempsVert);
		texCoord = new Float32Array(tempCoord);
		
		genVertexBuffer();
		genTexCoordBuffer();
		genIndexBuffer();
	}
}