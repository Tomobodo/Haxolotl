package ;
import flash.Lib;
import haxolotl.app.Screen;
import haxolotl.core.Scene;
import haxolotl.core.Texture;
import haxolotl.core.TextureAtlas;
import haxolotl.core.TextureRegion;
import haxolotl.display.Image;
import haxolotl.Haxolotl;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;
import haxolotl.utils.FPS;

/**
 * ...
 * @author Thomas BAUDON
 */
class RunnerScreen extends Screen
{
	
	var scene : Scene;
	var fps : FPS;
	var score : Int = 0;
	var scoreTxt : Text;
	var monsters : Array<Monster>;
	var atlas : TextureAtlas;
	
	var bg : Array<Image>;
	var ground : Array<Image>;
	var groundX : Float;
	
	var runner : Image;
	var runnerFrames : Array<TextureRegion>;
	var runnerCurrentFrame : Int;
	
	var lastFluidFPS : Int = 0;
	
	static private inline var GROUND_SPEED:Float = 250;
	static private inline var FRAME_SAMPLE:Float = 30;

	public function new() 
	{
		super();
		
		atlas = Main.atlas;
		
		scene = new Scene();
		add(scene);
		
		var format = new TextFormat("arial", 0xffffff, 24);
		fps = new FPS(format);
		
		scene.add(fps);
		
		scoreTxt = new Text("Score : ", format);
		scoreTxt.x = 200;
		scene.add(scoreTxt);
		
		ADDED.add(onAdded);
	}
	
	function onAdded() 
	{
		initBg();
		initRunner();
		initGround();
		
		monsters = new Array<Monster>();
		addMonster();
	}
	
	function addMonster() 
	{
		var monster = new Monster();
		monster.x = scene.width + 20 + cast Math.random() * 300;
		monsters.push(monster);
		scene.add(monster);
	}
	
	function updateMonster(deltaTime : Float)
	{
		for (monster in monsters)
			monster.x -= GROUND_SPEED * deltaTime;
	}
	
	function initGround() 
	{
		ground = new Array<Image>();
		groundX = 0;
		for (i in 0 ... 4)
		{
			var newGround = new Image(atlas.get("groundTop"));
			newGround.y = scene.height - 32;
			newGround.x = groundX + i * newGround.width;
			ground.push(newGround);
			scene.add(newGround);
		}
	}
	
	function updateGround(deltaTime : Float)
	{
		groundX -= GROUND_SPEED * deltaTime;
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
		scene.add(runner);
		runner.x = 20;
		runner.y = scene.height - runner.height - 30;
	}
	
	function updateRunner(deltaTime : Float)
	{
		runnerCurrentFrame++;
		if (runnerCurrentFrame > runnerFrames.length - 1)
			runnerCurrentFrame = 0;
		runner.updateFrame(runnerFrames[runnerCurrentFrame]);
		runner.x = 150 + Math.sin(Lib.getTimer() / 1000) * 120;
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
			background.height = scene.height * .7 - 50;
			background.scaleX = background.scaleY;
			background.y = scene.height - background.height - 15;
			scene.add(background);
		}
		
		bg[1].x = bg[0].width;
		bg[3].x = bg[3].width;
	}
	
	function uppdateBg(elapsed : Float)
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
	
	override function update(deltaTime : Float) 
	{
		uppdateBg(deltaTime);
		updateRunner(deltaTime);
		updateGround(deltaTime);
		updateMonster(deltaTime);
		fps.update(deltaTime);
		
		for (monster in monsters)
			monster.update(deltaTime);
		
		if (fps.fps >= 58)
		{
			score = fps.fps * 10 + monsters.length;
			scoreTxt.text = "Score : " + score;
			addMonster();
			lastFluidFPS = Lib.getTimer();
		}
		
		var currentTime = Lib.getTimer();
		if (currentTime - lastFluidFPS > 5000)
			Haxolotl.current.gotoScreen(new ScoreScreen(score));
	}
	
}