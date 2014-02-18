package haxolotl.text;
import msignal.Signal.Signal0;

/**
 * ...
 * @author Thomas B
 */
class TextFormat
{
	
	public var font(get_font, set_font) : Font;
	private var _font : Font;
	
	public var color(get_color, set_color) : UInt;
	private var _color : UInt;
	
	public var size(get_size, set_size) : UInt;
	private var _size : UInt;
	
	public var UPDATED : Signal0;
	
	public var ratio(get_ratio, null) : Float;
	public var spaceSize(get_spaceSize, null) : Float;
	public var interline : Float;
	
	public function new(_font : String, _color : UInt = 0x000000, _size : UInt = 32, _interline : Float = 1.2) 
	{
		UPDATED = new Signal0();
		
		font = Font.get(_font);
		color = _color;
		size = _size;
		interline = _interline;
	}
	
	function set_font(value : Font) : Font 
	{
		_font = value;
		UPDATED.dispatch();
		return _font;
	}
	
	function set_color(value : UInt) : UInt 
	{
		_color = value;
		UPDATED.dispatch();
		return _color;
	}
	
	function set_size(value : UInt) : UInt 
	{
		_size = value;
		UPDATED.dispatch();
		return _size;
	}
	
	function get_font() : Font
	{
		return _font;
	}
	
	function get_size() : UInt
	{
		return _size;
	}
	
	function get_color() : UInt
	{
		return _color;
	}
	
	function get_ratio() : Float
	{
		return _size / _font.size;
	}
	
	function get_spaceSize() : Float
	{
		return _font.getGlyph(" ").xAdvance * ratio;
	}
}