package ;
import haxolotl.core.TextureAtlas;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;

/**
 * ...
 * @author Thomas B
 */
class Monster extends Image
{

	var frames : Array<TextureRegion>;
	var currentFrame : Int;
	var bounceRate : Int;
	var bounceCount : Int = 0;
	var vity : Float;
	
	public function new() 
	{
		var atlas : TextureAtlas = Main.atlas;
		frames = atlas.getAnimation("Enemy.swf/");
		currentFrame = 0;
		vity = 0;
		super(frames[currentFrame]);
		bounceRate = cast Math.random() * 1000;
	}
	
	override public function update(deltaTime : Float) 
	{
		currentFrame++;
		if (currentFrame == frames.length)
			currentFrame = 0;
		updateFrame(frames[currentFrame]);
		
		if (x < -width)
			x = stage.width;
			
		bounceCount ++;
		
		vity += 15;
		y += vity * deltaTime;
		
		if (y > stage.height - 30 - height)
		{
			y = stage.height - 30 - height;
			vity = 0;
		}
		
		if (bounceCount >= bounceRate)	
		{
			bounceCount = 0;
			bounceRate = cast Math.random() * 1000;
			bounce();
		}
	}
	
	function bounce()
	{
		vity -= 500;
	}
	
}