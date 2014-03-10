package haxolotl.core.render;

import flash.display.Sprite;
import flash.events.Event;
import flash.display.Stage;
import flash.Lib;
import haxe.Timer;
import haxolotl.core.Scene;
import haxolotl.geom.Rectangle;
import haxolotl.Haxolotl;
import haxolotl.shaders.ShaderManager;
import haxolotl.utils.Color;
import openfl.display.OpenGLView;
import openfl.gl.GL;

/**
 * ...
 * @author Thomas BAUDON
 */
 
class Renderer
{
	public var scaleMode : ScaleMode;
	public var backGroundColor : Color;
	
	var eventCatcher : Sprite;
	var touchDevice : Bool;
	var m_stage : Stage;
	var m_scenes : List<Scene>;
	var m_viewport : Rectangle;
	
	var lastTime:Int = 0;
	
	static private inline var TIME_STEP : Int = 16;
	
	public function new(_stage : Stage) 
	{
		scaleMode = Scale;
		m_scenes = new List<Scene>();
		touchDevice = false;
		m_stage = _stage;
		backGroundColor = new Color(m_stage.color);
		init();
	}
	
	function init() : Void
	{
		m_viewport = new Rectangle(0, 0, m_stage.stageWidth, m_stage.stageHeight);
		new EventHandler(m_stage, m_scenes);
		initEventCatcher();
		m_stage.addEventListener(Event.RESIZE, onResize);
	}
	
	public function start()
	{
	}
	
	public function stop()
	{
	}
	
	function render(viewport : flash.geom.Rectangle = null) : Void
	{
		
	}
	
	function onResize(e:Event):Void 
	{
		initEventCatcher();
		if (scaleMode == NoScale)
		{
			m_viewport = new Rectangle(0, 0, m_stage.stageWidth, m_stage.stageHeight);
			for (scene in m_scenes)
				scene.setViewport(m_viewport);
		}
	}
	
	function initEventCatcher() 
	{
		if (eventCatcher == null)
		{
			eventCatcher = new Sprite();
			m_stage.addChild(eventCatcher);
		}
		else
			eventCatcher.graphics.clear();
			
		eventCatcher.graphics.beginFill(0, 0);
		eventCatcher.graphics.drawRect(0, 0,m_stage.stageWidth,m_stage.stageHeight);
		eventCatcher.graphics.endFill();
	}
	
	public function setViewPort(width : Int, height : Int)
	{
		m_viewport.width = width;
		m_viewport.height = height;
		for (scene in m_scenes)
			scene.setViewport(m_viewport);
	}
	
	public function add(scene : Scene)
	{
		this.m_scenes.push(scene);
		scene.setViewport(m_viewport);
		scene.ADDED.dispatch();
	}
	
	public function remove(scene : Scene)
	{
		this.m_scenes.remove(scene);
		scene.REMOVED.dispatch();
	}
}