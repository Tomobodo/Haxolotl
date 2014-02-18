package haxolotl.text;
import haxolotl.display.Image;

/**
 * ...
 * @author Thomas B
 */
class Letter extends Image
{
	
	public var next : Letter;
	public var prev : Letter;
	
	public var format(default, set_format) : TextFormat;
	var m_format : TextFormat;
	
	public var char(get_char, set_char) : String;
	var m_char : String;
	
	var glyph : Glyph;
	
	public function new(_char : String, _format : TextFormat) 
	{
		format = _format;
		m_char = _char;
		glyph = m_format.font.getGlyph(m_char);
		
		super(glyph.getRegion());
		draw();
	}
	
	public function getCurPos() : Float
	{
		return x + glyph.xAdvance * scaleX;
	}
	
	function set_format(_format : TextFormat) : TextFormat
	{
		if (m_format != null)
			m_format.UPDATED.remove(draw);
		m_format = _format;
		m_format.UPDATED.add(draw);
		return m_format;
	}
	
	function set_char(_char : String) : String 
	{
		m_char = _char;
		glyph = m_format.font.getGlyph(m_char);
		draw();
		return m_char;
	}
	
	function get_char() : String
	{
		return m_char;
	}
	
	function draw() 
	{
		updateFrame(glyph.getRegion());
		scaleX = m_format.ratio;
		scaleY = m_format.ratio;
		pivotX = -glyph.xOffset;
		pivotY = -glyph.yOffset;
		color = m_format.color;
	}
	
}