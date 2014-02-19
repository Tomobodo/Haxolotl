package haxolotl.text;

import haxolotl.text.Glyph;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.display.Image;
import haxolotl.text.Font;

/**
 * ...
 * @author Thomas B
 */

class Text extends DisplayObjectContainer
{
	
	public var text(get_text, set_text) : String;
	var _text : String;
	
	var _format : TextFormat;
	
	public var first : Line;
	public var last : Line;
	
	public function new(text : String, format : TextFormat) 
	{
		super();
		
		_format = format;
		this.text = text;
	}
	
	public function get_text() : String
	{
		return _text;
	}
	
	public function set_text(text : String) : String 
	{
		_text = text;
		
		var currentLine = first;
		var lines = _text.split("\n");
		
		for (line in lines)
		{
			if (currentLine == null)
			{
				currentLine = new Line(line, _format);
				add(currentLine);
				if (first == null)
				{
					first = currentLine;
					last = currentLine;
				}
				else
				{
					last.next = currentLine;
					currentLine.prev = last;
					last = currentLine;
				}
			}
			else
				currentLine.line = line;
		
			if (currentLine.prev != null)
				currentLine.y = currentLine.prev.y + currentLine.prev.height * _format.interline;
			else
				currentLine.y = 0;
				
			currentLine = currentLine.next;
		}
		
		while (currentLine != null)
		{
			remove(currentLine);
			currentLine = currentLine.next;
		}
		
		return _text;
	}
	
	public function setMaxWidth(width : Int)
	{
		var line = first;
		while (line != null)
		{
			if (line.width > width)
			{
				var newLine = new Line(null, _format);
			}
			line = line.next;
		}
	}
}