package ld28.core;

import flash.geom.Matrix;
import flash.geom.Matrix3D;
import flash.Vector.Vector;
import ld28.display.Image;
import ld28.core.Mesh;
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
			
			var m : Matrix3D = child.getTransform();
			
			transformVertices(lastVertexIndex, mesh.vertices, m.rawData);
			transformCoord(lastVertexIndex, mesh.texCoord, child.getTextureMatrix().rawData);
			
			lastVertexIndex += mesh.vertices.length;
		}
		
		updateVertexBuffer();
		updateTexCoordBuffer();
	}
	
	function transformVertices(startIndex : Int, _vertices : Float32Array, m : Vector<Float>)
	{
		var nbVertex : Int = cast _vertices.length / 2;
		for (i in 0 ... nbVertex)
		{
			var x = _vertices[i * 2];
			var y = _vertices[i * 2 + 1];
			
			var newX = x * m[0] + y * m[4] + m[12];
			var newY = x * m[1] + y * m[5] + m[13];
			
			vertices[startIndex + i * 2] = newX;
			vertices[startIndex + i * 2 + 1] = newY;
		}
	}
	
	function transformCoord(startIndex : Int, _coords : Float32Array, matrix : Vector<Float>)
	{
		var nbCoord : Int = cast _coords.length / 2;
		for (i in 0 ... nbCoord)
		{
			var x = _coords[i * 2];
			var y = _coords[i * 2 + 1];
			
			var newX = x * matrix[0] + y * matrix[4] + matrix[12];
			var newY = x * matrix[1] + y * matrix[5] + matrix[13];
			
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
			
			var tTrans : Matrix3D = child.getTextureMatrix();
			
			for (i in 0 ... cast meshCoord.length / 2)
			{
				var x = meshCoord[i * 2];
				var y = meshCoord[i * 2 + 1];
				
				tempCoord.push(x * tTrans.rawData[0] + y * tTrans.rawData[4] + tTrans.rawData[12]);
				tempCoord.push(x * tTrans.rawData[1] + y * tTrans.rawData[5] + tTrans.rawData[13]);
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