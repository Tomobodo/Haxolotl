package haxolotl.core;
import flash.geom.Rectangle;
import haxe.xml.Fast;
import openfl.Assets;

/**
 * ...
 * @author Thomas B
 */
class TextureAtlas
{

	var texture : Texture;
	var atlas : Fast;
	var regionMap : Map<String, TextureRegion>;
	
	public function new(_texture : Texture, _atlasPath : String) 
	{
		texture = _texture;
		var tempXml = Xml.parse(Assets.getText(_atlasPath));
		atlas = new Fast(tempXml);
		
		var root = atlas.node.TextureAtlas;
			
		regionMap = new Map<String, TextureRegion>();
		
		for (subTexture in root.nodes.SubTexture)
		{	
			var name = subTexture.att.name;
			var x = Std.parseFloat(subTexture.att.x);
			var y = Std.parseFloat(subTexture.att.y);
			var width = Std.parseFloat(subTexture.att.width);
			var height = Std.parseFloat(subTexture.att.height);
			
			var region = new TextureRegion(texture, new Rectangle(x, y, width, height));
			regionMap[name] = region;
		}
	}
	
	public function get(name : String) : TextureRegion
	{
		return regionMap[name];
	}
}