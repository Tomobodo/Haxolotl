package ;
import haxolotl.core.Engine;

/**
 * ...
 * @author Thomas BAUDON
 */

class Main
{
	
	public function new() 
	{
		trace("initialisation");
	}
	
	public function ready(lime : lime.Lime)
	{
		var engine : Engine = new Engine(lime);
	}
	
	public static function main()
	{
		new Main();
	}
	
	
	
	
}
