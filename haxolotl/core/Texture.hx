package haxolotl.core;

import format.png.Tools;
import haxe.io.Bytes;

import haxe.io.BytesInput;
import haxe.zip.Reader;

import lime.gl.GLTexture;
import lime.gl.GL;
import lime.utils.Assets;
import lime.utils.UInt8Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Texture
{
	public var texture : GLTexture;
	
	public var width (get, null) : Int ;
	public var height (get, null) : Int;
	
	public var path : String;
	
	private var textureData : UInt8Array;
	
	private static var cache = new  Map<String, Texture>();
	
	function new(_path : String) 
	{
		path = _path;
		
		var bytes = Assets.getBytes(path);
		var byteInput = new BytesInput(bytes, 0, bytes.length);
		var png = new Reader(byteInput).read();
		var pixels = Tools.extract32(png);
		var header = Tools.getHeader(png);
		
		width = header.width;
		height = header.height;
			
		texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, bitmapData.width, bitmapData.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, pixels);
		if (checkPOT())
		{
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_NEAREST);
			GL.generateMipmap(GL.TEXTURE_2D);
		}
		else
		{
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
		}
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
	public static function get(name : String) : Texture
	{
		if (cache[name] == null)
			cache[name] = new Texture(name);
		return cache[name];
	}
	
	public function dispose()
	{
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