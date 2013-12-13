package com.pixodrome.ld28;
import com.pixodrome.ld28.meshes.Plane;
import com.pixodrome.ld28.meshes.SpriteBatch;
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
import src.com.pixodrome.ld28.Renderer;

/**
 * ...
 * @author Thomas BAUDON
 */
class App extends Sprite
{
	
	var glRender : OpenGLView;
	
	var renderer : Renderer;
	
	var shaderProgram:GLProgram;
	var vertexPosAttribute : Int;
	
	var meshes : Array<Mesh>;
	var vertexBuffer:GLBuffer;
	var quad:com.pixodrome.ld28.Quad;

	public function new() 
	{
		super();
		
		new Color(0xff6655, 0.3);
		
		if (!OpenGLView.isSupported)
			throw "fuck, no opengl for ya!";
		
		initRenderer();
		
		var batch = new SpriteBatch();
		
		quad = new Quad(20, 20, 0xffffff);
		
		batch.add(quad);
		
		renderer.addMesh(batch);
		
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
		
	function onEnterFrame(e:Event):Void 
	{
		this.updateLogic();
	}
	
	function updateLogic() 
	{
		quad.x += 0.01;
	}
	
	function initRenderer():Void 
	{
		renderer = new Renderer();
		addChild(renderer.view);
	}
	
	
	
}

