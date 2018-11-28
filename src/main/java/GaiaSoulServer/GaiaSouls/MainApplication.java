package GaiaSoulServer.GaiaSouls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@SpringBootApplication
public class MainApplication {

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
}
