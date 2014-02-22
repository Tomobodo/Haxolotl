package ;
import haxolotl.app.Screen;
import haxolotl.core.Scene;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;

/**
 * ...
 * @author Thomas BAUDON
 */
class ScoreScreen extends Screen
{
	
	var text : Text;
	var scene: Scene;

	public function new(score : Int) 
	{
		super();
		
		scene = new Scene();
		add(scene);
		
		var format = new TextFormat("arial", 0xffffff, 50);
		text = new Text("Score : " + score, format);
		
		scene.add(text);
		
		ADDED.add(onAdded);
	}
	
	function onAdded() 
	{
		text.pivotX = text.width / 2;
		text.pivotY = text.height / 2;
		
		text.x = scene.width / 2;
		text.y = scene.height/ 2;
	}
	
}