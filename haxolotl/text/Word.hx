package haxolotl.text;
import haxolotl.core.InteractiveObject;
import haxolotl.display.DisplayObjectContainer;
import flash.geom.Point;

/**
 * ...
 * @author Thomas B
 */
class Word extends DisplayObjectContainer
{

	public var word(default, set_word) : String;
	var m_word : String;
	
	public var next : Word;
	public var prev : Word;
	
	var m_format : TextFormat;
	
	var first : Letter;
	var last : Letter;
	
	public function new(_word : String, _format : TextFormat) 
	{
		super();
		
		m_format = _format;
		word = _word;
	}
	
	public function getCurPos() : Float
	{
		return x + last.getCurPos() + m_format.spaceSize;
	}
	
	override public function testInput(iX : Float, iY : Float) : Bool
	{
		var point = new Point(iX, iY);
		var transformInvert = transform.clone();
		transformInvert.invert();
		point = transformInvert.transformPoint(point);
		
		var inWidth = point.x > 0 && point.x < width;
		var inHeight = point.y > 0 && point.y < height;
		
		if (inWidth && inHeight)
		{
			hover = true;
			return true;
		}
		else
		{
			if (hover)
				leaved(iX, iY);
			return false;
		}
	}
	
	function set_word(_word : String) : String
	{
		m_word = _word;
		
		var currentLetter = first;
		
		for (i in 0 ... _word.length)
		{
			if (currentLetter == null)
			{
				currentLetter = new Letter(m_word.charAt(i), m_format);
				add(currentLetter);
				if (first == null)
				{
					first = currentLetter;
					last = currentLetter;
				}
				else
				{
					last.next = currentLetter;
					currentLetter.prev = last;
					last = currentLetter;
				}
			}
			else
				currentLetter.char = m_word.charAt(i);
			
			if(currentLetter.prev != null)
				currentLetter.x = currentLetter.prev.getCurPos();
			else
				currentLetter.x = 0;
			
			if(i < _word.length -1)
				currentLetter = currentLetter.next;
			else	
				last = currentLetter;
		}
		
		if (last != null)
		{
			var toRemove = last.next;
			last.next = null;
			
			while (toRemove != null)
			{
				remove(toRemove);
				toRemove = toRemove.next;
			}
		}
		
		return m_word;
	}
	
}