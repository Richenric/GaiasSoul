package GaiaSoulServer.GaiaSouls;

import java.util.Collection;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class ItemsController {
	
	private static Map<Long, User> users = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	private static List<String> takenUsernames = new ArrayList<>();
	int maxPuntuacion = 0;
	
	@GetMapping
	public static Collection<User> users() {
		return users.values();
	}

	@GetMapping("/takennames") 
	public List<String> nicknamesTaken(){
		return takenUsernames;	
	} 
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public /*long*/User nuevoUser(@RequestBody User user) {
		/*
		if(takenUsernames.contains(user.getNickname())) {
			return null;
		} */
		long id = nextId.incrementAndGet();
		user.setId(id);
		users.put(id, user);
		user.resetIdle();
		takenUsernames.add(user.getNickname());
		
		return user;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User userActualizado) {
		
		User savedUser = users.get(userActualizado.getId());

		if (savedUser != null) {

			users.put(id, userActualizado);
			savedUser.resetIdle();
			if(userActualizado.getPuntuacion() > maxPuntuacion) {
				maxPuntuacion = userActualizado.getPuntuacion();
			}
			return new ResponseEntity<>(userActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			savedUser.resetIdle();
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public static ResponseEntity<User> borraUser(@PathVariable long id) {

		User savedUser = users.get(id);
		if (savedUser != null) {
			takenUsernames.remove(savedUser.getNickname());
			users.remove(savedUser.getId());
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
