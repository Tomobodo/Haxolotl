package com.pixodrome.ld28;
import com.pixodrome.ld28.meshes.Plane;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import openfl.display.OpenGLView;
import openfl.gl.GL;
import openfl.gl.GLBuffer;
import openfl.gl.GLProgram;
import openfl.gl.GLShader;
import openfl.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class App extends Sprite
{
	
	var glRender : OpenGLView;
	var shaderProgram:GLProgram;
	var vertexPosAttribute : Int;
	
	var meshes : Array<Mesh>;
	var vertexBuffer:GLBuffer;

	public function new() 
	{
		super();
		
		new Color(0xff6655, 0.3);
		
		if (!OpenGLView.isSupported)
			throw "fuck, no opengl for ya!";
		
		initRenderer();
		
		meshes = new Array<Mesh>();
		
		add(new Plane(new Color(0xff3355,0.2)));
		
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
	
	function add(mesh : Mesh) : Void
	{
		meshes.push(mesh);
		
		vertexBuffer = GL.createBuffer ();
		GL.bindBuffer (GL.ARRAY_BUFFER, vertexBuffer);	
		GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (cast mesh.vertices), GL.STATIC_DRAW);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
	function onEnterFrame(e:Event):Void 
	{
		this.updateLogic();
	}
	
	function updateLogic() 
	{
		
	}

	// auto updated by openfl
	function render(viewport : Rectangle) : Void
	{
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		
		GL.clearColor (8 >> 8, 146 >> 8, 208 >> 8, 1);
		GL.clear (GL.COLOR_BUFFER_BIT);
		
		var positionX = viewport.width / 2;
		var positionY = viewport.height / 2;
		
		var projectionMatrix = Matrix3D.createOrtho (0, viewport.width, viewport.height, 0, 1000, -1000);
		var modelViewMatrix = Matrix3D.create2D (positionX, positionY, 1, 0);
		
		GL.useProgram(shaderProgram);
		GL.enableVertexAttribArray(vertexPosAttribute);
	
		GL.bindBuffer (GL.ARRAY_BUFFER, vertexBuffer);
		GL.vertexAttribPointer (vertexPosAttribute, 3, GL.FLOAT, false, 0, 0);
		
		var projectionMatrixUniform = GL.getUniformLocation (shaderProgram, "projectionMatrix");
		var modelViewMatrixUniform = GL.getUniformLocation (shaderProgram, "modelViewMatrix");
		
		GL.uniformMatrix3D (projectionMatrixUniform, false, projectionMatrix);
		GL.uniformMatrix3D (modelViewMatrixUniform, false, modelViewMatrix);
		
		GL.drawArrays (GL.TRIANGLE_STRIP, 0, 4);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
	function initRenderer():Void 
	{
		glRender = new OpenGLView();
		addChild(glRender);
		glRender.render = render;
		
		initShaders();
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
	}
	
	/**
	 * Generate vertex shader
	 * @TODO try using HXSL for shader 
	 */
	function createVertexShader() : GLShader
	{
		var vertexShaderSource = "
			attribute vec3 vertexPosition;
			attribute vec4 vertexColor;
			
			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
			
			void main(void) {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
			}
		";
		
		var vertexShader = GL.createShader(GL.VERTEX_SHADER);
		GL.shaderSource(vertexShader, vertexShaderSource);
		GL.compileShader (vertexShader);
		
		if (GL.getShaderParameter (vertexShader, GL.COMPILE_STATUS) == 0) {
			throw "Error compiling vertex shader";
		}
		
		return vertexShader;
		
	}
	
	/**
	 * Fragment Shader
	 */
	function createFragmentShader() : GLShader
	{
		var fragmentShaderSource = "
			void main(void) {
				gl_FragColor = vec4(1.0,0.0,0.0,1.0);
			}
		";
		
		var fragmentShader = GL.createShader (GL.FRAGMENT_SHADER);
		
		GL.shaderSource (fragmentShader, fragmentShaderSource);
		GL.compileShader (fragmentShader);
		
		if (GL.getShaderParameter (fragmentShader, GL.COMPILE_STATUS) == 0) {
			throw "Error compiling fragment shader";
		}
		
		return fragmentShader;
	}
	
}

