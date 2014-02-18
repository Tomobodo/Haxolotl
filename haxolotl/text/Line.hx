package haxolotl.text;

import haxolotl.display.DisplayObjectContainer;
import haxolotl.text.TextFormat;

/**
 * ...
 * @author Thomas B
 */
class Line extends DisplayObjectContainer
{
	public var line(default, set_line) : String;
	var m_line : String;
	
	public var format(default, set_format) : TextFormat;
	var m_format : TextFormat;
	
	public var first : Word;
	public var last : Word;
	
	public var next : Line;
	public var prev : Line;
	
	public function new(_line : String, _format : TextFormat) 
	{
		super();
		
		format = _format;
		line = _line;
	}
	
	function set_line(text : String) : String
	{
		m_line = text;
		
		var currentWord = first;
		var words = m_line.split(" ");
		
		for (i in 0 ... words.length)
		{
			var word = words[i];
			if (currentWord == null)
			{
				currentWord = new Word(word, m_format);
				add(currentWord);
				if (first == null)
				{
					first = currentWord;
					last = currentWord;
				}
				else
				{
					last.next = currentWord;
					currentWord.prev = last;
					last = currentWord;
				}
			}
			else
				currentWord.word = word;
				
			if(currentWord.prev != null)
				currentWord.x = currentWord.prev.getCurPos();
			else
				currentWord.x = 0;
			
			if (i < words.length - 1)
				currentWord = currentWord.next;
			else
				last = currentWord;
		}
		
		var toRemove = last.next;
		last.next = null;
		
		while (toRemove != null)
		{
			remove(toRemove);
			toRemove = toRemove.next;
		}
		
		return m_line;
	}
	
	function set_format(format : TextFormat) : TextFormat
	{
		return m_format = format;
	}
	
}