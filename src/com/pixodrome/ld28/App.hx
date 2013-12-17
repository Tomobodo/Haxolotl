package com.pixodrome.ld28;

import com.pixodrome.ld28.d2.DisplayObject;
import com.pixodrome.ld28.d2.Plane2D;
import com.pixodrome.ld28.d3.meshes.Plane;
import com.pixodrome.ld28.d3.meshes.SpriteBatch;
import com.pixodrome.ld28.Renderer;
import flash.geom.Point;
import flash.geom.Rectangle;
import flash.geom.Vector3D;
import flash.Lib;
import motion.Actuate;
import openfl.Assets;

/**
 * ...
 * @author Thomas BAUDON
 */
class App
{
	var renderer : Renderer;
	
	var pawns : Array<Array<Pawn>>;
	
	var nbColumns : Int = 10;
	var nbLine : Int = 16;

	public function new() 
	{
		initRenderer();
		
		pawns = new Array<Array<Pawn>>();
		
		for (i in 0 ... nbLine)
		{
			var line = new Array<Pawn>();
			for (j in 0 ... nbColumns)
			{
				var pawn = new Pawn(Std.int (Math.random() * 4 + 1));
				pawn.position.x = j * pawn.getBoundingBox().width;
				pawn.position.y = i * pawn.getBoundingBox().height;
				
				line.push(pawn);
				renderer.add(pawn);
			}
			pawns.push(line);
		}
		
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
		x = cast (x * (480 / Main.screenWidth));
		y = cast (y * (768 / Main.screenHeigth));
		
		var clickX = Std.int(x / 48);
		var clickY = Std.int(y / 48);
		
		var clickedPawn : Pawn = pawns[clickY][clickX];
		
		checkPawns(clickX, clickY, clickedPawn.color);
		
		for (i in 0 ... nbLine)
		{
			for (j in 0 ... nbColumns)
			{
				var pawn = pawns[i][j];
				if (pawn.checked)
					Actuate.tween(pawn.scale, 0.3, { x:0, y:0 } ).onComplete(renderer.remove, [pawn]);
			}
		}
	}
	
	public function onTouchUp(x : Int, y : Int) : Void
	{
	}
	
	public function onTouchMove(x : Int, y : Int) : Void
	{
	}
	
	private function checkPawns(x : Int, y : Int, color : Int) : Void
	{
		var pawn : Pawn = pawns[y][x]; 
		pawn.checked = true;
		
		if (x + 1 < nbColumns)
		{
			pawn = pawns[y][x + 1];
			if (pawn.color == color && pawn.checked == false)
				checkPawns(x + 1, y, color);
		}
		
		if (x - 1 >= 0)
		{
			pawn = pawns[y][x - 1];
			if (pawn.color == color && pawn.checked == false)
				checkPawns(x - 1, y, color);
		}
		
		if (y + 1 < nbLine)
		{
			pawn = pawns[y + 1][x];
			if (pawn.color == color && pawn.checked == false)
				checkPawns(x, y + 1, color);
		}
		
		if (y - 1 >= 0)
		{
			pawn = pawns[y - 1][x];
			if (pawn.color == color && pawn.checked == false)
				checkPawns(x, y - 1, color);
		}
	}
}

