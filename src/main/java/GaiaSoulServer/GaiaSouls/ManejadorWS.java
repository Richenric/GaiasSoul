package GaiaSoulServer.GaiaSouls;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonPointer;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.core.JsonParser.NumberType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;
import com.fasterxml.jackson.databind.node.JsonNodeType;
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
		long pId = Long.parseLong(session.getId()); //Id de la session
		
		switch(typePeticion) {
			case 0://cliente first conection
				int x = node.get("x").asInt();
				int y = node.get("y").asInt();
				String tag = node.get("tag").toString();
				int elemento = node.get("elemento").asInt();
				playersOnline.put(pId, new Player(x,y,tag,elemento));
				break;
			case 1: //cliente pasa a servidor coord del propio player
				Player p = playersOnline.get(pId);
				p.setX(node.get("x").asInt());
				p.setY(node.get("y").asInt());
				p.setDead(node.get("isDead").asBoolean());
				p.setDefense(node.get("isDefense").asBoolean());
				break;
			case 2: //cliente -> array hechizos
				String aHechizos = node.get("arrayHechizos").asText();
				break;
			case 3: //SUMAR LA VARIABLE SCORE
				String tag1 = node.get("tag").toString();
				for (Player player : playersOnline.values()) {
					if(player.getTag() == tag1) {
						player.setScore(player.getScore()+1);
					}
				}
				break;
			case 4:
				break;
		}
		//servidor a cliente --> pos de othersplayers othersspells
		//ObjectNode responseNode = mapper.createObjectNode();
		ObjectNode []arrayaux = new ObjectNode [20];
		int i = 0;
		for (Player player : playersOnline.values()) {
			if(player != playersOnline.get(pId)) {
				//responseNode.arrayNode(20);
				//ObjectNode auxNode = (responseNode).a
				ObjectNode playerNode = mapper.createObjectNode();
				playerNode
					.put("x", player.getX())
					.put("y", player.getY())
					.put("tag", player.getTag())
					.put("elemento", player.getElemento())
					.put("isDead", player.isDead())
					.put("isDefense", player.isDefense());
				arrayaux[i] = playerNode;
				i++;
			}
		}
		session.sendMessage(new TextMessage(arrayaux.toString()));
	}
}
