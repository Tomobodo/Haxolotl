(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	try {
		if(Reflect.hasField(window,"winParameters")) {
			var value = ((function($this) {
				var $r;
				var o = window;
				var v = null;
				try {
					v = o.winParameters;
				} catch( e ) {
				}
				$r = v;
				return $r;
			}(this)))();
			flash.Lib.get_current().loaderInfo.parameters = value;
		}
		flash.Lib.get_current().get_stage().loaderInfo = flash.Lib.get_current().loaderInfo;
	} catch( e ) {
	}
	ApplicationMain.preloader = new NMEPreloader();
	flash.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var resourcePrefix = "__ASSET__:bitmap_";
	var _g = 0;
	var _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader = ApplicationMain.loaders.get(path);
			loader.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader.load(new flash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new flash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if((function($this) {
		var $r;
		var v = null;
		try {
			v = com.pixodrome.ld28.Main.main;
		} catch( e ) {
		}
		$r = v;
		return $r;
	}(this)) == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else {
		var func;
		var v = null;
		try {
			v = com.pixodrome.ld28.Main.main;
		} catch( e ) {
		}
		func = v;
		func.apply(com.pixodrome.ld28.Main,[]);
	}
}
var flash = {}
flash.events = {}
flash.events.IEventDispatcher = function() { }
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	__class__: flash.events.IEventDispatcher
}
flash.events.EventDispatcher = function(target) {
	if(target != null) this.__target = target; else this.__target = this;
	this.__eventMap = [];
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.compareListeners = function(l1,l2) {
	if(l1.mPriority == l2.mPriority) return 0; else if(l1.mPriority > l2.mPriority) return -1; else return 1;
}
flash.events.EventDispatcher.prototype = {
	addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture;
		if(useCapture == null) capture = false; else capture = useCapture;
		var priority;
		if(inPriority == null) priority = 0; else priority = inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new flash.events.Listener(inListener,capture,priority));
		list.sort(flash.events.EventDispatcher.compareListeners);
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.__target;
		var capture = event.eventPhase == flash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.__getIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,existList: function(type) {
		return this.__eventMap != null && this.__eventMap[type] != undefined;
	}
	,getList: function(type) {
		return this.__eventMap[type];
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture;
		if(inCapture == null) capture = false; else capture = inCapture;
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,setList: function(type,list) {
		this.__eventMap[type] = list;
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: flash.events.EventDispatcher
}
flash.display = {}
flash.display.IBitmapDrawable = function() { }
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	__class__: flash.display.IBitmapDrawable
}
flash.display.DisplayObject = function() {
	flash.events.EventDispatcher.call(this,null);
	this.___id = flash.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new flash.geom.Transform(this));
	this.__x = 0.0;
	this.__y = 0.0;
	this.__scaleX = 1.0;
	this.__scaleY = 1.0;
	this.__rotation = 0.0;
	this.__width = 0.0;
	this.__height = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.__filters = new Array();
	this.__boundsRect = new flash.geom.Rectangle();
	this.__scrollRect = null;
	this.__mask = null;
	this.__maskingObj = null;
	this.set___combinedVisible(this.get_visible());
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.DisplayObject.__super__ = flash.events.EventDispatcher;
flash.display.DisplayObject.prototype = $extend(flash.events.EventDispatcher.prototype,{
	dispatchEvent: function(event) {
		var result = this.__dispatchEvent(event);
		if(event.__getIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.__render(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		var m;
		var _this = this.transform;
		var m1;
		var _this1 = _this._fullMatrix;
		var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
		m2._sx = _this1._sx;
		m2._sy = _this1._sy;
		m1 = m2;
		m = m1;
		if(targetCoordinateSpace != null) m.concat(((function($this) {
			var $r;
			var _this = targetCoordinateSpace.transform;
			var m1;
			{
				var _this1 = _this._fullMatrix;
				var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
				m2._sx = _this1._sx;
				m2._sy = _this1._sy;
				m1 = m2;
			}
			$r = m1;
			return $r;
		}(this))).invert());
		var rect = this.__boundsRect.transform(m);
		return rect;
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,getScreenBounds: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		return this.__boundsRect.clone();
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.__extentWithFilters;
		var fm;
		var _this = this.transform;
		var m;
		var _this1 = _this._fullMatrix;
		var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
		m1._sx = _this1._sx;
		m1._sy = _this1._sy;
		m = m1;
		fm = m;
		var inPos = extent.get_topLeft();
		fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
		fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
		fm.a = Math.round(fm.a * 1000) / 1000;
		fm.b = Math.round(fm.b * 1000) / 1000;
		fm.c = Math.round(fm.c * 1000) / 1000;
		fm.d = Math.round(fm.d * 1000) / 1000;
		fm.set_tx(Math.round(fm.tx * 10) / 10);
		fm.set_ty(Math.round(fm.ty * 10) / 10);
		return fm;
	}
	,globalToLocal: function(inPos) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		return ((function($this) {
			var $r;
			var _this = $this.transform;
			var m;
			{
				var _this1 = _this._fullMatrix;
				var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
				m1._sx = _this1._sx;
				m1._sy = _this1._sy;
				m = m1;
			}
			$r = m;
			return $r;
		}(this))).invert().transformPoint(inPos);
	}
	,handleGraphicsUpdated: function(gfx) {
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		var surface = gfx.__surface;
		if(this.__filters != null) {
			var _g = 0;
			var _g1 = this.__filters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.__applyFilter(surface);
			}
		}
		this.___renderFlags |= 32;
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		var boundingBox;
		if(shapeFlag == null) boundingBox = true; else boundingBox = !shapeFlag;
		if(!boundingBox) return this.__getObjectUnderPoint(new flash.geom.Point(x,y)) != null; else {
			var gfx = this.__getGraphics();
			if(gfx != null) {
				var extX = gfx.__extent.x;
				var extY = gfx.__extent.y;
				var local = this.globalToLocal(new flash.geom.Point(x,y));
				if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return false; else return true;
			}
			return false;
		}
	}
	,invalidateGraphics: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) {
			gfx.__changed = true;
			gfx.__clearNextCycle = true;
		}
	}
	,localToGlobal: function(point) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		return ((function($this) {
			var $r;
			var _this = $this.transform;
			var m;
			{
				var _this1 = _this._fullMatrix;
				var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
				m1._sx = _this1._sx;
				m1._sy = _this1._sy;
				m = m1;
			}
			$r = m;
			return $r;
		}(this))).transformPoint(point);
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.__getGraphics();
		if(gfx != null && gfx.__surface != null) {
			var surface = gfx.__surface;
			if(inValue) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this.___id + "]";
	}
	,validateBounds: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) {
			var gfx = this.__getGraphics();
			if(gfx == null) {
				this.__boundsRect.x = this.get_x();
				this.__boundsRect.y = this.get_y();
				this.__boundsRect.width = 0;
				this.__boundsRect.height = 0;
			} else {
				this.__boundsRect = gfx.__extent.clone();
				if(this.scale9Grid != null) {
					this.__boundsRect.width *= this.__scaleX;
					this.__boundsRect.height *= this.__scaleY;
					this.__width = this.__boundsRect.width;
					this.__height = this.__boundsRect.height;
				} else {
					this.__width = this.__boundsRect.width * this.__scaleX;
					this.__height = this.__boundsRect.height * this.__scaleY;
				}
				gfx.boundsDirty = false;
			}
			this.___renderFlags &= -65;
		}
	}
	,__addToStage: function(newParent,beforeSibling) {
		var gfx = this.__getGraphics();
		if(gfx == null) return;
		if(newParent.__getGraphics() != null) {
			var regex = new EReg("[^a-zA-Z0-9\\-]","g");
			gfx.__surface.id = regex.replace(this.___id,"_");
			if(beforeSibling != null && beforeSibling.__getGraphics() != null) flash.Lib.__appendSurface(gfx.__surface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0;
				var _g1 = newParent.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) flash.Lib.__appendSurface(gfx.__surface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,flash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , flash.display.DisplayObjectContainer);
						if(container.__children.length > 0) nextSibling = container.__children[container.__children.length - 1]; else break;
					}
					if(nextSibling.__getGraphics() != gfx) flash.Lib.__appendSurface(gfx.__surface,null,nextSibling.get__topmostSurface()); else flash.Lib.__appendSurface(gfx.__surface);
				}
			}
			flash.Lib.__setSurfaceTransform(gfx.__surface,(function($this) {
				var $r;
				var extent = gfx.__extentWithFilters;
				var fm;
				{
					var _this = $this.transform;
					var m;
					var _this1 = _this._fullMatrix;
					var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
					m1._sx = _this1._sx;
					m1._sy = _this1._sy;
					m = m1;
					fm = m;
				}
				{
					var inPos = extent.get_topLeft();
					fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
					fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
					fm.a = Math.round(fm.a * 1000) / 1000;
					fm.b = Math.round(fm.b * 1000) / 1000;
					fm.c = Math.round(fm.c * 1000) / 1000;
					fm.d = Math.round(fm.d * 1000) / 1000;
					fm.set_tx(Math.round(fm.tx * 10) / 10);
					fm.set_ty(Math.round(fm.ty * 10) / 10);
				}
				$r = fm;
				return $r;
			}(this)));
		} else if(newParent.name == "Stage") flash.Lib.__appendSurface(gfx.__surface);
		if(this.__isOnStage()) {
			this.__srUpdateDivs();
			var evt = new flash.events.Event(flash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,__applyFilters: function(surface) {
		if(this.__filters != null) {
			var _g = 0;
			var _g1 = this.__filters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.__applyFilter(surface);
			}
		}
	}
	,__broadcast: function(event) {
		this.__dispatchEvent(event);
	}
	,__clearFlag: function(mask) {
		this.___renderFlags &= ~mask;
	}
	,__contains: function(child) {
		return false;
	}
	,__dispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return flash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,__fireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.__getInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.__setPhase(flash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.__dispatchEvent(event);
				if(event.__getIsCancelled()) return;
			}
		}
		event.__setPhase(flash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.__dispatchEvent(event);
		if(event.__getIsCancelled()) return;
		if(event.bubbles) {
			event.__setPhase(flash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.__dispatchEvent(event);
				if(event.__getIsCancelled()) return;
			}
		}
	}
	,__getFullMatrix: function(localMatrix) {
		var _this = this.transform;
		var m;
		if(localMatrix != null) {
			var result;
			var m1 = new flash.geom.Matrix(localMatrix.a,localMatrix.b,localMatrix.c,localMatrix.d,localMatrix.tx,localMatrix.ty);
			m1._sx = localMatrix._sx;
			m1._sy = localMatrix._sy;
			result = m1;
			result.concat(_this._fullMatrix);
			m = result;
		} else {
			var _this1 = _this._fullMatrix;
			var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
			m1._sx = _this1._sx;
			m1._sy = _this1._sy;
			m = m1;
		}
		return m;
	}
	,__getGraphics: function() {
		return null;
	}
	,__getInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.__getInteractiveObjectStack(outStack);
	}
	,__getMatrix: function() {
		return this.transform.get_matrix();
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.__getGraphics();
		if(gfx != null) {
			gfx.__render();
			var extX = gfx.__extent.x;
			var extY = gfx.__extent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX <= 0 || local.y - extY <= 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			if(gfx.__hitTest(local.x,local.y)) return this;
		}
		return null;
	}
	,__getSurface: function() {
		var gfx = this.__getGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.__surface;
		return surface;
	}
	,__invalidateBounds: function() {
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
	}
	,__invalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this.___renderFlags |= 4; else this.___renderFlags |= 8;
	}
	,__isOnStage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null && (function($this) {
			var $r;
			var p = gfx.__surface;
			while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
			$r = p == flash.Lib.mMe.__scr;
			return $r;
		}(this))) return true;
		return false;
	}
	,__matrixOverridden: function() {
		this.__x = this.transform.get_matrix().tx;
		this.__y = this.transform.get_matrix().ty;
		this.___renderFlags |= 16;
		this.___renderFlags |= 4;
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
	}
	,__removeFromStage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null && (function($this) {
			var $r;
			var p = gfx.__surface;
			while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
			$r = p == flash.Lib.mMe.__scr;
			return $r;
		}(this))) {
			flash.Lib.__removeSurface(gfx.__surface);
			var evt = new flash.events.Event(flash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		var gfx = this.__getGraphics();
		if(gfx == null) return;
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(gfx.__render(inMask,this.__filters,1,1)) {
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
			var surface = gfx.__surface;
			if(this.__filters != null) {
				var _g = 0;
				var _g1 = this.__filters;
				while(_g < _g1.length) {
					var filter = _g1[_g];
					++_g;
					filter.__applyFilter(surface);
				}
			}
			this.___renderFlags |= 32;
		}
		var fullAlpha;
		fullAlpha = (this.parent != null?this.parent.__combinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m;
			var extent = gfx.__extentWithFilters;
			var fm;
			var _this = this.transform;
			var m1;
			var _this1 = _this._fullMatrix;
			var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
			m2._sx = _this1._sx;
			m2._sy = _this1._sy;
			m1 = m2;
			fm = m1;
			var inPos = extent.get_topLeft();
			fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
			fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
			fm.a = Math.round(fm.a * 1000) / 1000;
			fm.b = Math.round(fm.b * 1000) / 1000;
			fm.c = Math.round(fm.c * 1000) / 1000;
			fm.d = Math.round(fm.d * 1000) / 1000;
			fm.set_tx(Math.round(fm.tx * 10) / 10);
			fm.set_ty(Math.round(fm.ty * 10) / 10);
			m = fm;
			flash.Lib.__drawToSurface(gfx.__surface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this.___renderFlags & 32) != 0) {
				var m;
				var extent = gfx.__extentWithFilters;
				var fm;
				var _this = this.transform;
				var m1;
				var _this1 = _this._fullMatrix;
				var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
				m2._sx = _this1._sx;
				m2._sy = _this1._sy;
				m1 = m2;
				fm = m1;
				var inPos = extent.get_topLeft();
				fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
				fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
				fm.a = Math.round(fm.a * 1000) / 1000;
				fm.b = Math.round(fm.b * 1000) / 1000;
				fm.c = Math.round(fm.c * 1000) / 1000;
				fm.d = Math.round(fm.d * 1000) / 1000;
				fm.set_tx(Math.round(fm.tx * 10) / 10);
				fm.set_ty(Math.round(fm.ty * 10) / 10);
				m = fm;
				flash.Lib.__setSurfaceTransform(gfx.__surface,m);
				this.___renderFlags &= -33;
				this.__srUpdateDivs();
			}
			flash.Lib.__setSurfaceOpacity(gfx.__surface,fullAlpha);
		}
	}
	,__setDimensions: function() {
		if(this.scale9Grid != null) {
			this.__boundsRect.width *= this.__scaleX;
			this.__boundsRect.height *= this.__scaleY;
			this.__width = this.__boundsRect.width;
			this.__height = this.__boundsRect.height;
		} else {
			this.__width = this.__boundsRect.width * this.__scaleX;
			this.__height = this.__boundsRect.height * this.__scaleY;
		}
	}
	,__setFlag: function(mask) {
		this.___renderFlags |= mask;
	}
	,__setFlagToValue: function(mask,value) {
		if(value) this.___renderFlags |= mask; else this.___renderFlags &= ~mask;
	}
	,__setFullMatrix: function(inValue) {
		var _this = this.transform;
		_this._fullMatrix.copy(inValue);
		return _this._fullMatrix;
	}
	,__setMatrix: function(inValue) {
		this.transform._matrix.copy(inValue);
		return inValue;
	}
	,__testFlag: function(mask) {
		return (this.___renderFlags & mask) != 0;
	}
	,__unifyChildrenWithDOM: function(lastMoveObj) {
		var gfx = this.__getGraphics();
		if(gfx != null && lastMoveObj != null && this != lastMoveObj) {
			var ogfx = lastMoveObj.__getGraphics();
			if(ogfx != null) flash.Lib.__setSurfaceZIndexAfter(this.__scrollRect == null?gfx.__surface:this._srWindow,lastMoveObj.__scrollRect == null?ogfx.__surface:lastMoveObj == this.parent?ogfx.__surface:lastMoveObj._srWindow);
		}
		if(gfx == null) return lastMoveObj; else return this;
	}
	,__validateMatrix: function() {
		var parentMatrixInvalid = (this.___renderFlags & 8) != 0 && this.parent != null;
		if((this.___renderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.__validateMatrix();
			var m = this.transform.get_matrix();
			if((this.___renderFlags & 16) != 0) this.___renderFlags &= -5;
			if((this.___renderFlags & 4) != 0) {
				m.identity();
				m.scale(this.__scaleX,this.__scaleY);
				var rad = this.__rotation * flash.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.__x,this.__y);
				this.transform._matrix.copy(m);
				m;
			}
			var cm;
			var _this = this.transform;
			var m1;
			var _this1 = _this._fullMatrix;
			var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
			m2._sx = _this1._sx;
			m2._sy = _this1._sy;
			m1 = m2;
			cm = m1;
			var fm;
			if(this.parent == null) fm = m; else {
				var _this = this.parent.transform;
				var m1;
				if(m != null) {
					var result;
					var m2 = new flash.geom.Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
					m2._sx = m._sx;
					m2._sy = m._sy;
					result = m2;
					result.concat(_this._fullMatrix);
					m1 = result;
				} else {
					var _this1 = _this._fullMatrix;
					var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
					m2._sx = _this1._sx;
					m2._sy = _this1._sy;
					m1 = m2;
				}
				fm = m1;
			}
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				var _this = this.transform;
				_this._fullMatrix.copy(fm);
				_this._fullMatrix;
				this.___renderFlags |= 32;
			}
			this.___renderFlags &= -29;
		}
	}
	,get__bottommostSurface: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return gfx.__surface;
		return null;
	}
	,get_filters: function() {
		if(this.__filters == null) return [];
		var result = new Array();
		var _g = 0;
		var _g1 = this.__filters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__boundsInvalid: function() {
		var gfx = this.__getGraphics();
		if(gfx == null) return (this.___renderFlags & 64) != 0; else return (this.___renderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,set_filters: function(filters) {
		var oldFilterCount;
		if(this.__filters == null) oldFilterCount = 0; else oldFilterCount = this.__filters.length;
		if(filters == null) {
			this.__filters = null;
			if(oldFilterCount > 0) {
				var gfx = this.__getGraphics();
				if(gfx != null) {
					gfx.__changed = true;
					gfx.__clearNextCycle = true;
				}
			}
		} else {
			this.__filters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.__filters.push(filter.clone());
			}
			var gfx = this.__getGraphics();
			if(gfx != null) {
				gfx.__changed = true;
				gfx.__clearNextCycle = true;
			}
		}
		return filters;
	}
	,get_height: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		return this.__height;
	}
	,set_height: function(inValue) {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		var h = this.__boundsRect.height;
		if(this.__scaleY * h != inValue) {
			if(h == 0) {
				this.__scaleY = 1;
				this.__invalidateMatrix(true);
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				h = this.__boundsRect.height;
			}
			if(h <= 0) return 0;
			this.__scaleY = inValue / h;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_mask: function() {
		return this.__mask;
	}
	,set_mask: function(inValue) {
		if(this.__mask != null) this.__mask.__maskingObj = null;
		this.__mask = inValue;
		if(this.__mask != null) this.__mask.__maskingObj = this;
		return this.__mask;
	}
	,get__matrixChainInvalid: function() {
		return (this.___renderFlags & 8) != 0;
	}
	,get__matrixInvalid: function() {
		return (this.___renderFlags & 4) != 0;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new flash.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new flash.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,set___combinedVisible: function(inValue) {
		if(this.__combinedVisible != inValue) {
			this.__combinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.__combinedVisible;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.__invalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.__children,this);
			var _this = this.parent;
			_this.___renderFlags |= 64;
			if(_this.parent != null) _this.parent.___renderFlags |= 64;
		}
		if(inValue != null) {
			inValue.___renderFlags |= 64;
			if(inValue.parent != null) inValue.parent.___renderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_rotation: function(inValue) {
		if(this.__rotation != inValue) {
			this.__rotation = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(inValue) {
		if(this.__scaleX != inValue) {
			this.__scaleX = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleY: function(inValue) {
		if(this.__scaleY != inValue) {
			this.__scaleY = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.__scrollRect == null) return null;
		return this.__scrollRect.clone();
	}
	,set_scrollRect: function(inValue) {
		this.__scrollRect = inValue;
		this.__srUpdateDivs();
		return inValue;
	}
	,get_stage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return flash.Lib.__getStage();
		return null;
	}
	,get__topmostSurface: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return gfx.__surface;
		return null;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.__x = this.transform.get_matrix().tx;
		this.__y = this.transform.get_matrix().ty;
		this.__invalidateMatrix(true);
		return inValue;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(inValue) {
		if(this.__visible != inValue) {
			this.__visible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.__visible;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(inValue) {
		if(this.__x != inValue) {
			this.__x = inValue;
			this.__invalidateMatrix(true);
			if(this.parent != null) {
				var _this = this.parent;
				_this.___renderFlags |= 64;
				if(_this.parent != null) _this.parent.___renderFlags |= 64;
			}
		}
		return inValue;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(inValue) {
		if(this.__y != inValue) {
			this.__y = inValue;
			this.__invalidateMatrix(true);
			if(this.parent != null) {
				var _this = this.parent;
				_this.___renderFlags |= 64;
				if(_this.parent != null) _this.parent.___renderFlags |= 64;
			}
		}
		return inValue;
	}
	,get_width: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		return this.__width;
	}
	,set_width: function(inValue) {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) this.validateBounds();
		var w = this.__boundsRect.width;
		if(this.__scaleX * w != inValue) {
			if(w == 0) {
				this.__scaleX = 1;
				this.__invalidateMatrix(true);
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				w = this.__boundsRect.width;
			}
			if(w <= 0) return 0;
			this.__scaleX = inValue / w;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,__getSrWindow: function() {
		return this._srWindow;
	}
	,__srUpdateDivs: function() {
		var gfx = this.__getGraphics();
		if(gfx == null || this.parent == null) return;
		if(this.__scrollRect == null) {
			if(this._srAxes != null && gfx.__surface.parentNode == this._srAxes && this._srWindow.parentNode != null) this._srWindow.parentNode.replaceChild(gfx.__surface,this._srWindow);
			return;
		}
		if(this._srWindow == null) {
			this._srWindow = window.document.createElement("div");
			this._srAxes = window.document.createElement("div");
			this._srWindow.style.setProperty("position","absolute","");
			this._srWindow.style.setProperty("left","0px","");
			this._srWindow.style.setProperty("top","0px","");
			this._srWindow.style.setProperty("width","0px","");
			this._srWindow.style.setProperty("height","0px","");
			this._srWindow.style.setProperty("overflow","hidden","");
			this._srAxes.style.setProperty("position","absolute","");
			this._srAxes.style.setProperty("left","0px","");
			this._srAxes.style.setProperty("top","0px","");
			this._srWindow.appendChild(this._srAxes);
		}
		var pnt = this.parent.localToGlobal(new flash.geom.Point(this.get_x(),this.get_y()));
		this._srWindow.style.left = pnt.x + "px";
		this._srWindow.style.top = pnt.y + "px";
		this._srWindow.style.width = this.__scrollRect.width + "px";
		this._srWindow.style.height = this.__scrollRect.height + "px";
		this._srAxes.style.left = -pnt.x - this.__scrollRect.x + "px";
		this._srAxes.style.top = -pnt.y - this.__scrollRect.y + "px";
		if(gfx.__surface.parentNode != this._srAxes && gfx.__surface.parentNode != null) {
			gfx.__surface.parentNode.insertBefore(this._srWindow,gfx.__surface);
			flash.Lib.__removeSurface(gfx.__surface);
			this._srAxes.appendChild(gfx.__surface);
		}
	}
	,__class__: flash.display.DisplayObject
	,__properties__: {get__topmostSurface:"get__topmostSurface",get__matrixInvalid:"get__matrixInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__boundsInvalid:"get__boundsInvalid",get__bottommostSurface:"get__bottommostSurface",set___combinedVisible:"set___combinedVisible",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",set_transform:"set_transform",get_stage:"get_stage",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",set_parent:"set_parent",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_mask:"set_mask",get_mask:"get_mask",set_height:"set_height",get_height:"get_height",set_filters:"set_filters",get_filters:"get_filters"}
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this.___id + "]";
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,get_tabIndex: function() {
		return this.__tabIndex;
	}
	,set_tabIndex: function(inIndex) {
		return this.__tabIndex = inIndex;
	}
	,__class__: flash.display.InteractiveObject
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
flash.display.DisplayObjectContainer = function() {
	this.__children = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	flash.display.InteractiveObject.call(this);
	this.__combinedAlpha = this.alpha;
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		this.__addedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,this.__children.length - 1);
			return object;
		}
		object.set_parent(this);
		if(this.__isOnStage()) object.__addToStage(this);
		if(this.__children == null) this.__children = new Array();
		this.__children.push(object);
		return object;
	}
	,addChildAt: function(object,index) {
		if(index > this.__children.length || index < 0) throw "Invalid index position " + index;
		this.__addedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.__children.length) return this.addChild(object); else {
			if(this.__isOnStage()) object.__addToStage(this,this.__children[index]);
			this.__children.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,contains: function(child) {
		return this.__contains(child);
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		throw "getChildAt : index out of bounds " + index + "/" + this.__children.length;
		return null;
	}
	,getChildByName: function(inName) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == inName) return child;
		}
		return null;
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == inChild) return i;
		}
		return -1;
	}
	,getObjectsUnderPoint: function(point) {
		var result = new Array();
		this.__getObjectsUnderPoint(point,result);
		return result;
	}
	,removeChild: function(inChild) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) {
				HxOverrides.remove(this.__children,child);
				child.__removeFromStage();
				child.set_parent(null);
				return child;
			}
		}
		throw "removeChild : none found?";
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) {
			var child = this.__children[index];
			HxOverrides.remove(this.__children,child);
			child.__removeFromStage();
			child.set_parent(null);
			return child;
		}
		throw "removeChildAt(" + index + ") : none found?";
	}
	,setChildIndex: function(child,index) {
		if(index > this.__children.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0;
				var _g = this.__children.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.__children[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in __children array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.__children[i],this.__children[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.__children[i],this.__children[i + 1]);
				i++;
			}
		}
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == child1) c1 = i; else if(this.__children[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.__children[c1];
			this.__children[c1] = this.__children[c2];
			this.__children[c2] = swap;
			swap = null;
			this.__swapSurface(c1,c2);
			child1.__unifyChildrenWithDOM();
			child2.__unifyChildrenWithDOM();
		}
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.__children[child1];
		this.__children[child1] = this.__children[child2];
		this.__children[child2] = swap;
		swap = null;
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this.___id + "]";
	}
	,validateBounds: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) {
			flash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,__addToStage: function(newParent,beforeSibling) {
		flash.display.InteractiveObject.prototype.__addToStage.call(this,newParent,beforeSibling);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.__getGraphics() == null || !child.__isOnStage()) child.__addToStage(this);
		}
	}
	,__broadcast: function(event) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__broadcast(event);
		}
		this.dispatchEvent(event);
	}
	,__contains: function(child) {
		if(child == null) return false;
		if(this == child) return true;
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child || c.__contains(child)) return true;
		}
		return false;
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.__children.length - 1;
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.__children[l - i].__getObjectUnderPoint(point);
			if(result != null) {
				if(this.mouseChildren) return result; else return this;
			}
		}
		return flash.display.InteractiveObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,__getObjectsUnderPoint: function(point,stack) {
		var l = this.__children.length - 1;
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.__children[l - i].__getObjectUnderPoint(point);
			if(result != null) stack.push(result);
		}
	}
	,__invalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this.___renderFlags & 8) != 0) && !((this.___renderFlags & 4) != 0)) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__invalidateMatrix();
			}
		}
		flash.display.InteractiveObject.prototype.__invalidateMatrix.call(this,local);
	}
	,__removeChild: function(child) {
		HxOverrides.remove(this.__children,child);
		child.__removeFromStage();
		child.set_parent(null);
		return child;
	}
	,__removeFromStage: function() {
		flash.display.InteractiveObject.prototype.__removeFromStage.call(this);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__removeFromStage();
		}
	}
	,__render: function(inMask,clipRect) {
		if(!this.__visible) return;
		if(clipRect == null && this.__scrollRect != null) clipRect = this.__scrollRect;
		flash.display.InteractiveObject.prototype.__render.call(this,inMask,clipRect);
		if(this.parent != null) this.__combinedAlpha = this.parent.__combinedAlpha * this.alpha; else this.__combinedAlpha = this.alpha;
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.__visible) {
				if(clipRect != null) {
					if((child.___renderFlags & 4) != 0 || (child.___renderFlags & 8) != 0) child.__validateMatrix();
				}
				child.__render(inMask,clipRect);
			}
		}
		if(this.__addedChildren) {
			this.__unifyChildrenWithDOM();
			this.__addedChildren = false;
		}
	}
	,__swapSurface: function(c1,c2) {
		if(this.__children[c1] == null) throw "Null element at index " + c1 + " length " + this.__children.length;
		if(this.__children[c2] == null) throw "Null element at index " + c2 + " length " + this.__children.length;
		var gfx1 = this.__children[c1].__getGraphics();
		var gfx2 = this.__children[c2].__getGraphics();
		if(gfx1 != null && gfx2 != null) {
			var surface1;
			if(this.__children[c1].__scrollRect == null) surface1 = gfx1.__surface; else surface1 = this.__children[c1].__getSrWindow();
			var surface2;
			if(this.__children[c2].__scrollRect == null) surface2 = gfx2.__surface; else surface2 = this.__children[c2].__getSrWindow();
			if(surface1 != null && surface2 != null) flash.Lib.__swapSurface(surface1,surface2);
		}
	}
	,__unifyChildrenWithDOM: function(lastMoveObj) {
		var obj = flash.display.InteractiveObject.prototype.__unifyChildrenWithDOM.call(this,lastMoveObj);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			obj = child.__unifyChildrenWithDOM(obj);
			if(child.get_scrollRect() != null) obj = child;
		}
		return obj;
	}
	,set_filters: function(filters) {
		flash.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,set___combinedVisible: function(inVal) {
		if(inVal != this.__combinedVisible) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set___combinedVisible(child.get_visible() && inVal);
			}
		}
		return flash.display.InteractiveObject.prototype.set___combinedVisible.call(this,inVal);
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,set_visible: function(inVal) {
		this.set___combinedVisible(this.parent != null?this.parent.__combinedVisible && inVal:inVal);
		return flash.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,set_scrollRect: function(inValue) {
		inValue = flash.display.InteractiveObject.prototype.set_scrollRect.call(this,inValue);
		this.__unifyChildrenWithDOM();
		return inValue;
	}
	,__class__: flash.display.DisplayObjectContainer
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
	this.__graphics = new flash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.__isOnStage()) this.get_stage().__startDrag(this,lockCenter,bounds);
	}
	,stopDrag: function() {
		if(this.__isOnStage()) {
			this.get_stage().__stopDrag(this);
			var l = this.parent.__children.length - 1;
			var obj = this.get_stage();
			var _g1 = 0;
			var _g = this.parent.__children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var result = this.parent.__children[l - i].__getObjectUnderPoint(new flash.geom.Point(this.get_stage().get_mouseX(),this.get_stage().get_mouseY()));
				if(result != null) obj = result;
			}
			if(obj != this) this.__dropTarget = obj; else this.__dropTarget = this.get_stage();
		}
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this.___id + "]";
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,get_dropTarget: function() {
		return this.__dropTarget;
	}
	,get_graphics: function() {
		return this.__graphics;
	}
	,set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.__cursorCallbackOver != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OVER,this.__cursorCallbackOver);
		if(this.__cursorCallbackOut != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,this.__cursorCallbackOut);
		if(!cursor) flash.Lib.__setCursor(flash._Lib.CursorType.Default); else {
			this.__cursorCallbackOver = function(_) {
				flash.Lib.__setCursor(flash._Lib.CursorType.Pointer);
			};
			this.__cursorCallbackOut = function(_) {
				flash.Lib.__setCursor(flash._Lib.CursorType.Default);
			};
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER,this.__cursorCallbackOver);
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT,this.__cursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,__class__: flash.display.Sprite
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{set_useHandCursor:"set_useHandCursor",get_graphics:"get_graphics",get_dropTarget:"get_dropTarget"})
});
var com = {}
com.pixodrome = {}
com.pixodrome.ld28 = {}
com.pixodrome.ld28.Main = function() {
	flash.display.Sprite.call(this);
	this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
};
$hxClasses["com.pixodrome.ld28.Main"] = com.pixodrome.ld28.Main;
com.pixodrome.ld28.Main.__name__ = ["com","pixodrome","ld28","Main"];
com.pixodrome.ld28.Main.main = function() {
	flash.Lib.get_current().get_stage().align = flash.display.StageAlign.TOP_LEFT;
	flash.Lib.get_current().get_stage().scaleMode = flash.display.StageScaleMode.NO_SCALE;
	flash.Lib.get_current().addChild(new com.pixodrome.ld28.Main());
}
com.pixodrome.ld28.Main.__super__ = flash.display.Sprite;
com.pixodrome.ld28.Main.prototype = $extend(flash.display.Sprite.prototype,{
	resize: function(e) {
		if(!this.inited) this.init();
	}
	,init: function() {
		if(this.inited) return;
		this.inited = true;
		this.addChild(new com.pixodrome.ld28.App());
	}
	,added: function(e) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
		this.get_stage().addEventListener(flash.events.Event.RESIZE,$bind(this,this.resize));
		this.init();
	}
	,__class__: com.pixodrome.ld28.Main
});
var DocumentClass = function() {
	com.pixodrome.ld28.Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = com.pixodrome.ld28.Main;
DocumentClass.prototype = $extend(com.pixodrome.ld28.Main.prototype,{
	get_stage: function() {
		return flash.Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 480;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getWidth: function() {
		var width = 800;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
com.pixodrome.ld28.App = function() {
	flash.display.Sprite.call(this);
	new com.pixodrome.ld28.Color(16737877,0.3);
	if(!openfl.display.OpenGLView.get_isSupported()) throw "fuck, no opengl for ya!";
	this.initRenderer();
	this.meshes = new Array();
	this.add(new com.pixodrome.ld28.meshes.Plane(new com.pixodrome.ld28.Color(16724821,0.2)));
	this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
};
$hxClasses["com.pixodrome.ld28.App"] = com.pixodrome.ld28.App;
com.pixodrome.ld28.App.__name__ = ["com","pixodrome","ld28","App"];
com.pixodrome.ld28.App.__super__ = flash.display.Sprite;
com.pixodrome.ld28.App.prototype = $extend(flash.display.Sprite.prototype,{
	onAddedToStage: function(e) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
		this.get_stage().addEventListener(flash.events.Event.ENTER_FRAME,$bind(this,this.onEnterFrame));
	}
	,add: function(mesh) {
		this.meshes.push(mesh);
		this.vertexBuffer = openfl.gl.GL.createBuffer();
		openfl.gl.GL.bindBuffer(34962,this.vertexBuffer);
		openfl.gl.GL.bufferData(34962,new Float32Array(mesh.vertices),35044);
		openfl.gl.GL.bindBuffer(34962,null);
	}
	,onEnterFrame: function(e) {
		this.updateLogic();
	}
	,updateLogic: function() {
	}
	,render: function(viewport) {
		openfl.gl.GL.viewport(viewport.x | 0,viewport.y | 0,viewport.width | 0,viewport.height | 0);
		openfl.gl.GL.clearColor(0,0,0,1);
		openfl.gl.GL.clear(16384);
		var positionX = viewport.width / 2;
		var positionY = viewport.height / 2;
		var projectionMatrix = flash.geom.Matrix3D.createOrtho(0,viewport.width,viewport.height,0,1000,-1000);
		var modelViewMatrix = flash.geom.Matrix3D.create2D(positionX,positionY,1,0);
		openfl.gl.GL.useProgram(this.shaderProgram);
		openfl.gl.GL.enableVertexAttribArray(this.vertexPosAttribute);
		openfl.gl.GL.bindBuffer(34962,this.vertexBuffer);
		openfl.gl.GL.vertexAttribPointer(this.vertexPosAttribute,3,5126,false,0,0);
		var projectionMatrixUniform = openfl.gl.GL.getUniformLocation(this.shaderProgram,"projectionMatrix");
		var modelViewMatrixUniform = openfl.gl.GL.getUniformLocation(this.shaderProgram,"modelViewMatrix");
		openfl.gl.GL.uniformMatrix3D(projectionMatrixUniform,false,projectionMatrix);
		openfl.gl.GL.uniformMatrix3D(modelViewMatrixUniform,false,modelViewMatrix);
		openfl.gl.GL.drawArrays(5,0,4);
		openfl.gl.GL.bindBuffer(34962,null);
	}
	,initRenderer: function() {
		this.glRender = new openfl.display.OpenGLView();
		this.addChild(this.glRender);
		this.glRender.set_render($bind(this,this.render));
		this.initShaders();
	}
	,initShaders: function() {
		var vertexShader = this.createVertexShader();
		var fragmentShader = this.createFragmentShader();
		this.shaderProgram = openfl.gl.GL.createProgram();
		openfl.gl.GL.attachShader(this.shaderProgram,vertexShader);
		openfl.gl.GL.attachShader(this.shaderProgram,fragmentShader);
		openfl.gl.GL.linkProgram(this.shaderProgram);
		if(openfl.gl.GL.getProgramParameter(this.shaderProgram,35714) == 0) throw "Unable to initialize the shader program.";
		this.vertexPosAttribute = openfl.gl.GL.getAttribLocation(this.shaderProgram,"vertexPosition");
	}
	,createVertexShader: function() {
		var vertexShaderSource = "\r\n\t\t\tattribute vec3 vertexPosition;\r\n\t\t\tattribute vec4 vertexColor;\r\n\t\t\t\r\n\t\t\tuniform mat4 modelViewMatrix;\r\n\t\t\tuniform mat4 projectionMatrix;\r\n\t\t\t\r\n\t\t\tvoid main(void) {\r\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);\r\n\t\t\t}\r\n\t\t";
		var vertexShader = openfl.gl.GL.createShader(35633);
		openfl.gl.GL.shaderSource(vertexShader,vertexShaderSource);
		openfl.gl.GL.compileShader(vertexShader);
		if(openfl.gl.GL.getShaderParameter(vertexShader,35713) == 0) throw "Error compiling vertex shader";
		return vertexShader;
	}
	,createFragmentShader: function() {
		var fragmentShaderSource = "\r\n\t\t\tvoid main(void) {\r\n\t\t\t\tgl_FragColor = vec4(1.0,0.0,0.0,1.0);\r\n\t\t\t}\r\n\t\t";
		var fragmentShader = openfl.gl.GL.createShader(35632);
		openfl.gl.GL.shaderSource(fragmentShader,fragmentShaderSource);
		openfl.gl.GL.compileShader(fragmentShader);
		if(openfl.gl.GL.getShaderParameter(fragmentShader,35713) == 0) throw "Error compiling fragment shader";
		return fragmentShader;
	}
	,__class__: com.pixodrome.ld28.App
});
com.pixodrome.ld28.Color = function(color,alpha) {
	var rMask = (16711680 & color) >> 16;
	var gMask = (65280 & color) >> 8;
	var bMask = 255 & color;
	this.r = rMask / 255.0;
	this.g = gMask / 255.0;
	this.b = bMask / 255.0;
	this.a = alpha;
};
$hxClasses["com.pixodrome.ld28.Color"] = com.pixodrome.ld28.Color;
com.pixodrome.ld28.Color.__name__ = ["com","pixodrome","ld28","Color"];
com.pixodrome.ld28.Color.prototype = {
	__class__: com.pixodrome.ld28.Color
}
com.pixodrome.ld28.Mesh = function(vertices,texCoord,colors) {
	this.vertices = vertices;
	this.texCoord = texCoord;
	this.colors = colors;
};
$hxClasses["com.pixodrome.ld28.Mesh"] = com.pixodrome.ld28.Mesh;
com.pixodrome.ld28.Mesh.__name__ = ["com","pixodrome","ld28","Mesh"];
com.pixodrome.ld28.Mesh.prototype = {
	__class__: com.pixodrome.ld28.Mesh
}
com.pixodrome.ld28.meshes = {}
com.pixodrome.ld28.meshes.Plane = function(color) {
	console.log("plane");
	var vertices = [100.0,100.0,0.0,-100.0,100.0,0.0,100.0,-100.0,0.0,-100.0,-100.0,0.0];
	var texCoords = [0.0,0.0,1.0,0.0,1.0,1.0,0.0,1.0];
	var colors = [color.r,color.g,color.b,color.a,color.r,color.g,color.b,color.a,color.r,color.g,color.b,color.a,color.r,color.g,color.b,color.a];
	com.pixodrome.ld28.Mesh.call(this,vertices,texCoords,colors);
};
$hxClasses["com.pixodrome.ld28.meshes.Plane"] = com.pixodrome.ld28.meshes.Plane;
com.pixodrome.ld28.meshes.Plane.__name__ = ["com","pixodrome","ld28","meshes","Plane"];
com.pixodrome.ld28.meshes.Plane.__super__ = com.pixodrome.ld28.Mesh;
com.pixodrome.ld28.meshes.Plane.prototype = $extend(com.pixodrome.ld28.Mesh.prototype,{
	__class__: com.pixodrome.ld28.meshes.Plane
});
var haxe = {}
haxe.Timer = function() { }
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
flash.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__properties__ = {get_current:"get_current"}
flash.Lib.addCallback = function(functionName,closure) {
	flash.Lib.mMe.__scr[functionName] = closure;
}
flash.Lib.as = function(v,c) {
	if(js.Boot.__instanceof(v,c)) return v; else return null;
}
flash.Lib.attach = function(name) {
	return new flash.display.MovieClip();
}
flash.Lib.getTimer = function() {
	var x = (haxe.Timer.stamp() - flash.Lib.starttime) * 1000;
	return x | 0;
}
flash.Lib.getURL = function(request,target) {
	if(target == null) target = "_blank";
	window.open(request.url,target);
}
flash.Lib.preventDefaultTouchMove = function() {
	window.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
}
flash.Lib.Run = function(tgt,width,height) {
	flash.Lib.mMe = new flash.Lib(tgt,width,height);
	var _g1 = 0;
	var _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") flash.Lib.__getStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	var _g = 0;
	var _g1 = flash.Lib.HTML_TOUCH_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	var _g = 0;
	var _g1 = flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	var _g = 0;
	var _g1 = flash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	if(Reflect.hasField(window,"on" + "devicemotion")) window.addEventListener("devicemotion",($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	if(Reflect.hasField(window,"on" + "orientationchange")) window.addEventListener("orientationchange",($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	var _g = 0;
	var _g1 = flash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		window.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") flash.Lib.__getStage().set_backgroundColor(flash.Lib.__parseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		if(pos == 0) return res | cur << 16; else if(pos == 1) return res | cur << 8; else if(pos == 2) return res | cur; else throw "pos should be 0-2";
	})); else flash.Lib.__getStage().set_backgroundColor(16777215);
	flash.Lib.get_current().get_graphics().beginFill(flash.Lib.__getStage().get_backgroundColor());
	flash.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	flash.Lib.get_current().get_graphics().__surface.id = regex.replace("Root MovieClip","_");
	flash.Lib.__getStage().__updateNextWake();
	return flash.Lib.mMe;
}
flash.Lib.setUserScalable = function(isScalable) {
	if(isScalable == null) isScalable = true;
	var meta = window.document.createElement("meta");
	meta.name = "viewport";
	meta.content = "user-scalable=" + (isScalable?"yes":"no");
}
flash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
flash.Lib.__appendSurface = function(surface,before,after) {
	if(flash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) before.parentNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) after.parentNode.insertBefore(surface,after.nextSibling); else flash.Lib.mMe.__scr.appendChild(surface);
	}
}
flash.Lib.__appendText = function(surface,container,text,wrap,isHtml) {
	var _g1 = 0;
	var _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		surface.removeChild(surface.childNodes[i]);
	}
	if(isHtml) container.innerHTML = text; else container.appendChild(window.document.createTextNode(text));
	container.style.setProperty("position","relative","");
	container.style.setProperty("cursor","default","");
	if(!wrap) container.style.setProperty("white-space","nowrap","");
	surface.appendChild(container);
}
flash.Lib.__bootstrap = function() {
	if(flash.Lib.mMe == null) {
		var target = window.document.getElementById("haxe:openfl");
		if(target == null) target = window.document.createElement("div");
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat((function($this) {
				var $r;
				var pos = agent.indexOf("Android") + 8;
				$r = HxOverrides.substr(agent,pos,3);
				return $r;
			}(this)));
			if(version <= 2.3) flash.Lib.mForce2DTransform = true;
		}
		flash.Lib.Run(target,flash.Lib.__getWidth(),flash.Lib.__getHeight());
	}
}
flash.Lib.__copyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0;
	var _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
flash.Lib.__createSurfaceAnimationCSS = function(surface,data,template,templateFunc,fps,discrete,infinite) {
	if(infinite == null) infinite = false;
	if(discrete == null) discrete = false;
	if(fps == null) fps = 25;
	if(surface.id == null || surface.id == "") {
		flash.Lib.trace("Failed to create a CSS Style tag for a surface without an id attribute");
		return null;
	}
	var style = null;
	if(surface.getAttribute("data-openfl-anim") != null) style = window.document.getElementById(surface.getAttribute("data-openfl-anim")); else {
		style = flash.Lib.mMe.__scr.appendChild(window.document.createElement("style"));
		style.sheet.id = "__openfl_anim_" + surface.id + "__";
		surface.setAttribute("data-openfl-anim",style.sheet.id);
	}
	var keyframeStylesheetRule = "";
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var perc = i / (data.length - 1) * 100;
		var frame = data[i];
		keyframeStylesheetRule += perc + "% { " + template.execute(templateFunc(frame)) + " } ";
	}
	var animationDiscreteRule;
	if(discrete) animationDiscreteRule = "steps(::steps::, end)"; else animationDiscreteRule = "";
	var animationInfiniteRule;
	if(infinite) animationInfiniteRule = "infinite"; else animationInfiniteRule = "";
	var animationTpl = "";
	var _g = 0;
	var _g1 = ["animation","-moz-animation","-webkit-animation","-o-animation","-ms-animation"];
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		animationTpl += prefix + ": ::id:: ::duration::s " + animationDiscreteRule + " " + animationInfiniteRule + "; ";
	}
	var animationStylesheetRule = new haxe.Template(animationTpl).execute({ id : surface.id, duration : data.length / fps, steps : 1});
	var rules;
	if(style.sheet.rules != null) rules = style.sheet.rules; else rules = style.sheet.cssRules;
	var _g = 0;
	var _g1 = ["","-moz-","-webkit-","-o-","-ms-"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		try {
			style.sheet.insertRule("@" + variant + "keyframes " + surface.id + " {" + keyframeStylesheetRule + "}",rules.length);
		} catch( e ) {
		}
	}
	style.sheet.insertRule("#" + surface.id + " { " + animationStylesheetRule + " } ",rules.length);
	return style;
}
flash.Lib.__designMode = function(mode) {
	if(mode) window.document.designMode = "on"; else window.document.designMode = "off";
}
flash.Lib.__disableFullScreen = function() {
}
flash.Lib.__disableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		flash.Lib.trace("Disable right click not supported in this browser.");
	}
}
flash.Lib.__drawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
flash.Lib.__drawSurfaceRect = function(surface,tgt,x,y,rect) {
	var tgtCtx = tgt.getContext("2d");
	tgt.width = rect.width;
	tgt.height = rect.height;
	tgtCtx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);
	tgt.style.left = x + "px";
	tgt.style.top = y + "px";
}
flash.Lib.__drawToSurface = function(surface,tgt,matrix,alpha,clipRect,smoothing) {
	if(smoothing == null) smoothing = true;
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	tgtCtx.globalAlpha = alpha;
	flash.Lib.__setImageSmoothing(tgtCtx,smoothing);
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			flash.Lib.__drawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else flash.Lib.__drawClippedImage(surface,tgtCtx,clipRect);
	}
}
flash.Lib.__enableFullScreen = function() {
	if(flash.Lib.mMe != null) {
		var origWidth = flash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = flash.Lib.mMe.__scr.style.getPropertyValue("height");
		flash.Lib.mMe.__scr.style.setProperty("width","100%","");
		flash.Lib.mMe.__scr.style.setProperty("height","100%","");
		flash.Lib.__disableFullScreen = function() {
			flash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			flash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
flash.Lib.__enableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		flash.Lib.trace("Enable right click not supported in this browser.");
	}
}
flash.Lib.__fullScreenHeight = function() {
	return window.innerHeight;
}
flash.Lib.__fullScreenWidth = function() {
	return window.innerWidth;
}
flash.Lib.__getHeight = function() {
	var tgt;
	if(flash.Lib.mMe != null) tgt = flash.Lib.mMe.__scr; else tgt = window.document.getElementById("haxe:openfl");
	if(tgt != null && tgt.clientHeight > 0) return tgt.clientHeight; else return 500;
}
flash.Lib.__getStage = function() {
	if(flash.Lib.mStage == null) {
		var width = flash.Lib.__getWidth();
		var height = flash.Lib.__getHeight();
		flash.Lib.mStage = new flash.display.Stage(width,height);
	}
	return flash.Lib.mStage;
}
flash.Lib.__getWidth = function() {
	var tgt;
	if(flash.Lib.mMe != null) tgt = flash.Lib.mMe.__scr; else tgt = window.document.getElementById("haxe:openfl");
	if(tgt != null && tgt.clientWidth > 0) return tgt.clientWidth; else return 500;
}
flash.Lib.__isOnStage = function(surface) {
	var p = surface;
	while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
	return p == flash.Lib.mMe.__scr;
}
flash.Lib.__parseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
flash.Lib.__removeSurface = function(surface) {
	if(flash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-openfl-anim");
		if(anim != null) {
			var style = window.document.getElementById(anim);
			if(style != null) flash.Lib.mMe.__scr.removeChild(style);
		}
		if(surface.parentNode != null) surface.parentNode.removeChild(surface);
	}
	return surface;
}
flash.Lib.__setSurfaceBorder = function(surface,color,size) {
	surface.style.setProperty("border-color","#" + StringTools.hex(color),"");
	surface.style.setProperty("border-style","solid","");
	surface.style.setProperty("border-width",size + "px","");
	surface.style.setProperty("border-collapse","collapse","");
}
flash.Lib.__setSurfaceClipping = function(surface,rect) {
}
flash.Lib.__setSurfaceFont = function(surface,font,bold,size,color,align,lineHeight) {
	surface.style.setProperty("font-family",font,"");
	surface.style.setProperty("font-weight",Std.string(bold),"");
	surface.style.setProperty("color","#" + StringTools.hex(color),"");
	surface.style.setProperty("font-size",size + "px","");
	surface.style.setProperty("text-align",align,"");
	surface.style.setProperty("line-height",lineHeight + "px","");
}
flash.Lib.__setSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
flash.Lib.__setSurfacePadding = function(surface,padding,margin,display) {
	surface.style.setProperty("padding",padding + "px","");
	surface.style.setProperty("margin",margin + "px","");
	surface.style.setProperty("top",padding + 2 + "px","");
	surface.style.setProperty("right",padding + 1 + "px","");
	surface.style.setProperty("left",padding + 1 + "px","");
	surface.style.setProperty("bottom",padding + 1 + "px","");
	surface.style.setProperty("display",display?"inline":"block","");
}
flash.Lib.__setSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-openfl-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
		surface.style.setProperty("transform","","");
		surface.style.setProperty("-moz-transform","","");
		surface.style.setProperty("-webkit-transform","","");
		surface.style.setProperty("-o-transform","","");
		surface.style.setProperty("-ms-transform","","");
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!flash.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
flash.Lib.__setSurfaceZIndexAfter = function(surface1,surface2) {
	if(surface1 != null && surface2 != null) {
		if(surface1.parentNode != surface2.parentNode && surface2.parentNode != null) surface2.parentNode.appendChild(surface1);
		if(surface2.parentNode != null) {
			var nextSibling = surface2.nextSibling;
			if(surface1.previousSibling != surface2) {
				var swap = flash.Lib.__removeSurface(surface1);
				if(nextSibling == null) surface2.parentNode.appendChild(swap); else surface2.parentNode.insertBefore(swap,nextSibling);
			}
		}
	}
}
flash.Lib.__swapSurface = function(surface1,surface2) {
	var parent1 = surface1.parentNode;
	var parent2 = surface2.parentNode;
	if(parent1 != null && parent2 != null) {
		if(parent1 == parent2) {
			var next1 = surface1.nextSibling;
			var next2 = surface2.nextSibling;
			if(next1 == surface2) parent1.insertBefore(surface2,surface1); else if(next2 == surface1) parent1.insertBefore(surface1,surface2); else {
				parent1.replaceChild(surface2,surface1);
				if(next2 != null) parent1.insertBefore(surface1,next2); else parent1.appendChild(surface1);
			}
		} else {
			var next2 = surface2.nextSibling;
			parent1.replaceChild(surface2,surface1);
			if(next2 != null) parent2.insertBefore(surface1,next2); else parent2.appendChild(surface1);
		}
	}
}
flash.Lib.__setContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
flash.Lib.__setCursor = function(type) {
	if(flash.Lib.mMe != null) switch(type[1]) {
	case 0:
		flash.Lib.mMe.__scr.style.cursor = "pointer";
		break;
	case 1:
		flash.Lib.mMe.__scr.style.cursor = "text";
		break;
	default:
		flash.Lib.mMe.__scr.style.cursor = "default";
	}
}
flash.Lib.__setImageSmoothing = function(context,enabled) {
	var _g = 0;
	var _g1 = ["imageSmoothingEnabled","mozImageSmoothingEnabled","webkitImageSmoothingEnabled"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		context[variant] = enabled;
	}
}
flash.Lib.__setSurfaceAlign = function(surface,align) {
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.__setSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
flash.Lib.__setSurfaceRotation = function(surface,rotate) {
	surface.style.setProperty("transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-moz-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-webkit-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-o-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-ms-transform","rotate(" + rotate + "deg)","");
}
flash.Lib.__setSurfaceScale = function(surface,scale) {
	surface.style.setProperty("transform","scale(" + scale + ")","");
	surface.style.setProperty("-moz-transform","scale(" + scale + ")","");
	surface.style.setProperty("-webkit-transform","scale(" + scale + ")","");
	surface.style.setProperty("-o-transform","scale(" + scale + ")","");
	surface.style.setProperty("-ms-transform","scale(" + scale + ")","");
}
flash.Lib.__setSurfaceSpritesheetAnimation = function(surface,spec,fps) {
	if(spec.length == 0) return surface;
	var div = window.document.createElement("div");
	div.style.backgroundImage = "url(" + surface.toDataURL("image/png") + ")";
	div.id = surface.id;
	var keyframeTpl = new haxe.Template("background-position: ::left::px ::top::px; width: ::width::px; height: ::height::px; ");
	var templateFunc = function(frame) {
		return { left : -frame.x, top : -frame.y, width : frame.width, height : frame.height};
	};
	flash.Lib.__createSurfaceAnimationCSS(div,spec,keyframeTpl,templateFunc,fps,true,true);
	if((function($this) {
		var $r;
		var p = surface;
		while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
		$r = p == flash.Lib.mMe.__scr;
		return $r;
	}(this))) {
		flash.Lib.__appendSurface(div);
		flash.Lib.__copyStyle(surface,div);
		flash.Lib.__swapSurface(surface,div);
		flash.Lib.__removeSurface(surface);
	} else flash.Lib.__copyStyle(surface,div);
	return div;
}
flash.Lib.__setSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
flash.Lib.__setTextDimensions = function(surface,width,height,align) {
	surface.style.setProperty("width",width + "px","");
	surface.style.setProperty("height",height + "px","");
	surface.style.setProperty("overflow","hidden","");
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.__surfaceHitTest = function(surface,x,y) {
	var _g1 = 0;
	var _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = surface.childNodes[i];
		if(x >= node.offsetLeft && x <= node.offsetLeft + node.offsetWidth && y >= node.offsetTop && y <= node.offsetTop + node.offsetHeight) return true;
	}
	return false;
}
flash.Lib.get_current = function() {
	if(flash.Lib.mMainClassRoot == null) {
		flash.Lib.mMainClassRoot = new flash.display.MovieClip();
		flash.Lib.mCurrent = flash.Lib.mMainClassRoot;
		flash.Lib.__getStage().addChild(flash.Lib.mCurrent);
	}
	return flash.Lib.mMainClassRoot;
}
flash.Lib.prototype = {
	__class__: flash.Lib
}
flash._Lib = {}
flash._Lib.CursorType = $hxClasses["flash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
flash._Lib.CursorType.Pointer = ["Pointer",0];
flash._Lib.CursorType.Pointer.toString = $estr;
flash._Lib.CursorType.Pointer.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Text = ["Text",1];
flash._Lib.CursorType.Text.toString = $estr;
flash._Lib.CursorType.Text.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Default = ["Default",2];
flash._Lib.CursorType.Default.toString = $estr;
flash._Lib.CursorType.Default.__enum__ = flash._Lib.CursorType;
flash._Vector = {}
flash._Vector.Vector_Impl_ = function() { }
$hxClasses["flash._Vector.Vector_Impl_"] = flash._Vector.Vector_Impl_;
flash._Vector.Vector_Impl_.__name__ = ["flash","_Vector","Vector_Impl_"];
flash._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
flash._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
}
flash._Vector.Vector_Impl_.concat = function(this1,a) {
	var a1 = this1.concat(a);
	return a1;
}
flash._Vector.Vector_Impl_.copy = function(this1) {
	var a = this1.slice();
	return a;
}
flash._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
}
flash._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
}
flash._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
}
flash._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
}
flash._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
}
flash._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
}
flash._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
}
flash._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	var a = this1.slice(pos,end);
	return a;
}
flash._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
}
flash._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	var a = this1.splice(pos,len);
	return a;
}
flash._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
}
flash._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
}
flash._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
}
flash._Vector.Vector_Impl_.ofArray = function(a) {
	return flash._Vector.Vector_Impl_.concat((function($this) {
		var $r;
		var this1 = flash._Vector.Vector_Impl_._new();
		$r = this1;
		return $r;
	}(this)),a);
}
flash._Vector.Vector_Impl_.convert = function(v) {
	return v;
}
flash._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
}
flash._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
}
flash._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
}
flash._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(value < this1.length) this1 = this1.slice(0,value);
	while(value > this1.length) this1.push(null);
	return value;
}
flash._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
}
flash._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
}
flash.accessibility = {}
flash.accessibility.AccessibilityProperties = function() {
	this.description = "";
	this.forceSimple = false;
	this.name = "";
	this.noAutoLabeling = false;
	this.shortcut = "";
	this.silent = false;
};
$hxClasses["flash.accessibility.AccessibilityProperties"] = flash.accessibility.AccessibilityProperties;
flash.accessibility.AccessibilityProperties.__name__ = ["flash","accessibility","AccessibilityProperties"];
flash.accessibility.AccessibilityProperties.prototype = {
	__class__: flash.accessibility.AccessibilityProperties
}
flash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	flash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		this.bitmapData.__referenceCount++;
		if(this.bitmapData.__referenceCount == 1) this.__graphics = new flash.display.Graphics(this.bitmapData.___textureBuffer);
	}
	if(this.pixelSnapping == null) this.pixelSnapping = flash.display.PixelSnapping.AUTO;
	if(this.__graphics == null) this.__graphics = new flash.display.Graphics();
	if(this.bitmapData != null) this.__render();
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.__extentWithFilters;
		var fm;
		var _this = this.transform;
		var m;
		var _this1 = _this._fullMatrix;
		var m1 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
		m1._sx = _this1._sx;
		m1._sy = _this1._sy;
		m = m1;
		fm = m;
		var inPos = extent.get_topLeft();
		fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
		fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
		fm.a = Math.round(fm.a * 1000) / 1000;
		fm.b = Math.round(fm.b * 1000) / 1000;
		fm.c = Math.round(fm.c * 1000) / 1000;
		fm.d = Math.round(fm.d * 1000) / 1000;
		fm.set_tx(Math.round(fm.tx * 10) / 10);
		fm.set_ty(Math.round(fm.ty * 10) / 10);
		return fm;
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this.___id + "]";
	}
	,validateBounds: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) {
			flash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new flash.geom.Rectangle(0,0,(function($this) {
					var $r;
					var _this = $this.bitmapData;
					$r = _this.___textureBuffer != null?_this.___textureBuffer.width:0;
					return $r;
				}(this)),(function($this) {
					var $r;
					var _this = $this.bitmapData;
					$r = _this.___textureBuffer != null?_this.___textureBuffer.height:0;
					return $r;
				}(this)));
				if(r.width != 0 || r.height != 0) {
					if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() / this.get_scaleX() || local.y > this.get_height() / this.get_scaleY()) return null; else return this;
		} else return flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		if(this.bitmapData == null) return;
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(this.bitmapData.___textureBuffer != this.__graphics.__surface) {
			var imageDataLease = this.bitmapData.__lease;
			if(imageDataLease != null && (this.__currentLease == null || imageDataLease.seed != this.__currentLease.seed || imageDataLease.time != this.__currentLease.time)) {
				var srcCanvas = this.bitmapData.___textureBuffer;
				this.__graphics.__surface.width = srcCanvas.width;
				this.__graphics.__surface.height = srcCanvas.height;
				this.__graphics.clear();
				flash.Lib.__drawToSurface(srcCanvas,this.__graphics.__surface);
				this.__currentLease = imageDataLease.clone();
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				var surface = this.__graphics.__surface;
				if(this.__filters != null) {
					var _g = 0;
					var _g1 = this.__filters;
					while(_g < _g1.length) {
						var filter = _g1[_g];
						++_g;
						filter.__applyFilter(surface);
					}
				}
				this.___renderFlags |= 32;
			}
		}
		if(inMask != null) {
			var surface = this.__graphics.__surface;
			if(this.__filters != null) {
				var _g = 0;
				var _g1 = this.__filters;
				while(_g < _g1.length) {
					var filter = _g1[_g];
					++_g;
					filter.__applyFilter(surface);
				}
			}
			var m;
			var extent = this.__graphics.__extentWithFilters;
			var fm;
			var _this = this.transform;
			var m1;
			var _this1 = _this._fullMatrix;
			var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
			m2._sx = _this1._sx;
			m2._sy = _this1._sy;
			m1 = m2;
			fm = m1;
			var inPos = extent.get_topLeft();
			fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
			fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
			fm.a = Math.round(fm.a * 1000) / 1000;
			fm.b = Math.round(fm.b * 1000) / 1000;
			fm.c = Math.round(fm.c * 1000) / 1000;
			fm.d = Math.round(fm.d * 1000) / 1000;
			fm.set_tx(Math.round(fm.tx * 10) / 10);
			fm.set_ty(Math.round(fm.ty * 10) / 10);
			m = fm;
			flash.Lib.__drawToSurface(this.__graphics.__surface,inMask,m,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha,clipRect,this.smoothing);
		} else {
			if((this.___renderFlags & 32) != 0) {
				var m;
				var extent = this.__graphics.__extentWithFilters;
				var fm;
				var _this = this.transform;
				var m1;
				var _this1 = _this._fullMatrix;
				var m2 = new flash.geom.Matrix(_this1.a,_this1.b,_this1.c,_this1.d,_this1.tx,_this1.ty);
				m2._sx = _this1._sx;
				m2._sy = _this1._sy;
				m1 = m2;
				fm = m1;
				var inPos = extent.get_topLeft();
				fm.set_tx(inPos.x * fm.a + inPos.y * fm.c + fm.tx);
				fm.set_ty(inPos.x * fm.b + inPos.y * fm.d + fm.ty);
				fm.a = Math.round(fm.a * 1000) / 1000;
				fm.b = Math.round(fm.b * 1000) / 1000;
				fm.c = Math.round(fm.c * 1000) / 1000;
				fm.d = Math.round(fm.d * 1000) / 1000;
				fm.set_tx(Math.round(fm.tx * 10) / 10);
				fm.set_ty(Math.round(fm.ty * 10) / 10);
				m = fm;
				flash.Lib.__setSurfaceTransform(this.__graphics.__surface,m);
				this.___renderFlags &= -33;
			}
			if(!this.__init) {
				flash.Lib.__setSurfaceOpacity(this.__graphics.__surface,0);
				this.__init = true;
			} else flash.Lib.__setSurfaceOpacity(this.__graphics.__surface,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha);
		}
	}
	,set_bitmapData: function(inBitmapData) {
		if(inBitmapData != this.bitmapData) {
			if(this.bitmapData != null) {
				this.bitmapData.__referenceCount--;
				if(this.__graphics.__surface == this.bitmapData.___textureBuffer) flash.Lib.__setSurfaceOpacity(this.bitmapData.___textureBuffer,0);
			}
			if(inBitmapData != null) inBitmapData.__referenceCount++;
		}
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,__class__: flash.display.Bitmap
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
flash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.__locked = false;
	this.__referenceCount = 0;
	this.__leaseNum = 0;
	this.__lease = new flash.display.ImageDataLease();
	this.__lease.set(this.__leaseNum++,new Date().getTime());
	this.___textureBuffer = window.document.createElement("canvas");
	this.___textureBuffer.width = width;
	this.___textureBuffer.height = height;
	this.___id = flash.utils.Uuid.uuid();
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	this.___textureBuffer.id = regex.replace(this.___id,"_");
	this.__transparent = transparent;
	this.rect = new flash.geom.Rectangle(0,0,width,height);
	if(this.__transparent) {
		this.__transparentFiller = window.document.createElement("canvas");
		this.__transparentFiller.width = width;
		this.__transparentFiller.height = height;
		var ctx = this.__transparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.__transparent) inFillColor |= -16777216;
		this.__initColor = inFillColor;
		this.__fillRect(this.rect,inFillColor);
	}
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new flash.geom.Rectangle(0,0,bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.width:0,bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.height:0));
	var num;
	num = (bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.width:0) * (bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.height:0);
	p.position = 0;
	var _g = 0;
	while(_g < num) {
		var i = _g++;
		var pos = p.position;
		var alpha;
		var data = p.data;
		alpha = data.getUint8(p.position++);
		var red;
		var data = p.data;
		red = data.getUint8(p.position++);
		var green;
		var data = p.data;
		green = data.getUint8(p.position++);
		var blue;
		var data = p.data;
		blue = data.getUint8(p.position++);
		p.position = pos;
		p.writeByte(red);
		p.writeByte(green);
		p.writeByte(blue);
		p.writeByte(alpha);
	}
	return p;
}
flash.display.BitmapData.loadFromBase64 = function(base64,type,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	var onload1 = onload;
	var _g = bitmapData;
	var img = window.document.createElement("img");
	var canvas = bitmapData.___textureBuffer;
	var drawImage = function(_) {
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
		if(onload1 != null) onload1(_g);
	};
	img.addEventListener("load",drawImage,false);
	img.src = "data:" + type + ";base64," + base64;
	return bitmapData;
}
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	var inRawAlpha1 = inRawAlpha;
	var onload1 = onload;
	var _g = bitmapData;
	var type = "";
	if(flash.display.BitmapData.__isPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.__isJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
	if(inRawAlpha1 != null) {
		var base64 = flash.display.BitmapData.__base64Encode(bytes);
		var onload2 = function(_) {
			var ctx = _g.___textureBuffer.getContext("2d");
			var pixels = ctx.getImageData(0,0,_g.___textureBuffer.width,_g.___textureBuffer.height);
			var _g2 = 0;
			var _g1 = inRawAlpha1.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var data = inRawAlpha1.data;
				pixels.data[i * 4 + 3] = data.getUint8(inRawAlpha1.position++);
			}
			ctx.putImageData(pixels,0,0);
			if(onload1 != null) onload1(_g);
		};
		var _g3 = bitmapData;
		var img = window.document.createElement("img");
		var canvas = bitmapData.___textureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			_g3.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload2 != null) onload2(_g3);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + base64;
	} else {
		var base64 = flash.display.BitmapData.__base64Encode(bytes);
		var onload3 = onload1;
		var _g4 = bitmapData;
		var img1 = window.document.createElement("img");
		var canvas1 = bitmapData.___textureBuffer;
		var drawImage = function(_) {
			canvas1.width = img1.width;
			canvas1.height = img1.height;
			var ctx = canvas1.getContext("2d");
			ctx.drawImage(img1,0,0);
			_g4.rect = new flash.geom.Rectangle(0,0,canvas1.width,canvas1.height);
			if(onload3 != null) onload3(_g4);
		};
		img1.addEventListener("load",drawImage,false);
		img1.src = "data:" + type + ";base64," + base64;
	}
	return bitmapData;
}
flash.display.BitmapData.__base64Encode = function(bytes) {
	var blob = "";
	var codex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	bytes.position = 0;
	while(bytes.position < bytes.length) {
		var by1 = 0;
		var by2 = 0;
		var by3 = 0;
		var data = bytes.data;
		by1 = data.getUint8(bytes.position++);
		if(bytes.position < bytes.length) {
			var data = bytes.data;
			by2 = data.getUint8(bytes.position++);
		}
		if(bytes.position < bytes.length) {
			var data = bytes.data;
			by3 = data.getUint8(bytes.position++);
		}
		var by4 = 0;
		var by5 = 0;
		var by6 = 0;
		var by7 = 0;
		by4 = by1 >> 2;
		by5 = (by1 & 3) << 4 | by2 >> 4;
		by6 = (by2 & 15) << 2 | by3 >> 6;
		by7 = by3 & 63;
		blob += codex.charAt(by4);
		blob += codex.charAt(by5);
		if(bytes.position < bytes.length) blob += codex.charAt(by6); else blob += "=";
		if(bytes.position < bytes.length) blob += codex.charAt(by7); else blob += "=";
	}
	return blob;
}
flash.display.BitmapData.__createFromHandle = function(inHandle) {
	var result = new flash.display.BitmapData(0,0);
	result.___textureBuffer = inHandle;
	return result;
}
flash.display.BitmapData.__isJPG = function(bytes) {
	bytes.position = 0;
	return (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 255 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 216;
}
flash.display.BitmapData.__isPNG = function(bytes) {
	bytes.position = 0;
	return (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 137 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 80 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 78 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 71 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 13 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 10 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 26 && (function($this) {
		var $r;
		var data = bytes.data;
		$r = data.getUint8(bytes.position++);
		return $r;
	}(this)) == 10;
}
flash.display.BitmapData.prototype = {
	applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(sourceBitmapData == this && sourceRect.x == destPoint.x && sourceRect.y == destPoint.y) filter.__applyFilter(this.___textureBuffer,sourceRect); else {
			var bitmapData = new flash.display.BitmapData(sourceRect.width | 0,sourceRect.height | 0);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point());
			filter.__applyFilter(bitmapData.___textureBuffer);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
		}
	}
	,clear: function(color) {
		this.fillRect(this.rect,color);
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this.___textureBuffer != null?this.___textureBuffer.width:0)) {
			r.width -= r.x + r.width - (this.___textureBuffer != null?this.___textureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) {
			r.height -= r.y + r.height - (this.___textureBuffer != null?this.___textureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,clone: function() {
		var bitmapData = new flash.display.BitmapData(this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0,this.__transparent);
		var rect = new flash.geom.Rectangle(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
		bitmapData.setPixels(rect,this.getPixels(rect));
		bitmapData.__lease.set(bitmapData.__leaseNum++,new Date().getTime());
		return bitmapData;
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0;
			var _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.__imageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0;
			var _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.__imageData.width;
				var _g3 = 0;
				var _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.__imageData.data[s + offsetX] = this.__imageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.__imageData.data[s + offsetX + 1] = this.__imageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.__imageData.data[s + offsetX + 2] = this.__imageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.__imageData.data[s + offsetX + 3] = this.__imageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.__imageDataChanged = true;
		}
	}
	,compare: function(inBitmapTexture) {
		throw "bitmapData.compare is currently not supported for HTML5";
		return 0;
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		this.rect = this.clipRect(this.rect);
		if(this.rect == null) return;
		if(destChannel == 8 && !this.__transparent) return;
		if(sourceBitmapData.___textureBuffer == null || this.___textureBuffer == null || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.___textureBuffer.width) sourceRect.width = sourceBitmapData.___textureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.___textureBuffer.height) sourceRect.height = sourceBitmapData.___textureBuffer.height - sourceRect.y;
		var doChannelCopy = function(imageData) {
			var srcCtx = sourceBitmapData.___textureBuffer.getContext("2d");
			var srcImageData = srcCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
			var destIdx = -1;
			if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
			var pos = 4 * (Math.round(destPoint.x) + Math.round(destPoint.y) * imageData.width) + destIdx;
			var boundR = Math.round(4 * (destPoint.x + sourceRect.width));
			var setPos = function(val) {
				if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
				imageData.data[pos] = val;
				pos += 4;
			};
			var srcIdx = -1;
			if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
			while(srcIdx < srcImageData.data.length) {
				setPos(srcImageData.data[srcIdx]);
				srcIdx += 4;
			}
		};
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			doChannelCopy(imageData);
			ctx.putImageData(imageData,0,0);
		} else {
			doChannelCopy(this.__imageData);
			this.__imageDataChanged = true;
		}
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData.___textureBuffer == null || this.___textureBuffer == null || sourceBitmapData.___textureBuffer.width == 0 || sourceBitmapData.___textureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.___textureBuffer.width) sourceRect.width = sourceBitmapData.___textureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.___textureBuffer.height) sourceRect.height = sourceBitmapData.___textureBuffer.height - sourceRect.y;
		if(alphaBitmapData != null && alphaBitmapData.__transparent) {
			if(alphaPoint == null) alphaPoint = new flash.geom.Point();
			var bitmapData = new flash.display.BitmapData(sourceBitmapData.___textureBuffer != null?sourceBitmapData.___textureBuffer.width:0,sourceBitmapData.___textureBuffer != null?sourceBitmapData.___textureBuffer.height:0,true);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point(sourceRect.x,sourceRect.y));
			bitmapData.copyChannel(alphaBitmapData,new flash.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new flash.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = bitmapData;
		}
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			if(!mergeAlpha) {
				if(this.__transparent && sourceBitmapData.__transparent) {
					var trpCtx = sourceBitmapData.__transparentFiller.getContext("2d");
					var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
					ctx.putImageData(trpData,destPoint.x,destPoint.y);
				}
			}
			ctx.drawImage(sourceBitmapData.___textureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.__copyPixelList[this.__copyPixelList.length] = { handle : sourceBitmapData.___textureBuffer, transparentFiller : mergeAlpha?null:sourceBitmapData.__transparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,destroy: function() {
		this.___textureBuffer = null;
	}
	,dispose: function() {
		var ctx = this.___textureBuffer.getContext("2d");
		ctx.clearRect(0,0,this.___textureBuffer.width,this.___textureBuffer.height);
		this.___textureBuffer = null;
		this.__leaseNum = 0;
		this.__lease = null;
		this.__imageData = null;
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		source.drawToSurface(this.___textureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new flash.geom.Rectangle();
			var object = source;
			if(matrix != null) rect.x = matrix.tx; else rect.x = 0;
			if(matrix != null) rect.y = matrix.ty; else rect.y = 0;
			try {
				var tmp;
				if(source == null) rect.width = null; else if(source.__properties__ && (tmp = source.__properties__["get_" + "width"])) rect.width = source[tmp](); else rect.width = source.width;
				var tmp;
				if(source == null) rect.height = null; else if(source.__properties__ && (tmp = source.__properties__["get_" + "height"])) rect.height = source[tmp](); else rect.height = source.height;
			} catch( e ) {
				rect.width = this.___textureBuffer.width;
				rect.height = this.___textureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else {
				flash.Lib.__setImageSmoothing(ctx,smoothing);
				ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			}
			ctx.drawImage(this.___textureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this.___textureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new flash.geom.Rectangle(0,0,this.___textureBuffer.width,this.___textureBuffer.height),inColorTransform);
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this.___textureBuffer.width && rect.height == this.___textureBuffer.height) {
			if(this.__transparent) {
				if(color >>> 24 == 0 || color == this.__initColor) {
					var ctx = this.___textureBuffer.getContext("2d");
					return ctx.clearRect(0,0,this.___textureBuffer.width,this.___textureBuffer.height);
				}
			} else if((color | -16777216) == (this.__initColor | -16777216)) {
				var ctx = this.___textureBuffer.getContext("2d");
				return ctx.clearRect(0,0,this.___textureBuffer.width,this.___textureBuffer.height);
			}
		}
		return this.__fillRect(rect,color);
	}
	,floodFill: function(x,y,color) {
		var wasLocked = this.__locked;
		if(!this.__locked) this.lock();
		var queue = new Array();
		queue.push(new flash.geom.Point(x,y));
		var old = this.getPixel32(x,y);
		var iterations = 0;
		var search = new Array();
		var _g1 = 0;
		var _g;
		_g = (this.___textureBuffer != null?this.___textureBuffer.width:0) + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var column = new Array();
			var _g3 = 0;
			var _g2;
			_g2 = (this.___textureBuffer != null?this.___textureBuffer.height:0) + 1;
			while(_g3 < _g2) {
				var i1 = _g3++;
				column.push(false);
			}
			search.push(column);
		}
		var currPoint;
		var newPoint;
		while(queue.length > 0) {
			currPoint = queue.shift();
			++iterations;
			var x1 = currPoint.x | 0;
			var y1 = currPoint.y | 0;
			if(x1 < 0 || x1 >= (this.___textureBuffer != null?this.___textureBuffer.width:0)) continue;
			if(y1 < 0 || y1 >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) continue;
			search[x1][y1] = true;
			if(this.getPixel32(x1,y1) == old) {
				this.setPixel32(x1,y1,color);
				if(!search[x1 + 1][y1]) queue.push(new flash.geom.Point(x1 + 1,y1));
				if(!search[x1][y1 + 1]) queue.push(new flash.geom.Point(x1,y1 + 1));
				if(x1 > 0 && !search[x1 - 1][y1]) queue.push(new flash.geom.Point(x1 - 1,y1));
				if(y1 > 0 && !search[x1][y1 - 1]) queue.push(new flash.geom.Point(x1,y1 - 1));
			}
		}
		if(!wasLocked) this.unlock();
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		var me = this;
		var doGetColorBoundsRect = function(data) {
			var minX;
			if(me.___textureBuffer != null) minX = me.___textureBuffer.width; else minX = 0;
			var maxX = 0;
			var minY;
			if(me.___textureBuffer != null) minY = me.___textureBuffer.height; else minY = 0;
			var maxY = 0;
			var i = 0;
			while(i < data.length) {
				var value = me.getInt32(i,data);
				if(findColor) {
					if((value & mask) == color) {
						var x = Math.round(i % ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4) / 4);
						var y = Math.round(i / ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4));
						if(x < minX) minX = x;
						if(x > maxX) maxX = x;
						if(y < minY) minY = y;
						if(y > maxY) maxY = y;
					}
				} else if((value & mask) != color) {
					var x = Math.round(i % ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4) / 4);
					var y = Math.round(i / ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4));
					if(x < minX) minX = x;
					if(x > maxX) maxX = x;
					if(y < minY) minY = y;
					if(y > maxY) maxY = y;
				}
				i += 4;
			}
			if(minX < maxX && minY < maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY); else return new flash.geom.Rectangle(0,0,me.___textureBuffer != null?me.___textureBuffer.width:0,me.___textureBuffer != null?me.___textureBuffer.height:0);
		};
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			return doGetColorBoundsRect(imageData.data);
		} else return doGetColorBoundsRect(this.__imageData.data);
	}
	,getInt32: function(offset,data) {
		return (this.__transparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return 0;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(x,y,1,1);
			return imagedata.data[0] << 16 | imagedata.data[1] << 8 | imagedata.data[2];
		} else {
			var offset;
			offset = 4 * y * (this.___textureBuffer != null?this.___textureBuffer.width:0) + x * 4;
			return this.__imageData.data[offset] << 16 | this.__imageData.data[offset + 1] << 8 | this.__imageData.data[offset + 2];
		}
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return 0;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			return this.getInt32(0,ctx.getImageData(x,y,1,1).data);
		} else return this.getInt32(4 * y * this.___textureBuffer.width + x * 4,this.__imageData.data);
	}
	,getPixels: function(rect) {
		var len = Math.round(4 * rect.width * rect.height);
		var byteArray = new flash.utils.ByteArray();
		if(byteArray.allocated < len) byteArray.___resizeBuffer((function($this) {
			var $r;
			var x = Math.max(len,byteArray.allocated * 2);
			$r = byteArray.allocated = x | 0;
			return $r;
		}(this))); else if(byteArray.allocated > len) byteArray.___resizeBuffer(byteArray.allocated = len);
		byteArray.length = len;
		len;
		rect = this.clipRect(rect);
		if(rect == null) return byteArray;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				byteArray.writeByte(imagedata.data[i]);
			}
		} else {
			var offset = Math.round(4 * this.__imageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.__imageData.width * 4) > boundR - 1) pos += this.__imageData.width * 4 - boundR;
				byteArray.writeByte(this.__imageData.data[pos]);
				pos++;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,handle: function() {
		return this.___textureBuffer;
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		var type = Type.getClassName(Type.getClass(secondObject));
		firstAlphaThreshold = firstAlphaThreshold & -1;
		var me = this;
		var doHitTest = function(imageData) {
			if(secondObject.__proto__ == null || secondObject.__proto__.__class__ == null || secondObject.__proto__.__class__.__name__ == null) return false;
			var _g = secondObject.__proto__.__class__.__name__[2];
			switch(_g) {
			case "Rectangle":
				var rect = secondObject;
				rect.x -= firstPoint.x;
				rect.y -= firstPoint.y;
				rect = me.clipRect(me.rect);
				if(me.rect == null) return false;
				var boundingBox = new flash.geom.Rectangle(0,0,me.___textureBuffer != null?me.___textureBuffer.width:0,me.___textureBuffer != null?me.___textureBuffer.height:0);
				if(!rect.intersects(boundingBox)) return false;
				var diff = rect.intersection(boundingBox);
				var offset = 4 * (Math.round(diff.x) + Math.round(diff.y) * imageData.width) + 3;
				var pos = offset;
				var boundR = Math.round(4 * (diff.x + diff.width));
				while(pos < offset + Math.round(4 * (diff.width + imageData.width * diff.height))) {
					if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
					if(imageData.data[pos] - firstAlphaThreshold >= 0) return true;
					pos += 4;
				}
				return false;
			case "Point":
				var point = secondObject;
				var x = point.x - firstPoint.x;
				var y = point.y - firstPoint.y;
				if(x < 0 || y < 0 || x >= (me.___textureBuffer != null?me.___textureBuffer.width:0) || y >= (me.___textureBuffer != null?me.___textureBuffer.height:0)) return false;
				if(imageData.data[Math.round(4 * (y * (me.___textureBuffer != null?me.___textureBuffer.width:0) + x)) + 3] - firstAlphaThreshold > 0) return true;
				return false;
			case "Bitmap":
				throw "bitmapData.hitTest with a second object of type Bitmap is currently not supported for HTML5";
				return false;
			case "BitmapData":
				throw "bitmapData.hitTest with a second object of type BitmapData is currently not supported for HTML5";
				return false;
			default:
				throw "BitmapData::hitTest secondObject argument must be either a Rectangle, a Point, a Bitmap or a BitmapData object.";
				return false;
			}
		};
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			return doHitTest(imageData);
		} else return doHitTest(this.__imageData);
	}
	,lock: function() {
		this.__locked = true;
		var ctx = this.___textureBuffer.getContext("2d");
		this.__imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
		this.__imageDataChanged = false;
		this.__copyPixelList = [];
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		var generator = new flash.display._BitmapData.MinstdGenerator(randomSeed);
		var ctx = this.___textureBuffer.getContext("2d");
		var imageData = null;
		if(this.__locked) imageData = this.__imageData; else imageData = ctx.createImageData(this.___textureBuffer.width,this.___textureBuffer.height);
		var _g1 = 0;
		var _g = this.___textureBuffer.width * this.___textureBuffer.height;
		while(_g1 < _g) {
			var i = _g1++;
			if(grayScale) imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1); else {
				if((channelOptions & 1) == 0) imageData.data[i * 4] = 0; else imageData.data[i * 4] = low + generator.nextValue() % (high - low + 1);
				if((channelOptions & 2) == 0) imageData.data[i * 4 + 1] = 0; else imageData.data[i * 4 + 1] = low + generator.nextValue() % (high - low + 1);
				if((channelOptions & 4) == 0) imageData.data[i * 4 + 2] = 0; else imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1);
			}
			if((channelOptions & 8) == 0) imageData.data[i * 4 + 3] = 255; else imageData.data[i * 4 + 3] = low + generator.nextValue() % (high - low + 1);
		}
		if(this.__locked) this.__imageDataChanged = true; else ctx.putImageData(imageData,0,0);
	}
	,scroll: function(x,y) {
		throw "bitmapData.scroll is currently not supported for HTML5";
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return;
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.__transparent) imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.__imageData.width + x * 4;
			this.__imageData.data[offset] = (color & 16711680) >>> 16;
			this.__imageData.data[offset + 1] = (color & 65280) >>> 8;
			this.__imageData.data[offset + 2] = color & 255;
			if(this.__transparent) this.__imageData.data[offset + 3] = 255;
			this.__imageDataChanged = true;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return;
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.__transparent) imageData.data[3] = (color & -16777216) >>> 24; else imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.__imageData.width + x * 4;
			this.__imageData.data[offset] = (color & 16711680) >>> 16;
			this.__imageData.data[offset + 1] = (color & 65280) >>> 8;
			this.__imageData.data[offset + 2] = color & 255;
			if(this.__transparent) this.__imageData.data[offset + 3] = (color & -16777216) >>> 24; else this.__imageData.data[offset + 3] = 255;
			this.__imageDataChanged = true;
		}
	}
	,setPixels: function(rect,byteArray) {
		rect = this.clipRect(rect);
		if(rect == null) return;
		var len = Math.round(4 * rect.width * rect.height);
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				var data = byteArray.data;
				imageData.data[i] = data.getUint8(byteArray.position++);
			}
			ctx.putImageData(imageData,rect.x,rect.y);
		} else {
			var offset = Math.round(4 * this.__imageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.__imageData.width * 4) > boundR - 1) pos += this.__imageData.width * 4 - boundR;
				var data = byteArray.data;
				this.__imageData.data[pos] = data.getUint8(byteArray.position++);
				pos++;
			}
			this.__imageDataChanged = true;
		}
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		console.log("BitmapData.threshold not implemented");
		return 0;
	}
	,unlock: function(changeRect) {
		this.__locked = false;
		var ctx = this.___textureBuffer.getContext("2d");
		if(this.__imageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.__imageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.__imageData,0,0);
		}
		var _g = 0;
		var _g1 = this.__copyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.__transparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.__lease.set(this.__leaseNum++,new Date().getTime());
	}
	,__buildLease: function() {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
	}
	,__clearCanvas: function() {
		var ctx = this.___textureBuffer.getContext("2d");
		ctx.clearRect(0,0,this.___textureBuffer.width,this.___textureBuffer.height);
	}
	,__decrNumRefBitmaps: function() {
		this.__assignedBitmaps--;
	}
	,__fillRect: function(rect,color) {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		var ctx = this.___textureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a;
		if(this.__transparent) a = color >>> 24; else a = 255;
		if(!this.__locked) {
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.__imageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0;
			var _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.__imageData.width;
				var _g3 = 0;
				var _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.__imageData.data[s + offsetX] = r;
					this.__imageData.data[s + offsetX + 1] = g;
					this.__imageData.data[s + offsetX + 2] = b;
					this.__imageData.data[s + offsetX + 3] = a;
				}
			}
			this.__imageDataChanged = true;
		}
	}
	,__getLease: function() {
		return this.__lease;
	}
	,__loadFromBase64: function(base64,type,onload) {
		var _g = this;
		var img = window.document.createElement("img");
		var canvas = this.___textureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload != null) onload(_g);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + base64;
	}
	,__loadFromBytes: function(bytes,inRawAlpha,onload) {
		var _g = this;
		var type = "";
		if(flash.display.BitmapData.__isPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.__isJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		if(inRawAlpha != null) {
			var base64 = flash.display.BitmapData.__base64Encode(bytes);
			var onload1 = function(_) {
				var ctx = _g.___textureBuffer.getContext("2d");
				var pixels = ctx.getImageData(0,0,_g.___textureBuffer.width,_g.___textureBuffer.height);
				var _g2 = 0;
				var _g1 = inRawAlpha.length;
				while(_g2 < _g1) {
					var i = _g2++;
					var data = inRawAlpha.data;
					pixels.data[i * 4 + 3] = data.getUint8(inRawAlpha.position++);
				}
				ctx.putImageData(pixels,0,0);
				if(onload != null) onload(_g);
			};
			var _g3 = this;
			var img = window.document.createElement("img");
			var canvas = this.___textureBuffer;
			var drawImage = function(_) {
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img,0,0);
				_g3.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
				if(onload1 != null) onload1(_g3);
			};
			img.addEventListener("load",drawImage,false);
			img.src = "data:" + type + ";base64," + base64;
		} else {
			var base64 = flash.display.BitmapData.__base64Encode(bytes);
			var onload2 = onload;
			var _g4 = this;
			var img1 = window.document.createElement("img");
			var canvas1 = this.___textureBuffer;
			var drawImage = function(_) {
				canvas1.width = img1.width;
				canvas1.height = img1.height;
				var ctx = canvas1.getContext("2d");
				ctx.drawImage(img1,0,0);
				_g4.rect = new flash.geom.Rectangle(0,0,canvas1.width,canvas1.height);
				if(onload2 != null) onload2(_g4);
			};
			img1.addEventListener("load",drawImage,false);
			img1.src = "data:" + type + ";base64," + base64;
		}
	}
	,__getNumRefBitmaps: function() {
		return this.__assignedBitmaps;
	}
	,__incrNumRefBitmaps: function() {
		this.__assignedBitmaps++;
	}
	,__loadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = window.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.___textureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function($this) {
				var $r;
				var f = $bind($this,$this.__onLoad), a1 = data;
				$r = function(e) {
					return f(a1,e);
				};
				return $r;
			}(this)),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.__onLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,__onLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		var _this = data.bitmapData;
		_this.__lease.set(_this.__leaseNum++,new Date().getTime());
		if(data.inLoader != null) {
			var e1 = new flash.events.Event(flash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,get_height: function() {
		if(this.___textureBuffer != null) return this.___textureBuffer.height; else return 0;
	}
	,get_transparent: function() {
		return this.__transparent;
	}
	,get_width: function() {
		if(this.___textureBuffer != null) return this.___textureBuffer.width; else return 0;
	}
	,__class__: flash.display.BitmapData
	,__properties__: {get_width:"get_width",get_transparent:"get_transparent",get_height:"get_height"}
}
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,__class__: flash.display.ImageDataLease
}
flash.display._BitmapData = {}
flash.display._BitmapData.MinstdGenerator = function(seed) {
	if(seed == 0) this.value = 1; else this.value = seed;
};
$hxClasses["flash.display._BitmapData.MinstdGenerator"] = flash.display._BitmapData.MinstdGenerator;
flash.display._BitmapData.MinstdGenerator.__name__ = ["flash","display","_BitmapData","MinstdGenerator"];
flash.display._BitmapData.MinstdGenerator.prototype = {
	nextValue: function() {
		var lo = 16807 * (this.value & 65535);
		var hi = 16807 * (this.value >>> 16);
		lo += (hi & 32767) << 16;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		lo += hi >>> 15;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		return this.value = lo;
	}
	,__class__: flash.display._BitmapData.MinstdGenerator
}
flash.display.BitmapDataChannel = function() { }
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display.CapsStyle = $hxClasses["flash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
flash.display.CapsStyle.NONE = ["NONE",0];
flash.display.CapsStyle.NONE.toString = $estr;
flash.display.CapsStyle.NONE.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.ROUND = ["ROUND",1];
flash.display.CapsStyle.ROUND.toString = $estr;
flash.display.CapsStyle.ROUND.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.SQUARE = ["SQUARE",2];
flash.display.CapsStyle.SQUARE.toString = $estr;
flash.display.CapsStyle.SQUARE.__enum__ = flash.display.CapsStyle;
flash.display.GradientType = $hxClasses["flash.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] }
flash.display.GradientType.RADIAL = ["RADIAL",0];
flash.display.GradientType.RADIAL.toString = $estr;
flash.display.GradientType.RADIAL.__enum__ = flash.display.GradientType;
flash.display.GradientType.LINEAR = ["LINEAR",1];
flash.display.GradientType.LINEAR.toString = $estr;
flash.display.GradientType.LINEAR.__enum__ = flash.display.GradientType;
flash.display.Graphics = function(inSurface) {
	flash.Lib.__bootstrap();
	if(inSurface == null) {
		this.__surface = window.document.createElement("canvas");
		this.__surface.width = 0;
		this.__surface.height = 0;
	} else this.__surface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.__clearLine();
	this.mLineJobs = [];
	this.__changed = true;
	this.nextDrawIndex = 0;
	this.__extent = new flash.geom.Rectangle();
	this.__extentWithFilters = new flash.geom.Rectangle();
	this._padding = 0.0;
	this.__clearNextCycle = true;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.__detectIsPointInPathMode = function() {
	var canvas = window.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return flash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv;
	if(ctx.isPointInPath(0.3,0.3)) rv = flash.display.PointInPathMode.USER_SPACE; else rv = flash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
flash.display.Graphics.prototype = {
	addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new flash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,beginBitmapFill: function(bitmap,matrix,in_repeat,in_smooth) {
		if(in_smooth == null) in_smooth = false;
		if(in_repeat == null) in_repeat = true;
		this.closePolygon(true);
		var repeat;
		if(in_repeat == null) repeat = true; else repeat = in_repeat;
		var smooth;
		if(in_smooth == null) smooth = false; else smooth = in_smooth;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.__expandStandardExtent(bitmap.___textureBuffer != null?bitmap.___textureBuffer.width:0,bitmap.___textureBuffer != null?bitmap.___textureBuffer.height:0);
		this.mBitmap = { texture_buffer : bitmap.___textureBuffer, matrix : matrix == null?matrix:(function($this) {
			var $r;
			var m = new flash.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			m._sx = matrix._sx;
			m._sy = matrix._sy;
			$r = m;
			return $r;
		}(this)), flags : (repeat?16:0) | (smooth?65536:0)};
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		if(alpha == null) this.mFillAlpha = 1.0; else this.mFillAlpha = alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.closePolygon(true);
		this.mFilling = true;
		this.mBitmap = null;
		this.mSolidGradient = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,blit: function(inTexture) {
		this.closePolygon(true);
		var ctx;
		try {
			ctx = this.__surface.getContext("2d");
		} catch( e ) {
			ctx = null;
		}
		if(ctx != null) ctx.drawImage(inTexture.___textureBuffer,this.mPenX,this.mPenY);
	}
	,clear: function() {
		this.__clearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.__clearNextCycle = true;
		this.boundsDirty = true;
		this.__extent.x = 0.0;
		this.__extent.y = 0.0;
		this.__extent.width = 0.0;
		this.__extent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new flash.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.__changed = true;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new flash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new flash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0;
		var _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createGradient: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		var points = new Array();
		var _g1 = 0;
		var _g = colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			points.push(new flash.display.GradPoint(colors[i],alphas[i],ratios[i]));
		}
		var flags = 0;
		if(type == flash.display.GradientType.RADIAL) flags |= 1;
		if(spreadMethod == flash.display.SpreadMethod.REPEAT) flags |= 2; else if(spreadMethod == flash.display.SpreadMethod.REFLECT) flags |= 4;
		if(matrix == null) {
			matrix = new flash.geom.Matrix();
			matrix.createGradientBox(25,25);
		} else {
			var m = new flash.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			m._sx = matrix._sx;
			m._sy = matrix._sy;
			matrix = m;
		}
		var focal;
		if(focalPointRatio == null) focal = 0; else focal = focalPointRatio;
		return new flash.display.Grad(points,matrix,flags,focal);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.__drawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,drawEllipse: function(x,y,rx,ry) {
		this.closePolygon(false);
		rx /= 2;
		ry /= 2;
		this.__drawEllipse(x + rx,y + ry,rx,ry);
		this.closePolygon(false);
	}
	,drawGraphicsData: function(points) {
		var $it0 = $iterator(flash._Vector.Vector_Impl_)(points);
		while( $it0.hasNext() ) {
			var data = $it0.next();
			if(data == null) this.mFilling = true; else switch(data.__graphicsDataType) {
			case flash.display.GraphicsDataType.STROKE:
				var stroke = data;
				if(stroke.fill == null) this.lineStyle(stroke.thickness,0,1.,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit); else switch(stroke.fill.__graphicsFillType) {
				case flash.display.GraphicsFillType.SOLID_FILL:
					var fill = stroke.fill;
					this.lineStyle(stroke.thickness,fill.color,fill.alpha,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit);
					break;
				case flash.display.GraphicsFillType.GRADIENT_FILL:
					var fill = stroke.fill;
					this.lineGradientStyle(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
					break;
				}
				break;
			case flash.display.GraphicsDataType.PATH:
				var path = data;
				var j = 0;
				var _g1 = 0;
				var _g = flash._Vector.Vector_Impl_.get_length(path.commands);
				while(_g1 < _g) {
					var i = _g1++;
					var command = path.commands[i];
					switch(command) {
					case 1:
						this.moveTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 2:
						this.lineTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 3:
						this.curveTo(path.data[j],path.data[j + 1],path.data[j + 2],path.data[j + 3]);
						j = j + 4;
						break;
					}
				}
				break;
			case flash.display.GraphicsDataType.SOLID:
				var fill = data;
				this.beginFill(fill.color,fill.alpha);
				break;
			case flash.display.GraphicsDataType.GRADIENT:
				var fill = data;
				this.beginGradientFill(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
				break;
			}
		}
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(ry == -1) ry = rx;
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__expandStandardExtent(flash.Lib.get_current().get_stage().get_stageWidth(),flash.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new flash.display.Drawable(null,null,null,null,null,null,new flash.display.TileJob(sheet,tileData,flags)));
		this.__changed = true;
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,flush: function() {
		this.closePolygon(true);
	}
	,getContext: function() {
		try {
			return this.__surface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.mCurrentLine.grad = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.__clearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			if(color == null) this.mCurrentLine.colour = 0; else this.mCurrentLine.colour = color;
			if(alpha == null) this.mCurrentLine.alpha = 1.0; else this.mCurrentLine.alpha = alpha;
			if(miterLimit == null) this.mCurrentLine.miter_limit = 3.0; else this.mCurrentLine.miter_limit = miterLimit;
			if(pixelHinting == null || !pixelHinting) this.mCurrentLine.pixel_hinting = 0; else this.mCurrentLine.pixel_hinting = 16384;
		}
		if(caps != null) switch(caps[1]) {
		case 1:
			this.mCurrentLine.caps = 256;
			break;
		case 2:
			this.mCurrentLine.caps = 512;
			break;
		case 0:
			this.mCurrentLine.caps = 0;
			break;
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) switch(scaleMode[1]) {
		case 2:
			this.mCurrentLine.scale_mode = 3;
			break;
		case 3:
			this.mCurrentLine.scale_mode = 1;
			break;
		case 0:
			this.mCurrentLine.scale_mode = 2;
			break;
		case 1:
			this.mCurrentLine.scale_mode = 0;
			break;
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) switch(joints[1]) {
		case 1:
			this.mCurrentLine.joints = 0;
			break;
		case 0:
			this.mCurrentLine.joints = 4096;
			break;
		case 2:
			this.mCurrentLine.joints = 8192;
			break;
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,__adjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if((function($this) {
			var $r;
			var v = null;
			try {
				v = $this.__surface.getContext;
			} catch( e ) {
			}
			$r = v;
			return $r;
		}(this)) != null) {
			var width = Math.ceil((this.__extentWithFilters.width - this.__extentWithFilters.x) * sx);
			var height = Math.ceil((this.__extentWithFilters.height - this.__extentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = window.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				flash.Lib.__drawToSurface(this.__surface,dstCanvas);
				if((function($this) {
					var $r;
					var p = $this.__surface;
					while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
					$r = p == flash.Lib.mMe.__scr;
					return $r;
				}(this))) {
					flash.Lib.__appendSurface(dstCanvas);
					flash.Lib.__copyStyle(this.__surface,dstCanvas);
					flash.Lib.__swapSurface(this.__surface,dstCanvas);
					flash.Lib.__removeSurface(this.__surface);
					if(this.__surface.id != null) {
						var regex = new EReg("[^a-zA-Z0-9\\-]","g");
						dstCanvas.id = regex.replace(this.__surface.id,"_");
					}
				}
				this.__surface = dstCanvas;
			}
		}
	}
	,__clearCanvas: function() {
		if(this.__surface != null) {
			var ctx;
			try {
				ctx = this.__surface.getContext("2d");
			} catch( e ) {
				ctx = null;
			}
			if(ctx != null) ctx.clearRect(0,0,this.__surface.width,this.__surface.height);
		}
	}
	,__clearLine: function() {
		this.mCurrentLine = new flash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,__drawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,__drawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.__bitmap.___textureBuffer;
		var ctx;
		try {
			ctx = this.__surface.getContext("2d");
		} catch( e ) {
			ctx = null;
		}
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,__expandFilteredExtent: function(x,y) {
		var maxX;
		var minX;
		var maxY;
		var minY;
		minX = this.__extent.x;
		minY = this.__extent.y;
		maxX = this.__extent.width + minX;
		maxY = this.__extent.height + minY;
		if(x > maxX) maxX = x; else maxX = maxX;
		if(x < minX) minX = x; else minX = minX;
		if(y > maxY) maxY = y; else maxY = maxY;
		if(y < minY) minY = y; else minY = minY;
		this.__extentWithFilters.x = minX;
		this.__extentWithFilters.y = minY;
		this.__extentWithFilters.width = maxX - minX;
		this.__extentWithFilters.height = maxY - minY;
	}
	,__expandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.__extent.width -= this._padding;
			this.__extent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX;
		var minX;
		var maxY;
		var minY;
		minX = this.__extent.x;
		minY = this.__extent.y;
		maxX = this.__extent.width + minX;
		maxY = this.__extent.height + minY;
		if(x > maxX) maxX = x; else maxX = maxX;
		if(x < minX) minX = x; else minX = minX;
		if(y > maxY) maxY = y; else maxY = maxY;
		if(y < minY) minY = y; else minY = minY;
		this.__extent.x = minX;
		this.__extent.y = minY;
		this.__extent.width = maxX - minX + this._padding;
		this.__extent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,__hitTest: function(inX,inY) {
		var ctx;
		try {
			ctx = this.__surface.getContext("2d");
		} catch( e ) {
			ctx = null;
		}
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.__extent.width > 0 && this.__extent.height > 0) return true;
		return false;
	}
	,__invalidate: function() {
		this.__changed = true;
		this.__clearNextCycle = true;
	}
	,__mediaSurface: function(surface) {
		this.__surface = surface;
	}
	,__render: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.__changed) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max((function($this) {
					var $r;
					var v = null;
					try {
						v = filter.blurX;
					} catch( e ) {
					}
					$r = v;
					return $r;
				}(this)),(function($this) {
					var $r;
					var v = null;
					try {
						v = filter.blurY;
					} catch( e ) {
					}
					$r = v;
					return $r;
				}(this))) * 4;
			}
		}
		this.__expandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.__clearNextCycle) {
			this.nextDrawIndex = 0;
			if(this.__surface != null) {
				var ctx;
				try {
					ctx = this.__surface.getContext("2d");
				} catch( e ) {
					ctx = null;
				}
				if(ctx != null) ctx.clearRect(0,0,this.__surface.width,this.__surface.height);
			}
			this.__clearNextCycle = false;
		}
		if(this.__extentWithFilters.width - this.__extentWithFilters.x > this.__surface.width || this.__extentWithFilters.height - this.__extentWithFilters.y > this.__surface.height) this.__adjustSurface(sx,sy);
		var ctx;
		try {
			ctx = this.__surface.getContext("2d");
		} catch( e ) {
			ctx = null;
		}
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,flash.filters.DropShadowFilter)) filter.__applyFilter(this.__surface,null,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.__extentWithFilters.x != 0 || this.__extentWithFilters.y != 0) ctx.translate(-this.__extentWithFilters.x * sx,-this.__extentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.__drawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0;
					var _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						var _g3 = lj.joints;
						switch(_g3) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						var _g4 = lj.caps;
						switch(_g4) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g6 = lj.point_idx0;
						var _g5 = lj.point_idx1 + 1;
						while(_g6 < _g5) {
							var i1 = _g6++;
							var p = d.points[i1];
							var _g7 = p.type;
							switch(_g7) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0;
					var _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						var _g3 = p.type;
						switch(_g3) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				var bitmap = d.bitmap;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else if(bitmap != null && (bitmap.flags & 16) > 0) {
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					if((bitmap.flags & 65536) == 0) {
						ctx.mozImageSmoothingEnabled = false;
						ctx.webkitImageSmoothingEnabled = false;
					}
					ctx.fillStyle = ctx.createPattern(bitmap.texture_buffer,"repeat");
				} else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				if(bitmap != null && (bitmap.flags & 16) == 0) {
					ctx.clip();
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.__changed = false;
		if(len > 0) this.nextDrawIndex = len - 1; else this.nextDrawIndex = 0;
		this.mDrawList = [];
		return true;
	}
	,__class__: flash.display.Graphics
}
flash.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["flash.display.Drawable"] = flash.display.Drawable;
flash.display.Drawable.__name__ = ["flash","display","Drawable"];
flash.display.Drawable.prototype = {
	__class__: flash.display.Drawable
}
flash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["flash.display.GfxPoint"] = flash.display.GfxPoint;
flash.display.GfxPoint.__name__ = ["flash","display","GfxPoint"];
flash.display.GfxPoint.prototype = {
	__class__: flash.display.GfxPoint
}
flash.display.Grad = function(inPoints,inMatrix,inFlags,inFocal) {
	this.points = inPoints;
	this.matrix = inMatrix;
	this.flags = inFlags;
	this.focal = inFocal;
};
$hxClasses["flash.display.Grad"] = flash.display.Grad;
flash.display.Grad.__name__ = ["flash","display","Grad"];
flash.display.Grad.prototype = {
	__class__: flash.display.Grad
}
flash.display.GradPoint = function(inCol,inAlpha,inRatio) {
	this.col = inCol;
	this.alpha = inAlpha;
	this.ratio = inRatio;
};
$hxClasses["flash.display.GradPoint"] = flash.display.GradPoint;
flash.display.GradPoint.__name__ = ["flash","display","GradPoint"];
flash.display.GradPoint.prototype = {
	__class__: flash.display.GradPoint
}
flash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["flash.display.LineJob"] = flash.display.LineJob;
flash.display.LineJob.__name__ = ["flash","display","LineJob"];
flash.display.LineJob.prototype = {
	__class__: flash.display.LineJob
}
flash.display.PointInPathMode = $hxClasses["flash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
flash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
flash.display.PointInPathMode.USER_SPACE.toString = $estr;
flash.display.PointInPathMode.USER_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
flash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
flash.display.PointInPathMode.DEVICE_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["flash.display.TileJob"] = flash.display.TileJob;
flash.display.TileJob.__name__ = ["flash","display","TileJob"];
flash.display.TileJob.prototype = {
	__class__: flash.display.TileJob
}
flash.display.IGraphicsFill = function() { }
$hxClasses["flash.display.IGraphicsFill"] = flash.display.IGraphicsFill;
flash.display.IGraphicsFill.__name__ = ["flash","display","IGraphicsFill"];
flash.display.IGraphicsFill.prototype = {
	__class__: flash.display.IGraphicsFill
}
flash.display.IGraphicsData = function() { }
$hxClasses["flash.display.IGraphicsData"] = flash.display.IGraphicsData;
flash.display.IGraphicsData.__name__ = ["flash","display","IGraphicsData"];
flash.display.IGraphicsData.prototype = {
	__class__: flash.display.IGraphicsData
}
flash.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) focalPointRatio = 0;
	this.type = type;
	this.colors = colors;
	this.alphas = alphas;
	this.ratios = ratios;
	this.matrix = matrix;
	this.spreadMethod = spreadMethod;
	this.interpolationMethod = interpolationMethod;
	this.focalPointRatio = focalPointRatio;
	this.__graphicsDataType = flash.display.GraphicsDataType.GRADIENT;
	this.__graphicsFillType = flash.display.GraphicsFillType.GRADIENT_FILL;
};
$hxClasses["flash.display.GraphicsGradientFill"] = flash.display.GraphicsGradientFill;
flash.display.GraphicsGradientFill.__name__ = ["flash","display","GraphicsGradientFill"];
flash.display.GraphicsGradientFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsGradientFill.prototype = {
	__class__: flash.display.GraphicsGradientFill
}
flash.display.IGraphicsPath = function() { }
$hxClasses["flash.display.IGraphicsPath"] = flash.display.IGraphicsPath;
flash.display.IGraphicsPath.__name__ = ["flash","display","IGraphicsPath"];
flash.display.GraphicsPath = function(commands,data,winding) {
	this.commands = commands;
	this.data = data;
	this.winding = winding;
	this.__graphicsDataType = flash.display.GraphicsDataType.PATH;
};
$hxClasses["flash.display.GraphicsPath"] = flash.display.GraphicsPath;
flash.display.GraphicsPath.__name__ = ["flash","display","GraphicsPath"];
flash.display.GraphicsPath.__interfaces__ = [flash.display.IGraphicsPath,flash.display.IGraphicsData];
flash.display.GraphicsPath.prototype = {
	curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,3);
			flash._Vector.Vector_Impl_.push(this.data,anchorX);
			flash._Vector.Vector_Impl_.push(this.data,anchorY);
			flash._Vector.Vector_Impl_.push(this.data,controlX);
			flash._Vector.Vector_Impl_.push(this.data,controlY);
		}
	}
	,lineTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,2);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,moveTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,1);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,__class__: flash.display.GraphicsPath
}
flash.display.GraphicsPathCommand = function() { }
$hxClasses["flash.display.GraphicsPathCommand"] = flash.display.GraphicsPathCommand;
flash.display.GraphicsPathCommand.__name__ = ["flash","display","GraphicsPathCommand"];
flash.display.GraphicsPathWinding = $hxClasses["flash.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] }
flash.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
flash.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
flash.display.GraphicsPathWinding.EVEN_ODD.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
flash.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
flash.display.GraphicsPathWinding.NON_ZERO.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	this.alpha = alpha;
	this.color = color;
	this.__graphicsDataType = flash.display.GraphicsDataType.SOLID;
	this.__graphicsFillType = flash.display.GraphicsFillType.SOLID_FILL;
};
$hxClasses["flash.display.GraphicsSolidFill"] = flash.display.GraphicsSolidFill;
flash.display.GraphicsSolidFill.__name__ = ["flash","display","GraphicsSolidFill"];
flash.display.GraphicsSolidFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsSolidFill.prototype = {
	__class__: flash.display.GraphicsSolidFill
}
flash.display.IGraphicsStroke = function() { }
$hxClasses["flash.display.IGraphicsStroke"] = flash.display.IGraphicsStroke;
flash.display.IGraphicsStroke.__name__ = ["flash","display","IGraphicsStroke"];
flash.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) miterLimit = 3;
	if(pixelHinting == null) pixelHinting = false;
	if(thickness == null) thickness = 0.0;
	if(caps != null) this.caps = caps; else this.caps = null;
	this.fill = fill;
	if(joints != null) this.joints = joints; else this.joints = null;
	this.miterLimit = miterLimit;
	this.pixelHinting = pixelHinting;
	if(scaleMode != null) this.scaleMode = scaleMode; else this.scaleMode = null;
	this.thickness = thickness;
	this.__graphicsDataType = flash.display.GraphicsDataType.STROKE;
};
$hxClasses["flash.display.GraphicsStroke"] = flash.display.GraphicsStroke;
flash.display.GraphicsStroke.__name__ = ["flash","display","GraphicsStroke"];
flash.display.GraphicsStroke.__interfaces__ = [flash.display.IGraphicsStroke,flash.display.IGraphicsData];
flash.display.GraphicsStroke.prototype = {
	__class__: flash.display.GraphicsStroke
}
flash.display.GraphicsDataType = $hxClasses["flash.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
flash.display.GraphicsDataType.STROKE = ["STROKE",0];
flash.display.GraphicsDataType.STROKE.toString = $estr;
flash.display.GraphicsDataType.STROKE.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.SOLID = ["SOLID",1];
flash.display.GraphicsDataType.SOLID.toString = $estr;
flash.display.GraphicsDataType.SOLID.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
flash.display.GraphicsDataType.GRADIENT.toString = $estr;
flash.display.GraphicsDataType.GRADIENT.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.PATH = ["PATH",3];
flash.display.GraphicsDataType.PATH.toString = $estr;
flash.display.GraphicsDataType.PATH.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsFillType = $hxClasses["flash.display.GraphicsFillType"] = { __ename__ : true, __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
flash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
flash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
flash.display.GraphicsFillType.SOLID_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
flash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
flash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.InterpolationMethod = $hxClasses["flash.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] }
flash.display.InterpolationMethod.RGB = ["RGB",0];
flash.display.InterpolationMethod.RGB.toString = $estr;
flash.display.InterpolationMethod.RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
flash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
flash.display.InterpolationMethod.LINEAR_RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.JointStyle = $hxClasses["flash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
flash.display.JointStyle.MITER = ["MITER",0];
flash.display.JointStyle.MITER.toString = $estr;
flash.display.JointStyle.MITER.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.ROUND = ["ROUND",1];
flash.display.JointStyle.ROUND.toString = $estr;
flash.display.JointStyle.ROUND.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.BEVEL = ["BEVEL",2];
flash.display.JointStyle.BEVEL.toString = $estr;
flash.display.JointStyle.BEVEL.__enum__ = flash.display.JointStyle;
flash.display.LineScaleMode = $hxClasses["flash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
flash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
flash.display.LineScaleMode.HORIZONTAL.toString = $estr;
flash.display.LineScaleMode.HORIZONTAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NONE = ["NONE",1];
flash.display.LineScaleMode.NONE.toString = $estr;
flash.display.LineScaleMode.NONE.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NORMAL = ["NORMAL",2];
flash.display.LineScaleMode.NORMAL.toString = $estr;
flash.display.LineScaleMode.NORMAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
flash.display.LineScaleMode.VERTICAL.toString = $estr;
flash.display.LineScaleMode.VERTICAL.__enum__ = flash.display.LineScaleMode;
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		if(request.contentType == null && request.contentType != "") switch(extension) {
		case "swf":
			this.contentLoaderInfo.contentType = "application/x-shockwave-flash";
			break;
		case "jpg":case "jpeg":
			transparent = false;
			this.contentLoaderInfo.contentType = "image/jpeg";
			break;
		case "png":
			this.contentLoaderInfo.contentType = "image/png";
			break;
		case "gif":
			this.contentLoaderInfo.contentType = "image/gif";
			break;
		default:
			this.contentLoaderInfo.contentType = "application/x-www-form-urlencoded";
		} else this.contentLoaderInfo.contentType = request.contentType;
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.__loadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event(flash.events.Event.COMPLETE);
				evt.currentTarget = _g;
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this.___id + "]";
	}
	,validateBounds: function() {
		if((function($this) {
			var $r;
			var gfx = $this.__getGraphics();
			$r = gfx == null?($this.___renderFlags & 64) != 0:($this.___renderFlags & 64) != 0 || gfx.boundsDirty;
			return $r;
		}(this))) {
			flash.display.Sprite.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new flash.geom.Rectangle(0,0,(function($this) {
					var $r;
					var _this = $this.mImage;
					$r = _this.___textureBuffer != null?_this.___textureBuffer.width:0;
					return $r;
				}(this)),(function($this) {
					var $r;
					var _this = $this.mImage;
					$r = _this.___textureBuffer != null?_this.___textureBuffer.height:0;
					return $r;
				}(this)));
				if(r.width != 0 || r.height != 0) {
					if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,handleLoad: function(e) {
		e.currentTarget = this;
		var _this = this.content;
		_this.___renderFlags |= 64;
		if(_this.parent != null) _this.parent.___renderFlags |= 64;
		this.content.__render(null,null);
		this.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,__class__: flash.display.Loader
});
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(ldr) {
	var li = new flash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
}
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__class__: flash.display.LoaderInfo
});
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.__currentFrame = 0;
	this.__totalFrames = 0;
	this.loaderInfo = flash.display.LoaderInfo.create(null);
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	gotoAndPlay: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,gotoAndStop: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,nextFrame: function() {
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this.___id + "]";
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_totalFrames: function() {
		return this.__totalFrames;
	}
	,__class__: flash.display.MovieClip
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_totalFrames:"get_totalFrames",get_framesLoaded:"get_framesLoaded",get_currentFrame:"get_currentFrame"})
});
flash.display.PixelSnapping = $hxClasses["flash.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
flash.display.PixelSnapping.NEVER = ["NEVER",0];
flash.display.PixelSnapping.NEVER.toString = $estr;
flash.display.PixelSnapping.NEVER.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.AUTO = ["AUTO",1];
flash.display.PixelSnapping.AUTO.toString = $estr;
flash.display.PixelSnapping.AUTO.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
flash.display.PixelSnapping.ALWAYS.toString = $estr;
flash.display.PixelSnapping.ALWAYS.__enum__ = flash.display.PixelSnapping;
flash.display.Shape = function() {
	flash.display.DisplayObject.call(this);
	this.__graphics = new flash.display.Graphics();
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	toString: function() {
		return "[Shape name=" + this.name + " id=" + this.___id + "]";
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,__getObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,get_graphics: function() {
		return this.__graphics;
	}
	,__class__: flash.display.Shape
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
flash.display.SpreadMethod = $hxClasses["flash.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] }
flash.display.SpreadMethod.REPEAT = ["REPEAT",0];
flash.display.SpreadMethod.REPEAT.toString = $estr;
flash.display.SpreadMethod.REPEAT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.REFLECT = ["REFLECT",1];
flash.display.SpreadMethod.REFLECT.toString = $estr;
flash.display.SpreadMethod.REFLECT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.PAD = ["PAD",2];
flash.display.SpreadMethod.PAD.toString = $estr;
flash.display.SpreadMethod.PAD.__enum__ = flash.display.SpreadMethod;
flash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.__isCancelled = false;
	this.__isCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = flash.events.EventPhase.AT_TARGET;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,stopImmediatePropagation: function() {
		this.__isCancelled = true;
		this.__isCancelledNow = true;
	}
	,stopPropagation: function() {
		this.__isCancelled = true;
	}
	,toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,__createSimilar: function(type,related,targ) {
		var result = new flash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,__getIsCancelled: function() {
		return this.__isCancelled;
	}
	,__getIsCancelledNow: function() {
		return this.__isCancelledNow;
	}
	,__setPhase: function(phase) {
		this.eventPhase = phase;
	}
	,__class__: flash.events.Event
}
flash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.__create = function(type,event,local,target) {
	var __mouseDown = false;
	var delta = 2;
	if(type == flash.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == flash.events.MouseEvent.MOUSE_DOWN) {
		if(event.which != null) __mouseDown = event.which == 1; else if(event.button != null) __mouseDown = event.button == 0; else __mouseDown = false;
	} else if(type == flash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) __mouseDown = false; else if(event.button != null) {
				if(event.button == 0) __mouseDown = false; else __mouseDown = false;
			}
		}
	}
	var pseudoEvent = new flash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,__mouseDown,delta);
	pseudoEvent.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	__createSimilar: function(type,related,targ) {
		var result = new flash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,updateAfterEvent: function() {
	}
	,__class__: flash.events.MouseEvent
});
flash.display.Stage = function(width,height) {
	flash.display.DisplayObjectContainer.call(this);
	this.__focusObject = null;
	this.__focusObjectActivated = false;
	this.__windowWidth = width;
	this.__windowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = flash.display.StageScaleMode.SHOW_ALL;
	this.__stageMatrix = new flash.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = flash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.__windowWidth);
	this.loaderInfo.parameters.height = Std.string(this.__windowHeight);
	this.__pointInPathMode = flash.display.Graphics.__detectIsPointInPathMode();
	this.__mouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.__touchInfo = [];
	this.__uIEventsQueue = new Array(1000);
	this.__uIEventsQueueIndex = 0;
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.getOrientation = function() {
	var rotation = window.orientation;
	var orientation = flash.display.Stage.OrientationPortrait;
	switch(rotation) {
	case -90:
		orientation = flash.display.Stage.OrientationLandscapeLeft;
		break;
	case 180:
		orientation = flash.display.Stage.OrientationPortraitUpsideDown;
		break;
	case 90:
		orientation = flash.display.Stage.OrientationLandscapeRight;
		break;
	default:
		orientation = flash.display.Stage.OrientationPortrait;
	}
	return orientation;
}
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	invalidate: function() {
		this.__invalid = true;
	}
	,toString: function() {
		return "[Stage id=" + this.___id + "]";
	}
	,__checkInOuts: function(event,stack,touchInfo) {
		var prev;
		if(touchInfo == null) prev = this.__mouseOverObjects; else prev = touchInfo.touchOverObjects;
		var changeEvents;
		if(touchInfo == null) changeEvents = flash.display.Stage.__mouseChanges; else changeEvents = flash.display.Stage.__touchChanges;
		var new_n = stack.length;
		var new_obj;
		if(new_n > 0) new_obj = stack[new_n - 1]; else new_obj = null;
		var old_n = prev.length;
		var old_obj;
		if(old_n > 0) old_obj = prev[old_n - 1]; else old_obj = null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.__fireEvent(event.__createSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.__fireEvent(event.__createSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.__createSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.__createSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.__mouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,__drag: function(point) {
		var p = this.__dragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.__dragOffsetX;
		var y = point.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__isOnStage: function() {
		return true;
	}
	,__processStageEvent: function(evt) {
		evt.stopPropagation();
		var _g = evt.type;
		switch(_g) {
		case "resize":
			this.__onResize(flash.Lib.__getWidth(),flash.Lib.__getHeight());
			break;
		case "focus":
			this.__onFocus(this);
			if(!this.__focusObjectActivated) {
				this.__focusObjectActivated = true;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.ACTIVATE));
			}
			break;
		case "blur":
			if(this.__focusObjectActivated) {
				this.__focusObjectActivated = false;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.DEACTIVATE));
			}
			break;
		case "mousemove":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.__onMouse(evt,flash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.__onMouse(evt,flash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode;
			if(evt1.keyCode != null) keyCode = evt1.keyCode; else keyCode = evt1.which;
			keyCode = flash.ui.Keyboard.__convertMozillaCode(keyCode);
			this.__onKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode;
			if(evt1.keyCode != null) keyCode = evt1.keyCode; else keyCode = evt1.which;
			keyCode = flash.ui.Keyboard.__convertMozillaCode(keyCode);
			this.__onKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new flash.display._Stage.TouchInfo();
			this.__touchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.__onTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.__touchInfo[evt1.changedTouches[0].identifier];
			this.__onTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.__touchInfo[evt1.changedTouches[0].identifier];
			this.__onTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.__touchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.__handleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.__handleOrientationChange();
			break;
		default:
		}
	}
	,__queueStageEvent: function(evt) {
		this.__uIEventsQueue[this.__uIEventsQueueIndex++] = evt;
	}
	,__renderAll: function() {
		this.__render(null,null);
	}
	,__renderToCanvas: function(canvas) {
		canvas.width = canvas.width;
		this.__render(canvas);
	}
	,__stageRender: function(_) {
		if(!this.__stageActive) {
			this.__onResize(this.__windowWidth,this.__windowHeight);
			var event = new flash.events.Event(flash.events.Event.ACTIVATE);
			event.target = this;
			this.__broadcast(event);
			this.__stageActive = true;
		}
		var _g1 = 0;
		var _g = this.__uIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__uIEventsQueue[i] != null) this.__processStageEvent(this.__uIEventsQueue[i]);
		}
		this.__uIEventsQueueIndex = 0;
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		this.__broadcast(event);
		if(this.__invalid) {
			var event1 = new flash.events.Event(flash.events.Event.RENDER);
			this.__broadcast(event1);
		}
		this.__renderAll();
	}
	,__startDrag: function(sprite,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(bounds == null) this.__dragBounds = null; else this.__dragBounds = bounds.clone();
		this.__dragObject = sprite;
		if(this.__dragObject != null) {
			var mouse = new flash.geom.Point(this._mouseX,this._mouseY);
			var p = this.__dragObject.parent;
			if(p != null) mouse = p.globalToLocal(mouse);
			if(lockCenter) {
				var bounds1 = sprite.getBounds(this);
				this.__dragOffsetX = this.__dragObject.get_x() - (bounds1.width / 2 + bounds1.x);
				this.__dragOffsetY = this.__dragObject.get_y() - (bounds1.height / 2 + bounds1.y);
			} else {
				this.__dragOffsetX = this.__dragObject.get_x() - mouse.x;
				this.__dragOffsetY = this.__dragObject.get_y() - mouse.y;
			}
		}
	}
	,__stopDrag: function(sprite) {
		this.__dragBounds = null;
		this.__dragObject = null;
	}
	,__updateNextWake: function() {
		if(this.__frameRate == 0) {
			var __requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			__requestAnimationFrame($bind(this,this.__updateNextWake));
			this.__stageRender();
		} else {
			window.clearInterval(this.__timer);
			this.__timer = window.setInterval($bind(this,this.__stageRender),this.__interval);
		}
	}
	,__handleAccelerometer: function(evt) {
		flash.display.Stage.__acceleration.x = evt.accelerationIncludingGravity.x;
		flash.display.Stage.__acceleration.y = evt.accelerationIncludingGravity.y;
		flash.display.Stage.__acceleration.z = evt.accelerationIncludingGravity.z;
	}
	,__handleOrientationChange: function() {
	}
	,__onKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var stack = new Array();
		if(this.__focusObject == null) this.__getInteractiveObjectStack(stack); else this.__focusObject.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			var obj = stack[0];
			var evt = new flash.events.KeyboardEvent(pressed?flash.events.KeyboardEvent.KEY_DOWN:flash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
			obj.__fireEvent(evt);
		}
	}
	,__onFocus: function(target) {
		if(target != this.__focusObject) {
			if(this.__focusObject != null) this.__focusObject.__fireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT,true,false,this.__focusObject,false,0));
			target.__fireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN,true,false,target,false,0));
			this.__focusObject = target;
		}
	}
	,__onMouse: function(event,type) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(event.clientX - rect.left,event.clientY - rect.top);
		if(this.__dragObject != null) this.__drag(point);
		var obj = this.__getObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.MouseEvent.__create(type,event,local,obj);
			this.__checkInOuts(evt,stack);
			if(type == flash.events.MouseEvent.MOUSE_DOWN) this.__onFocus(stack[stack.length - 1]);
			obj.__fireEvent(evt);
		} else {
			var evt = flash.events.MouseEvent.__create(type,event,point,null);
			this.__checkInOuts(evt,stack);
		}
	}
	,__onResize: function(inW,inH) {
		this.__windowWidth = inW;
		this.__windowHeight = inH;
		var event = new flash.events.Event(flash.events.Event.RESIZE);
		event.target = this;
		this.__broadcast(event);
	}
	,__onTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(touch.pageX - rect.left,touch.pageY - rect.top);
		var obj = this.__getObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.TouchEvent.__create(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.__checkInOuts(evt,stack,touchInfo);
			obj.__fireEvent(evt);
			var mouseType;
			switch(type) {
			case "touchBegin":
				mouseType = flash.events.MouseEvent.MOUSE_DOWN;
				break;
			case "touchEnd":
				mouseType = flash.events.MouseEvent.MOUSE_UP;
				break;
			default:
				if(this.__dragObject != null) this.__drag(point);
				mouseType = flash.events.MouseEvent.MOUSE_MOVE;
			}
			obj.__fireEvent(flash.events.MouseEvent.__create(mouseType,evt,local,obj));
		} else {
			var evt = flash.events.TouchEvent.__create(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.__checkInOuts(evt,stack,touchInfo);
		}
	}
	,get_backgroundColor: function() {
		return this.__backgroundColour;
	}
	,set_backgroundColor: function(col) {
		return this.__backgroundColour = col;
	}
	,get_displayState: function() {
		return this.displayState;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) switch(displayState[1]) {
		case 0:
			flash.Lib.__disableFullScreen();
			break;
		case 1:case 2:
			flash.Lib.__enableFullScreen();
			break;
		}
		this.displayState = displayState;
		return displayState;
	}
	,get_focus: function() {
		return this.__focusObject;
	}
	,set_focus: function(inObj) {
		this.__onFocus(inObj);
		return this.__focusObject;
	}
	,get_frameRate: function() {
		return this.__frameRate;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var $window = window;
			var __requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(__requestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) this.__interval = 1000.0 / speed | 0;
		this.__frameRate = speed;
		this.__updateNextWake();
		return speed;
	}
	,get_fullScreenWidth: function() {
		return window.innerWidth;
	}
	,get_fullScreenHeight: function() {
		return window.innerHeight;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_quality: function() {
		if(this.quality != null) return this.quality; else return flash.display.StageQuality.BEST;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_showDefaultContextMenu: function() {
		return this.__showDefaultContextMenu;
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.__showDefaultContextMenu && this.__showDefaultContextMenu != null) {
			if(!showDefaultContextMenu) flash.Lib.__disableRightClick(); else flash.Lib.__enableRightClick();
		}
		this.__showDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,get_stage: function() {
		return flash.Lib.__getStage();
	}
	,get_stageHeight: function() {
		return this.__windowHeight;
	}
	,get_stageWidth: function() {
		return this.__windowWidth;
	}
	,__class__: flash.display.Stage
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{get_stageWidth:"get_stageWidth",get_stageHeight:"get_stageHeight",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",set_quality:"set_quality",get_quality:"get_quality",get_fullScreenWidth:"get_fullScreenWidth",get_fullScreenHeight:"get_fullScreenHeight",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",set_focus:"set_focus",get_focus:"get_focus",set_displayState:"set_displayState",get_displayState:"get_displayState",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor"})
});
flash.display._Stage = {}
flash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["flash.display._Stage.TouchInfo"] = flash.display._Stage.TouchInfo;
flash.display._Stage.TouchInfo.__name__ = ["flash","display","_Stage","TouchInfo"];
flash.display._Stage.TouchInfo.prototype = {
	__class__: flash.display._Stage.TouchInfo
}
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] }
flash.display.StageDisplayState.NORMAL = ["NORMAL",0];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageQuality = function() { }
$hxClasses["flash.display.StageQuality"] = flash.display.StageQuality;
flash.display.StageQuality.__name__ = ["flash","display","StageQuality"];
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.errors = {}
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: flash.errors.Error
}
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text) {
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = flash.events.Listener.sIDs++;
};
$hxClasses["flash.events.Listener"] = flash.events.Listener;
flash.events.Listener.__name__ = ["flash","events","Listener"];
flash.events.Listener.prototype = {
	dispatchEvent: function(event) {
		this.mListner(event);
	}
	,Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,__class__: flash.events.Listener
}
flash.events.EventPhase = function() { }
$hxClasses["flash.events.EventPhase"] = flash.events.EventPhase;
flash.events.EventPhase.__name__ = ["flash","events","EventPhase"];
flash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	if(inShiftKey == null) this.shiftKey = false; else this.shiftKey = inShiftKey;
	this.target = inObject;
};
$hxClasses["flash.events.FocusEvent"] = flash.events.FocusEvent;
flash.events.FocusEvent.__name__ = ["flash","events","FocusEvent"];
flash.events.FocusEvent.__super__ = flash.events.Event;
flash.events.FocusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.FocusEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.IOErrorEvent
});
flash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	if(inAltKey == null) this.altKey = false; else this.altKey = inAltKey;
	if(inCharCode == null) this.charCode = 0; else this.charCode = inCharCode;
	if(inCtrlKey == null) this.ctrlKey = false; else this.ctrlKey = inCtrlKey;
	this.commandKey = commandKeyValue;
	this.controlKey = controlKeyValue;
	this.keyCode = inKeyCode;
	if(inKeyLocation == null) this.keyLocation = 0; else this.keyLocation = inKeyLocation;
	if(inShiftKey == null) this.shiftKey = false; else this.shiftKey = inShiftKey;
};
$hxClasses["flash.events.KeyboardEvent"] = flash.events.KeyboardEvent;
flash.events.KeyboardEvent.__name__ = ["flash","events","KeyboardEvent"];
flash.events.KeyboardEvent.__super__ = flash.events.Event;
flash.events.KeyboardEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.KeyboardEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["flash.events.TouchEvent"] = flash.events.TouchEvent;
flash.events.TouchEvent.__name__ = ["flash","events","TouchEvent"];
flash.events.TouchEvent.__create = function(type,event,touch,local,target) {
	var evt = new flash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
flash.events.TouchEvent.__super__ = flash.events.Event;
flash.events.TouchEvent.prototype = $extend(flash.events.Event.prototype,{
	__createSimilar: function(type,related,targ) {
		var result = new flash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.TouchEvent
});
flash.filters = {}
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	clone: function() {
		return new flash.filters.BitmapFilter(this._mType);
	}
	,__preFilter: function(surface) {
	}
	,__applyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,__class__: flash.filters.BitmapFilter
}
flash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	flash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this.___cached = false;
};
$hxClasses["flash.filters.DropShadowFilter"] = flash.filters.DropShadowFilter;
flash.filters.DropShadowFilter.__name__ = ["flash","filters","DropShadowFilter"];
flash.filters.DropShadowFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.DropShadowFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	clone: function() {
		return new flash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__applyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this.___cached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "rgba(" + (this.color >> 16 & 255) + "," + (this.color >> 8 & 255) + "," + (this.color & 255) + "," + this.alpha + ")";
			this.___cached = true;
		}
	}
	,__class__: flash.filters.DropShadowFilter
});
flash.geom = {}
flash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	if(inRedMultiplier == null) this.redMultiplier = 1.0; else this.redMultiplier = inRedMultiplier;
	if(inGreenMultiplier == null) this.greenMultiplier = 1.0; else this.greenMultiplier = inGreenMultiplier;
	if(inBlueMultiplier == null) this.blueMultiplier = 1.0; else this.blueMultiplier = inBlueMultiplier;
	if(inAlphaMultiplier == null) this.alphaMultiplier = 1.0; else this.alphaMultiplier = inAlphaMultiplier;
	if(inRedOffset == null) this.redOffset = 0.0; else this.redOffset = inRedOffset;
	if(inGreenOffset == null) this.greenOffset = 0.0; else this.greenOffset = inGreenOffset;
	if(inBlueOffset == null) this.blueOffset = 0.0; else this.blueOffset = inBlueOffset;
	if(inAlphaOffset == null) this.alphaOffset = 0.0; else this.alphaOffset = inAlphaOffset;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,__class__: flash.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
