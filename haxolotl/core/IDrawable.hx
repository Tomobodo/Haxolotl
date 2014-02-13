package haxolotl.core;

import lime.utils.Matrix3D;

/**
 * ...
 * @author Thomas BAUDON
 */
interface IDrawable
{
	public function setProjectionMatrix(projection : Matrix3D) : Void;
	
	public function update() : Void;
	
	public function draw() : Void;
}