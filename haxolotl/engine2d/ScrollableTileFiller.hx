package haxolotl.engine2d;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;
import haxolotl.engine2d.TileFiller;

/**
 * ...
 * @author Ynk33
 */
class ScrollableTileFiller extends TileFiller
{
	private var coefX:Int;
	private var coefY:Int;
	
	var scrollX : Float;
	var scrollY : Float;
	
	public function new(_region:TextureRegion, _width:Float = -1, _height:Float = -1) 
	{
		super(_region, _width, _height);
	}
	
	private override function init()
	{
		setParams();
		
		for (i in -1 ... numberOnX)
		{
			for (j in -1 ... numberOnY)
			{
				var tile:Image = new Image(textureRegion);
				tile.x = tile.width * i;
				tile.y = tile.height * j;
				tiles.push(tile);
				add(tile);
			}
		}
		
		// not to forget that creation started at -1
		numberOnX++;
		numberOnY++;
	}
	
	private override function setParams()
	{
		super.setParams();
		numberOnX++;
		numberOnY++;
	}
	
	public function scroll(_x:Float, _y:Float)
	{
		coefX = (_x > 0 ? 1 : (_x < 0 ? -1 : 0));
		coefY = (_y > 0 ? 1 : (_y < 0 ? -1 : 0));
		
		for (tile in tiles)
		{
			tile.x += _x;
			tile.y += _y;
			
			if (_x > 0)
			{
				if (tile.x >= tile.width)
				{
					tile.x -= tile.width * numberOnX;
				}
			}
			else if (_x < 0)
			{
				if (tile.x <= -tile.width)
				{
					tile.x += tile.width * numberOnX;
				}
			}
			
			if (_y > 0)
			{
				if (tile.y >= tile.height)
				{
					tile.y -= tile.height * numberOnY;
				}
			}
			else if (_y < 0)
			{
				if (tile.y <= -tile.height)
				{
					tile.y += tile.height * numberOnY;
				}
			}
		}
	}
}