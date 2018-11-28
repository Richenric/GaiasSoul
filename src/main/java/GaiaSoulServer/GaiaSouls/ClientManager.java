package GaiaSoulServer.GaiaSouls;

import java.util.Stack;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public class ClientManager {
	private static ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
	private static boolean initialized = false;
	private static final int maxIdleAllowed = 2;
	private static final int updateWaitTime = 5000;
	
	public static void initialize() {
		if(initialized) {
			System.out.println("ILLO PESAO QUE YA SE HA INISIAO!");
			return;
		}
		
		initialized = true;
		
		scheduler.scheduleWithFixedDelay(() -> {
			Stack<User> disconnect = new Stack<>();
			for(User user : UserController.users()) {
				user.increaseIdle();
				if(user.idleTime() > maxIdleAllowed) {
					disconnect.push(user);
				}
			}
			
			while (!disconnect.empty()) {
				UserController.borraUser(disconnect.pop().getId());
			}

		},
		updateWaitTime, updateWaitTime, TimeUnit.MILLISECONDS);
	}
}
