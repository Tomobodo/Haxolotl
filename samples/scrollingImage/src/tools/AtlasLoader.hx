package tools;
import haxolotl.core.TextureAtlas;

/**
 * ...
 * @author Ynk33
 */
class AtlasLoader
{
	private var atlases:Map<String, TextureAtlas>;
	
	public function new() 
	{
		atlases = new Map<String, TextureAtlas>();
	}
	
	public function add(_atlas:TextureAtlas, _name:String)
	{
		if (atlases.exists(_name))
		{
			trace("warning : " + _name + " already mapped => overwritten");
		}
		this.atlases.arrayWrite(_name, _atlas);
	}
	
	public function remove(_name:String)
	{
		if (atlases.exists(_name))
		{
			atlases.remove(_name);
		}
		else
		{
			trace(_name + " not mapped => nothing done");
		}
	}
	
	public function get(_name:String):TextureAtlas
	{
		if (atlases.exists(_name))
		{
			return atlases.get(_name);
		}
		else
		{
			return null;
		}
	}
}