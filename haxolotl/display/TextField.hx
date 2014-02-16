package haxolotl.display;

import haxolotl.core.Font;
import haxolotl.core.Glyph;
import haxolotl.display.DisplayObjectContainer;

/**
 * ...
 * @author Thomas B
 */

class TextField extends DisplayObjectContainer
{
	
	public var text(default, set_text) : String;
	public var font(default, set_font) : Font;
	
	var _text : String;
	var _font : Font;
	
	public function new(font : Font, text : String = null, _color : UInt = 0x000000, size = 12) 
	{
		super();
		_text = text;
		_font = font;
		
		color = _color;
		
		if(_text != null) drawText();
	}
	
	public function set_text(text : String) : String 
	{
		removeAll();
		
		_text = text;
		
		if (_text != null)
			drawText();
		
		return _text;
	}
	
	function drawText()
	{
		var prevChar : Glyph = null;
		var lastX : Int = 0;
		for (i in 0 ... _text.length)
		{
			var glyph = _font.getGlyph(_text.charAt(i));
			var glyphImg = new Image(glyph.getRegion());
			glyphImg.color = color;
			glyphImg.pivotX = -glyph.xOffset;
			glyphImg.pivotY = -glyph.yOffset;
			glyphImg.interactive = false;
			if (prevChar != null)
				glyphImg.x = lastX;
			lastX += glyph.xAdvance;
			add(glyphImg);
			prevChar = glyph;
		}
	}
	
	function set_font(font : Font)
	{
		_font = font;
		if (_text != null) drawText();
		return _font;
	}
}