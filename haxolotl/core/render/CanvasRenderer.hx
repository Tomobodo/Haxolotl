package haxolotl.core.render;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Stage;
import flash.events.Event;
import flash.geom.Rectangle;
import flash.Lib;
import haxolotl.core.Scene;
import haxolotl.display.DisplayObject;

/**
 * ...
 * @author Thomas B
 */
class CanvasRenderer extends Renderer
{
	
	var m_bitmapView : Bitmap;
	var m_buffer : BitmapData;
	var m_canvasDrawer : CanvasDrawer;

	public function new(_stage : Stage) 
	{
		super(_stage);
	}
	
	override function init() : Void
	{
		super.init();
		
		m_buffer = new BitmapData(cast m_viewport.width,cast m_viewport.height, false, backGroundColor.hex);
		m_bitmapView = new Bitmap(m_buffer);
		m_stage.addChild(m_bitmapView);
		m_canvasDrawer = new CanvasDrawer(m_buffer);
	}
	
	override function start() : Void
	{
		m_stage.addEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
	
	override function stop() : Void
	{
		m_stage.removeEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
	
	function onEnterFrame(e:Event):Void 
	{
		this.render();
	}
	
	override function render(viewport : flash.geom.Rectangle = null) : Void
	{
		var renderTimeStart = Lib.getTimer();
		
		// clear
		m_buffer.fillRect(m_viewport, backGroundColor.hex);
		
		for (scene in m_scenes)
			m_canvasDrawer.render(scene);
		
		if(Haxolotl.current != null)
			Haxolotl.current.renderTime = 0.001 * (Lib.getTimer() - renderTimeStart);
	}
	
}