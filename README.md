Haxolotl
====

-![alt text](http://media.giphy.com/media/ebkgcMQPRbcC4/giphy.gif "I'm an Axolotl, i'm so cool!")

Current version : 0.4.2

A simple haxe game engine based on openfl's GLView for
better performance on html target.

Crossplatform : html5, android, iOs, windows, linux and mac 
thanx to openFL. 

Soon the engine will be implemented over Lime instead of
openFL to get rid of all unused flash package.

RoadMap
-------------

- font rendering
- migration to lime
- optimisation
- canvas backend for html target
- 3d rendering 

Install 
-------------
```
haxelib install haxolotl
```

How to use 
-------------

firstly, create an openFL project.
Then in the addedToStage handler write :
```haxe
function onAddedToStage(e : Event)
{
    var engine = new Engine(stage);
    var sampleStage = new haxolotl.core.Stage();
    engine.add(sampleStage);
    
    var atlas = new TextureAtlas(Texture.get("myAtlas.png"), "myAtlas.xml");
    
    var bunny = new Image(atlas.get("bunny"));
    
    sampleStage.add(bunny);
}
```

see more in samples.