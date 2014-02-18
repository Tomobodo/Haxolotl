package haxolotl.core;

import haxe.xml.Fast;
import haxolotl.core.Texture;
import openfl.Assets;

/**
 * ...
 * @author Thomas B
 */
class Font
{
	private var texture : Texture;
	private var descriptor : Fast;
	private var glyphs : Array<Glyph>;
	
	private static var cache = new Map<String, Font>();
	
	public var size(get_size, null) : Int;
	private var _size : Int;

	public function new(name : String) 
	{
		texture = Texture.get("fonts/" + name + ".png");
		descriptor = new Fast(Xml.parse(Assets.getText("fonts/" + name + ".fnt")));
		
		var root = descriptor.node.font;
		var info = root.node.info;
		_size = Std.parseInt(info.att.size);
		
		var chars = root.node.chars;
		
		glyphs = new Array<Glyph>();
		
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
			glyph.initRegion(texture);
			
			glyphs[id] = glyph;
		}
	}
	
	public static function get(name : String) : Font
	{
		if (cache[name] == null)
			cache[name] = new Font(name);
		return cache[name];
	}
	
	public function getGlyph(char : String) : Glyph
	{
		var code = char.charCodeAt(0);
		var glyph = glyphs[code];
		if(glyph != null) return glyph;
		else return getGlyph('0');
	}
	
	public function get_size() : Int
	{
		return _size;
	}
}