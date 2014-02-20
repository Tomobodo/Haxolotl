package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Scene;
import haxolotl.text.Font;
import haxolotl.text.Letter;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;
import haxolotl.text.Word;
import haxolotl.utils.FPS;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	var engine : Engine;
	var text:haxolotl.text.Text;
	var sampleStage:Scene;
	
	var texts : Array<String>;
	
	var angle : Float;
	var currentText:Int;
	
	var angleStep : Float; 
	var format:haxolotl.text.TextFormat;
	
	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		angleStep = (Math.PI * 2) / 240;
		
		var i = 0;
		texts = new Array<String>();
		texts[i++] = "Haxolotl is cool !";
		texts[i++] = "WOOOOAOAAAH!!! TEXT!!!";
		texts[i++] = "Hello world!";
		texts[i++] = "Axolotls are so cuuuute <3";
		texts[i++] = "Вы не пройдет!";
		texts[i++] = "شما نمی بگذرد";
		texts[i++] = "Bonjour mesdames et messieurs!";
		texts[i++] = "J'aime les lapins!";
		texts[i++] = "J'aime Haxolotl!";
		texts[i++] = "Tu aimes Haxolotl!";
		texts[i++] = "This is a very long text with\nmultiple line.\nI don't know what to write!\nBLABLABLA";
		
		engine = new Engine(stage);
		
		sampleStage = new Scene();
		engine.add(sampleStage);
		
		currentText = 0;
		
		format = new TextFormat("arial", 0, 24);
		var format2 = new TextFormat("pr_agamemnon", 0x9999ff, 40);
		
		text = new Text(getText(), format);
		sampleStage.add(text);
		
		sampleStage.add(new FPS(format2));
		
		sampleStage.UPDATED.add(onEnterFrame);
		
		angle = 0;
		
		text.interactive = true;
		text.HOVERED.add(onTextPressed);
	
		var laStr = "Haxolotl is a multiplatform Haxe\n" +
					"game engine. Its main goal is to\n" +
					"change multiplatform game making\n"  +
					"into an easy task...\n";
		
		var describe : Text = new Text(laStr, format2);
		describe.y = 100;
		sampleStage.add(describe);
	}
	
	function onEnterFrame(deltaTime : Float) 
	{
		angle += angleStep;
		
		if (angle >= Math.PI * 2)
		{
			angle = 0;
			format.color = cast Math.random() * 0xffffff;
			text.text = getText();
		}
		
		text.scaleX = Math.sin(angle);
			
		text.pivotX = text.width / 2;
		text.pivotY = text.height / 2;
		
		text.x = sampleStage.width / 2;
		text.y = sampleStage.height / 2;
		
		text.rotation += 0.005;
	}
	
	function getText() : String
	{
		var text = texts[currentText];
		currentText++;
		if (currentText == texts.length)
			currentText = 0;
		return text;
	}
	
	function onTextPressed(target : InteractiveObject) 
	{
		text.text = getText();
	}
	
	public static function main() 
	{
		Lib.current.addChild(new Main());
	}
}
