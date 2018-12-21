# GAIA'S SOULS 

## Descripci�n del juego
Gaia's Souls es un shooter en tercera persona 2D, en el que el personaje es un esp�ritu elemental que usa sus poderes m�gicos para combatir. 
El jugador se ver� representado por una l�grima brillante (formada por part�culas) que puede disparar, generar un ataque zonal y posee un escudo que proteje al jugador de los disparos y zonales de jugadores enemigos.

## Mec�nicas
* **Moverse:** El jugador 1 (J1) podr� desplazarse con las teclas WASD en las 4 direcciones. El jugador 2 (J2) se desplazar� con los cursores

* **Disparar:** El jugador disparar� hacia donde est� mirando el frente del esp�ritu, en otras palabras donde el jugado apunte con las teclas de movimiento pulsando la tecla asignada a disparo: (J1-> barra espaciadora/ J2-> "-")

* **Escudo:** El jugador conjurar� el escudo para defenderse, pulsando la tecla asignada (J1->"b" / J2->".").

* **Zonal:** El jugador invocar� un ataque zonal pulsando la tecla asignada al zonal (J1->"v" / J2->",").

## Din�micas
En el planteamiento inicial el jugador tiene dos modos de juego, uno online por equipos, y uno offline para dos jugadores enfrentados en un duelo. En todos ellos se cuenta con hechizos de ataque y defensa que no pueden ser usados indiscriminadamente, pues su uso se ve limitado por un enfriamiento que equilibra el uso de los m�s d�biles y los m�s potentes.

* **En el online por equipos**, se formar�n tantos equipos como elementos haya (de 2 a 4 jugadores en cada uno), los cuales tienen como objetivo luchar por la supremac�a en el escenario, con el fin de conseguir m�s puntos que los equipos enemigos. Estos puntos se consiguen b�sicamente asesinando al enemigo. La c�mara seguir� al jugador seg�n a donde se desplace.

* **En el offline**, se batir�n dos personajes en duelo en el mismo terminal, los dos poseen exactente los mismo ataques y las mismas defensas. Ganando el que consiga mayor puntuaci�n. Aqu� hay una c�mara fija con un mundo limitado por la ventana del navegador. Los controles son los nombrados arriba.

## Apartado Gr�fico
Partimos de un concept art de una idea inicial poco definida, y evolucion� hasta lo que se puede ver actualmente. En un comienzo todo iba a ser hecho a partir de "sprites" pero al final hemos utilizado part�culas. A continuaci�n, una comparaci�n entre el concept y lo que hay actualmente.
 
**Modelos de jugador**
Visual de los dos personajes del local:
> ![](https://media.discordapp.net/attachments/496417325961052203/509429848784109586/Dos_pjs.png)

y de su movimiento
> ![](https://cdn.discordapp.com/attachments/496417325961052203/509430430697521163/Personaje.gif)


**Tipos de zonales**

Concept art:
![](https://cdn.discordapp.com/attachments/453581461371486210/491670199112564750/GaiasSoul-Zonales-BG.png)

Visual actual:

> ![](https://cdn.discordapp.com/attachments/496417325961052203/509421666716090369/Zonal.gif)

**Tipos de proyectiles**

Concept art:
![](https://cdn.discordapp.com/attachments/453581461371486210/491670156683247617/GaiasSoul-Proyectiles.png)

Visual actual:

![](https://cdn.discordapp.com/attachments/496417325961052203/509421674030956572/Disparo.gif)
 
**Tipos de escudos**

Concept art inicial:
![](https://cdn.discordapp.com/attachments/453581461371486210/491670065847074827/GaiasSoul-Escudos-BG.png)

Visual actual:

>![](https://cdn.discordapp.com/attachments/496417325961052203/509421674307911700/Escudo.gif)

*todos las habilidades han sido desarrolladas para ambos jugadores aunque aqui solo se muestren las del jugador 1.

## Men�s e Interfaces de Juego
El dato persistente que hemos elegido es la m�xima puntuaci�n, al ser esta una variable interna que el jugador no podr� editar y los m�todos de asignaci�n a�n no han sido creados, utilizaremos un prompt para insertar una puntuaci�n al ejecutar la aplicaci�n.
Si la cifra introducida es mayor que la que ya hay en el txt, esta sobreescribir� a la del txt. Si la puntuaci�n introducida es menor a la del txt, ser� ignorada y se mantendr� la que ya hay en el txt.
![](https://cdn.discordapp.com/attachments/496417325961052203/517114314713202691/enterScore.png)</br>

En primer lugar mostramos los men�s de que disponemos, para m�s adelante mostrar un diagrama de navegaci�n.

**Men� Principal** </br>
Es el nexo inicial desde el que parte el juego. </br>
Desde aqu� el jugador tendr� acceso a la configuraci�n del juego, la selecci�n de moalidad de juego y una gu�a con los controles. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568719142354955/mainMenu.png) </br>

**Men� Opciones** </br>
El jugador acceder� a este men� desde el men� principal, clicando sobre el icono con un engranaje en su interior. </br>
Actualmente nos permite modificar el volumen de la m�sica de los men�s y el juego. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729422725130/optionsMenu.png) </br>

**Gu�a de Controles** </br>
El jugador acceder� a este men� desde el men� principal, clicando sobre el icono con un mando en su interior. </br>
Aqu� el jugador podr� comprobar los controles de juego. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568705938817036/controlesMenu1.png) </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568708237033472/controlesMenu2.png) </br>

**Selecci�n de Modo de Juego** </br>
Al hacer clic en el men� principal sobre el bot�n central de play, el jugador acceder� al men� de selecci�n de modo de juego, desde donde decidir� entre las dos modalidades de que se dispondr�: offline y online. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568721071865869/modoMenu.png) </br>

## Men�s e Interfaces Offline
**Selecci�n de Objetivo** </br>
Si el jugador decide jugar offline, se tendr� que enfrentar a un segundo jugador en un 1 vs 1, para lo que antes tendr� que seleccionar el objetivo de puntuaci�n que marcar� el final de la partida, y por tanto al victorioso. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568728940380160/objetivoMenu.png) </br>

**Interfaz de juego** </br>
Al principio de la partida un letrero advertir� a cada jugador de su ubicaci�n en pantalla (P1 para el jugador 1 y P2 para el jugador 2). </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729330450432/offlineGame.png) </br>
En la zona inferior de la pantalla se ver�n los iconos de cada habilidad, siendo solo utilizables cuando est�n resaltadas completamente del color del jugador. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514579787319083028/cargaDeHabilidades.gif) </br>
Entre los iconos del jugador 1 y 2 se muestra un contador de victorias. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514582704608509965/contadorVictorias.gif) </br>
Se sumar� un punto cada vez que se destruya al contrincante, y la partida finalizar� cuando cualquiera de los dos llegue a la puntuaci�n objetivo. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514584324725538816/theWinner.png) </br>
Una vez finalizada una partida, se puede empezar una nueva bajo las mismas condiciones con solo pulsar enter. </br>

