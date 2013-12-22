package ld28;
import flash.display.Stage;

/**
 * ...
 * @author Thomas BAUDON
 */
class Screen
{
	var screenManager : ScreenManager;
	var stage : Stage;
	
	public function new() 
	{
		
	}
	
	public function onPushed(_screenManager : ScreenManager, _stage : Stage)
	{
		screenManager = _screenManager;
		stage = _stage;
		play();
	}
	
	public function onRemoved()
	{
		pause();
		screenManager.removeScreen(this);
	}
	
	public function play()
	{
	}
	
	public function pause()
	{
	}
	
	public function render()
	{
	}
}