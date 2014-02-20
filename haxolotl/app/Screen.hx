package haxolotl.app;
import haxolotl.core.Engine;
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
	var m_engine : Engine;
	
	public var ADDED : Signal0;
	public var REMOVED : Signal0;
	public var UPDATED : Signal1<Float>;
	
	public function new() 
	{
		m_scenes = new Array<Scene>();
		
		ADDED = new Signal0();
		REMOVED = new Signal0();
		UPDATED = new Signal1<Float>();
	}
	
	public function add(scene : Scene)
	{
		m_scenes.push(scene);
		if (m_engine != null)
			m_engine.add(scene);
	}
	
	public function remove(scene : Scene)
	{
		m_scenes.remove(scene);
		if (m_engine != null)
			m_engine.remove(scene);
	}
	
	@:final
	function __updated(deltaTime : Float)
	{
		for (scene in m_scenes)
			scene.update(deltaTime);
		UPDATED.dispatch(deltaTime);
	}
	
	@:final
	function __added(engine : Engine)
	{
		m_engine = engine;
		for (scene in m_scenes)
			m_engine.add(scene);
		ADDED.dispatch();
	}
	
	@:final
	function __removed()
	{
		for (scene in m_scenes)
			m_engine.remove(scene);
		m_engine = null;
		REMOVED.dispatch();
	}
}