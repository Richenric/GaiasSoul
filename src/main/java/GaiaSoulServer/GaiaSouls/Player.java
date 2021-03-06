package GaiaSoulServer.GaiaSouls;
import GaiaSoulServer.GaiaSouls.Spell;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public class Player {
	private int x,y,elemento,score;
	private boolean isDead, isDefense;
	private String tag;
	private List<Spell> spellArray;
	private long pId;
	
	public Player (int x, int y, String tag, int elemento, long pId) {
		this.x = x;
		this.y = y;
		this.score = 0;
		this.isDead = false;
		this.isDefense = false;
		this.tag = tag; //nickname
		this.elemento = elemento;
		this.pId = pId;
		this.spellArray = new ArrayList<Spell>();
	}
	public Player () {
		this.x = 0;
		this.y = 0;
		this.score = 0;
		this.isDead = false;
		this.isDefense = false;
		this.tag = ""; //nickname
		this.elemento = 0;
		this.spellArray = null;
	}
	public int getX() {
		return this.x;
	}
	public int getY() {
		return this.y;
	}
	public boolean isDead() {
		return isDead;
	}
	public boolean isDefense() {
		return isDefense;
	}
	public String getTag() {
		return tag;
	}
	public int getElemento() {
		return elemento;
	}
	public List<Spell> getSpellArray(){
		return spellArray;
	}
	public int getScore() {
		return score;
	}
	public long getPId() {
		return pId;
	}
	public void setX(int x) {
		this.x = x;
	}
	public void setY(int y) {
		this.y = y;
	}
	public void setDead(boolean isDead) {
		this.isDead = isDead;
	}
	public void setDefense(boolean isDefense) {
		this.isDefense = isDefense;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public void setElemento(int elemento) {
		this.elemento = elemento;
	}
	public void setSpellArray(List<Spell> sa) {
		this.spellArray = sa;
	}
	public void setScore(int score) {
		this.score = score;
	}
}
