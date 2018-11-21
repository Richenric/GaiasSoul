package GaiaSoulServer.GaiaSouls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

@SpringBootApplication
public class MainApplication {
	public static void main(String[] args) throws FileNotFoundException {
		SpringApplication.run(MainApplication.class, args);
	}
}
