package haxolotl;
import flash.events.Event;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.media.SoundTransform;

/**
 * ...
 * @author Thomas B
 */
class SoundManager
{
	
	private static var instance : SoundManager;
	
	var m_playingSoundChannels : Array<SoundChannel>;
	var m_volume : Float;
	var m_soundTransform : SoundTransform;
	
	public var isMute : Bool;
	
	public static function getInstance() : SoundManager
	{
		if (instance == null)
			new SoundManager();
		return instance;
	}
	
	function new() 
	{
		instance = this;
		m_volume = 1;
		isMute = false;
		m_soundTransform = new SoundTransform(m_volume);
		m_playingSoundChannels = new Array<SoundChannel>();
	}
	
	public function playSound(sound : Sound) : Void
	{
		var channel = sound.play();
		channel.soundTransform = m_soundTransform;
		m_playingSoundChannels.push(channel);
		channel.addEventListener(Event.SOUND_COMPLETE, onSoundComplete);
	}
	
	private function onSoundComplete(e:Event):Void 
	{
		m_playingSoundChannels.remove(e.target);
	}
	
	public function mute()
	{
		isMute = true;
		m_soundTransform.volume = 0;
		update();
	}
	
	public function unmute()
	{
		isMute = false;
		m_soundTransform.volume = 1;
		update();
	}
	
	function update()
	{
		for (soundChannel in m_playingSoundChannels)
			soundChannel.soundTransform = m_soundTransform;
	}
	
}