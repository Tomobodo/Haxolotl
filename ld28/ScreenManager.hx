package ld28;
import flash.display.Stage;
import flash.geom.Rectangle;

/**
 * ...
 * @author Thomas BAUDON
 */
class ScreenManager
{
	
	var screenList : List<Screen>;
	
	var stage : Stage;
	
	public function new(_stage : Stage) 
	{
		screenList = new List<Screen>();
		stage = _stage;
	}
	
	public function pushScreen(_screen : Screen, pausePrevious : Bool = true)
	{
		_screen.onPushed(this, stage);
		
		var currentScreen = screenList.last();
		if (currentScreen != null && pausePrevious)
			currentScreen.pause();
			
		screenList.push(_screen);
	}
	
	public function gotoScreen(_screen : Screen)
	{
		var currentScreen = screenList.last();
		if (currentScreen != null)
			currentScreen.onRemoved();

		pushScreen(_screen);
	}
	
	public function removeScreen(_screen : Screen)
	{
		screenList.remove(_screen);
		
		var currentScreen = screenList.last();
		if (currentScreen != null)
			currentScreen.play();
	}
	
	public function render(viewport : Rectangle)
	{
		for (screen in screenList)
			screen.render(viewport);
	}
	
	public function setViewport(rectangle:Rectangle) 
	{
		for (screen in screenList)
			screen.setViewport(rectangle);
	}
}