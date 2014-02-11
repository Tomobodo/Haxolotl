 <center>![alt text](http://media.giphy.com/media/ebkgcMQPRbcC4/giphy.gif "I'm an Axolotl, i'm so cool!")</center>
#Haxolotl

**Current version**: 0.4.2

A simple haxe game engine based on [**OpenFL**][OpenFL] GLView forgood performance on html target and 3d rendering (later).

Crossplatform : html5, android, iOs, windows, linux and mac thanx to [**OpenFL**][OpenFL].

Soon the engine will be implemented over [**Lime**][Lime] instead of [**OpenFL**][OpenFL] to get rid of all unused flash package.

[OpenFL]: https://github.com/openfl/openfl
[Lime]: https://github.com/openfl/lime

###Features

- crossplatform
- hardware accelerated 2d rendering
- _hummmm_ more soon, still coding

###RoadMap

- font rendering
- migration to lime
- optimisation
- canvas backend for html target
- 3d rendering 

###Install 

```
haxelib install haxolotl
```

###How to use 

firstly, create an openFL project.
Then in the addedToStage handler write :

	function onAddedToStage(e : Event)
	{
		var engine = new Engine(stage);
		var sampleStage = new haxolotl.core.Stage();
		engine.add(sampleStage);
		
		var atlas = new TextureAtlas(Texture.get("myAtlas.png"), "myAtlas.xml");
		
		var bunny = new Image(atlas.get("bunny"));
		
		sampleStage.add(bunny);
	}


see more in samples.