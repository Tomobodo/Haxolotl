package haxolotl.app;
import haxolotl.core.render.Renderer;
import haxolotl.core.Scene;
import haxolotl.Haxolotl;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

/**
 * ...
 * @author Thomas B
 */
@:allow(haxolotl.Haxolotl)
class Screen
{
	
	var m_scenes : Array<Scene>;
	var m_renderer : Renderer;
	
	public var ADDED : Signal0;
	public var REMOVED : Signal0;
	
	public function new() 
	{
		m_scenes = new Array<Scene>();
		
		ADDED = new Signal0();
		REMOVED = new Signal0();
	}
	
	public function add(scene : Scene)
	{
		m_scenes.push(scene);
		if (m_renderer != null)
			m_renderer.add(scene);
	}
	
	public function remove(scene : Scene)
	{
		m_scenes.remove(scene);
		if (m_renderer != null)
			m_renderer.remove(scene);
	}
	
	
	function update(deltaTime : Float)
	{
	}
	
	@:final
	function __added(renderer : Renderer)
	{
		m_renderer = renderer;
		for (scene in m_scenes)
			m_renderer.add(scene);
		ADDED.dispatch();
	}
	
	@:final
	function __removed()
	{
		for (scene in m_scenes)
			m_renderer.remove(scene);
		m_renderer = null;
		REMOVED.dispatch();
	}
}