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
	var m_dest : Point;

	public function new(buffer : BitmapData) 
	{
		m_buffer = buffer;
		m_dest = new Point();
	}
	
	public function render(object : DisplayObject)
	{
		if (object.texture != null)
		{
			m_region = object.texture.region;
			m_transform = object.transform;
			m_data = object.texture.texture.bitmapData;
			
			if(object.rotation != 0 || object.scaleX != 1 || object.scaleY != 1)
				m_buffer.draw(m_data, m_transform, null, null, m_region, false);
			else	
			{
				m_dest.x = m_transform.tx;
				m_dest.y = m_transform.ty;
				m_buffer.copyPixels(m_data, m_region, m_dest);
			}
		}
		
		if (object.children != null)
			for (child in object.children)
				render(child);
	}
	
}