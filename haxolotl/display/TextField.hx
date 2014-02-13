package haxolotl.display;

import flash.geom.Rectangle;
import haxe.xml.Fast;
import haxolotl.core.InteractiveObject;
import haxolotl.core.TextureRegion;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.core.Texture;
import haxolotl.display.TextField.Glyph;
import openfl.Assets;

/**
 * ...
 * @author Thomas B
 */

class Glyph
{
	public var id : Int;
	public var x : Int;
	public var y : Int;
	public var width : Int;
	public var height : Int;
	public var xOffset : Int;
	public var yOffset : Int;
	public var xAdvance : Int;
	
	public var region : TextureRegion;
	
	public function new(_id : Int, _x:Int, _y :Int, _width:Int, _height:Int, _xOffset:Int, _yOffset:Int, _xAdvance:Int)
	{
		id = _id;
		x = _x;
		y = _y;
		width = _width;
		height = _height;
		xOffset = _xOffset;
		yOffset = _yOffset;
		xAdvance = _xAdvance;
	}
	
	public function initRegion(texture : Texture)
	{
		var tRegion = new Rectangle(x, y, width, height);
		region = new TextureRegion(texture, tRegion);
	}
	
	public function getRegion() : TextureRegion
	{
		return region;
	}
}
 
class TextField extends DisplayObjectContainer
{
	
	public function new(fontName : String, text : String = null, color : UInt = 0x000000, size = 12) 
	{
		super();
		
		var fontTexture = Texture.get("fonts/" + fontName + ".png");
		var fontXml = new Fast(Xml.parse(Assets.getText("fonts/" + fontName + ".fnt")));
		
		var root = fontXml.node.font;
		var chars = root.node.chars;
		var glyphs : Map<Int, Glyph> = new Map<Int, Glyph>();
		
		for (char in chars.nodes.char)
		{
			var id : Int = Std.parseInt(char.att.id);
			var x : Int = Std.parseInt(char.att.x);
			var y : Int = Std.parseInt(char.att.y);
			var width : Int = Std.parseInt(char.att.width);
			var height : Int = Std.parseInt(char.att.height);
			var xOffset : Int = Std.parseInt(char.att.xoffset);
			var yOffset : Int = Std.parseInt(char.att.yoffset);
			var xAdvance : Int = Std.parseInt(char.att.xadvance);
			
			var glyph = new Glyph(id, x, y, width, height, xOffset, yOffset, xAdvance);
			glyph.initRegion(fontTexture);
			
			glyphs[id] = glyph;
		}
		
		var prevChar : Glyph = null;
		var lastX : Int = 0;
		for (i in 0 ... text.length)
		{
			var char = text.charCodeAt(i);
			var glyph = glyphs[char];
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
}