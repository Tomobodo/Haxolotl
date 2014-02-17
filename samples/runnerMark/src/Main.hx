package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.Font;
import haxolotl.core.Stage;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.core.TextureRegion;
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
	public static var atlas:TextureAtlas;
	var statStage:Stage;
	var statTxt:TextField;
	
	var score : Int = 0;
	var fps : Int = 0;
	var lastXFrameTime : Int = 0;
	var nbFrame : Int = 0;
	var prevTime : Int = 0;
	
	var bg : Array<Image>;
	var ground : Array<Image>;
	var groundX : Float;
	var elapsed:Int;
	
	var runner : Image;
	var runnerFrames : Array<TextureRegion>;
	var runnerCurrentFrame : Int;
	
	var monsters : Array<Monster>;
	
	var addMonsterCounter : Int = 0;
	
	static private inline var GROUND_SPEED:Float = 0.4;
	
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
		
		engine.add(statStage);
		engine.add(runnerStage);
		
		statTxt = new TextField(Font.get("arial"), "FPS : " + fps + " Score : " + score, 0xFFFFFF);
		statStage.add(statTxt);
		
		atlas = new TextureAtlas(Texture.get("img/RunnerMark.png"), "img/RunnerMark.xml");
		
		initBg();
		initRunner();
		initGround();
		
		monsters = new Array<Monster>();
		addMonster();
	}
	
	function addMonster() 
	{
		var monster = new Monster();
		monster.x = runnerStage.width + 20 + cast Math.random() * 300;
		monsters.push(monster);
		runnerStage.add(monster);
	}
	
	function updateMonster()
	{
		for (monster in monsters)
			monster.x -= GROUND_SPEED * elapsed;
	}
	
	function initGround() 
	{
		ground = new Array<Image>();
		groundX = 0;
		for (i in 0 ... 4)
		{
			var newGround = new Image(atlas.get("groundTop"));
			newGround.y = runnerStage.height - 32;
			newGround.x = groundX + i * newGround.width;
			ground.push(newGround);
			runnerStage.add(newGround);
		}
	}
	
	function updateGround()
	{
		groundX -= GROUND_SPEED * elapsed;
		if (groundX <= -ground[0].width)
			groundX += ground[0].width;
		for (i in 0 ... ground.length)
		{
			var current = ground[i];
			current.x = groundX + i * (current.width - 3);
		}
	}
	
	function initRunner() 
	{
		runnerFrames = atlas.getAnimation("Runner.swf/");
		runnerCurrentFrame = 0;
		runner = new Image(runnerFrames[runnerCurrentFrame]);
		runnerStage.add(runner);
		runner.x = 20;
		runner.y = runnerStage.height - runner.height - 30;
	}
	
	function updateRunner()
	{
		runnerCurrentFrame++;
		if (runnerCurrentFrame > runnerFrames.length - 1)
			runnerCurrentFrame = 0;
		runner.updateFrame(runnerFrames[runnerCurrentFrame]);
		runner.x = 150 + Math.sin(prevTime / 1000) * 120;
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
			background.y = runnerStage.height - background.height - 15;
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
				background.x -= GROUND_SPEED / 4 * elapsed; 
			else
				background.x -= GROUND_SPEED / 2 * elapsed; 
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
		updateRunner();
		updateGround();
		updateMonster();
		
		if (fps > 58)
		{
			score = fps * 10 + monsters.length;
			
			for(i in 0 ... 5)
				addMonster();
		}
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
