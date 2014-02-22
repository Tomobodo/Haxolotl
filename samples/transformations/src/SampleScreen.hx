package ;
import haxolotl.app.Screen;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;

/**
 * ...
 * @author Thomas BAUDON
 */
class SampleScreen extends Screen
{
	
	var scene : Scene;
	var bunny : Image;
	var time : Float;

	public function new() 
	{
		super();
		
		scene = new Scene();
		add(scene);
		
		var atlas : TextureAtlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		bunny = new Image(atlas.get("bunny"));
		
		scene.add(bunny);
		
		bunny.pivotX = bunny.width / 2;
		bunny.pivotY = bunny.height / 2;
		
		time = 0;
		
		scene.UPDATED.add(onEnterFrame);
	}
	
	function onEnterFrame(deltaTime : Float) 
	{
		bunny.x = scene.width / 2;
		bunny.y = scene.height / 2;
		time += 0.03;
		bunny.rotation+=0.01;
		bunny.scaleX = Math.sin(time) * 2;
		bunny.scaleY = 2;
	}
	
}