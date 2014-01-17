package ld28;

import ld28.core.Program;

/**
 * ...
 * @author Thomas BAUDON
 */
class ShaderManager
{

	static var instance : ShaderManager;
	
	var programs : Map<String, Program>;
	
	public static function get() : ShaderManager
	{
		if (instance == null)
			instance = new ShaderManager();
		return instance;
	}
	
	function new() 
	{
		programs = new Map<String, Program>();
	}
	
	public function program(_program : Class<Program>) : Program
	{
		var key = Type.getClassName(_program);
		
		if (programs[key] == null)
			programs[key] = Type.createInstance(_program, []);
		return programs[key];	
	}
	
}