flash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		if(in_ty == null) in_ty = 0;
		if(in_tx == null) in_tx = 0;
		if(rotation == null) rotation = 0;
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.set_tx(in_tx != null?in_tx + in_width / 2:in_width / 2);
		this.set_ty(in_ty != null?in_ty + in_height / 2:in_height / 2);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,mult: function(m) {
		var result;
		var m1 = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m1._sx = this._sx;
		m1._sy = this._sy;
		result = m1;
		result.concat(m);
		return result;
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,setRotation: function(inTheta,inScale) {
		if(inScale == null) inScale = 1;
		var scale = inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,to3DString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", " + "0, 1" + ")";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(inPos) {
		return new flash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,translate: function(inDX,inDY) {
		var m = new flash.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,__transformX: function(inPos) {
		return inPos.x * this.a + inPos.y * this.c + this.tx;
	}
	,__transformY: function(inPos) {
		return inPos.x * this.b + inPos.y * this.d + this.ty;
	}
	,__translateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,__class__: flash.geom.Matrix
	,__properties__: {set_ty:"set_ty",set_tx:"set_tx"}
}
flash.geom.Matrix3D = function(v) {
	if(v != null && flash._Vector.Vector_Impl_.get_length(v) == 16) this.rawData = v; else this.rawData = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
};
$hxClasses["flash.geom.Matrix3D"] = flash.geom.Matrix3D;
flash.geom.Matrix3D.__name__ = ["flash","geom","Matrix3D"];
flash.geom.Matrix3D.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return new flash.geom.Matrix3D([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]);
}
flash.geom.Matrix3D.createABCD = function(a,b,c,d,tx,ty) {
	return new flash.geom.Matrix3D([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]);
}
flash.geom.Matrix3D.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return new flash.geom.Matrix3D([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]);
}
flash.geom.Matrix3D.getAxisRotation = function(x,y,z,degrees) {
	var m = new flash.geom.Matrix3D();
	var a1 = new flash.geom.Vector3D(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	m.rawData[0] = c + a1.x * a1.x * t;
	m.rawData[5] = c + a1.y * a1.y * t;
	m.rawData[10] = c + a1.z * a1.z * t;
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	m.rawData[4] = tmp1 + tmp2;
	m.rawData[1] = tmp1 - tmp2;
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	m.rawData[8] = tmp1 - tmp2;
	m.rawData[2] = tmp1 + tmp2;
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	m.rawData[9] = tmp1 + tmp2;
	m.rawData[6] = tmp1 - tmp2;
	return m;
}
flash.geom.Matrix3D.interpolate = function(thisMat,toMat,percent) {
	var m = new flash.geom.Matrix3D();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
	}
	return m;
}
flash.geom.Matrix3D.prototype = {
	append: function(lhs) {
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendRotation: function(degrees,axis,pivotPoint) {
		var m;
		var m1 = new flash.geom.Matrix3D();
		var a1 = new flash.geom.Vector3D(axis.x,axis.y,axis.z);
		var rad = -degrees * (Math.PI / 180);
		var c = Math.cos(rad);
		var s = Math.sin(rad);
		var t = 1.0 - c;
		m1.rawData[0] = c + a1.x * a1.x * t;
		m1.rawData[5] = c + a1.y * a1.y * t;
		m1.rawData[10] = c + a1.z * a1.z * t;
		var tmp1 = a1.x * a1.y * t;
		var tmp2 = a1.z * s;
		m1.rawData[4] = tmp1 + tmp2;
		m1.rawData[1] = tmp1 - tmp2;
		tmp1 = a1.x * a1.z * t;
		tmp2 = a1.y * s;
		m1.rawData[8] = tmp1 - tmp2;
		m1.rawData[2] = tmp1 + tmp2;
		tmp1 = a1.y * a1.z * t;
		tmp2 = a1.x * s;
		m1.rawData[9] = tmp1 + tmp2;
		m1.rawData[6] = tmp1 - tmp2;
		m = m1;
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = m.rawData[0];
		var m221 = m.rawData[4];
		var m231 = m.rawData[8];
		var m241 = m.rawData[12];
		var m212 = m.rawData[1];
		var m222 = m.rawData[5];
		var m232 = m.rawData[9];
		var m242 = m.rawData[13];
		var m213 = m.rawData[2];
		var m223 = m.rawData[6];
		var m233 = m.rawData[10];
		var m243 = m.rawData[14];
		var m214 = m.rawData[3];
		var m224 = m.rawData[7];
		var m234 = m.rawData[11];
		var m244 = m.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendScale: function(xScale,yScale,zScale) {
		var lhs = new flash.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]);
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendTranslation: function(x,y,z) {
		this.rawData[12] += x;
		this.rawData[13] += y;
		this.rawData[14] += z;
	}
	,clone: function() {
		return new flash.geom.Matrix3D(flash._Vector.Vector_Impl_.copy(this.rawData));
	}
	,copyFrom: function(other) {
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			this.rawData[i] = other.rawData[i];
		}
	}
	,decompose: function() {
		var vec = flash._Vector.Vector_Impl_._new();
		var m = new flash.geom.Matrix3D(flash._Vector.Vector_Impl_.copy(this.rawData));
		var mr = m.rawData;
		var pos = new flash.geom.Vector3D(mr[12],mr[13],mr[14]);
		mr[12] = 0;
		mr[13] = 0;
		mr[14] = 0;
		var scale = new flash.geom.Vector3D();
		scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
		scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
		scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
		if(mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) scale.z = -scale.z;
		mr[0] /= scale.x;
		mr[1] /= scale.x;
		mr[2] /= scale.x;
		mr[4] /= scale.y;
		mr[5] /= scale.y;
		mr[6] /= scale.y;
		mr[8] /= scale.z;
		mr[9] /= scale.z;
		mr[10] /= scale.z;
		var rot = new flash.geom.Vector3D();
		rot.y = Math.asin(-mr[2]);
		var C = Math.cos(rot.y);
		if(C > 0) {
			rot.x = Math.atan2(mr[6],mr[10]);
			rot.z = Math.atan2(mr[1],mr[0]);
		} else {
			rot.z = 0;
			rot.x = Math.atan2(mr[4],mr[5]);
		}
		flash._Vector.Vector_Impl_.push(vec,pos);
		flash._Vector.Vector_Impl_.push(vec,rot);
		flash._Vector.Vector_Impl_.push(vec,scale);
		return vec;
	}
	,deltaTransformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new flash.geom.Vector3D(x * this.rawData[0] + y * this.rawData[1] + z * this.rawData[2] + this.rawData[3],x * this.rawData[4] + y * this.rawData[5] + z * this.rawData[6] + this.rawData[7],x * this.rawData[8] + y * this.rawData[9] + z * this.rawData[10] + this.rawData[11],0);
	}
	,identity: function() {
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
	}
	,interpolateTo: function(toMat,percent) {
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
		}
	}
	,invert: function() {
		var d = -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
		var invertable = Math.abs(d) > 0.00000000001;
		if(invertable) {
			d = -1 / d;
			var m11 = this.rawData[0];
			var m21 = this.rawData[4];
			var m31 = this.rawData[8];
			var m41 = this.rawData[12];
			var m12 = this.rawData[1];
			var m22 = this.rawData[5];
			var m32 = this.rawData[9];
			var m42 = this.rawData[13];
			var m13 = this.rawData[2];
			var m23 = this.rawData[6];
			var m33 = this.rawData[10];
			var m43 = this.rawData[14];
			var m14 = this.rawData[3];
			var m24 = this.rawData[7];
			var m34 = this.rawData[11];
			var m44 = this.rawData[15];
			this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
			this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
			this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
			this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
			this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
			this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
			this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
			this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
			this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
			this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
			this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
			this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
			this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
			this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
			this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
			this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
		}
		return invertable;
	}
	,prepend: function(rhs) {
		var m111 = rhs.rawData[0];
		var m121 = rhs.rawData[4];
		var m131 = rhs.rawData[8];
		var m141 = rhs.rawData[12];
		var m112 = rhs.rawData[1];
		var m122 = rhs.rawData[5];
		var m132 = rhs.rawData[9];
		var m142 = rhs.rawData[13];
		var m113 = rhs.rawData[2];
		var m123 = rhs.rawData[6];
		var m133 = rhs.rawData[10];
		var m143 = rhs.rawData[14];
		var m114 = rhs.rawData[3];
		var m124 = rhs.rawData[7];
		var m134 = rhs.rawData[11];
		var m144 = rhs.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependRotation: function(degrees,axis,pivotPoint) {
		var m;
		var m1 = new flash.geom.Matrix3D();
		var a1 = new flash.geom.Vector3D(axis.x,axis.y,axis.z);
		var rad = -degrees * (Math.PI / 180);
		var c = Math.cos(rad);
		var s = Math.sin(rad);
		var t = 1.0 - c;
		m1.rawData[0] = c + a1.x * a1.x * t;
		m1.rawData[5] = c + a1.y * a1.y * t;
		m1.rawData[10] = c + a1.z * a1.z * t;
		var tmp1 = a1.x * a1.y * t;
		var tmp2 = a1.z * s;
		m1.rawData[4] = tmp1 + tmp2;
		m1.rawData[1] = tmp1 - tmp2;
		tmp1 = a1.x * a1.z * t;
		tmp2 = a1.y * s;
		m1.rawData[8] = tmp1 - tmp2;
		m1.rawData[2] = tmp1 + tmp2;
		tmp1 = a1.y * a1.z * t;
		tmp2 = a1.x * s;
		m1.rawData[9] = tmp1 + tmp2;
		m1.rawData[6] = tmp1 - tmp2;
		m = m1;
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
		var m111 = m.rawData[0];
		var m121 = m.rawData[4];
		var m131 = m.rawData[8];
		var m141 = m.rawData[12];
		var m112 = m.rawData[1];
		var m122 = m.rawData[5];
		var m132 = m.rawData[9];
		var m142 = m.rawData[13];
		var m113 = m.rawData[2];
		var m123 = m.rawData[6];
		var m133 = m.rawData[10];
		var m143 = m.rawData[14];
		var m114 = m.rawData[3];
		var m124 = m.rawData[7];
		var m134 = m.rawData[11];
		var m144 = m.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependScale: function(xScale,yScale,zScale) {
		var rhs = new flash.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]);
		var m111 = rhs.rawData[0];
		var m121 = rhs.rawData[4];
		var m131 = rhs.rawData[8];
		var m141 = rhs.rawData[12];
		var m112 = rhs.rawData[1];
		var m122 = rhs.rawData[5];
		var m132 = rhs.rawData[9];
		var m142 = rhs.rawData[13];
		var m113 = rhs.rawData[2];
		var m123 = rhs.rawData[6];
		var m133 = rhs.rawData[10];
		var m143 = rhs.rawData[14];
		var m114 = rhs.rawData[3];
		var m124 = rhs.rawData[7];
		var m134 = rhs.rawData[11];
		var m144 = rhs.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependTranslation: function(x,y,z) {
		var m = new flash.geom.Matrix3D();
		var val = new flash.geom.Vector3D(x,y,z);
		m.rawData[12] = val.x;
		m.rawData[13] = val.y;
		m.rawData[14] = val.z;
		val;
		var m111 = m.rawData[0];
		var m121 = m.rawData[4];
		var m131 = m.rawData[8];
		var m141 = m.rawData[12];
		var m112 = m.rawData[1];
		var m122 = m.rawData[5];
		var m132 = m.rawData[9];
		var m142 = m.rawData[13];
		var m113 = m.rawData[2];
		var m123 = m.rawData[6];
		var m133 = m.rawData[10];
		var m143 = m.rawData[14];
		var m114 = m.rawData[3];
		var m124 = m.rawData[7];
		var m134 = m.rawData[11];
		var m144 = m.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,recompose: function(components) {
		if(flash._Vector.Vector_Impl_.get_length(components) < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) return false;
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
		var lhs = new flash.geom.Matrix3D([components[2].x,0.0,0.0,0.0,0.0,components[2].y,0.0,0.0,0.0,0.0,components[2].z,0.0,0.0,0.0,0.0,1.0]);
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		var angle;
		angle = -components[1].x;
		var lhs = new flash.geom.Matrix3D((function($this) {
			var $r;
			var a = [1,0,0,0,0,Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,0];
			$r = a;
			return $r;
		}(this)));
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		angle = -components[1].y;
		var lhs = new flash.geom.Matrix3D((function($this) {
			var $r;
			var a = [Math.cos(angle),0,Math.sin(angle),0,0,1,0,0,-Math.sin(angle),0,Math.cos(angle),0,0,0,0,0];
			$r = a;
			return $r;
		}(this)));
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		angle = -components[1].z;
		var lhs = new flash.geom.Matrix3D((function($this) {
			var $r;
			var a = [Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,1,0,0,0,0,0];
			$r = a;
			return $r;
		}(this)));
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		var val = components[0];
		this.rawData[12] = val.x;
		this.rawData[13] = val.y;
		this.rawData[14] = val.z;
		val;
		this.rawData[15] = 1;
		return true;
	}
	,transformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new flash.geom.Vector3D(x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12],x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13],x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14],1);
	}
	,transformVectors: function(vin,vout) {
		var i = 0;
		while(i + 3 <= flash._Vector.Vector_Impl_.get_length(vin)) {
			var x = vin[i];
			var y = vin[i + 1];
			var z = vin[i + 2];
			vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
			vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
			vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
			i += 3;
		}
	}
	,transpose: function() {
		var oRawData = flash._Vector.Vector_Impl_.copy(this.rawData);
		this.rawData[1] = oRawData[4];
		this.rawData[2] = oRawData[8];
		this.rawData[3] = oRawData[12];
		this.rawData[4] = oRawData[1];
		this.rawData[6] = oRawData[9];
		this.rawData[7] = oRawData[13];
		this.rawData[8] = oRawData[2];
		this.rawData[9] = oRawData[6];
		this.rawData[11] = oRawData[14];
		this.rawData[12] = oRawData[3];
		this.rawData[13] = oRawData[7];
		this.rawData[14] = oRawData[11];
	}
	,get_determinant: function() {
		return -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
	}
	,get_position: function() {
		return new flash.geom.Vector3D(this.rawData[12],this.rawData[13],this.rawData[14]);
	}
	,set_position: function(val) {
		this.rawData[12] = val.x;
		this.rawData[13] = val.y;
		this.rawData[14] = val.z;
		return val;
	}
	,__class__: flash.geom.Matrix3D
	,__properties__: {set_position:"set_position",get_position:"get_position",get_determinant:"get_determinant"}
}
flash.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
flash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new flash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
flash.geom.Point.polar = function(len,angle) {
	return new flash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
flash.geom.Point.prototype = {
	add: function(v) {
		return new flash.geom.Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new flash.geom.Point(this.x - v.x,this.y - v.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: flash.geom.Point
	,__properties__: {get_length:"get_length"}
}
flash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new flash.geom.Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new flash.geom.Rectangle();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new flash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: flash.geom.Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
}
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	__getFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) {
			var result;
			var m1 = new flash.geom.Matrix(localMatrix.a,localMatrix.b,localMatrix.c,localMatrix.d,localMatrix.tx,localMatrix.ty);
			m1._sx = localMatrix._sx;
			m1._sy = localMatrix._sy;
			result = m1;
			result.concat(this._fullMatrix);
			m = result;
		} else {
			var _this = this._fullMatrix;
			var m1 = new flash.geom.Matrix(_this.a,_this.b,_this.c,_this.d,_this.tx,_this.ty);
			m1._sx = _this._sx;
			m1._sy = _this._sy;
			m = m1;
		}
		return m;
	}
	,__setFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,__setMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,get_concatenatedMatrix: function() {
		var localMatrix = this._matrix;
		var m;
		if(localMatrix != null) {
			var result;
			var m1 = new flash.geom.Matrix(localMatrix.a,localMatrix.b,localMatrix.c,localMatrix.d,localMatrix.tx,localMatrix.ty);
			m1._sx = localMatrix._sx;
			m1._sy = localMatrix._sy;
			result = m1;
			result.concat(this._fullMatrix);
			m = result;
		} else {
			var _this = this._fullMatrix;
			var m1 = new flash.geom.Matrix(_this.a,_this.b,_this.c,_this.d,_this.tx,_this.ty);
			m1._sx = _this._sx;
			m1._sy = _this._sy;
			m = m1;
		}
		return m;
	}
	,get_matrix: function() {
		var _this = this._matrix;
		var m = new flash.geom.Matrix(_this.a,_this.b,_this.c,_this.d,_this.tx,_this.ty);
		m._sx = _this._sx;
		m._sy = _this._sy;
		return m;
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.__matrixOverridden();
		return this._matrix;
	}
	,get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,__class__: flash.geom.Transform
	,__properties__: {get_pixelBounds:"get_pixelBounds",set_matrix:"set_matrix",get_matrix:"get_matrix",get_concatenatedMatrix:"get_concatenatedMatrix",set_colorTransform:"set_colorTransform"}
}
flash.geom.Vector3D = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["flash.geom.Vector3D"] = flash.geom.Vector3D;
flash.geom.Vector3D.__name__ = ["flash","geom","Vector3D"];
flash.geom.Vector3D.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
flash.geom.Vector3D.angleBetween = function(a,b) {
	var a0 = new flash.geom.Vector3D(a.x,a.y,a.z,a.w);
	var l = Math.sqrt(a0.x * a0.x + a0.y * a0.y + a0.z * a0.z);
	if(l != 0) {
		a0.x /= l;
		a0.y /= l;
		a0.z /= l;
	}
	l;
	var b0 = new flash.geom.Vector3D(b.x,b.y,b.z,b.w);
	var l = Math.sqrt(b0.x * b0.x + b0.y * b0.y + b0.z * b0.z);
	if(l != 0) {
		b0.x /= l;
		b0.y /= l;
		b0.z /= l;
	}
	l;
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
}
flash.geom.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
}
flash.geom.Vector3D.get_X_AXIS = function() {
	return new flash.geom.Vector3D(1,0,0);
}
flash.geom.Vector3D.get_Y_AXIS = function() {
	return new flash.geom.Vector3D(0,1,0);
}
flash.geom.Vector3D.get_Z_AXIS = function() {
	return new flash.geom.Vector3D(0,0,1);
}
flash.geom.Vector3D.prototype = {
	add: function(a) {
		return new flash.geom.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new flash.geom.Vector3D(this.x,this.y,this.z,this.w);
	}
	,crossProduct: function(a) {
		return new flash.geom.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,subtract: function(a) {
		return new flash.geom.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: flash.geom.Vector3D
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
}
flash.media = {}
flash.media.Sound = function(stream,context) {
	flash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.__soundChannels = new haxe.ds.IntMap();
	this.__soundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.__canPlayMime = function(mime) {
	var audio = window.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	return playable(audio.canPlayType(mime,null));
}
flash.media.Sound.__canPlayType = function(extension) {
	var mime;
	var mime1 = null;
	switch(extension) {
	case "mp3":
		mime1 = "audio/mpeg";
		break;
	case "ogg":
		mime1 = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime1 = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime1 = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime1 = null;
	}
	mime = mime1;
	if(mime == null) return false;
	return flash.media.Sound.__canPlayMime(mime);
}
flash.media.Sound.__mimeForExtension = function(extension) {
	var mime = null;
	switch(extension) {
	case "mp3":
		mime = "audio/mpeg";
		break;
	case "ogg":
		mime = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime = null;
	}
	return mime;
}
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	close: function() {
	}
	,load: function(stream,context) {
		this.__load(stream,context);
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(this.__streamUrl == null) return null;
		var self = this;
		var curIdx = this.__soundIdx;
		var removeRef = function() {
			self.__soundChannels.remove(curIdx);
		};
		var channel = flash.media.SoundChannel.__create(this.__streamUrl,startTime,loops,sndTransform,removeRef);
		this.__soundChannels.set(curIdx,channel);
		this.__soundIdx++;
		var audio = channel.__audio;
		return channel;
	}
	,__addEventListeners: function() {
		this.__soundCache.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.__onSoundLoaded));
		this.__soundCache.addEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.__onSoundLoadError));
	}
	,__load: function(stream,context,mime) {
		if(mime == null) mime = "";
		this.__streamUrl = stream.url;
		try {
			this.__soundCache = new flash.net.URLLoader();
			this.__addEventListeners();
			this.__soundCache.load(stream);
		} catch( e ) {
		}
	}
	,__removeEventListeners: function() {
		this.__soundCache.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.__onSoundLoaded),false);
		this.__soundCache.removeEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.__onSoundLoadError),false);
	}
	,__onSoundLoadError: function(evt) {
		this.__removeEventListeners();
		var evt1 = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		this.dispatchEvent(evt1);
	}
	,__onSoundLoaded: function(evt) {
		this.__removeEventListeners();
		var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
		this.dispatchEvent(evt1);
	}
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	flash.events.EventDispatcher.call(this,this);
	this.ChannelId = -1;
	this.leftPeak = 0.;
	this.position = 0.;
	this.rightPeak = 0.;
	this.__audioCurrentLoop = 1;
	this.__audioTotalLoops = 1;
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.__create = function(src,startTime,loops,sndTransform,removeRef) {
	if(loops == null) loops = 0;
	if(startTime == null) startTime = 0.0;
	var channel = new flash.media.SoundChannel();
	channel.__audio = window.document.createElement("audio");
	channel.__removeRef = removeRef;
	channel.__audio.addEventListener("ended",$bind(channel,channel.__onSoundChannelFinished),false);
	channel.__audio.addEventListener("seeked",$bind(channel,channel.__onSoundSeeked),false);
	channel.__audio.addEventListener("stalled",$bind(channel,channel.__onStalled),false);
	channel.__audio.addEventListener("progress",$bind(channel,channel.__onProgress),false);
	if(loops > 0) {
		channel.__audioTotalLoops = loops;
		channel.__audio.loop = true;
	}
	channel.__startTime = startTime;
	if(startTime > 0.) {
		var onLoad = null;
		onLoad = function(_) {
			channel.__audio.currentTime = channel.__startTime;
			channel.__audio.play();
			channel.__audio.removeEventListener("canplaythrough",onLoad,false);
		};
		channel.__audio.addEventListener("canplaythrough",onLoad,false);
	} else channel.__audio.autoplay = true;
	channel.__audio.src = src;
	return channel;
}
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	stop: function() {
		if(this.__audio != null) {
			this.__audio.pause();
			this.__audio = null;
			if(this.__removeRef != null) this.__removeRef();
		}
	}
	,__onProgress: function(evt) {
	}
	,__onSoundChannelFinished: function(evt) {
		if(this.__audioCurrentLoop >= this.__audioTotalLoops) {
			this.__audio.removeEventListener("ended",$bind(this,this.__onSoundChannelFinished),false);
			this.__audio.removeEventListener("seeked",$bind(this,this.__onSoundSeeked),false);
			this.__audio.removeEventListener("stalled",$bind(this,this.__onStalled),false);
			this.__audio.removeEventListener("progress",$bind(this,this.__onProgress),false);
			this.__audio = null;
			var evt1 = new flash.events.Event(flash.events.Event.SOUND_COMPLETE);
			evt1.target = this;
			this.dispatchEvent(evt1);
			if(this.__removeRef != null) this.__removeRef();
		} else {
			this.__audio.currentTime = this.__startTime;
			this.__audio.play();
		}
	}
	,__onSoundSeeked: function(evt) {
		if(this.__audioCurrentLoop >= this.__audioTotalLoops) {
			this.__audio.loop = false;
			this.stop();
		} else this.__audioCurrentLoop++;
	}
	,__onStalled: function(evt) {
		if(this.__audio != null) this.__audio.load();
	}
	,set_soundTransform: function(v) {
		this.__audio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__class__: flash.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	__class__: flash.media.SoundLoaderContext
}
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	__class__: flash.media.SoundTransform
}
flash.net = {}
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	close: function() {
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data1 = data;
			var _g = 0;
			var _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode((function($this) {
					var $r;
					var v = null;
					try {
						v = data1[p];
					} catch( e ) {
					}
					$r = v;
					return $r;
				}(this)));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g1 = 0;
		while(_g1 < requestHeaders.length) {
			var header = requestHeaders[_g1];
			++_g1;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = flash.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new flash.events.Event(flash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new flash.events.Event(flash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var evt = new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == flash.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: flash.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = flash.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == flash.net.URLRequestMethod.GET || this.data == null) return res;
		if(js.Boot.__instanceof(this.data,String) || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) {
			res = res.slice();
			res.push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: flash.net.URLRequest
}
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	__class__: flash.net.URLRequestHeader
}
flash.net.URLRequestMethod = function() { }
$hxClasses["flash.net.URLRequestMethod"] = flash.net.URLRequestMethod;
flash.net.URLRequestMethod.__name__ = ["flash","net","URLRequestMethod"];
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) {
				var field = StringTools.urlDecode(HxOverrides.substr(f,0,eq));
				var value = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null));
				this[field] = value;
			} else if(eq != 0) {
				var field = StringTools.urlDecode(f);
				this[field] = "";
			}
		}
	}
	,toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(StringTools.urlEncode(f) + "=" + StringTools.urlEncode((function($this) {
				var $r;
				var v = null;
				try {
					v = $this[f];
				} catch( e ) {
				}
				$r = v;
				return $r;
			}(this))));
		}
		return result.join("&");
	}
	,__class__: flash.net.URLVariables
}
flash.system = {}
flash.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.ApplicationDomain"] = flash.system.ApplicationDomain;
flash.system.ApplicationDomain.__name__ = ["flash","system","ApplicationDomain"];
flash.system.ApplicationDomain.prototype = {
	getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,__class__: flash.system.ApplicationDomain
}
flash.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.LoaderContext"] = flash.system.LoaderContext;
flash.system.LoaderContext.__name__ = ["flash","system","LoaderContext"];
flash.system.LoaderContext.prototype = {
	__class__: flash.system.LoaderContext
}
flash.system.SecurityDomain = function() {
};
$hxClasses["flash.system.SecurityDomain"] = flash.system.SecurityDomain;
flash.system.SecurityDomain.__name__ = ["flash","system","SecurityDomain"];
flash.system.SecurityDomain.prototype = {
	__class__: flash.system.SecurityDomain
}
flash.ui = {}
flash.ui.Keyboard = function() { }
$hxClasses["flash.ui.Keyboard"] = flash.ui.Keyboard;
flash.ui.Keyboard.__name__ = ["flash","ui","Keyboard"];
flash.ui.Keyboard.isAccessible = function() {
	return false;
}
flash.ui.Keyboard.__convertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
flash.ui.Keyboard.__convertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 18;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
}
flash.utils = {}
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this.___resizeBuffer(this.allocated);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new flash.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	var value = result.byteView.length;
	if(result.allocated < value) result.___resizeBuffer((function($this) {
		var $r;
		var x = Math.max(value,result.allocated * 2);
		$r = result.allocated = x | 0;
		return $r;
	}(this))); else if(result.allocated > value) result.___resizeBuffer(result.allocated = value);
	result.length = value;
	value;
	result.allocated = result.length;
	return result;
}
flash.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new flash.utils.ByteArray();
	var value = bytes.allocated = buffer.byteLength;
	if(bytes.allocated < value) bytes.___resizeBuffer((function($this) {
		var $r;
		var x = Math.max(value,bytes.allocated * 2);
		$r = bytes.allocated = x | 0;
		return $r;
	}(this))); else if(bytes.allocated > value) bytes.___resizeBuffer(bytes.allocated = value);
	bytes.length = value;
	value;
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
flash.utils.ByteArray.prototype = {
	clear: function() {
		if(this.allocated < 0) this.___resizeBuffer((function($this) {
			var $r;
			var x = Math.max(0,$this.allocated * 2);
			$r = $this.allocated = x | 0;
			return $r;
		}(this))); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,readBoolean: function() {
		return (function($this) {
			var $r;
			var data = $this.data;
			$r = data.getUint8($this.position++);
			return $r;
		}(this)) != 0;
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,bytes.allocated * 2);
				$r = bytes.allocated = x | 0;
				return $r;
			}(this))); else if(bytes.allocated > lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) {
			var value = bytes.position + length;
			if(bytes.allocated < value) bytes.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(value,bytes.allocated * 2);
				$r = bytes.allocated = x | 0;
				return $r;
			}(this))); else if(bytes.allocated > value) bytes.___resizeBuffer(bytes.allocated = value);
			bytes.length = value;
			value;
		}
	}
	,readDouble: function() {
		var double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return double;
	}
	,readFloat: function() {
		var float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return float;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(len,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > len) this.___resizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readInt: function() {
		var int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return int;
	}
	,readShort: function() {
		var short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return short;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x1 = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x1 | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x1 = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x1 | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer((function($this) {
				var $r;
				var x = Math.max(lengthToEnsure,$this.allocated * 2);
				$r = $this.allocated = x | 0;
				return $r;
			}(this))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__fromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		var value = this.byteView.length;
		if(this.allocated < value) this.___resizeBuffer((function($this) {
			var $r;
			var x = Math.max(value,$this.allocated * 2);
			$r = $this.allocated = x | 0;
			return $r;
		}(this))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		value;
		this.allocated = this.length;
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__getBuffer: function() {
		return this.data.buffer;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer((function($this) {
			var $r;
			var x = Math.max(value,$this.allocated * 2);
			$r = $this.allocated = x | 0;
			return $r;
		}(this))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: flash.utils.ByteArray
	,__properties__: {set_length:"set_length",set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
}
flash.utils.Endian = function() { }
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
flash.utils.Uuid = function() { }
$hxClasses["flash.utils.Uuid"] = flash.utils.Uuid;
flash.utils.Uuid.__name__ = ["flash","utils","Uuid"];
flash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
			var $r;
			var x1 = Math.random() * nchars;
			$r = x1 | 0;
			return $r;
		}(this)));
		uid.b += Std.string(x);
	}
	return uid.b;
}
flash.utils.Uuid.uuid = function() {
	return (function($this) {
		var $r;
		var size = 8;
		if(size == null) size = 32;
		var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
		var uid = new StringBuf();
		{
			var _g = 0;
			while(_g < size) {
				var i = _g++;
				var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
					var $r;
					var x1 = Math.random() * nchars;
					$r = x1 | 0;
					return $r;
				}($this)));
				uid.b += Std.string(x);
			}
		}
		$r = uid.b;
		return $r;
	}(this)) + "-" + (function($this) {
		var $r;
		var size = 4;
		if(size == null) size = 32;
		var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
		var uid = new StringBuf();
		{
			var _g = 0;
			while(_g < size) {
				var i = _g++;
				var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
					var $r;
					var x1 = Math.random() * nchars;
					$r = x1 | 0;
					return $r;
				}($this)));
				uid.b += Std.string(x);
			}
		}
		$r = uid.b;
		return $r;
	}(this)) + "-" + (function($this) {
		var $r;
		var size = 4;
		if(size == null) size = 32;
		var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
		var uid = new StringBuf();
		{
			var _g = 0;
			while(_g < size) {
				var i = _g++;
				var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
					var $r;
					var x1 = Math.random() * nchars;
					$r = x1 | 0;
					return $r;
				}($this)));
				uid.b += Std.string(x);
			}
		}
		$r = uid.b;
		return $r;
	}(this)) + "-" + (function($this) {
		var $r;
		var size = 4;
		if(size == null) size = 32;
		var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
		var uid = new StringBuf();
		{
			var _g = 0;
			while(_g < size) {
				var i = _g++;
				var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
					var $r;
					var x1 = Math.random() * nchars;
					$r = x1 | 0;
					return $r;
				}($this)));
				uid.b += Std.string(x);
			}
		}
		$r = uid.b;
		return $r;
	}(this)) + "-" + (function($this) {
		var $r;
		var size = 12;
		if(size == null) size = 32;
		var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
		var uid = new StringBuf();
		{
			var _g = 0;
			while(_g < size) {
				var i = _g++;
				var x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((function($this) {
					var $r;
					var x1 = Math.random() * nchars;
					$r = x1 | 0;
					return $r;
				}($this)));
				uid.b += Std.string(x);
			}
		}
		$r = uid.b;
		return $r;
	}(this));
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
$hxClasses["haxe.Template"] = haxe.Template;
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	execute: function(context,macros) {
		if(macros == null) this.macros = { }; else this.macros = macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(Reflect.hasField(this.context,v)) {
			var v1 = null;
			try {
				v1 = this.context[v];
			} catch( e ) {
			}
			return v1;
		}
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Reflect.hasField(ctx,v)) {
				var v1 = null;
				try {
					v1 = ctx[v];
				} catch( e ) {
				}
				return v1;
			}
		}
		if(v == "__current__") return this.context;
		var v1 = null;
		try {
			v1 = haxe.Template.globals[v];
		} catch( e ) {
		}
		return v1;
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			var o = e();
			var v = null;
			try {
				v = o[f];
			} catch( e1 ) {
			}
			return v;
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			var _g1 = p1.p;
			switch(_g1) {
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw "Unknown operation " + p1.p;
			}
			break;
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,run: function(e) {
		switch(e[1]) {
		case 0:
			var v = e[2];
			var x = Std.string(this.resolve(v));
			this.buf.b += Std.string(x);
			break;
		case 1:
			var e1 = e[2];
			var x = Std.string(e1());
			this.buf.b += Std.string(x);
			break;
		case 2:
			var eelse = e[4];
			var eif = e[3];
			var e1 = e[2];
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = e[2];
			this.buf.b += Std.string(str);
			break;
		case 4:
			var l = e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				this.run(e1);
			}
			break;
		case 5:
			var loop = e[3];
			var e1 = e[2];
			var v = e1();
			try {
				var x = $iterator(v)();
				if(x.hasNext == null) throw null;
				v = x;
			} catch( e2 ) {
				try {
					if(v.hasNext == null) throw null;
				} catch( e3 ) {
					throw "Cannot iter on " + Std.string(v);
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			while( v1.hasNext() ) {
				var ctx = v1.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = e[3];
			var m = e[2];
			var v;
			var v1 = null;
			try {
				v1 = this.macros[m];
			} catch( e1 ) {
			}
			v = v1;
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				switch(p[1]) {
				case 0:
					var v1 = p[2];
					pl.push(this.resolve(v1));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				var x = Std.string(v.apply(this.macros,pl));
				this.buf.b += Std.string(x);
			} catch( e1 ) {
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e2 ) {
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
				throw msg;
			}
			break;
		}
	}
	,__class__: haxe.Template
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function() { }
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
haxe.io.Eof = function() { }
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
var openfl = {}
openfl.display = {}
openfl.display.DirectRenderer = function(inType) {
	if(inType == null) inType = "DirectRenderer";
	flash.display.DisplayObject.call(this);
	this.__graphics = new flash.display.Graphics();
	this.__graphics.__surface.width = flash.Lib.get_current().get_stage().get_stageWidth();
	this.__graphics.__surface.height = flash.Lib.get_current().get_stage().get_stageHeight();
	if(inType == "OpenGLView" && this.__graphics != null) {
		this.__context = this.__graphics.__surface.getContext("webgl");
		if(this.__context == null) this.__context = this.__graphics.__surface.getContext("experimental-webgl");
	}
};
$hxClasses["openfl.display.DirectRenderer"] = openfl.display.DirectRenderer;
openfl.display.DirectRenderer.__name__ = ["openfl","display","DirectRenderer"];
openfl.display.DirectRenderer.__super__ = flash.display.DisplayObject;
openfl.display.DirectRenderer.prototype = $extend(flash.display.DisplayObject.prototype,{
	__getGraphics: function() {
		return this.__graphics;
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		var gfx = this.__getGraphics();
		if(gfx == null) return;
		gfx.__surface.width = this.get_stage().get_stageWidth();
		gfx.__surface.height = this.get_stage().get_stageHeight();
		if(this.__context != null) {
			openfl.gl.GL.__context = this.__context;
			var rect = null;
			if(this.get_scrollRect() == null) rect = new flash.geom.Rectangle(0,0,this.get_stage().get_stageWidth(),this.get_stage().get_stageHeight()); else rect = new flash.geom.Rectangle(this.get_x() + this.get_scrollRect().x,this.get_y() + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
			if(this.get_render() != null) (this.get_render())(rect);
		}
	}
	,get_render: function() {
		return this.__renderMethod;
	}
	,set_render: function(value) {
		this.__renderMethod = value;
		this.__render();
		return value;
	}
	,__class__: openfl.display.DirectRenderer
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_render:"set_render",get_render:"get_render"})
});
openfl.display.OpenGLView = function() {
	openfl.display.DirectRenderer.call(this,"OpenGLView");
	openfl.gl.GL.__context = this.__context;
};
$hxClasses["openfl.display.OpenGLView"] = openfl.display.OpenGLView;
openfl.display.OpenGLView.__name__ = ["openfl","display","OpenGLView"];
openfl.display.OpenGLView.__properties__ = {get_isSupported:"get_isSupported"}
openfl.display.OpenGLView.get_isSupported = function() {
	if(!window.WebGLRenderingContext) return false;
	var view = new openfl.display.OpenGLView();
	if(view.__context == null) return false;
	return true;
}
openfl.display.OpenGLView.__super__ = openfl.display.DirectRenderer;
openfl.display.OpenGLView.prototype = $extend(openfl.display.DirectRenderer.prototype,{
	__class__: openfl.display.OpenGLView
});
openfl.display.Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = new Array();
	this.__tileRects = new Array();
	this.__tileUVs = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new flash.geom.Point();
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new flash.geom.Rectangle(rectangle.get_left() / (function($this) {
			var $r;
			var _this = $this.__bitmap;
			$r = _this.___textureBuffer != null?_this.___textureBuffer.width:0;
			return $r;
		}(this)),rectangle.get_top() / (function($this) {
			var $r;
			var _this = $this.__bitmap;
			$r = _this.___textureBuffer != null?_this.___textureBuffer.height:0;
			return $r;
		}(this)),rectangle.get_right() / (function($this) {
			var $r;
			var _this = $this.__bitmap;
			$r = _this.___textureBuffer != null?_this.___textureBuffer.width:0;
			return $r;
		}(this)),rectangle.get_bottom() / (function($this) {
			var $r;
			var _this = $this.__bitmap;
			$r = _this.___textureBuffer != null?_this.___textureBuffer.height:0;
			return $r;
		}(this))));
		return this.__tileRects.length - 1;
	}
	,drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,getTileCenter: function(index) {
		return this.__centerPoints[index];
	}
	,getTileRect: function(index) {
		return this.__tileRects[index];
	}
	,getTileUVs: function(index) {
		return this.__tileUVs[index];
	}
	,__class__: openfl.display.Tilesheet
}
openfl.gl = {}
openfl.gl.GL = function() { }
$hxClasses["openfl.gl.GL"] = openfl.gl.GL;
openfl.gl.GL.__name__ = ["openfl","gl","GL"];
openfl.gl.GL.__properties__ = {get_version:"get_version",get_drawingBufferWidth:"get_drawingBufferWidth",get_drawingBufferHeight:"get_drawingBufferHeight"}
openfl.gl.GL.activeTexture = function(texture) {
	openfl.gl.GL.__context.activeTexture(texture);
}
openfl.gl.GL.attachShader = function(program,shader) {
	openfl.gl.GL.__context.attachShader(program,shader);
}
openfl.gl.GL.bindAttribLocation = function(program,index,name) {
	openfl.gl.GL.__context.bindAttribLocation(program,index,name);
}
openfl.gl.GL.bindBitmapDataTexture = function(texture) {
	if(texture.__glTexture == null) {
		texture.__glTexture = openfl.gl.GL.__context.createTexture();
		openfl.gl.GL.__context.bindTexture(3553,texture.__glTexture);
		openfl.gl.GL.__context.texParameteri(3553,10242,33071);
		openfl.gl.GL.__context.texParameteri(3553,10243,33071);
		openfl.gl.GL.__context.texParameteri(3553,10241,9728);
		openfl.gl.GL.__context.texParameteri(3553,10240,9728);
		texture.lock();
		openfl.gl.GL.__context.texImage2D(3553,0,6408,6408,5121,texture.__imageData);
		texture.unlock();
	} else openfl.gl.GL.__context.bindTexture(3553,texture.__glTexture);
}
openfl.gl.GL.bindBuffer = function(target,buffer) {
	openfl.gl.GL.__context.bindBuffer(target,buffer);
}
openfl.gl.GL.bindFramebuffer = function(target,framebuffer) {
	openfl.gl.GL.__context.bindFramebuffer(target,framebuffer);
}
openfl.gl.GL.bindRenderbuffer = function(target,renderbuffer) {
	openfl.gl.GL.__context.bindRenderbuffer(target,renderbuffer);
}
openfl.gl.GL.bindTexture = function(target,texture) {
	openfl.gl.GL.__context.bindTexture(target,texture);
}
openfl.gl.GL.blendColor = function(red,green,blue,alpha) {
	openfl.gl.GL.__context.blendColor(red,green,blue,alpha);
}
openfl.gl.GL.blendEquation = function(mode) {
	openfl.gl.GL.__context.blendEquation(mode);
}
openfl.gl.GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	openfl.gl.GL.__context.blendEquationSeparate(modeRGB,modeAlpha);
}
openfl.gl.GL.blendFunc = function(sfactor,dfactor) {
	openfl.gl.GL.__context.blendFunc(sfactor,dfactor);
}
openfl.gl.GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	openfl.gl.GL.__context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
}
openfl.gl.GL.bufferData = function(target,data,usage) {
	openfl.gl.GL.__context.bufferData(target,data,usage);
}
openfl.gl.GL.bufferSubData = function(target,offset,data) {
	openfl.gl.GL.__context.bufferSubData(target,offset,data);
}
openfl.gl.GL.checkFramebufferStatus = function(target) {
	return openfl.gl.GL.__context.checkFramebufferStatus(target);
}
openfl.gl.GL.clear = function(mask) {
	openfl.gl.GL.__context.clear(mask);
}
openfl.gl.GL.clearColor = function(red,green,blue,alpha) {
	openfl.gl.GL.__context.clearColor(red,green,blue,alpha);
}
openfl.gl.GL.clearDepth = function(depth) {
	openfl.gl.GL.__context.clearDepth(depth);
}
openfl.gl.GL.clearStencil = function(s) {
	openfl.gl.GL.__context.clearStencil(s);
}
openfl.gl.GL.colorMask = function(red,green,blue,alpha) {
	openfl.gl.GL.__context.colorMask(red,green,blue,alpha);
}
openfl.gl.GL.compileShader = function(shader) {
	openfl.gl.GL.__context.compileShader(shader);
}
openfl.gl.GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	openfl.gl.GL.__context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
}
openfl.gl.GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	openfl.gl.GL.__context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
}
openfl.gl.GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	openfl.gl.GL.__context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
}
openfl.gl.GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	openfl.gl.GL.__context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
}
openfl.gl.GL.createBuffer = function() {
	return openfl.gl.GL.__context.createBuffer();
}
openfl.gl.GL.createFramebuffer = function() {
	return openfl.gl.GL.__context.createFramebuffer();
}
openfl.gl.GL.createProgram = function() {
	return openfl.gl.GL.__context.createProgram();
}
openfl.gl.GL.createRenderbuffer = function() {
	return openfl.gl.GL.__context.createRenderbuffer();
}
openfl.gl.GL.createShader = function(type) {
	return openfl.gl.GL.__context.createShader(type);
}
openfl.gl.GL.createTexture = function() {
	return openfl.gl.GL.__context.createTexture();
}
openfl.gl.GL.cullFace = function(mode) {
	openfl.gl.GL.__context.cullFace(mode);
}
openfl.gl.GL.deleteBuffer = function(buffer) {
	openfl.gl.GL.__context.deleteBuffer(buffer);
}
openfl.gl.GL.deleteFramebuffer = function(framebuffer) {
	openfl.gl.GL.__context.deleteFramebuffer(framebuffer);
}
openfl.gl.GL.deleteProgram = function(program) {
	openfl.gl.GL.__context.deleteProgram(program);
}
openfl.gl.GL.deleteRenderbuffer = function(renderbuffer) {
	openfl.gl.GL.__context.deleteRenderbuffer(renderbuffer);
}
openfl.gl.GL.deleteShader = function(shader) {
	openfl.gl.GL.__context.deleteShader(shader);
}
openfl.gl.GL.deleteTexture = function(texture) {
	openfl.gl.GL.__context.deleteTexture(texture);
}
openfl.gl.GL.depthFunc = function(func) {
	openfl.gl.GL.__context.depthFunc(func);
}
openfl.gl.GL.depthMask = function(flag) {
	openfl.gl.GL.__context.depthMask(flag);
}
openfl.gl.GL.depthRange = function(zNear,zFar) {
	openfl.gl.GL.__context.depthRange(zNear,zFar);
}
openfl.gl.GL.detachShader = function(program,shader) {
	openfl.gl.GL.__context.detachShader(program,shader);
}
openfl.gl.GL.disable = function(cap) {
	openfl.gl.GL.__context.disable(cap);
}
openfl.gl.GL.disableVertexAttribArray = function(index) {
	openfl.gl.GL.__context.disableVertexAttribArray(index);
}
openfl.gl.GL.drawArrays = function(mode,first,count) {
	openfl.gl.GL.__context.drawArrays(mode,first,count);
}
openfl.gl.GL.drawElements = function(mode,count,type,offset) {
	openfl.gl.GL.__context.drawElements(mode,count,type,offset);
}
openfl.gl.GL.enable = function(cap) {
	openfl.gl.GL.__context.enable(cap);
}
openfl.gl.GL.enableVertexAttribArray = function(index) {
	openfl.gl.GL.__context.enableVertexAttribArray(index);
}
openfl.gl.GL.finish = function() {
	openfl.gl.GL.__context.finish();
}
openfl.gl.GL.flush = function() {
	openfl.gl.GL.__context.flush();
}
openfl.gl.GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	openfl.gl.GL.__context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
}
openfl.gl.GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	openfl.gl.GL.__context.framebufferTexture2D(target,attachment,textarget,texture,level);
}
openfl.gl.GL.frontFace = function(mode) {
	openfl.gl.GL.__context.frontFace(mode);
}
openfl.gl.GL.generateMipmap = function(target) {
	openfl.gl.GL.__context.generateMipmap(target);
}
openfl.gl.GL.getActiveAttrib = function(program,index) {
	return openfl.gl.GL.__context.getActiveAttrib(program,index);
}
openfl.gl.GL.getActiveUniform = function(program,index) {
	return openfl.gl.GL.__context.getActiveUniform(program,index);
}
openfl.gl.GL.getAttachedShaders = function(program) {
	return openfl.gl.GL.__context.getAttachedShaders(program);
}
openfl.gl.GL.getAttribLocation = function(program,name) {
	return openfl.gl.GL.__context.getAttribLocation(program,name);
}
openfl.gl.GL.getBufferParameter = function(target,pname) {
	return openfl.gl.GL.__context.getBufferParameter(target,pname);
}
openfl.gl.GL.getContextAttributes = function() {
	return openfl.gl.GL.__context.getContextAttributes();
}
openfl.gl.GL.getError = function() {
	return openfl.gl.GL.__context.getError();
}
openfl.gl.GL.getExtension = function(name) {
	return openfl.gl.GL.__context.getExtension(name);
}
openfl.gl.GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return openfl.gl.GL.__context.getFramebufferAttachmentParameter(target,attachment,pname);
}
openfl.gl.GL.getParameter = function(pname) {
	return openfl.gl.GL.__context.getParameter(pname);
}
openfl.gl.GL.getProgramInfoLog = function(program) {
	return openfl.gl.GL.__context.getProgramInfoLog(program);
}
openfl.gl.GL.getProgramParameter = function(program,pname) {
	return openfl.gl.GL.__context.getProgramParameter(program,pname);
}
openfl.gl.GL.getRenderbufferParameter = function(target,pname) {
	return openfl.gl.GL.__context.getRenderbufferParameter(target,pname);
}
openfl.gl.GL.getShaderInfoLog = function(shader) {
	return openfl.gl.GL.__context.getShaderInfoLog(shader);
}
openfl.gl.GL.getShaderParameter = function(shader,pname) {
	return openfl.gl.GL.__context.getShaderParameter(shader,pname);
}
openfl.gl.GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return null;
}
openfl.gl.GL.getShaderSource = function(shader) {
	return openfl.gl.GL.__context.getShaderSource(shader);
}
openfl.gl.GL.getSupportedExtensions = function() {
	return openfl.gl.GL.__context.getSupportedExtensions();
}
openfl.gl.GL.getTexParameter = function(target,pname) {
	return openfl.gl.GL.__context.getTexParameter(target,pname);
}
openfl.gl.GL.getUniform = function(program,location) {
	return openfl.gl.GL.__context.getUniform(program,location);
}
openfl.gl.GL.getUniformLocation = function(program,name) {
	return openfl.gl.GL.__context.getUniformLocation(program,name);
}
openfl.gl.GL.getVertexAttrib = function(index,pname) {
	return openfl.gl.GL.__context.getVertexAttrib(index,pname);
}
openfl.gl.GL.getVertexAttribOffset = function(index,pname) {
	return openfl.gl.GL.__context.getVertexAttribOffset(index,pname);
}
openfl.gl.GL.hint = function(target,mode) {
	openfl.gl.GL.__context.hint(target,mode);
}
openfl.gl.GL.isBuffer = function(buffer) {
	return openfl.gl.GL.__context.isBuffer(buffer);
}
openfl.gl.GL.isEnabled = function(cap) {
	return openfl.gl.GL.__context.isEnabled(cap);
}
openfl.gl.GL.isFramebuffer = function(framebuffer) {
	return openfl.gl.GL.__context.isFramebuffer(framebuffer);
}
openfl.gl.GL.isProgram = function(program) {
	return openfl.gl.GL.__context.isProgram(program);
}
openfl.gl.GL.isRenderbuffer = function(renderbuffer) {
	return openfl.gl.GL.__context.isRenderbuffer(renderbuffer);
}
openfl.gl.GL.isShader = function(shader) {
	return openfl.gl.GL.__context.isShader(shader);
}
openfl.gl.GL.isTexture = function(texture) {
	return openfl.gl.GL.__context.isTexture(texture);
}
openfl.gl.GL.lineWidth = function(width) {
	openfl.gl.GL.__context.lineWidth(width);
}
openfl.gl.GL.linkProgram = function(program) {
	openfl.gl.GL.__context.linkProgram(program);
}
openfl.gl.GL.pixelStorei = function(pname,param) {
	openfl.gl.GL.__context.pixelStorei(pname,param);
}
openfl.gl.GL.polygonOffset = function(factor,units) {
	openfl.gl.GL.__context.polygonOffset(factor,units);
}
openfl.gl.GL.readPixels = function(x,y,width,height,format,type,pixels) {
	openfl.gl.GL.__context.readPixels(x,y,width,height,format,type,pixels);
}
openfl.gl.GL.renderbufferStorage = function(target,internalformat,width,height) {
	openfl.gl.GL.__context.renderbufferStorage(target,internalformat,width,height);
}
openfl.gl.GL.sampleCoverage = function(value,invert) {
	openfl.gl.GL.__context.sampleCoverage(value,invert);
}
openfl.gl.GL.scissor = function(x,y,width,height) {
	openfl.gl.GL.__context.scissor(x,y,width,height);
}
openfl.gl.GL.shaderSource = function(shader,source) {
	openfl.gl.GL.__context.shaderSource(shader,source);
}
openfl.gl.GL.stencilFunc = function(func,ref,mask) {
	openfl.gl.GL.__context.stencilFunc(func,ref,mask);
}
openfl.gl.GL.stencilFuncSeparate = function(face,func,ref,mask) {
	openfl.gl.GL.__context.stencilFuncSeparate(face,func,ref,mask);
}
openfl.gl.GL.stencilMask = function(mask) {
	openfl.gl.GL.__context.stencilMask(mask);
}
openfl.gl.GL.stencilMaskSeparate = function(face,mask) {
	openfl.gl.GL.__context.stencilMaskSeparate(face,mask);
}
openfl.gl.GL.stencilOp = function(fail,zfail,zpass) {
	openfl.gl.GL.__context.stencilOp(fail,zfail,zpass);
}
openfl.gl.GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	openfl.gl.GL.__context.stencilOpSeparate(face,fail,zfail,zpass);
}
openfl.gl.GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	openfl.gl.GL.__context.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
}
openfl.gl.GL.texParameterf = function(target,pname,param) {
	openfl.gl.GL.__context.texParameterf(target,pname,param);
}
openfl.gl.GL.texParameteri = function(target,pname,param) {
	openfl.gl.GL.__context.texParameteri(target,pname,param);
}
openfl.gl.GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	openfl.gl.GL.__context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
}
openfl.gl.GL.uniform1f = function(location,x) {
	openfl.gl.GL.__context.uniform1f(location,x);
}
openfl.gl.GL.uniform1fv = function(location,x) {
	openfl.gl.GL.__context.uniform1fv(location,x);
}
openfl.gl.GL.uniform1i = function(location,x) {
	openfl.gl.GL.__context.uniform1i(location,x);
}
openfl.gl.GL.uniform1iv = function(location,v) {
	openfl.gl.GL.__context.uniform1iv(location,v);
}
openfl.gl.GL.uniform2f = function(location,x,y) {
	openfl.gl.GL.__context.uniform2f(location,x,y);
}
openfl.gl.GL.uniform2fv = function(location,v) {
	openfl.gl.GL.__context.uniform2fv(location,v);
}
openfl.gl.GL.uniform2i = function(location,x,y) {
	openfl.gl.GL.__context.uniform2i(location,x,y);
}
openfl.gl.GL.uniform2iv = function(location,v) {
	openfl.gl.GL.__context.uniform2iv(location,v);
}
openfl.gl.GL.uniform3f = function(location,x,y,z) {
	openfl.gl.GL.__context.uniform3f(location,x,y,z);
}
openfl.gl.GL.uniform3fv = function(location,v) {
	openfl.gl.GL.__context.uniform3fv(location,v);
}
openfl.gl.GL.uniform3i = function(location,x,y,z) {
	openfl.gl.GL.__context.uniform3i(location,x,y,z);
}
openfl.gl.GL.uniform3iv = function(location,v) {
	openfl.gl.GL.__context.uniform3iv(location,v);
}
openfl.gl.GL.uniform4f = function(location,x,y,z,w) {
	openfl.gl.GL.__context.uniform4f(location,x,y,z,w);
}
openfl.gl.GL.uniform4fv = function(location,v) {
	openfl.gl.GL.__context.uniform4fv(location,v);
}
openfl.gl.GL.uniform4i = function(location,x,y,z,w) {
	openfl.gl.GL.__context.uniform4i(location,x,y,z,w);
}
openfl.gl.GL.uniform4iv = function(location,v) {
	openfl.gl.GL.__context.uniform4iv(location,v);
}
openfl.gl.GL.uniformMatrix2fv = function(location,transpose,v) {
	openfl.gl.GL.__context.uniformMatrix2fv(location,transpose,v);
}
openfl.gl.GL.uniformMatrix3fv = function(location,transpose,v) {
	openfl.gl.GL.__context.uniformMatrix3fv(location,transpose,v);
}
openfl.gl.GL.uniformMatrix4fv = function(location,transpose,v) {
	openfl.gl.GL.__context.uniformMatrix4fv(location,transpose,v);
}
openfl.gl.GL.uniformMatrix3D = function(location,transpose,matrix) {
	openfl.gl.GL.__context.uniformMatrix4fv(location,transpose,new Float32Array(matrix.rawData));
}
openfl.gl.GL.useProgram = function(program) {
	openfl.gl.GL.__context.useProgram(program);
}
openfl.gl.GL.validateProgram = function(program) {
	openfl.gl.GL.__context.validateProgram(program);
}
openfl.gl.GL.vertexAttrib1f = function(indx,x) {
	openfl.gl.GL.__context.vertexAttrib1f(indx,x);
}
openfl.gl.GL.vertexAttrib1fv = function(indx,values) {
	openfl.gl.GL.__context.vertexAttrib1fv(indx,values);
}
openfl.gl.GL.vertexAttrib2f = function(indx,x,y) {
	openfl.gl.GL.__context.vertexAttrib2f(indx,x,y);
}
openfl.gl.GL.vertexAttrib2fv = function(indx,values) {
	openfl.gl.GL.__context.vertexAttrib2fv(indx,values);
}
openfl.gl.GL.vertexAttrib3f = function(indx,x,y,z) {
	openfl.gl.GL.__context.vertexAttrib3f(indx,x,y,z);
}
openfl.gl.GL.vertexAttrib3fv = function(indx,values) {
	openfl.gl.GL.__context.vertexAttrib3fv(indx,values);
}
openfl.gl.GL.vertexAttrib4f = function(indx,x,y,z,w) {
	openfl.gl.GL.__context.vertexAttrib4f(indx,x,y,z,w);
}
openfl.gl.GL.vertexAttrib4fv = function(indx,values) {
	openfl.gl.GL.__context.vertexAttrib4fv(indx,values);
}
openfl.gl.GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	openfl.gl.GL.__context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
}
openfl.gl.GL.viewport = function(x,y,width,height) {
	openfl.gl.GL.__context.viewport(x,y,width,height);
}
openfl.gl.GL.get_drawingBufferHeight = function() {
	return flash.Lib.get_current().get_stage().get_stageHeight();
}
openfl.gl.GL.get_drawingBufferWidth = function() {
	return flash.Lib.get_current().get_stage().get_stageWidth();
}
openfl.gl.GL.get_version = function() {
	return 7938;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe.Resource.content = [];
flash.display.DisplayObject.GRAPHICS_INVALID = 2;
flash.display.DisplayObject.MATRIX_INVALID = 4;
flash.display.DisplayObject.MATRIX_CHAIN_INVALID = 8;
flash.display.DisplayObject.MATRIX_OVERRIDDEN = 16;
flash.display.DisplayObject.TRANSFORM_INVALID = 32;
flash.display.DisplayObject.BOUNDS_INVALID = 64;
flash.display.DisplayObject.RENDER_VALIDATE_IN_PROGRESS = 1024;
flash.display.DisplayObject.ALL_RENDER_FLAGS = 98;
flash.Lib.HTML_ACCELEROMETER_EVENT_TYPE = "devicemotion";
flash.Lib.HTML_ORIENTATION_EVENT_TYPE = "orientationchange";
flash.Lib.DEFAULT_HEIGHT = 500;
flash.Lib.DEFAULT_WIDTH = 500;
flash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseover","mouseout","mousewheel","dblclick","click"];
flash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES = ["mousedown","mousemove","mouseup"];
flash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize","blur","focus"];
flash.Lib.NME_IDENTIFIER = "haxe:openfl";
flash.Lib.VENDOR_HTML_TAG = "data-";
flash.Lib.starttime = haxe.Timer.stamp();
flash.display._BitmapData.MinstdGenerator.a = 16807;
flash.display._BitmapData.MinstdGenerator.m = -2147483648 - 1;
flash.display.BitmapDataChannel.ALPHA = 8;
flash.display.BitmapDataChannel.BLUE = 4;
flash.display.BitmapDataChannel.GREEN = 2;
flash.display.BitmapDataChannel.RED = 1;
flash.display.Graphics.TILE_SCALE = 1;
flash.display.Graphics.TILE_ROTATION = 2;
flash.display.Graphics.TILE_RGB = 4;
flash.display.Graphics.TILE_ALPHA = 8;
flash.display.Graphics.TILE_TRANS_2x2 = 16;
flash.display.Graphics.TILE_BLEND_NORMAL = 0;
flash.display.Graphics.TILE_BLEND_ADD = 65536;
flash.display.Graphics.BMP_REPEAT = 16;
flash.display.Graphics.BMP_SMOOTH = 65536;
flash.display.Graphics.CORNER_ROUND = 0;
flash.display.Graphics.CORNER_MITER = 4096;
flash.display.Graphics.CORNER_BEVEL = 8192;
flash.display.Graphics.CURVE = 2;
flash.display.Graphics.END_NONE = 0;
flash.display.Graphics.END_ROUND = 256;
flash.display.Graphics.END_SQUARE = 512;
flash.display.Graphics.LINE = 1;
flash.display.Graphics.MOVE = 0;
flash.display.Graphics.__MAX_DIM = 5000;
flash.display.Graphics.PIXEL_HINTING = 16384;
flash.display.Graphics.RADIAL = 1;
flash.display.Graphics.SCALE_HORIZONTAL = 2;
flash.display.Graphics.SCALE_NONE = 0;
flash.display.Graphics.SCALE_NORMAL = 3;
flash.display.Graphics.SCALE_VERTICAL = 1;
flash.display.Graphics.SPREAD_REPEAT = 2;
flash.display.Graphics.SPREAD_REFLECT = 4;
flash.display.GraphicsPathCommand.LINE_TO = 2;
flash.display.GraphicsPathCommand.MOVE_TO = 1;
flash.display.GraphicsPathCommand.CURVE_TO = 3;
flash.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
flash.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
flash.display.GraphicsPathCommand.NO_OP = 0;
flash.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
flash.events.Event.ACTIVATE = "activate";
flash.events.Event.ADDED = "added";
flash.events.Event.ADDED_TO_STAGE = "addedToStage";
flash.events.Event.CANCEL = "cancel";
flash.events.Event.CHANGE = "change";
flash.events.Event.CLOSE = "close";
flash.events.Event.COMPLETE = "complete";
flash.events.Event.CONNECT = "connect";
flash.events.Event.CONTEXT3D_CREATE = "context3DCreate";
flash.events.Event.DEACTIVATE = "deactivate";
flash.events.Event.ENTER_FRAME = "enterFrame";
flash.events.Event.ID3 = "id3";
flash.events.Event.INIT = "init";
flash.events.Event.MOUSE_LEAVE = "mouseLeave";
flash.events.Event.OPEN = "open";
flash.events.Event.REMOVED = "removed";
flash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
flash.events.Event.RENDER = "render";
flash.events.Event.RESIZE = "resize";
flash.events.Event.SCROLL = "scroll";
flash.events.Event.SELECT = "select";
flash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
flash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
flash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
flash.events.Event.UNLOAD = "unload";
flash.events.Event.SOUND_COMPLETE = "soundComplete";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
flash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
flash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
flash.events.MouseEvent.MOUSE_OUT = "mouseOut";
flash.events.MouseEvent.MOUSE_OVER = "mouseOver";
flash.events.MouseEvent.MOUSE_UP = "mouseUp";
flash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
flash.events.MouseEvent.RIGHT_CLICK = "rightClick";
flash.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
flash.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
flash.events.MouseEvent.ROLL_OUT = "rollOut";
flash.events.MouseEvent.ROLL_OVER = "rollOver";
flash.display.Stage.NAME = "Stage";
flash.display.Stage.OrientationPortrait = 1;
flash.display.Stage.OrientationPortraitUpsideDown = 2;
flash.display.Stage.OrientationLandscapeRight = 3;
flash.display.Stage.OrientationLandscapeLeft = 4;
flash.display.Stage.__acceleration = { x : 0.0, y : 1.0, z : 0.0};
flash.display.Stage.DEFAULT_FRAMERATE = 0.0;
flash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
flash.display.Stage.__mouseChanges = [flash.events.MouseEvent.MOUSE_OUT,flash.events.MouseEvent.MOUSE_OVER,flash.events.MouseEvent.ROLL_OUT,flash.events.MouseEvent.ROLL_OVER];
flash.display.Stage.__touchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
flash.display.StageQuality.BEST = "best";
flash.display.StageQuality.HIGH = "high";
flash.display.StageQuality.MEDIUM = "medium";
flash.display.StageQuality.LOW = "low";
flash.errors.Error.DEFAULT_TO_STRING = "Error";
flash.events.TextEvent.LINK = "link";
flash.events.TextEvent.TEXT_INPUT = "textInput";
flash.events.ErrorEvent.ERROR = "error";
flash.events.Listener.sIDs = 1;
flash.events.EventPhase.CAPTURING_PHASE = 0;
flash.events.EventPhase.AT_TARGET = 1;
flash.events.EventPhase.BUBBLING_PHASE = 2;
flash.events.FocusEvent.FOCUS_IN = "focusIn";
flash.events.FocusEvent.FOCUS_OUT = "focusOut";
flash.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
flash.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
flash.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
flash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
flash.events.IOErrorEvent.IO_ERROR = "ioError";
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";
flash.events.ProgressEvent.PROGRESS = "progress";
flash.events.ProgressEvent.SOCKET_DATA = "socketData";
flash.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
flash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
flash.events.TouchEvent.TOUCH_END = "touchEnd";
flash.events.TouchEvent.TOUCH_MOVE = "touchMove";
flash.events.TouchEvent.TOUCH_OUT = "touchOut";
flash.events.TouchEvent.TOUCH_OVER = "touchOver";
flash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
flash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
flash.events.TouchEvent.TOUCH_TAP = "touchTap";
flash.filters.DropShadowFilter.DEGREES_FULL_RADIUS = 360.0;
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
flash.media.Sound.EXTENSION_MP3 = "mp3";
flash.media.Sound.EXTENSION_OGG = "ogg";
flash.media.Sound.EXTENSION_WAV = "wav";
flash.media.Sound.EXTENSION_AAC = "aac";
flash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
flash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
flash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
flash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
flash.net.URLRequestMethod.DELETE = "DELETE";
flash.net.URLRequestMethod.GET = "GET";
flash.net.URLRequestMethod.HEAD = "HEAD";
flash.net.URLRequestMethod.OPTIONS = "OPTIONS";
flash.net.URLRequestMethod.POST = "POST";
flash.net.URLRequestMethod.PUT = "PUT";
flash.system.ApplicationDomain.currentDomain = new flash.system.ApplicationDomain(null);
flash.system.SecurityDomain.currentDomain = new flash.system.SecurityDomain();
flash.ui.Keyboard.NUMBER_0 = 48;
flash.ui.Keyboard.NUMBER_1 = 49;
flash.ui.Keyboard.NUMBER_2 = 50;
flash.ui.Keyboard.NUMBER_3 = 51;
flash.ui.Keyboard.NUMBER_4 = 52;
flash.ui.Keyboard.NUMBER_5 = 53;
flash.ui.Keyboard.NUMBER_6 = 54;
flash.ui.Keyboard.NUMBER_7 = 55;
flash.ui.Keyboard.NUMBER_8 = 56;
flash.ui.Keyboard.NUMBER_9 = 57;
flash.ui.Keyboard.A = 65;
flash.ui.Keyboard.B = 66;
flash.ui.Keyboard.C = 67;
flash.ui.Keyboard.D = 68;
flash.ui.Keyboard.E = 69;
flash.ui.Keyboard.F = 70;
flash.ui.Keyboard.G = 71;
flash.ui.Keyboard.H = 72;
flash.ui.Keyboard.I = 73;
flash.ui.Keyboard.J = 74;
flash.ui.Keyboard.K = 75;
flash.ui.Keyboard.L = 76;
flash.ui.Keyboard.M = 77;
flash.ui.Keyboard.N = 78;
flash.ui.Keyboard.O = 79;
flash.ui.Keyboard.P = 80;
flash.ui.Keyboard.Q = 81;
flash.ui.Keyboard.R = 82;
flash.ui.Keyboard.S = 83;
flash.ui.Keyboard.T = 84;
flash.ui.Keyboard.U = 85;
flash.ui.Keyboard.V = 86;
flash.ui.Keyboard.W = 87;
flash.ui.Keyboard.X = 88;
flash.ui.Keyboard.Y = 89;
flash.ui.Keyboard.Z = 90;
flash.ui.Keyboard.NUMPAD_0 = 96;
flash.ui.Keyboard.NUMPAD_1 = 97;
flash.ui.Keyboard.NUMPAD_2 = 98;
flash.ui.Keyboard.NUMPAD_3 = 99;
flash.ui.Keyboard.NUMPAD_4 = 100;
flash.ui.Keyboard.NUMPAD_5 = 101;
flash.ui.Keyboard.NUMPAD_6 = 102;
flash.ui.Keyboard.NUMPAD_7 = 103;
flash.ui.Keyboard.NUMPAD_8 = 104;
flash.ui.Keyboard.NUMPAD_9 = 105;
flash.ui.Keyboard.NUMPAD_MULTIPLY = 106;
flash.ui.Keyboard.NUMPAD_ADD = 107;
flash.ui.Keyboard.NUMPAD_ENTER = 108;
flash.ui.Keyboard.NUMPAD_SUBTRACT = 109;
flash.ui.Keyboard.NUMPAD_DECIMAL = 110;
flash.ui.Keyboard.NUMPAD_DIVIDE = 111;
flash.ui.Keyboard.F1 = 112;
flash.ui.Keyboard.F2 = 113;
flash.ui.Keyboard.F3 = 114;
flash.ui.Keyboard.F4 = 115;
flash.ui.Keyboard.F5 = 116;
flash.ui.Keyboard.F6 = 117;
flash.ui.Keyboard.F7 = 118;
flash.ui.Keyboard.F8 = 119;
flash.ui.Keyboard.F9 = 120;
flash.ui.Keyboard.F10 = 121;
flash.ui.Keyboard.F11 = 122;
flash.ui.Keyboard.F12 = 123;
flash.ui.Keyboard.F13 = 124;
flash.ui.Keyboard.F14 = 125;
flash.ui.Keyboard.F15 = 126;
flash.ui.Keyboard.BACKSPACE = 8;
flash.ui.Keyboard.TAB = 9;
flash.ui.Keyboard.ENTER = 13;
flash.ui.Keyboard.SHIFT = 16;
flash.ui.Keyboard.CONTROL = 17;
flash.ui.Keyboard.CAPS_LOCK = 18;
flash.ui.Keyboard.ESCAPE = 27;
flash.ui.Keyboard.SPACE = 32;
flash.ui.Keyboard.PAGE_UP = 33;
flash.ui.Keyboard.PAGE_DOWN = 34;
flash.ui.Keyboard.END = 35;
flash.ui.Keyboard.HOME = 36;
flash.ui.Keyboard.LEFT = 37;
flash.ui.Keyboard.RIGHT = 39;
flash.ui.Keyboard.UP = 38;
flash.ui.Keyboard.DOWN = 40;
flash.ui.Keyboard.INSERT = 45;
flash.ui.Keyboard.DELETE = 46;
flash.ui.Keyboard.NUMLOCK = 144;
flash.ui.Keyboard.BREAK = 19;
flash.ui.Keyboard.SEMICOLON = 186;
flash.ui.Keyboard.EQUAL = 187;
flash.ui.Keyboard.COMMA = 188;
flash.ui.Keyboard.MINUS = 189;
flash.ui.Keyboard.PERIOD = 190;
flash.ui.Keyboard.SLASH = 191;
flash.ui.Keyboard.BACKQUOTE = 192;
flash.ui.Keyboard.LEFTBRACKET = 219;
flash.ui.Keyboard.BACKSLASH = 220;
flash.ui.Keyboard.RIGHTBRACKET = 221;
flash.ui.Keyboard.DOM_VK_CANCEL = 3;
flash.ui.Keyboard.DOM_VK_HELP = 6;
flash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
flash.ui.Keyboard.DOM_VK_TAB = 9;
flash.ui.Keyboard.DOM_VK_CLEAR = 12;
flash.ui.Keyboard.DOM_VK_RETURN = 13;
flash.ui.Keyboard.DOM_VK_ENTER = 14;
flash.ui.Keyboard.DOM_VK_SHIFT = 16;
flash.ui.Keyboard.DOM_VK_CONTROL = 17;
flash.ui.Keyboard.DOM_VK_ALT = 18;
flash.ui.Keyboard.DOM_VK_PAUSE = 19;
flash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
flash.ui.Keyboard.DOM_VK_ESCAPE = 27;
flash.ui.Keyboard.DOM_VK_SPACE = 32;
flash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
flash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
flash.ui.Keyboard.DOM_VK_END = 35;
flash.ui.Keyboard.DOM_VK_HOME = 36;
flash.ui.Keyboard.DOM_VK_LEFT = 37;
flash.ui.Keyboard.DOM_VK_UP = 38;
flash.ui.Keyboard.DOM_VK_RIGHT = 39;
flash.ui.Keyboard.DOM_VK_DOWN = 40;
flash.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
flash.ui.Keyboard.DOM_VK_INSERT = 45;
flash.ui.Keyboard.DOM_VK_DELETE = 46;
flash.ui.Keyboard.DOM_VK_0 = 48;
flash.ui.Keyboard.DOM_VK_1 = 49;
flash.ui.Keyboard.DOM_VK_2 = 50;
flash.ui.Keyboard.DOM_VK_3 = 51;
flash.ui.Keyboard.DOM_VK_4 = 52;
flash.ui.Keyboard.DOM_VK_5 = 53;
flash.ui.Keyboard.DOM_VK_6 = 54;
flash.ui.Keyboard.DOM_VK_7 = 55;
flash.ui.Keyboard.DOM_VK_8 = 56;
flash.ui.Keyboard.DOM_VK_9 = 57;
flash.ui.Keyboard.DOM_VK_SEMICOLON = 59;
flash.ui.Keyboard.DOM_VK_EQUALS = 61;
flash.ui.Keyboard.DOM_VK_A = 65;
flash.ui.Keyboard.DOM_VK_B = 66;
flash.ui.Keyboard.DOM_VK_C = 67;
flash.ui.Keyboard.DOM_VK_D = 68;
flash.ui.Keyboard.DOM_VK_E = 69;
flash.ui.Keyboard.DOM_VK_F = 70;
flash.ui.Keyboard.DOM_VK_G = 71;
flash.ui.Keyboard.DOM_VK_H = 72;
flash.ui.Keyboard.DOM_VK_I = 73;
flash.ui.Keyboard.DOM_VK_J = 74;
flash.ui.Keyboard.DOM_VK_K = 75;
flash.ui.Keyboard.DOM_VK_L = 76;
flash.ui.Keyboard.DOM_VK_M = 77;
flash.ui.Keyboard.DOM_VK_N = 78;
flash.ui.Keyboard.DOM_VK_O = 79;
flash.ui.Keyboard.DOM_VK_P = 80;
flash.ui.Keyboard.DOM_VK_Q = 81;
flash.ui.Keyboard.DOM_VK_R = 82;
flash.ui.Keyboard.DOM_VK_S = 83;
flash.ui.Keyboard.DOM_VK_T = 84;
flash.ui.Keyboard.DOM_VK_U = 85;
flash.ui.Keyboard.DOM_VK_V = 86;
flash.ui.Keyboard.DOM_VK_W = 87;
flash.ui.Keyboard.DOM_VK_X = 88;
flash.ui.Keyboard.DOM_VK_Y = 89;
flash.ui.Keyboard.DOM_VK_Z = 90;
flash.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
flash.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
flash.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
flash.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
flash.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
flash.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
flash.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
flash.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
flash.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
flash.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
flash.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
flash.ui.Keyboard.DOM_VK_MULTIPLY = 106;
flash.ui.Keyboard.DOM_VK_ADD = 107;
flash.ui.Keyboard.DOM_VK_SEPARATOR = 108;
flash.ui.Keyboard.DOM_VK_SUBTRACT = 109;
flash.ui.Keyboard.DOM_VK_DECIMAL = 110;
flash.ui.Keyboard.DOM_VK_DIVIDE = 111;
flash.ui.Keyboard.DOM_VK_F1 = 112;
flash.ui.Keyboard.DOM_VK_F2 = 113;
flash.ui.Keyboard.DOM_VK_F3 = 114;
flash.ui.Keyboard.DOM_VK_F4 = 115;
flash.ui.Keyboard.DOM_VK_F5 = 116;
flash.ui.Keyboard.DOM_VK_F6 = 117;
flash.ui.Keyboard.DOM_VK_F7 = 118;
flash.ui.Keyboard.DOM_VK_F8 = 119;
flash.ui.Keyboard.DOM_VK_F9 = 120;
flash.ui.Keyboard.DOM_VK_F10 = 121;
flash.ui.Keyboard.DOM_VK_F11 = 122;
flash.ui.Keyboard.DOM_VK_F12 = 123;
flash.ui.Keyboard.DOM_VK_F13 = 124;
flash.ui.Keyboard.DOM_VK_F14 = 125;
flash.ui.Keyboard.DOM_VK_F15 = 126;
flash.ui.Keyboard.DOM_VK_F16 = 127;
flash.ui.Keyboard.DOM_VK_F17 = 128;
flash.ui.Keyboard.DOM_VK_F18 = 129;
flash.ui.Keyboard.DOM_VK_F19 = 130;
flash.ui.Keyboard.DOM_VK_F20 = 131;
flash.ui.Keyboard.DOM_VK_F21 = 132;
flash.ui.Keyboard.DOM_VK_F22 = 133;
flash.ui.Keyboard.DOM_VK_F23 = 134;
flash.ui.Keyboard.DOM_VK_F24 = 135;
flash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
flash.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
flash.ui.Keyboard.DOM_VK_COMMA = 188;
flash.ui.Keyboard.DOM_VK_PERIOD = 190;
flash.ui.Keyboard.DOM_VK_SLASH = 191;
flash.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
flash.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
flash.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
flash.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
flash.ui.Keyboard.DOM_VK_QUOTE = 222;
flash.ui.Keyboard.DOM_VK_META = 224;
flash.ui.Keyboard.DOM_VK_KANA = 21;
flash.ui.Keyboard.DOM_VK_HANGUL = 21;
flash.ui.Keyboard.DOM_VK_JUNJA = 23;
flash.ui.Keyboard.DOM_VK_FINAL = 24;
flash.ui.Keyboard.DOM_VK_HANJA = 25;
flash.ui.Keyboard.DOM_VK_KANJI = 25;
flash.ui.Keyboard.DOM_VK_CONVERT = 28;
flash.ui.Keyboard.DOM_VK_NONCONVERT = 29;
flash.ui.Keyboard.DOM_VK_ACEPT = 30;
flash.ui.Keyboard.DOM_VK_MODECHANGE = 31;
flash.ui.Keyboard.DOM_VK_SELECT = 41;
flash.ui.Keyboard.DOM_VK_PRINT = 42;
flash.ui.Keyboard.DOM_VK_EXECUTE = 43;
flash.ui.Keyboard.DOM_VK_SLEEP = 95;
flash.utils.Endian.BIG_ENDIAN = "bigEndian";
flash.utils.Endian.LITTLE_ENDIAN = "littleEndian";
flash.utils.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
openfl.display.OpenGLView.CONTEXT_LOST = "glcontextlost";
openfl.display.OpenGLView.CONTEXT_RESTORED = "glcontextrestored";
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
openfl.gl.GL.DEPTH_BUFFER_BIT = 256;
openfl.gl.GL.STENCIL_BUFFER_BIT = 1024;
openfl.gl.GL.COLOR_BUFFER_BIT = 16384;
openfl.gl.GL.POINTS = 0;
openfl.gl.GL.LINES = 1;
openfl.gl.GL.LINE_LOOP = 2;
openfl.gl.GL.LINE_STRIP = 3;
openfl.gl.GL.TRIANGLES = 4;
openfl.gl.GL.TRIANGLE_STRIP = 5;
openfl.gl.GL.TRIANGLE_FAN = 6;
openfl.gl.GL.ZERO = 0;
openfl.gl.GL.ONE = 1;
openfl.gl.GL.SRC_COLOR = 768;
openfl.gl.GL.ONE_MINUS_SRC_COLOR = 769;
openfl.gl.GL.SRC_ALPHA = 770;
openfl.gl.GL.ONE_MINUS_SRC_ALPHA = 771;
openfl.gl.GL.DST_ALPHA = 772;
openfl.gl.GL.ONE_MINUS_DST_ALPHA = 773;
openfl.gl.GL.DST_COLOR = 774;
openfl.gl.GL.ONE_MINUS_DST_COLOR = 775;
openfl.gl.GL.SRC_ALPHA_SATURATE = 776;
openfl.gl.GL.FUNC_ADD = 32774;
openfl.gl.GL.BLEND_EQUATION = 32777;
openfl.gl.GL.BLEND_EQUATION_RGB = 32777;
openfl.gl.GL.BLEND_EQUATION_ALPHA = 34877;
openfl.gl.GL.FUNC_SUBTRACT = 32778;
openfl.gl.GL.FUNC_REVERSE_SUBTRACT = 32779;
openfl.gl.GL.BLEND_DST_RGB = 32968;
openfl.gl.GL.BLEND_SRC_RGB = 32969;
openfl.gl.GL.BLEND_DST_ALPHA = 32970;
openfl.gl.GL.BLEND_SRC_ALPHA = 32971;
openfl.gl.GL.CONSTANT_COLOR = 32769;
openfl.gl.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
openfl.gl.GL.CONSTANT_ALPHA = 32771;
openfl.gl.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
openfl.gl.GL.BLEND_COLOR = 32773;
openfl.gl.GL.ARRAY_BUFFER = 34962;
openfl.gl.GL.ELEMENT_ARRAY_BUFFER = 34963;
openfl.gl.GL.ARRAY_BUFFER_BINDING = 34964;
openfl.gl.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
openfl.gl.GL.STREAM_DRAW = 35040;
openfl.gl.GL.STATIC_DRAW = 35044;
openfl.gl.GL.DYNAMIC_DRAW = 35048;
openfl.gl.GL.BUFFER_SIZE = 34660;
openfl.gl.GL.BUFFER_USAGE = 34661;
openfl.gl.GL.CURRENT_VERTEX_ATTRIB = 34342;
openfl.gl.GL.FRONT = 1028;
openfl.gl.GL.BACK = 1029;
openfl.gl.GL.FRONT_AND_BACK = 1032;
openfl.gl.GL.CULL_FACE = 2884;
openfl.gl.GL.BLEND = 3042;
openfl.gl.GL.DITHER = 3024;
openfl.gl.GL.STENCIL_TEST = 2960;
openfl.gl.GL.DEPTH_TEST = 2929;
openfl.gl.GL.SCISSOR_TEST = 3089;
openfl.gl.GL.POLYGON_OFFSET_FILL = 32823;
openfl.gl.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
openfl.gl.GL.SAMPLE_COVERAGE = 32928;
openfl.gl.GL.NO_ERROR = 0;
openfl.gl.GL.INVALID_ENUM = 1280;
openfl.gl.GL.INVALID_VALUE = 1281;
openfl.gl.GL.INVALID_OPERATION = 1282;
openfl.gl.GL.OUT_OF_MEMORY = 1285;
openfl.gl.GL.CW = 2304;
openfl.gl.GL.CCW = 2305;
openfl.gl.GL.LINE_WIDTH = 2849;
openfl.gl.GL.ALIASED_POINT_SIZE_RANGE = 33901;
openfl.gl.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
openfl.gl.GL.CULL_FACE_MODE = 2885;
openfl.gl.GL.FRONT_FACE = 2886;
openfl.gl.GL.DEPTH_RANGE = 2928;
openfl.gl.GL.DEPTH_WRITEMASK = 2930;
openfl.gl.GL.DEPTH_CLEAR_VALUE = 2931;
openfl.gl.GL.DEPTH_FUNC = 2932;
openfl.gl.GL.STENCIL_CLEAR_VALUE = 2961;
openfl.gl.GL.STENCIL_FUNC = 2962;
openfl.gl.GL.STENCIL_FAIL = 2964;
openfl.gl.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
openfl.gl.GL.STENCIL_PASS_DEPTH_PASS = 2966;
openfl.gl.GL.STENCIL_REF = 2967;
openfl.gl.GL.STENCIL_VALUE_MASK = 2963;
openfl.gl.GL.STENCIL_WRITEMASK = 2968;
openfl.gl.GL.STENCIL_BACK_FUNC = 34816;
openfl.gl.GL.STENCIL_BACK_FAIL = 34817;
openfl.gl.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
openfl.gl.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
openfl.gl.GL.STENCIL_BACK_REF = 36003;
openfl.gl.GL.STENCIL_BACK_VALUE_MASK = 36004;
openfl.gl.GL.STENCIL_BACK_WRITEMASK = 36005;
openfl.gl.GL.VIEWPORT = 2978;
openfl.gl.GL.SCISSOR_BOX = 3088;
openfl.gl.GL.COLOR_CLEAR_VALUE = 3106;
openfl.gl.GL.COLOR_WRITEMASK = 3107;
openfl.gl.GL.UNPACK_ALIGNMENT = 3317;
openfl.gl.GL.PACK_ALIGNMENT = 3333;
openfl.gl.GL.MAX_TEXTURE_SIZE = 3379;
openfl.gl.GL.MAX_VIEWPORT_DIMS = 3386;
openfl.gl.GL.SUBPIXEL_BITS = 3408;
openfl.gl.GL.RED_BITS = 3410;
openfl.gl.GL.GREEN_BITS = 3411;
openfl.gl.GL.BLUE_BITS = 3412;
openfl.gl.GL.ALPHA_BITS = 3413;
openfl.gl.GL.DEPTH_BITS = 3414;
openfl.gl.GL.STENCIL_BITS = 3415;
openfl.gl.GL.POLYGON_OFFSET_UNITS = 10752;
openfl.gl.GL.POLYGON_OFFSET_FACTOR = 32824;
openfl.gl.GL.TEXTURE_BINDING_2D = 32873;
openfl.gl.GL.SAMPLE_BUFFERS = 32936;
openfl.gl.GL.SAMPLES = 32937;
openfl.gl.GL.SAMPLE_COVERAGE_VALUE = 32938;
openfl.gl.GL.SAMPLE_COVERAGE_INVERT = 32939;
openfl.gl.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
openfl.gl.GL.DONT_CARE = 4352;
openfl.gl.GL.FASTEST = 4353;
openfl.gl.GL.NICEST = 4354;
openfl.gl.GL.GENERATE_MIPMAP_HINT = 33170;
openfl.gl.GL.BYTE = 5120;
openfl.gl.GL.UNSIGNED_BYTE = 5121;
openfl.gl.GL.SHORT = 5122;
openfl.gl.GL.UNSIGNED_SHORT = 5123;
openfl.gl.GL.INT = 5124;
openfl.gl.GL.UNSIGNED_INT = 5125;
openfl.gl.GL.FLOAT = 5126;
openfl.gl.GL.DEPTH_COMPONENT = 6402;
openfl.gl.GL.ALPHA = 6406;
openfl.gl.GL.RGB = 6407;
openfl.gl.GL.RGBA = 6408;
openfl.gl.GL.LUMINANCE = 6409;
openfl.gl.GL.LUMINANCE_ALPHA = 6410;
openfl.gl.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
openfl.gl.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
openfl.gl.GL.UNSIGNED_SHORT_5_6_5 = 33635;
openfl.gl.GL.FRAGMENT_SHADER = 35632;
openfl.gl.GL.VERTEX_SHADER = 35633;
openfl.gl.GL.MAX_VERTEX_ATTRIBS = 34921;
openfl.gl.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
openfl.gl.GL.MAX_VARYING_VECTORS = 36348;
openfl.gl.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
openfl.gl.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
openfl.gl.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
openfl.gl.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
openfl.gl.GL.SHADER_TYPE = 35663;
openfl.gl.GL.DELETE_STATUS = 35712;
openfl.gl.GL.LINK_STATUS = 35714;
openfl.gl.GL.VALIDATE_STATUS = 35715;
openfl.gl.GL.ATTACHED_SHADERS = 35717;
openfl.gl.GL.ACTIVE_UNIFORMS = 35718;
openfl.gl.GL.ACTIVE_ATTRIBUTES = 35721;
openfl.gl.GL.SHADING_LANGUAGE_VERSION = 35724;
openfl.gl.GL.CURRENT_PROGRAM = 35725;
openfl.gl.GL.NEVER = 512;
openfl.gl.GL.LESS = 513;
openfl.gl.GL.EQUAL = 514;
openfl.gl.GL.LEQUAL = 515;
openfl.gl.GL.GREATER = 516;
openfl.gl.GL.NOTEQUAL = 517;
openfl.gl.GL.GEQUAL = 518;
openfl.gl.GL.ALWAYS = 519;
openfl.gl.GL.KEEP = 7680;
openfl.gl.GL.REPLACE = 7681;
openfl.gl.GL.INCR = 7682;
openfl.gl.GL.DECR = 7683;
openfl.gl.GL.INVERT = 5386;
openfl.gl.GL.INCR_WRAP = 34055;
openfl.gl.GL.DECR_WRAP = 34056;
openfl.gl.GL.VENDOR = 7936;
openfl.gl.GL.RENDERER = 7937;
openfl.gl.GL.VERSION = 7938;
openfl.gl.GL.NEAREST = 9728;
openfl.gl.GL.LINEAR = 9729;
openfl.gl.GL.NEAREST_MIPMAP_NEAREST = 9984;
openfl.gl.GL.LINEAR_MIPMAP_NEAREST = 9985;
openfl.gl.GL.NEAREST_MIPMAP_LINEAR = 9986;
openfl.gl.GL.LINEAR_MIPMAP_LINEAR = 9987;
openfl.gl.GL.TEXTURE_MAG_FILTER = 10240;
openfl.gl.GL.TEXTURE_MIN_FILTER = 10241;
openfl.gl.GL.TEXTURE_WRAP_S = 10242;
openfl.gl.GL.TEXTURE_WRAP_T = 10243;
openfl.gl.GL.TEXTURE_2D = 3553;
openfl.gl.GL.TEXTURE = 5890;
openfl.gl.GL.TEXTURE_CUBE_MAP = 34067;
openfl.gl.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
openfl.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
openfl.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
openfl.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
openfl.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
openfl.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
openfl.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
openfl.gl.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
openfl.gl.GL.TEXTURE0 = 33984;
openfl.gl.GL.TEXTURE1 = 33985;
openfl.gl.GL.TEXTURE2 = 33986;
openfl.gl.GL.TEXTURE3 = 33987;
openfl.gl.GL.TEXTURE4 = 33988;
openfl.gl.GL.TEXTURE5 = 33989;
openfl.gl.GL.TEXTURE6 = 33990;
openfl.gl.GL.TEXTURE7 = 33991;
openfl.gl.GL.TEXTURE8 = 33992;
openfl.gl.GL.TEXTURE9 = 33993;
openfl.gl.GL.TEXTURE10 = 33994;
openfl.gl.GL.TEXTURE11 = 33995;
openfl.gl.GL.TEXTURE12 = 33996;
openfl.gl.GL.TEXTURE13 = 33997;
openfl.gl.GL.TEXTURE14 = 33998;
openfl.gl.GL.TEXTURE15 = 33999;
openfl.gl.GL.TEXTURE16 = 34000;
openfl.gl.GL.TEXTURE17 = 34001;
openfl.gl.GL.TEXTURE18 = 34002;
openfl.gl.GL.TEXTURE19 = 34003;
openfl.gl.GL.TEXTURE20 = 34004;
openfl.gl.GL.TEXTURE21 = 34005;
openfl.gl.GL.TEXTURE22 = 34006;
openfl.gl.GL.TEXTURE23 = 34007;
openfl.gl.GL.TEXTURE24 = 34008;
openfl.gl.GL.TEXTURE25 = 34009;
openfl.gl.GL.TEXTURE26 = 34010;
openfl.gl.GL.TEXTURE27 = 34011;
openfl.gl.GL.TEXTURE28 = 34012;
openfl.gl.GL.TEXTURE29 = 34013;
openfl.gl.GL.TEXTURE30 = 34014;
openfl.gl.GL.TEXTURE31 = 34015;
openfl.gl.GL.ACTIVE_TEXTURE = 34016;
openfl.gl.GL.REPEAT = 10497;
openfl.gl.GL.CLAMP_TO_EDGE = 33071;
openfl.gl.GL.MIRRORED_REPEAT = 33648;
openfl.gl.GL.FLOAT_VEC2 = 35664;
openfl.gl.GL.FLOAT_VEC3 = 35665;
openfl.gl.GL.FLOAT_VEC4 = 35666;
openfl.gl.GL.INT_VEC2 = 35667;
openfl.gl.GL.INT_VEC3 = 35668;
openfl.gl.GL.INT_VEC4 = 35669;
openfl.gl.GL.BOOL = 35670;
openfl.gl.GL.BOOL_VEC2 = 35671;
openfl.gl.GL.BOOL_VEC3 = 35672;
openfl.gl.GL.BOOL_VEC4 = 35673;
openfl.gl.GL.FLOAT_MAT2 = 35674;
openfl.gl.GL.FLOAT_MAT3 = 35675;
openfl.gl.GL.FLOAT_MAT4 = 35676;
openfl.gl.GL.SAMPLER_2D = 35678;
openfl.gl.GL.SAMPLER_CUBE = 35680;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
openfl.gl.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
openfl.gl.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
openfl.gl.GL.POINT_SPRITE = 34913;
openfl.gl.GL.COMPILE_STATUS = 35713;
openfl.gl.GL.LOW_FLOAT = 36336;
openfl.gl.GL.MEDIUM_FLOAT = 36337;
openfl.gl.GL.HIGH_FLOAT = 36338;
openfl.gl.GL.LOW_INT = 36339;
openfl.gl.GL.MEDIUM_INT = 36340;
openfl.gl.GL.HIGH_INT = 36341;
openfl.gl.GL.FRAMEBUFFER = 36160;
openfl.gl.GL.RENDERBUFFER = 36161;
openfl.gl.GL.RGBA4 = 32854;
openfl.gl.GL.RGB5_A1 = 32855;
openfl.gl.GL.RGB565 = 36194;
openfl.gl.GL.DEPTH_COMPONENT16 = 33189;
openfl.gl.GL.STENCIL_INDEX = 6401;
openfl.gl.GL.STENCIL_INDEX8 = 36168;
openfl.gl.GL.DEPTH_STENCIL = 34041;
openfl.gl.GL.RENDERBUFFER_WIDTH = 36162;
openfl.gl.GL.RENDERBUFFER_HEIGHT = 36163;
openfl.gl.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
openfl.gl.GL.RENDERBUFFER_RED_SIZE = 36176;
openfl.gl.GL.RENDERBUFFER_GREEN_SIZE = 36177;
openfl.gl.GL.RENDERBUFFER_BLUE_SIZE = 36178;
openfl.gl.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
openfl.gl.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
openfl.gl.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
openfl.gl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
openfl.gl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
openfl.gl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
openfl.gl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
openfl.gl.GL.COLOR_ATTACHMENT0 = 36064;
openfl.gl.GL.DEPTH_ATTACHMENT = 36096;
openfl.gl.GL.STENCIL_ATTACHMENT = 36128;
openfl.gl.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
openfl.gl.GL.NONE = 0;
openfl.gl.GL.FRAMEBUFFER_COMPLETE = 36053;
openfl.gl.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
openfl.gl.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
openfl.gl.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
openfl.gl.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
openfl.gl.GL.FRAMEBUFFER_BINDING = 36006;
openfl.gl.GL.RENDERBUFFER_BINDING = 36007;
openfl.gl.GL.MAX_RENDERBUFFER_SIZE = 34024;
openfl.gl.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
openfl.gl.GL.UNPACK_FLIP_Y_WEBGL = 37440;
openfl.gl.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
openfl.gl.GL.CONTEXT_LOST_WEBGL = 37442;
openfl.gl.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
openfl.gl.GL.BROWSER_DEFAULT_WEBGL = 37444;
ApplicationMain.main();
})();
