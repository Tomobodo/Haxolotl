package haxolotl.display;
import haxolotl.core.Scene;
import haxolotl.core.TextureAtlas;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.display.Image;

/**
 * ...
 * @author Ynk33
 */
class Scroller extends DisplayObjectContainer
{
	private var imgs:Array<Image>;
	private var speed:Float;
	private var onX:Float;
	private var onY:Float;
	
	private var atlas:TextureAtlas;
	private var imgName:String;
	
	private var nbImgsOnX:Int;
	private var nbImgsOnY:Int;
	private var isPlaying:Bool;
	private var reverseX:Int;
	private var reverseY:Int;
	
	/**
	 * Create a new Scroller
	 * @param	_atlas : _atlas containing the image to scroll
	 * @param	_imgName : Name of the image to scroll
	 * @param	_speed : Scrolling speed
	 * @param	_onX : How much the X is affected by scrolling (if 0, no scroll on X; if 1, scroll with _speed; if 2, scroll with _speed * 2)
	 * @param	_onY : How much ths Y is affected by scrolling (if 0, no scroll on Y; if 1, scroll with _speed; if 2, scroll with _speed * 2)
	 */
	public function new(_atlas:TextureAtlas, _imgName:String, _speed:Float, _onX:Float, _onY:Float) 
	{
		super();
		
		speed = _speed;
		onX = _onX;
		onY = _onY;
		
		atlas = _atlas;
		imgName = _imgName;
		
		isPlaying = false;
		reverseX = (onX < 0 ? -1 : 1);
		reverseY = (onY < 0 ? -1 : 1);
	}
	
	public function init()
	{
		initImages();
		UPDATED.add(onUpdate);
	}
	
	private function initImages()
	{
		var tmp:Image = new Image(atlas.get(imgName));
		nbImgsOnX = (onX == 0 ? 1 : Math.floor(Math.max(Math.ceil(scene.width / tmp.width) + 1, 2)));
		nbImgsOnY = (onY == 0 ? 1 : Math.floor(Math.max(Math.ceil(scene.height / tmp.height) + 1, 2)));
		
		imgs = new Array<Image>();
		for (i in 0 ... nbImgsOnX)
		{
			for (j in 0 ... nbImgsOnY)
			{
				var img = new Image(atlas.get(imgName));
				img.x = img.width * i * reverseX;
				img.y = img.height * j * reverseY;
				add(img);
				imgs.push(img);
			}
		}
		
		tmp = null;
	}
	
	var xDelta:Float;
	var yDelta:Float;
	private function onUpdate(_deltaTime:Float)
	{
		if (isPlaying)
		{
			xDelta = Math.round(speed * _deltaTime * onX);
			yDelta = Math.round(speed * _deltaTime * onY);
			
			for (img in imgs)
			{
				img.x -= xDelta;
				img.y -= yDelta;
				
				if (img.x == -img.width * reverseX)
				{
					img.x += img.width * nbImgsOnX * reverseX;
				}
				if (img.y == -img.height * reverseY)
				{
					img.y += img.height * nbImgsOnY * reverseY;
				}
			}
		}
	}
	
	public function play()
	{
		isPlaying = true;
	}
	
	public function stop()
	{
		isPlaying = false;
	}
	
}