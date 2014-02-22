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

	public function new() 
	{
		super();
		
		atlas = Main.atlas;
		
		scene = new Scene();
		scene.UPDATED.add(onUpdate);
		add(scene);
		
		mouth = new Image(atlas.get("lol2"));
		mouth.interactive = true;
		scene.add(mouth);
		
		mouth.PRESSED.add(mouthPressed);
		mouth.RELEASED.add(mouthReleased);
		mouth.LEAVED.add(mouthReleased);
		
		scene.add(new FPS(new TextFormat("arial")));
	}
	
	public function onUpdate(deltaTime : Float) 
	{
		if (mouseDown)
			for (i in 0 ... 20)
				scene.add(new Bunny());
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