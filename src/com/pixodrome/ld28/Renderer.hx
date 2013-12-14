package com.pixodrome.ld28;

import com.pixodrome.ld28.Mesh;

import flash.display.BitmapData;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import flash.utils.ByteArray;

import openfl.Assets;
import openfl.gl.GL;

import openfl.gl.GLBuffer;
import openfl.gl.GLProgram;
import openfl.gl.GLShader;
import openfl.gl.GLTexture;
import openfl.gl.GLUniformLocation;
import lime.utils.UInt8Array;

/**
 * ...
 * @author Thomas B
 */
class Renderer
{
	var shaderProgram : GLProgram;
	
	var vertexPosAttribute:Int;
	var texCoordAttribute:Int;

	var imageUniform:GLUniformLocation;
	
	var meshes : Array<Mesh>;
	var vertexBuffer : GLBuffer;
	
	var angle : Float;
	
	var texture:GLTexture;
	
	var bitmapData : BitmapData;
	
	var currentShader : Shader;
	
	static inline var vertexShaderSource = "
		attribute vec3 vertexPosition;
		attribute vec4 vertexColor;
		
		attribute vec2 aTexCoord;
        
		varying vec2 vTexCoord;
			
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
			
		void main(void) {
			vTexCoord = aTexCoord;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
		}
	";
	
	static inline var fragmentShaderSource = "
		precision mediump float;
	
		varying vec2 vTexCoord;
		
		uniform sampler2D uImage0;
                        
        void main(void)
        {
            gl_FragColor = texture2D(uImage0, vTexCoord);
        }
	";

	public function new() 
	{
		meshes = new Array<Mesh>();
		
		bitmapData = Assets.getBitmapData("img/avatar.png");
		createTexture();
		initShaders();
		
		angle = 0;
	}
	
	public function addMesh(mesh : Mesh) : Void
	{
		meshes.push(mesh);
	}
	
	function initShaders()
	{
		var vertexShader = createVertexShader();
		var fragmentShader = createFragmentShader();
		
		shaderProgram = GL.createProgram();
		
		GL.attachShader(shaderProgram, vertexShader);
		GL.attachShader(shaderProgram, fragmentShader);
		GL.linkProgram(shaderProgram);
		
		if (GL.getProgramParameter (shaderProgram, GL.LINK_STATUS) == 0)
			throw "Unable to initialize the shader program.";
		
		vertexPosAttribute = GL.getAttribLocation (shaderProgram, "vertexPosition");
		texCoordAttribute = GL.getAttribLocation (shaderProgram, "aTexCoord");
		imageUniform = GL.getUniformLocation (shaderProgram, "uImage0");
	}
	
	/**
	 * Generate vertex shader
	 * @TODO try using HXSL for shader 
	 */
	function createVertexShader() : GLShader
	{
		var vertexShader = GL.createShader(GL.VERTEX_SHADER);
		GL.shaderSource(vertexShader, vertexShaderSource);
		GL.compileShader (vertexShader);
		
		if (GL.getShaderParameter (vertexShader, GL.COMPILE_STATUS) == 0)
		{
			var message = GL.getShaderInfoLog(vertexShader);
			throw "Error compiling vertex shader : " + message;
		}
			
		return vertexShader;
	}
	
	/**
	 * Fragment Shader
	 */
	function createFragmentShader() : GLShader
	{
		var fragmentShader = GL.createShader (GL.FRAGMENT_SHADER);
		
		GL.shaderSource (fragmentShader, fragmentShaderSource);
		GL.compileShader (fragmentShader);
		
		if (GL.getShaderParameter (fragmentShader, GL.COMPILE_STATUS) == 0)
		{
			var message = GL.getShaderInfoLog(fragmentShader);
			throw "Error compiling fragment shader : " + message;
		}
		
		return fragmentShader;
	}
	
	function createTexture() : Void
	{
		texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		
		var pixels : ByteArray = bitmapData.getPixels(bitmapData.rect);
		
		var array = new Array<UInt>();
		
		pixels.position = 0;
		
		for (i in 0 ... pixels.length)
			array.push(pixels.readUnsignedByte());	
		
		GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, 1);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, bitmapData.width, bitmapData.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, new UInt8Array(array));
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
		GL.generateMipmap(GL.TEXTURE_2D);
        GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
	public function render(viewport : Rectangle) : Void
	{
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		
		GL.clearColor (0.0, 0.0, 0.0, 1.0);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		GL.useProgram(shaderProgram);
		GL.enableVertexAttribArray(vertexPosAttribute);
		GL.enableVertexAttribArray(texCoordAttribute);
		
		var projectionMatrix = Matrix3D.createOrtho (0, 800, 480, 0, 1000, -1000);
		var modelViewMatrix = Matrix3D.create2D (0, 0, 1, angle);
		
		var projectionMatrixUniform = GL.getUniformLocation (shaderProgram, "projectionMatrix");
		var modelViewMatrixUniform = GL.getUniformLocation (shaderProgram, "modelViewMatrix");
			
		GL.uniformMatrix3D (projectionMatrixUniform, false, projectionMatrix);
		GL.uniformMatrix3D (modelViewMatrixUniform, false, modelViewMatrix);
		GL.uniform1i(imageUniform, 0);
		
		for (i in 0 ... meshes.length)
			draw(meshes[i]);
		
		GL.disableVertexAttribArray(vertexPosAttribute);
		GL.disableVertexAttribArray(texCoordAttribute);
		GL.useProgram(null);
	}
	
	function draw(mesh : Mesh) : Void
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vertexPosAttribute, 3, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttribute, 2, GL.FLOAT, false, 0, 0);
			
		GL.drawArrays (GL.TRIANGLES, 0, cast(mesh.vertices.length / 3));
			
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
}