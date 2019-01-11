package GaiaSoulServer.GaiaSouls;

public class Spell {
	private float x;
	private float y;
	private short type; // 0 proyectil, 1 zonal, 2 escudo
	private String tag;
	private int elemento;
	
	public Spell () {
		this.x = 0;
		this.y = 0;
		this.type = 3;
		this.tag = "";
		this.elemento = 5;
	}
	public Spell (float x,float y,short type,String tag,int elemento) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.tag = tag;
		this.elemento = elemento;
	}
	
	public float getX() {
		return this.x;
	}
	public float getY() {
		return this.y;
	}
	public float getType() {
		return this.type;
	}
	public String getTag() {
		return this.tag;
	}
	public int getElemento() {
		return this.elemento;
	}
	public void setX(float x) {
		this.x = x;
	}
	public void setY(float y) {
		this.y = y;
	}
	public void setType(short type) {
		this.type = type;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public void setElemento(int elemento) {
		this.elemento = elemento;
	}
}
