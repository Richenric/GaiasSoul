package GaiaSoulServer.GaiaSouls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.FileNotFoundException;
import javax.servlet.http.HttpServletRequest;

//import java.io.PrintWriter;

@SpringBootApplication
public class MainApplication {

	public static void main(String[] args) throws FileNotFoundException {
		SpringApplication.run(MainApplication.class, args);
		
		InetAddress ip;
		String hostaddress;
		try {
			ip = InetAddress.getLocalHost();
			hostaddress = ip.getHostAddress();
			System.out.println("The ip address: " + ip);
			System.out.println("hostaddress: " + hostaddress);
			
			/*
			try(PrintWriter out = new PrintWriter("address.txt")){
				out.println(hostaddress);
			}catch(FileNotFoundException w){
				
			} */
			
		
		}catch(UnknownHostException e){
			e.printStackTrace();
		}
		ClientManager.initialize();
	}
}
