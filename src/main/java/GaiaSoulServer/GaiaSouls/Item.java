package GaiaSoulServer.GaiaSouls;

public class Item {

	private long id;
	private String nickname;
	private int elemento;
	private int puntuacion;

	public Item() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getElemento() {
		return elemento;
	}

	public void setElemento(int elemento) {
		this.elemento = elemento;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", nickname=" + nickname + ", elemento=" + elemento + ", puntuacion=" + puntuacion + "]";
	}

}
