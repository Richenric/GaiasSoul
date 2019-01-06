package GaiaSoulServer.GaiaSouls;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import GaiaSoulServer.GaiaSouls.Player;

public class ManejadorWS extends TextWebSocketHandler{
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private Map<Long, Player> playersOnline = new ConcurrentHashMap<Long,Player>();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		//ConcurrentHashMap<Integer,TextMessage> sessions = new ConcurrentHashMap<Integer,TextMessage>();
		//tipo.peticion, x,y,def, array habilidades
		JsonNode node = mapper.readTree(message.getPayload());
		int typePeticion = node.get("typePeticion").asInt();
		
		switch(typePeticion) {
			case 0://cliente first conection
				int x = node.get("x").asInt();
				int y = node.get("y").asInt();
				String tag = node.get("tag").asText();
				int elemento = node.get("elemento").asInt();
				playersOnline.put(Long.parseLong(session.getId()), new Player(x,y,tag,elemento));
				break;
			case 1: //cliente pasa a servidor coord del propio player
				int x1 = node.get("x").asInt();
				int y1 = node.get("y").asInt();
				Player p = playersOnline.get(Long.parseLong(session.getId()));
				p.setX(x1);
				p.setY(y1);
				break;
			case 2: //cliente -> array hechizos
				String aHechizos = node.get("arrayHechizos").asText();
				break;
			case 3:
				break;
			case 4:
				break;
		}
		//servidor a cliente --> pos de othersplayers othersspells
		
		ObjectNode responseNode = mapper.createObjectNode(); /*
		int i = 0;
		for (Player player : playersOnline.values()) {
			responseNode.put("otherP" + i, player.toString());
		} */
		responseNode.put("otherPlayerArray", playersOnline.values().toString());
		//System.out.println("Message sent: " + responseNode.toString());
		
		session.sendMessage(new TextMessage(responseNode.toString()));
	}
}
