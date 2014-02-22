package ;
import haxolotl.app.Screen;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Scene;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.display.Image;
import haxolotl.text.TextFormat;
import haxolotl.utils.FPS;

/**
 * ...
 * @author Thomas BAUDON
 */
class SampleScreen extends Screen
{

	var scene : Scene;
	var container : DisplayObjectContainer;
	var time : Float;
	var alphaDirection : Float;
	
	public function new() 
	{
		super();
		
		time = 0;
		alphaDirection = 0.01;

		var atlas = Main.atlas;
		
		scene = new Scene();
		add(scene);
		
		var bunnies = new Array<Image>();
		container = new DisplayObjectContainer();
		
		var nbBunnies = 12;
		var angleStep = (2 * Math.PI) / nbBunnies;
		
		for (i in 0 ... nbBunnies)
		{
			var bunny = new Image(atlas.get("bunny"));
			bunny.pivotX = bunny.width / 2;
			bunny.pivotY = bunny.height / 2;
			bunny.color = Std.int(Math.random() * 0xffffff);
			
			bunny.x = 100 * Math.cos(i * angleStep);
			bunny.y = 100 * Math.sin(i * angleStep);
			container.add(bunny);
		}
		
		scene.add(container);
		scene.add(new FPS(new TextFormat("arial", 0, 12)));
		
		container.PRESSED.add(onContainerPressed);
		container.UPDATED.add(onContainerUpdate);
		
		ADDED.add(onAdded);
	}
	
	function onAdded()
	{
		container.x = scene.width / 2;
		container.y = scene.height / 2;
	}
	
	function onContainerPressed(target : InteractiveObject) 
	{
		container.removeAll();
	}
	
	function onContainerUpdate(delta : Float) 
	{
		time++;
		container.rotation += 0.01;
		container.alpha += alphaDirection;
		if (container.alpha <= 0)
		{
			container.alpha = 0;
			alphaDirection = 0.01;
		}else if (container.alpha >= 1)
		{
			container.alpha = 1;
			alphaDirection = -0.01;
		}
		
		for (bunny in container.children)
			bunny.rotation -= 0.01;
	}
	
}