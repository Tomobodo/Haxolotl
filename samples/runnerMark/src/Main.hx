package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.Font;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.display.Image;
import haxolotl.display.TextField;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	var engine:Engine;
	var runnerStage:Stage;
	var atlas:TextureAtlas;
	var statStage:Stage;
	var statTxt:TextField;
	
	var score : Int = 0;
	var fps : Int = 0;
	var lastXFrameTime : Int = 0;
	var nbFrame : Int = 0;
	var prevTime : Int = 0;
	
	var bg : Array<Image>;
	var elapsed:Int;
	
	public function new()
	{
		super();
		
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		engine = new Engine(stage);
		engine.backGroundColor.set(0);
		
		runnerStage = new Stage();
		runnerStage.ENTER_FRAME.add(onRunnerEnterFrame);
		
		statStage = new Stage();
		
		engine.add(runnerStage);
		engine.add(statStage);
		
		statTxt = new TextField(Font.get("arial"), "FPS : " + fps + " Score : " + score, 0xFFFFFF);
		statStage.add(statTxt);
		
		atlas = new TextureAtlas(Texture.get("img/RunnerMark.png"), "img/RunnerMark.xml");
		
		initBg();
	}
	
	function initBg() 
	{
		bg = new Array<Image>();
		
		bg.push(new Image(atlas.get("bg1")));
		bg.push(new Image(atlas.get("bg1")));
		
		bg.push(new Image(atlas.get("bg2")));
		bg.push(new Image(atlas.get("bg2")));
		
		for (background in bg)
		{
			background.height = runnerStage.height * .7 - 50;
			background.scaleX = background.scaleY;
			background.y = runnerStage.height - background.height;
			runnerStage.add(background);
		}
		
		bg[1].x = bg[0].width;
		bg[3].x = bg[3].width;
	}
	
	function uppdateBg()
	{
		var a : Int = 0;
		for (background in bg)
		{
			if(a < 2)
				background.x -= 0.3 * elapsed; 
			else
				background.x -= 0.5 * elapsed; 
			if ((background.x + background.width) <= 0)
				background.x = background.width;
			a++;
		}
	}
	
	function onRunnerEnterFrame() 
	{
		statTxt.text = "FPS : " + fps + " Score : " + score;
		
		elapsed = Lib.getTimer() - prevTime;
		prevTime = Lib.getTimer();
		lastXFrameTime += elapsed;
		nbFrame++;
		if (nbFrame == 60)
		{
			var moy = lastXFrameTime / 60;
			fps = Std.int((1 / moy) * 1000);
			nbFrame = 0;
			lastXFrameTime = 0;
		}
		
		uppdateBg();
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
