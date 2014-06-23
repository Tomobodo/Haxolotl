package haxolotl;

import flash.system.Capabilities;
import haxe.xml.Fast;
import openfl.Assets;

#if html5
import js.Browser;
#end

/**
 * ...
 * @author Thomas B
 */
class Localisation
{

	var m_xml : Fast;
	var m_lang : String;
	var m_map : Map<String, String>;
	
	static inline var DEFAULT_LANG : String = "en";
	
	public function new(path : String, lang : String = null) 
	{
		var string = Assets.getText(path);
		var tempXml = Xml.parse(string);
		m_xml = new Fast(tempXml);
		
		if (lang == null) {
			
			#if html5
			try {
				lang = untyped __js__('chilican_language');
			}catch (e : Dynamic) {
				lang = Browser.window.navigator.language;
			}
			#else
			lang = Capabilities.language;
			#end
		}
		
		m_lang = lang;
		
		m_map = new Map<String, String>();
		
		var root = m_xml.node.data;
		var langNode : Fast = null;
		for (node in root.nodes.lang)
			if (node.att.name == m_lang)
			{
				langNode = node;
				break;
			}
		
		if(langNode == null)
		for (node in root.nodes.lang)
			if (node.att.name == DEFAULT_LANG)
			{
				langNode = node;
				break;
			}
		
		for (node in langNode.nodes.text)
			m_map[node.att.title] = StringTools.replace(Std.string(node.innerData),"\n","");
	}
	
	public function getText(title : String) : String
	{
		return m_map[title];
	}
	
	public function getLangIso() : String {
		if (m_lang == "en")
			return 'en_US';
		else
			return m_lang + '_' + m_lang.toUpperCase();
	}
	
}