package GaiaSoulServer.GaiaSouls;

public class User {

	private long id;
	private String nickname;
	private int elemento;
	private int puntuacion;
	private int idle;

	public User() {
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
	
	public int idleTime() {
		return idle;
	}
	
	public int increaseIdle() {
		return ++idle;
	}
	
	public int resetIdle() {
		idle = 0;
		return 0;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", nickname=" + nickname + ", elemento=" + elemento + ", puntuacion=" + puntuacion + "]";
	}

}
