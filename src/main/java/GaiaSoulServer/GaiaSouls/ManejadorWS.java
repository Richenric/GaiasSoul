package GaiaSoulServer.GaiaSouls;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import GaiaSoulServer.GaiaSouls.Player;
import GaiaSoulServer.GaiaSouls.UserController;

public class ManejadorWS extends TextWebSocketHandler{

	private ObjectMapper mapper = new ObjectMapper();
	
	private static Map<Long, Player> playersOnline = new ConcurrentHashMap<Long,Player>();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		//System.out.println("Message received: " + message.getPayload());
		//ConcurrentHashMap<Integer,TextMessage> sessions = new ConcurrentHashMap<Integer,TextMessage>();
		//tipo.peticion, x,y,def, array habilidades
		
		JsonNode node = mapper.readTree(message.getPayload());
		int typePeticion = node.get("typePeticion").asInt();
		long pId = Long.parseLong(session.getId()); //Id de la session
		
		
		switch(typePeticion) {
			case 0://cliente first conection
				int x = node.get("x").asInt();
				int y = node.get("y").asInt();
				String tag = node.get("tag").asText();
				int elemento = node.get("elemento").asInt();
				playersOnline.put(pId, new Player(x,y,tag,elemento, pId));
				break;
			case 1: //cliente pasa a servidor coord del propio player
				Player p = playersOnline.get(pId);
				p.setX(node.get("x").asInt());
				p.setY(node.get("y").asInt());
				p.setDead(node.get("isDead").asBoolean());
				p.setDefense(node.get("isDefense").asBoolean());
				List<Spell> spellArray = mapper.convertValue(node.get("habilidades"), ArrayList.class); //!!!!
				//System.out.println(spellArray.toString());
				p.setSpellArray(spellArray);
				break;
			case 2: //cliente -> array hechizos
				playersOnline.remove(pId);
				break;
			case 3: //SUMAR LA VARIABLE SCORE
				String tag1 = node.get("tag").asText();
				for (Player player : playersOnline.values()) {
					if(player.getTag() == tag1) {
						player.setScore(player.getScore()+1);
					}
				}
				break;
		}
		for (User user : UserController.users()) {
			if(user.getNickname().equals(playersOnline.get(pId).getTag())) {
				user.resetIdle();
			}
		}
		
		
		//servidor a cliente --> pos de othersplayers othersspells
		ObjectNode responseNode = mapper.createObjectNode();
		int i = 0;
		for (Player player : playersOnline.values()) {
			if(player != playersOnline.get(pId)) {
				ObjectNode playerNode = (responseNode).putObject("player" + i);
				playerNode
					.put("x", player.getX())
					.put("y", player.getY())
					.put("tag", player.getTag())
					.put("elemento", player.getElemento())
					.put("isDead", player.isDead())
					.put("isDefense", player.isDefense())
					.set("spells",mapper.valueToTree(player.getSpellArray()));
				i++;
			}
		}
		session.sendMessage(new TextMessage(responseNode.toString()));
	}
	public static void borrarPlayer(String nickname) {
		for (Player player : playersOnline.values()) {
			if(player.getTag().equals(nickname)) {
				System.out.println("He borrado");
				playersOnline.remove(player.getPId(), player);
			}
		}
	}
	
	
}