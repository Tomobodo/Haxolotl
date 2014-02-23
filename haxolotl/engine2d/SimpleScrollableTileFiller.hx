package haxolotl.engine2d;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;
import haxolotl.engine2d.ScrollableTileFiller;

/**
 * ...
 * @author Ynk33
 */
class SimpleScrollableTileFiller extends ScrollableTileFiller
{
	private var onX:Float;
	private var onY:Float;
	
	private var startIndexX:Int;
	private var startIndexY:Int;
	
	public function new(_region:TextureRegion, _onX:Float = 0, _onY:Float = 0, _width:Float = -1, _height:Float = -1) 
	{
		super (_region, _width, _height);
		onX = _onX;
		onY = _onY;
	}
	
	private override function init()
	{
		setParams();
		
		for (i in startIndexX ... numberOnX)
		{
			for (j in startIndexY ... numberOnY)
			{
				var tile:Image = new Image(textureRegion);
				tile.x = tile.width * i;
				tile.y = tile.height * j;
				tiles.push(tile);
				add(tile);
			}
		}
	}
	
	private override function setParams()
	{
		if (areaWidth == -1)
		{
			areaWidth = scene.width;
		}
		if (areaHeight == -1)
		{
			areaHeight = scene.height;
		}
		
		var imgTmp:Image = new Image(textureRegion);
		numberOnX = Math.floor(Math.max(Math.floor(areaWidth / imgTmp.width), 1));
		numberOnY = Math.floor(Math.max(Math.floor(areaHeight / imgTmp.height), 1));
		startIndexX = 0;
		startIndexY = 0;
		imgTmp = null;
		
		if (onX > 0)
		{
			startIndexX--;
		}
		else if (onX < 0)
		{
			numberOnX++;
		}
		
		if (onY > 0)
		{
			startIndexY--;
		}
		else if (onY < 0)
		{
			numberOnY++;
		}
	}
	
	public override function scroll(_x:Float, _y:Float)
	{
		if (
			onX > 0 && _x < 0
			|| onX < 0 && _x > 0
			|| onX == 0 && _x != 0
			|| onY > 0 && _y < 0
			|| onY < 0 && _y > 0
			|| onY == 0 && _y != 0
			)
		{
			throw "Given direction not matching the original direction";
		}
		else
		{
			super.scroll(_x, _y);
		}
	}
	
}