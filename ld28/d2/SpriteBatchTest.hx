package ld28.d2;

import flash.geom.Matrix3D;
import ld28.Mesh;
import ld28.Model;
import ld28.Quad;
import flash.Lib;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.utils.Float32Array;
import openfl.utils.Int16Array;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatchTest extends Mesh
{
	var children : Array<Model>;
	var needGenerate : Bool;
	
	public function new() 
	{
		super();
		
		needGenerate = true;
		
		children = new Array<Model>();
	}
	
	public function add(child : Model) : Void
	{
		children.push(child);
		needGenerate = true;
	}
	
	public function remove(child : Model) : Void
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
			var matrix = child.getModelMatrix();
			
			child.updateMatrix();
			
			transformVertices(lastVertexIndex, mesh.vertices, matrix);
			
			lastVertexIndex += mesh.vertices.length;
		}
		
		updateVertexBuffer();
	}
	
	function transformVertices(startIndex : Int, _vertices : Float32Array, matrix : Matrix3D)
	{
		var nbVertex : Int = cast _vertices.length / 3;
		for (i in 0 ... nbVertex)
		{
			var x = _vertices[i * 3];
			var y = _vertices[i * 3 + 1];
			
			var newX = x * matrix.rawData[0] + y * matrix.rawData[4] + matrix.rawData[12];
			var newY = x * matrix.rawData[1] + y * matrix.rawData[5] + matrix.rawData[13];
			
			vertices[startIndex + i * 3] = newX;
			vertices[startIndex + i * 3 + 1] = newY;
			vertices[startIndex + i * 3 + 2] = 0;
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
			
			var index = new Array<Int>();
			
			for (meshIndex in meshIndexes)
				index.push(meshIndex + lastIndexPos);
			
			lastIndexPos += cast meshVertices.length / 3;
			
			tempIndex = tempIndex.concat(index);
			
			for (i in 0 ... meshVertices.length)
				tempsVert.push(meshVertices[i]);
			
			var quadCoord : Array<Float> = [
				0, 0,
				1, 0,
				1, 1,
				0, 1
			];
			
			tempCoord = tempCoord.concat(quadCoord);
		}
		
		vertices = new Float32Array(tempsVert);
		texCoord = new Float32Array(tempCoord);
		indexes = new Int16Array(tempIndex);
		
		genVertexBuffer();
		genTexCoordBuffer();
		genIndexBuffer();
	}
}