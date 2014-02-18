package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxolotl.core.Engine;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Stage;
import haxolotl.display.TextField;
import haxolotl.core.Font;

/**
 * ...
 * @author Thomas B
 */

class Main extends Sprite 
{
	var engine : Engine;
	var text:haxolotl.display.TextField;
	var sampleStage:Stage;
	
	var texts : Array<String>;
	
	var angle : Float;
	var currentText:Int;
	
	var angleStep : Float; 
	
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
		
		engine = new Engine(stage);
		
		sampleStage = new Stage();
		engine.add(sampleStage);
		
		currentText = 0;
		
		text = new TextField(Font.get("pr_agamemnon"), getText(), 0xff0000);
		sampleStage.add(text);
		
		sampleStage.UPDATED.add(onEnterFrame);
		
		angle = 0;
		
		text.HOVERED.add(onTextPressed);
	}
	
	function onEnterFrame(deltaTime : Float) 
	{
		angle += angleStep;
		
		if (angle >= Math.PI * 2)
		{
			angle = 0;
			text.color = cast Math.random() * 0xffffff;
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
