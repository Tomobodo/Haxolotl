package haxolotl.core.render;
import flash.display.Stage;
import flash.events.Event;
import flash.geom.Rectangle;
import flash.Lib;
import haxolotl.core.Texture;
import haxolotl.Haxolotl;
import haxolotl.shaders.ShaderManager;
import openfl.display.OpenGLView;
import openfl.gl.GL;

/**
 * ...
 * @author Thomas B
 */
class GLRenderer extends Renderer
{
	
	var m_glView : OpenGLView;
	var m_spriteBatch : SpriteBatch;
	var m_lastRestoreTime = 0;
	
	public function new(_stage : Stage) 
	{
		super(_stage);
	}
	
	override function init() : Void
	{
		super.init();
		
		m_glView = new OpenGLView();
		m_stage.addChild(m_glView);
		m_spriteBatch = new SpriteBatch();
		m_stage.addEventListener(OpenGLView.CONTEXT_RESTORED, onContextRestored);
	}
	
	override public function start()
	{
		m_glView.render = render;
	}
	
	override public function stop()
	{
		m_glView.render = null;
		m_lastRestoreTime = 0;
	}
	
	function onContextRestored(e:Event):Void 
	{		
		var time = Lib.getTimer();
		if (time - m_lastRestoreTime > 1000)
		{
			trace("context restored");
			ShaderManager.get().reloadAll();
			m_spriteBatch.initIndexBuffer();
			m_spriteBatch.initVertexBuffer();
			Texture.reloadAll();
			m_lastRestoreTime = time;
		}
	}
	
	override function render(viewport : Rectangle = null) : Void
	{
		var renderTimeStart = Lib.getTimer();
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		GL.clearColor (backGroundColor.r, backGroundColor.g, backGroundColor.b, 1);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		for (scene in m_scenes)
		{
			m_spriteBatch.setViewport(scene.viewport);
			m_spriteBatch.start();
			m_spriteBatch.render(scene);
			m_spriteBatch.end();
		}
		
		var glError = GL.getError();
		if (glError != 0)
			trace(glError);
		
		if(Haxolotl.current != null)
			Haxolotl.current.renderTime = 0.001 * (Lib.getTimer() - renderTimeStart);
	}
}