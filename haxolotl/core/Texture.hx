package haxolotl.core;
import flash.display.BitmapData;
import flash.utils.ByteArray;
import openfl.display.OpenGLView;
import openfl.gl.GLTexture;
import openfl.gl.GL;
import openfl.Assets;
import openfl.utils.UInt8Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Texture
{
	public var texture : GLTexture;
	public var bitmapData : BitmapData;
	
	public var width (get, null) : Int ;
	public var height (get, null) : Int;
	
	public var path : String;
	
	private static var cache = new  Map<String, Texture>();
	
	private static var loadedTexture : Array<Texture> = new Array<Texture>();
	
	var pixels : UInt8Array;
	
	public static function get(name : String) : Texture
	{
		if (cache[name] == null)
			cache[name] = new Texture(name);
		return cache[name];
	}
	
	public static function reloadAll()
	{
		for (texture in loadedTexture)
			texture.load();
	}
	
	function new(_path : String) 
	{
		path = _path;
		bitmapData = Assets.getBitmapData(path);
		
		#if html5
		pixels = bitmapData.getPixels(bitmapData.rect).byteView;
		#else
		pixels = new UInt8Array(bitmapData.getPixels(bitmapData.rect));
		#end
		
		width = bitmapData.width;
		height = bitmapData.height;
		
		if (OpenGLView.isSupported)
		{
			loadedTexture.push(this);
			load();
		}
	}
	
	public function load()
	{
		texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, pixels);
		if (checkPOT())
		{
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		}
		else
		{
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
		}
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
	public function dispose()
	{
		loadedTexture.remove(this);
		GL.deleteTexture(texture);
	}
	
	function get_width():Int 
	{
		return width;
	}
	
	function get_height():Int 
	{
		return height;
	}
	
	function checkPOT() : Bool
	{
		var widthPOT : Bool = width != 0 && width & (width - 1) == 0;
		var heightPOT : Bool = height != 0 && height & (height - 1) == 0;
		
		return widthPOT && heightPOT;
	}
}