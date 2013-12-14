package com.pixodrome.ld28;

import com.pixodrome.ld28.meshes.Plane2;
import com.pixodrome.ld28.meshes.SpriteBatch;
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
	
	var quads : Array<Quad>;
	var batch : SpriteBatch;
	
	var model : Model;

	public function new() 
	{
		initRenderer();
		
		batch = new SpriteBatch();
		
		quads = new Array<Quad>();
		
		for (i in 0 ... 5)
		{
			var quad = new Quad(64, 64);
			
			quad.x = Math.random() * 800;
			quad.y = Math.random() * 480;
			quad.rotation = Math.random() * 360;
			
			quads.push(quad);
			batch.add(quad);
		}
		
		renderer.addMesh(batch);
		
		model = new Model(new Plane2(64,64), new Texture("img/avatar.png"));
		model.position.x = 100;
		model.position.y = 100;
	}
	
	function initRenderer():Void 
	{
		renderer = new Renderer();
	}
		
	public function update() 
	{
		for (i in 0 ... quads.length)
			quads[i].rotation ++;
		model.rotation.z = Math.sin(Lib.getTimer()/100) * 10;
	}
	
	public function render(viewport : Rectangle) 
	{
		//this.renderer.render(viewport);
		model.draw(renderer);
	}
}

