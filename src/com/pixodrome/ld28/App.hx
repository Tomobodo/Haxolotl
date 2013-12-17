package com.pixodrome.ld28;

import com.pixodrome.ld28.d2.DisplayObject;
import com.pixodrome.ld28.d3.meshes.Plane;
import com.pixodrome.ld28.d3.meshes.SpriteBatch;
import com.pixodrome.ld28.Renderer;
import flash.geom.Rectangle;
import flash.geom.Vector3D;
import flash.Lib;
import openfl.Assets;

/**
 * ...
 * @author Thomas BAUDON
 */
class App
{
	var renderer : Renderer;
	
	var model : Model;

	public function new() 
	{
		initRenderer();
		
		model = new Model(new Plane(64, 64), new Texture("img/avatar.png"));
		
		renderer.add(model);
	}
	
	function initRenderer():Void 
	{
		renderer = new Renderer();
	}
			
	public function update() 
	{
	}
	
	public function render(viewport : Rectangle) 
	{
		this.renderer.render(viewport);
	}
	
	public function onTouchDown(x : Int, y : Int) : Void
	{
		model.position.x = x;
		model.position.y = y;
	}
	
	public function onTouchUp(x : Int, y : Int) : Void
	{
		//model.position.x = x;
		//model.position.y = y;
	}
	
	public function onTouchMove(x : Int, y : Int) : Void
	{
		model.position.x = x;
		model.position.y = y;
	}
}

