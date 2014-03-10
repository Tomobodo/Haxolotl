package haxolotl.core.render;
import flash.display.BitmapData;
import flash.display.BlendMode;
import flash.geom.ColorTransform;
import flash.geom.Matrix;
import flash.geom.Point;
import flash.geom.Rectangle;
import haxolotl.core.TextureRegion;
import haxolotl.display.DisplayObject;

/**
 * ...
 * @author Thomas B
 */
class CanvasDrawer
{
	
	var m_buffer : BitmapData;
	
	var m_region : Rectangle;
	var m_transform : Matrix;
	var m_data : BitmapData;

	public function new(buffer : BitmapData) 
	{
		m_buffer = buffer;
	}
	
	public function render(object : DisplayObject)
	{
		if (object.texture != null)
		{
			m_region = object.texture.region;
			m_transform = object.transform;
			m_data = object.texture.texture.bitmapData;
			
			//m_region = new Rectangle(5, 5, 1, 1);
			
			m_buffer.draw(m_data, m_transform, null, null, m_region, true);
			//m_buffer.copyPixels(object.texture.texture.bitmapData, m_region, new Point(object.transform.tx, object.transform.ty));
		}
		
		if (object.children != null)
			for (child in object.children)
				render(child);
	}
	
}