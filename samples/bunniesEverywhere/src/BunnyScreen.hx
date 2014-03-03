package ;
import haxolotl.app.Screen;
import haxolotl.core.Scene;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;
import haxolotl.utils.FPS;
import haxolotl.core.InteractiveObject;
import haxolotl.text.TextFormat;

/**
 * ...
 * @author Thomas BAUDON
 */
class BunnyScreen extends Screen
{
	
	var scene : Scene;
	var mouth : Image;
	var atlas : TextureAtlas;
	var mouseDown : Bool;
	var bunnies : Array<Bunny>;

	public function new() 
	{
		super();
		
		atlas = Main.atlas;
		
		scene = new Scene();
		add(scene);
		
		mouth = new Image(atlas.get("lol2"));
		mouth.interactive = true;
		scene.add(mouth);
		
		bunnies = new Array<Bunny>();
		
		mouth.PRESSED.add(mouthPressed);
		mouth.RELEASED.add(mouthReleased);
		mouth.LEAVED.add(mouthReleased);
		
		scene.add(new FPS(new TextFormat("arial")));
	}
	
	override public function update(deltaTime : Float) 
	{
		if (mouseDown)
			for (i in 0 ... 20)
			{
				var bunny = new Bunny();
				bunnies.push(bunny);
				scene.add(bunny);
			}
		for (bunny in bunnies)
			bunny.onEnterFrame(deltaTime);
	}
	
	function mouthReleased(target : InteractiveObject) 
	{
		mouth.updateFrame(atlas.get("lol2"));
		mouseDown = false;
	}
	
	function mouthPressed(target : InteractiveObject) 
	{
		mouth.updateFrame(atlas.get("lol"));
		mouseDown = true;
	}
	
}