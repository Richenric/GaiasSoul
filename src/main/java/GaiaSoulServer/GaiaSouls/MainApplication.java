package GaiaSoulServer.GaiaSouls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.BufferedReader;
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
			
			BufferedReader br = new BufferedReader(new FileReader("maxpuntuacion.txt")); 
			UserController.setMaxScore(Integer.parseInt(br.readLine()));
			br.close();
			
		
		}catch(UnknownHostException e){
			e.printStackTrace();
		}
		ClientManager.initialize();
	}
}
