package haxolotl.engine2d;
import flash.geom.Rectangle;
import haxolotl.core.TextureRegion;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.display.Image;

/**
 * ...
 * @author Ynk33
 */
class TileFiller extends DisplayObjectContainer
{
	private var tiles:Array<Image>;
	private var textureRegion:TextureRegion;
	private var areaWidth:Float;
	private var areaHeight:Float;
	
	private var numberOnX:Int;
	private var numberOnY:Int;
	
	public function new(_region:TextureRegion, _width:Float = -1, _height:Float = -1 ) 
	{
		super();
		tiles = new Array<Image>();
		textureRegion = _region;
		areaWidth = _width;
		areaHeight = _height;
		
		ADDED.add(init);
	}
	
	private function init()
	{
		setParams();
		
		for (i in 0 ... numberOnX)
		{
			for (j in 0 ... numberOnY)
			{
				var tile:Image = new Image(textureRegion);
				tile.x = tile.width * i;
				tile.y = tile.height * j;
				tiles.push(tile);
				add(tile);
			}
		}
	}
	
	private function setParams()
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
		numberOnX = Math.ceil(areaWidth / imgTmp.width);
		numberOnY = Math.ceil(areaHeight / imgTmp.height);
		imgTmp = null;
	}
}