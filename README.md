#Haxolotl

**Current version**: 0.5.1

A simple game toolkit based on FLash API initialy created for learning purpose during the 28 th [**_Ludum Dare_**](http://www.ludumdare.com).
The lib aims to offer a good crossplatform alternative to FLash by using webGL on browser and OpenGL on native app.
At the moment the tool works on most decent browsers, windows, mac and android. Linux and iOs haven't been tested yet, but it should be fine on these platform too.

To achieve this versatility accross platform, Haxolotl is build on top of [**OpenFL**][OpenFL], a great [**Haxe**](http://www.haxe.org) lib wich offers all the tool for building haxe app on several plateforms.
Soon the engine will be implemented over [**Lime**][Lime] instead of [**OpenFL**][OpenFL] to get rid of all unused flash package for the flash target.

####Why are you reinventing the wheel? OpenFL does the **exact** same thing and probably better!
Firstly, as I said, this initialy was a learning project. I also was looking for a Webgl implemention of Openfl for html5 target instead of 2D canvas without founding any. Haxolotl does that. Finally I plan to add a 3D renderer, and OpenFl doesn't have one, yet, as far as I know. So I guess Haxolotl may have some interest.


[OpenFL]: https://github.com/openfl/openfl
[Lime]: https://github.com/openfl/lime

###Features

- crossplatform
- hardware accelerated 2d rendering
- _hummmm_ more soon, still coding

###RoadMap

- font rendering
- better sprite batch 
- migration to lime
- optimisation
- canvas backend for iOs (c'mon Apple :( )
- 3d rendering 

###Install 

	haxelib git haxolotl [the Haxolotl's repo url]

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