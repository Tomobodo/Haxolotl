package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.display.Image;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	
	var engine : Engine;
	var container:haxolotl.display.DisplayObjectContainer;
	var time : Int;
	
	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		engine = new Engine(stage);
		
		var sampleScene = new Stage();
		engine.add(sampleScene);
		
		var atlas = new TextureAtlas(Texture.get("img/atlas.png"), "img/atlas.xml");
		
		var bunnies = new Array<Image>();
		container = new DisplayObjectContainer();
		
		var nbBunnies = 12;
		var angleStep = (2 * Math.PI) / nbBunnies;
		
		for (i in 0 ... nbBunnies)
		{
			var bunny = new Image(atlas.get("bunny"));
			bunny.pivotX = bunny.width / 2;
			bunny.pivotY = bunny.height / 2;
			bunny.color = cast Math.random() * 0xffffff;
			
			bunny.x = 100 * Math.cos(i * angleStep);
			bunny.y = 100 * Math.sin(i * angleStep);
			container.add(bunny);
		}
		
		sampleScene.add(container);
		
		container.ENTER_FRAME.add(containerEnterFrame);
		container.x = sampleScene.width / 2;
		container.y = sampleScene.height / 2;
		
		container.PRESSED.add(onContainerPressed);
		
		time = 0;
	}
	
	function onContainerPressed(target : InteractiveObject) 
	{
		container.removeAll();
	}
	
	var alphaDirection : Float = -0.01;
	
	function containerEnterFrame() 
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
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
