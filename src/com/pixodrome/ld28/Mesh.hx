package com.pixodrome.ld28;

/**
 * ...
 * @author Thomas BAUDON
 */
class Mesh
{
	
	public var vertices : Array<Float>;
	public var texCoord : Array<Float>;
	public var colors : Array<Float>;

	public function new(vertices : Array<Float>, texCoord : Array<Float>, colors : Array<Float>) 
	{
		this.vertices = vertices;
		this.texCoord = texCoord;
		this.colors = colors;
	}
	
}