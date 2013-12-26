package ld28;
import flash.display.BitmapData;
import flash.utils.ByteArray;
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
	
	private static var cache = new  Map<String, Texture>();
	
	function new(_path : String, _mipMap : Bool = false) 
	{
		var bitmapData = Assets.getBitmapData(_path);
		
		texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		
		var pixels : ByteArray = bitmapData.getPixels(bitmapData.rect);
		
		var array = new Array<Int>();
		pixels.position = 0;
		for (i in 0 ... pixels.length)
			array.push(pixels.readUnsignedByte());
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, bitmapData.width, bitmapData.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, new UInt8Array(array));
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
		if(_mipMap)
			GL.generateMipmap(GL.TEXTURE_2D);
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
}