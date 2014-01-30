package ld28;
import flash.display.Stage;
import flash.geom.Rectangle;
import openfl.gl.GL;

import ld28.utils.Color;

/**
 * ...
 * @author Thomas BAUDON
 */
class Screen
{
	var screenManager : ScreenManager;
	var stage : Stage;
	var scenes : List<Scene>;
	var backgroundColor : Color;
	var viewport:Rectangle;
	var viewportChanged : Bool;
	
	public function new(_backgroundColor : Color = null) 
	{
		if (_backgroundColor == null)
			_backgroundColor = new Color(0xffffff);
		backgroundColor = _backgroundColor;
		scenes = new List<Scene>();
		viewportChanged = true;
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		viewportChanged = true;
		viewport = _viewport;
	}
	
	public function onPushed(_screenManager : ScreenManager, _stage : Stage)
	{
		screenManager = _screenManager;
		stage = _stage;
		play();
	}
	
	public function onRemoved()
	{
		pause();
		screenManager.removeScreen(this);
	}
	
	public function play()
	{
	}
	
	public function pause()
	{
	}
	
	public function render(viewport : Rectangle)
	{
		GL.viewport (Std.int (viewport.x), Std.int (viewport.y), Std.int (viewport.width), Std.int (viewport.height));
		GL.clearColor (backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
		GL.clear (GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		for (scene in scenes)
		{
			if (viewportChanged)
				scene.setViewport(viewport);
			scene.draw();
		}
		
		viewportChanged = false;
			
		var glError = GL.getError();
		if (glError != 0)
			trace(glError);
	}
	
	private function addScene(_scene : Scene) 
	{
		scenes.push(_scene);
	}
	
	private function removeScene(_scene : Scene)
	{
		scenes.remove(_scene);
	}
}