package ld28.display;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import flash.geom.Vector3D;
import ld28.utils.Color;
import ld28.core.IDrawable;
import ld28.core.Texture;
import ld28.Scene;
import ld28.shaders.Basic2DShader;
import ld28.shaders.ShaderManager;
import ld28.core.Program;
import ld28.shaders.SpriteBatch2DShader;
import openfl.gl.GL;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;
import ld28.core.Mesh;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject implements IDrawable
{
	public var x : Float;
	public var y : Float;
	
	public var rotation : Float;
	
	public var scaleX : Float;
	public var scaleY : Float;
	
	public var pivotX : Float;
	public var pivotY : Float;
	
	public var width(get_width, null):Float;
	public var height(get_height, null):Float;
	
	public var color : Color;
	
	public var alpha : Float;
	
	public var parent : DisplayObjectContainer;
	
	var mesh : Mesh;
	var program : Program;
	
	var transform : Matrix3D;
	
	var vtxPosAttr : Int;
	
	var projectionMatrixUniform : GLUniformLocation;
	var modelViewMatrixUniform : GLUniformLocation;
	var colorUniform : GLUniformLocation;

	public function new(_mesh : Mesh, _program : Program = null) 
	{
		mesh = _mesh;
		
		x = 0;
		y = 0;
		
		rotation = 0;
		
		scaleX = 1;
		scaleY = 1;
		
		pivotX = 0;
		pivotY = 0;
		
		alpha = 1;
		
		color = new Color(0xffffff);
		transform = new Matrix3D();
		
		if (_program == null)
			_program = ShaderManager.get().program(Basic2DShader);
		program = _program;
		
		program.use();
		initAttributes();
		initUniforms();
		program.release();
	}
	
	function initAttributes() 
	{
		vtxPosAttr = GL.getAttribLocation(program.program, "vertexPosition");
	}
	
	function initUniforms() 
	{
		projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		modelViewMatrixUniform = GL.getUniformLocation(program.program, "modelViewMatrix");
		colorUniform = GL.getUniformLocation(program.program, "vertexColor");
	}
	
	public function getTransform() : Matrix3D
	{
		return transform;
	}
	
	public function getMesh() : Mesh
	{
		return mesh;
	}
	
	public function draw(scene : Scene)
	{
		initRender(scene);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 2, GL.FLOAT, false, 0, 0);
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, mesh.getIndexBuffer());
		
		GL.drawElements(GL.TRIANGLES, mesh.indexes.length, GL.UNSIGNED_SHORT, 0);
		
		endDraw();
	}
	
	private function updateMatrix() 
	{
		transform.identity();
		
		transform.appendTranslation( -pivotX, -pivotY, 0);
		transform.appendRotation(rotation, Vector3D.Z_AXIS);
		transform.appendScale(scaleX, scaleY, 1);
		transform.appendTranslation(x, y, 0);
		
		if (parent != null)
			transform.append(parent.getTransform());
	}
	
	function initRender(scene : Scene)
	{
		updateMatrix();
		
		program.use();
		
		GL.blendFunc(GL.ONE, GL.ONE_MINUS_SRC_ALPHA);
		GL.enable(GL.BLEND);
		GL.disable(GL.DEPTH_TEST);
		
		GL.enableVertexAttribArray(vtxPosAttr);
		
		GL.uniformMatrix3D(projectionMatrixUniform, false, scene.projectionMatrix);
		GL.uniformMatrix3D(modelViewMatrixUniform, false, transform);
		GL.uniform4f(colorUniform, color.r, color.g, color.b, color.a);
	}
	
	function endDraw():Void 
	{
		GL.disable(GL.BLEND);
		GL.disableVertexAttribArray(vtxPosAttr);
		
		program.release();
	}
	
	function get_width():Float 
	{
		return mesh.boundingBox.get2D().width * scaleX;
	}
	
	function get_height():Float 
	{
		return mesh.boundingBox.get2D().height * scaleY;
	}
}