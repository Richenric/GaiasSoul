package GaiaSoulServer.GaiaSouls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.stomp.StompSession; /////////
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@SpringBootApplication
@EnableWebSocket
public class MainApplication implements WebSocketConfigurer {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(MainApplication.class, args);
		
		InetAddress ip;
		String hostaddress;
		try {
			ip = InetAddress.getLocalHost();
			hostaddress = ip.getHostAddress();
			System.out.println("The ip address: " + ip);
			System.out.println("hostaddress: " + hostaddress);
			
			File maxpuntuacion = new File("classes/maxpuntuacion.txt");
			if(maxpuntuacion.exists()) {
				BufferedReader input = new BufferedReader (new FileReader (maxpuntuacion));
				UserController.setMaxScore(Integer.parseInt(input.readLine()));
				input.close();
			}
		
		}catch(UnknownHostException e){
			e.printStackTrace();
		}
		ClientManager.initialize();
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(onlineHandler(), "/online")
				.setAllowedOrigins("*");
	}
	
	@Bean
	public ManejadorWS onlineHandler() {
		return new ManejadorWS();
	}
	
}
