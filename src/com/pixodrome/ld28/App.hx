package com.pixodrome.ld28;

import com.pixodrome.ld28.meshes.SpriteBatch;
import com.pixodrome.ld28.Renderer;
import flash.geom.Rectangle;

/**
 * ...
 * @author Thomas BAUDON
 */
class App
{
	var renderer : Renderer;
	
	var quads : Array<Quad>;
	var batch : SpriteBatch;

	public function new() 
	{
		initRenderer();
		
		batch = new SpriteBatch();
		
		quads = new Array<Quad>();
		
		for (i in 0 ... 5000)
		{
			var quad = new Quad(64, 64);
			
			quad.x = Math.random() * 800;
			quad.y = Math.random() * 480;
			quad.rotation = Math.random() * 360;
			
			quads.push(quad);
			batch.add(quad);
		}
		
		renderer.addMesh(batch);
	}
	
	function initRenderer():Void 
	{
		renderer = new Renderer();
	}
		
	public function update() 
	{
		for (i in 0 ... quads.length)
			quads[i].rotation ++;
	}
	
	public function render() 
	{
		this.renderer.render(new Rectangle(0, 0, 800, 480));
	}
}

