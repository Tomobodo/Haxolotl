package com.pixodrome.ld28;
import com.pixodrome.ld28.meshes.Plane;
import com.pixodrome.ld28.meshes.SpriteBatch;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import flash.text.TextFormat;
import openfl.display.FPS;
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
	
	var quads : Array<Quad>;
	var batch:com.pixodrome.ld28.meshes.SpriteBatch;

	public function new() 
	{
		super();
		
		if (!OpenGLView.isSupported)
			throw "No opengl context available.";
		
		initRenderer();
		
		batch = new SpriteBatch();
		
		quads = new Array<Quad>();
		
		for (i in 0 ... 5000)
		{
			var quad = new Quad(64, 64);
			
			quad.x = Math.random() * 800;
			quad.y = Math.random() * 480;
			quad.rotation = Math.random() * 360;
			
			quads.push(quad);
			batch.add(quad);
		}
		
		renderer.addMesh(batch);
		
		#if !neko
		initFps();
		#end
		
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
		for (i in 0 ... quads.length)
			quads[i].rotation += 0.1;
	}
	
	function initRenderer():Void 
	{
		renderer = new Renderer();
		addChild(renderer.view);
	}
	
	function initFps():Void 
	{
		var fps = new FPS(0, 0, 0x009900);
		fps.defaultTextFormat = new TextFormat("Arial", 24, 0x66ff66);
		addChild(fps);
	}
	
}

