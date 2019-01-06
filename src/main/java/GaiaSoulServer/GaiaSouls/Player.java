package GaiaSoulServer.GaiaSouls;
import GaiaSoulServer.GaiaSouls.Spell;

import java.util.ArrayList;
import java.util.List;

public class Player {
	private float x,y;
	private List<Spell> spellArray;
	
	public Player (float x, float y,List<Spell> sa) {
		this.x = x;
		this.y = y;
		this.spellArray = sa;
	}
	public Player () {
		this.x = 0;
		this.y = 0;
		this.spellArray = new ArrayList<Spell>();
	}
	public float getX() {
		return this.x;
	}
	public float getY() {
		return this.y;
	}
	public List<Spell> getSpellArray(){
		return this.spellArray;
	}
	public void setX(float x) {
		this.x = x;
	}
	public void setY(float y) {
		this.y = y;
	}
	public void setSpellArray(List<Spell> sa) {
		this.spellArray = sa;
	}
}
