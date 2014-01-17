package ld28;
import flash.geom.Matrix;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import flash.geom.Vector3D;
import ld28.shaders.BasicShader;
import ld28.core.Program;
import openfl.gl.GL;
import openfl.gl.GLUniformLocation;
import openfl.utils.Float32Array;
import ld28.core.IDrawable;
import ld28.core.Texture;


/**
 * ...
 * @author Thomas BAUDON
 */
class Model implements IDrawable
{
	public var program : Program;
	
	public var position : Vector3D;
	public var rotation : Vector3D;
	public var scale : Vector3D;
	
	public var pivotPoint : Vector3D;
	
	var mesh : Mesh;
	var texture : Texture;
	
	var transform : Matrix3D;
	var texCoordtransform : Float32Array;
	
	var vtxPosAttr : Int;
	var texCoordAttr : Int;
	
	var projectionMatrixUniform : GLUniformLocation;
	var modelViewMatrixUniform : GLUniformLocation;
	
	var imageUniform : GLUniformLocation;
	var texCoordMatrixUniform : GLUniformLocation;

	var textureRegion : Rectangle;

	public function new(_mesh : Mesh, _texture : Texture, _textuRegion : Rectangle = null, _program : Program = null) 
	{
		mesh = _mesh;
		texture = _texture;
		transform = new Matrix3D();
		
		position = new Vector3D();
		rotation = new Vector3D();
		pivotPoint = new Vector3D();
		
		scale = new Vector3D(1, 1, 1);
		
		if (_program == null)
			_program = ShaderManager.get().program(BasicShader);
		program = _program;
		
		GL.useProgram(program.program);
		initAttributes();
		initUniforms();
		
		if (_textuRegion == null)
			_textuRegion = new Rectangle(0, 0, texture.width, texture.height);
		textureRegion = _textuRegion;
		
		texCoordtransform = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
		
		setTextureRegion(textureRegion);
	}
	
	function initAttributes() 
	{
		vtxPosAttr = GL.getAttribLocation(program.program, "vertexPosition");
		texCoordAttr = GL.getAttribLocation(program.program, "aTexCoord");
	}
	
	function initUniforms() 
	{
		projectionMatrixUniform = GL.getUniformLocation(program.program, "projectionMatrix");
		modelViewMatrixUniform = GL.getUniformLocation(program.program, "modelViewMatrix");

		imageUniform = GL.getUniformLocation(program.program, "uImage0");
		texCoordMatrixUniform = GL.getUniformLocation(program.program, "texCoordMatrix");
	}
	
	public function getModelMatrix() : Matrix3D
	{
		return transform;
	}
	
	public function getTexCoordTransform() : Float32Array
	{
		return texCoordtransform;
	}
	
	public function getMesh() : Mesh
	{
		return mesh;
	}
	
	public function setTextureRegion(region : Rectangle) 
	{
		textureRegion = region;
		
		texCoordtransform[0] = textureRegion.width / texture.width;
		texCoordtransform[2] = textureRegion.x / texture.width;
		texCoordtransform[4] = textureRegion.height / texture.height;
		texCoordtransform[5] = textureRegion.y / texture.height;
	}
	
	public function draw(scene : Scene)
	{
		updateMatrix();
		
		program.use();
		
		GL.enableVertexAttribArray(vtxPosAttr);
		GL.enableVertexAttribArray(texCoordAttr);
		
		GL.uniformMatrix3D(projectionMatrixUniform, false, scene.projectionMatrix);
		GL.uniformMatrix3D(modelViewMatrixUniform, false, transform);
		GL.uniform1i(imageUniform, 0);
		GL.uniformMatrix3fv(texCoordMatrixUniform, false, texCoordtransform);
		
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getBuffer());
		GL.vertexAttribPointer (vtxPosAttr, 3, GL.FLOAT, false, 0, 0);
		
		GL.bindBuffer (GL.ARRAY_BUFFER, mesh.getTextCoord());
		GL.vertexAttribPointer (texCoordAttr, 2, GL.FLOAT, false, 0, 0);
			
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, mesh.getIndexBuffer());
		
		GL.drawElements(GL.TRIANGLES, mesh.indexes.length, GL.UNSIGNED_SHORT, 0);
	}
	
	public function updateMatrix() 
	{
		transform.identity();
		transform.appendTranslation( -pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
		transform.appendRotation(rotation.w, rotation);
		transform.appendScale(scale.x, scale.y, scale.z);
		transform.appendTranslation(position.x, position.y, position.z);
		transform.appendTranslation( pivotPoint.x, pivotPoint.y, pivotPoint.z);
	}
	
}