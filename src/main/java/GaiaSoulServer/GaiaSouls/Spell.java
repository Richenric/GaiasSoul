package GaiaSoulServer.GaiaSouls;

public class Spell {
	private float x,y;
	private short type; // 0 proyectil, 1 zonal, 2 escudo
	
	public Spell () {
		this.x = 0;
		this.y = 0;
		this.type = 3;
	}
	public Spell (float x,float y,short type) {
		this.x = x;
		this.y = y;
		this.type = type;
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
	public void setX(float x) {
		this.x = x;
	}
	public void setY(float y) {
		this.y = y;
	}
	public void setType(short type) {
		this.type = type;
	}
}