**Men� Pausa** </br>
Durante la partida esta se puede poner en pausa pulsando el bot�n en forma de anillo de la esquina superior izquierda. </br>
En este men� de pausa tenemos tres posibilidades. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568733612703746/pauseMenu.png) </br>
Volver al juego clicando el bot�n play, retroceder al men� de selecci�n de objetivo para poder empezar una nueva partida, o acceder a la configuraci�n de sonido con el bot�n de engranaje. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568736972341258/pauseSoundMenu.png) </br>

## Men�s e Interfaces Online
**Login Menu** </br>
Al iniciar una partida online se le solicitar� al jugador que inserte un nombre de usuario con un m�ximo de 12 caracteres, y tendr� que clicar en el bot�n 'ok'. </br>
Hay tres situaciones que provocar�n un mensaje de alerta en rojo como se muestra en la imagen: que el servidor ya est� lleno (20 jugadores), que el nombre de usuario ya est� en uso o sea nulo, o que el servidor est� desconectado. </br>
En este men� se ha empezado a implementar que los botones cambien de color cuando el rat�n est� sobre �l. Aunque el puntero no se ve en la captura, se encuentra sobre el bot�n de retroceso, motivo por el que en vez de ser el cl�sico bot�n que hemos visto en los dem�s men�s, su interior es rojo. Del mismo modo, si el rat�n estuviera sobre el bot�n 'Ok', este se ver�a de color verde.</br>
![](https://cdn.discordapp.com/attachments/496417325961052203/517116328721645588/EnterUsername.png) </br>
**Lobby** </br>
Al confirmar el nombre de usuario el jugador se habr� conectado a una partida online, y los jugadores ser�n redirigidos a esta sala de espera. </br>
En ella se nos muestra un contador de jugadores conectados, y una tabla que se ir� actualizando con los jugadores conectados y el elemento al que pertenecer�n. Como el control sobre los jugadores conectados y que se desconectan es bastante visual ya con estos elementos, hemos optado por no lanzar mensajes de alerta cuando los jugadores se conecten o desconecten.</br>
Tambi�n se mostrar� la puntuaci�n m�xima que ha registrado el servidor y que, como ya dijimos anteriormente, es el dato persistente que guardamos en el txt.</br>
Mientras el jugador se encuentre en esta ventana estar� a tiempo de abandonar la partida antes de unirse definitivamente a esta clicando el bot�n de retorceso, o clicar en el bot�n 'Ready' y unirse definitivamente a la partida. </br>
![](https://cdn.discordapp.com/attachments/453581461371486210/517135711959384075/unknown.png) </br>

## Diagrama de Navegabilidad
![](https://cdn.discordapp.com/attachments/453581461371486210/517136110812528640/indice.png) </br>

## Diagrama de clases y API REST
![](https://cdn.discordapp.com/attachments/453581461371486210/517133580254707753/Diagrama_de_Claser_-_API_REST.png) </br>

## Instrucciones para ejecutar la aplicaci�n
* Para **ejecutar la aplicaci�n** introducimos el comando 'java -jar gaiasSouls.jar' desde la carpeta target.
* Cargamos la IP que nos devuelve el servidor en el navegador y accedemos al juego a trav�s del puert 8080.
* Para que los **clientes** puedan cargar los items del servidor, primero se les tendr� que proporcionar la IP del servidor, resultando en 'IP_del_servidor:8080'.


## Equipo de desarrollo
|                  Nombre                 | Correo | Cuenta de Github |
|:---------------------------------------:|:------:|:----------------:|
|          Enrique Rico Gonz�lez          |    Rickenric@gmail.com    |         https://github.com/Richenric         |
| Mar�a de los �ngeles Saint-Mard �lvarez |    mawyn.lovegood@gmail.com    |         https://github.com/MawynNeko         |
|           Lucas A. Mu�oz Mu�oz          |    Lukasa707@gmail.com    |         https://github.com/Lukasha707         |

|                  Trello de desarrollo                 |
|:---------------------------------------:|
|          https://trello.com/b/B6S8UT7g/a-%C3%BAltima-hora          |