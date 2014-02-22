package ;
import haxolotl.app.Screen;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Scene;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;
import haxolotl.utils.FPS;

/**
 * ...
 * @author Thomas BAUDON
 */
class SampleScreen extends Screen
{
	var angleStep : Float;
	var scene : Scene;
	var texts:Array<String>;
	var currentText : Int;
	var format : TextFormat;
	var text : Text;
	var angle : Float;

	public function new() 
	{
		super();
		
		scene = new Scene();
		add(scene);
		
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
		
		currentText = 0;
		
		format = new TextFormat("arial", 0, 24);
		var format2 = new TextFormat("pr_agamemnon", 0x9999ff, 40);
		
		text = new Text(getText(), format);
		scene.add(text);
		scene.add(new FPS(format2));
		angle = 0;
		
		var laStr = "Haxolotl is a multiplatform Haxe\n" +
					"game engine. Its main goal is to\n" +
					"change multiplatform game making\n"  +
					"into an easy task...\n";
		
		var describe : Text = new Text(laStr, format2);
		describe.y = 100;
		scene.add(describe);
		
		text.interactive = true;
		text.HOVERED.add(onTextPressed);
		
		UPDATED.add(onUpdate);
	}
	
	function onUpdate(deltaTime : Float) 
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
		
		text.x = scene.width / 2;
		text.y = scene.height / 2;
		
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
	
}