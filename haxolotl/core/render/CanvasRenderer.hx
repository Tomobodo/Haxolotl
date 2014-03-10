package haxolotl.core.render;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Stage;
import flash.events.Event;
import flash.geom.Rectangle;
import flash.Lib;

/**
 * ...
 * @author Thomas B
 */
class CanvasRenderer extends Renderer
{
	
	var m_bitmapView : Bitmap;
	var m_buffer : BitmapData;

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
		
		m_buffer.fillRect(new Rectangle(0, 0, 20, 20),cast Math.random() * 0xffffff);
		
		if(Haxolotl.current != null)
			Haxolotl.current.renderTime = 0.001 * (Lib.getTimer() - renderTimeStart);
	}
	
	
}