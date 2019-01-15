# GAIA'S SOULS 

## Descripción del juego
Gaia's Souls es un shooter en tercera persona 2D, en el que el personaje es un espíritu elemental que usa sus poderes mágicos para combatir. 
El jugador se verá representado por una lágrima brillante (formada por partículas) que puede disparar, generar un ataque zonal y posee un escudo que proteje al jugador de los disparos y zonales de jugadores enemigos.

## Mecánicas
* **Moverse:** El jugador 1 (J1) podrá desplazarse con las teclas WASD en las 4 direcciones. El jugador 2 (J2) se desplazará con los cursores

* **Disparar:** El jugador disparará hacia donde esté mirando el frente del espíritu, en otras palabras donde el jugado apunte con las teclas de movimiento pulsando la tecla asignada a disparo: (J1-> barra espaciadora/ J2-> "-")

* **Escudo:** El jugador conjurará el escudo para defenderse, pulsando la tecla asignada (J1->"b" / J2->".").

* **Zonal:** El jugador invocará un ataque zonal pulsando la tecla asignada al zonal (J1->"v" / J2->",").

## Dinámicas
En el planteamiento inicial el jugador tiene dos modos de juego, uno online por equipos, y uno offline para dos jugadores enfrentados en un duelo. En todos ellos se cuenta con hechizos de ataque y defensa que no pueden ser usados indiscriminadamente, pues su uso se ve limitado por un enfriamiento que equilibra el uso de los más débiles y los más potentes.

* **En el online por equipos**, se formarán tantos equipos como elementos haya (de 2 a 4 jugadores en cada uno), los cuales tienen como objetivo luchar por la supremacía en el escenario, con el fin de conseguir más puntos que los equipos enemigos. Estos puntos se consiguen básicamente asesinando al enemigo. La cámara seguirá al jugador según a donde se desplace.

* **En el offline**, se batirán dos personajes en duelo en el mismo terminal, los dos poseen exactente los mismo ataques y las mismas defensas. Ganando el que consiga mayor puntuación. Aquí hay una cámara fija con un mundo limitado por la ventana del navegador. Los controles son los nombrados arriba.

## Plataformas donde se puede jugar
Advertimos que las siguientes plataformas no incluyen las versiones más actulizadas del juego pero si las más estables.
* [Kongregate](https://www.kongregate.com/games/LemLeem/gaias-souls)
* [Itch.io](https://lemlem.itch.io/gaiasouls)
* [Newgrounds](https://www.newgrounds.com/portal/view/724618?updated=1547513554)

##Trailer de la jugabilidad
> ![](https://youtu.be/S19RaFEjnvQ)

## Apartado Gráfico
Partimos de un concept art de una idea inicial poco definida, y evolucionó hasta lo que se puede ver actualmente. En un comienzo todo iba a ser hecho a partir de "sprites" pero al final hemos utilizado partículas. A continuación, una comparación entre el concept y lo que hay actualmente.
 
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

## Menús e Interfaces de Juego
El dato persistente que hemos elegido es la máxima puntuación, al ser esta una variable interna que el jugador no podrá editar y los métodos de asignación aún no han sido creados, utilizaremos un prompt para insertar una puntuación al ejecutar la aplicación.
Si la cifra introducida es mayor que la que ya hay en el txt, esta sobreescribirá a la del txt. Si la puntuación introducida es menor a la del txt, será ignorada y se mantendrá la que ya hay en el txt.
![](https://cdn.discordapp.com/attachments/496417325961052203/517114314713202691/enterScore.png)</br>

En primer lugar mostramos los menús de que disponemos, para más adelante mostrar un diagrama de navegación.

**Menú Principal** </br>
Es el nexo inicial desde el que parte el juego. </br>
Desde aquí el jugador tendrá acceso a la configuración del juego, la selección de moalidad de juego y una guía con los controles. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568719142354955/mainMenu.png) </br>

**Menú Opciones** </br>
El jugador accederá a este menú desde el menú principal, clicando sobre el icono con un engranaje en su interior. </br>
Actualmente nos permite modificar el volumen de la música de los menús y el juego. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729422725130/optionsMenu.png) </br>

**Guía de Controles** </br>
El jugador accederá a este menú desde el menú principal, clicando sobre el icono con un mando en su interior. </br>
Aquí el jugador podrá comprobar los controles de juego. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568705938817036/controlesMenu1.png) </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568708237033472/controlesMenu2.png) </br>

**Selección de Modo de Juego** </br>
Al hacer clic en el menú principal sobre el botón central de play, el jugador accederá al menú de selección de modo de juego, desde donde decidirá entre las dos modalidades de que se dispondrá: offline y online. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568721071865869/modoMenu.png) </br>

## Menús e Interfaces Offline
**Selección de Objetivo** </br>
Si el jugador decide jugar offline, se tendrá que enfrentar a un segundo jugador en un 1 vs 1, para lo que antes tendrá que seleccionar el objetivo de puntuación que marcará el final de la partida, y por tanto al victorioso. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568728940380160/objetivoMenu.png) </br>

**Interfaz de juego** </br>
Al principio de la partida un letrero advertirá a cada jugador de su ubicación en pantalla (P1 para el jugador 1 y P2 para el jugador 2). </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729330450432/offlineGame.png) </br>
En la zona inferior de la pantalla se verán los iconos de cada habilidad, siendo solo utilizables cuando estén resaltadas completamente del color del jugador. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514579787319083028/cargaDeHabilidades.gif) </br>
Entre los iconos del jugador 1 y 2 se muestra un contador de victorias. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514582704608509965/contadorVictorias.gif) </br>
Se sumará un punto cada vez que se destruya al contrincante, y la partida finalizará cuando cualquiera de los dos llegue a la puntuación objetivo. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514584324725538816/theWinner.png) </br>
Una vez finalizada una partida, se puede empezar una nueva bajo las mismas condiciones con solo pulsar enter. </br>

**Menú Pausa** </br>
Durante la partida esta se puede poner en pausa pulsando el botón en forma de anillo de la esquina superior izquierda. </br>
En este menú de pausa tenemos tres posibilidades. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568733612703746/pauseMenu.png) </br>
Volver al juego clicando el botón play, retroceder al menú de selección de objetivo para poder empezar una nueva partida, o acceder a la configuración de sonido con el botón de engranaje. </br>
![](https://cdn.discordapp.com/attachments/496417325961052203/514568736972341258/pauseSoundMenu.png) </br>

## Menús e Interfaces Online
**Login Menu** </br>
Al iniciar una partida online se le solicitará al jugador que inserte un nombre de usuario con un máximo de 12 caracteres, y tendrá que clicar en el botón 'ok'. </br>
Hay tres situaciones que provocarán un mensaje de alerta en rojo como se muestra en la imagen: que el servidor ya esté lleno (20 jugadores), que el nombre de usuario ya esté en uso o sea nulo, o que el servidor esté desconectado. </br>
En este menú se ha empezado a implementar que los botones cambien de color cuando el ratón esté sobre él. Aunque el puntero no se ve en la captura, se encuentra sobre el botón de retroceso, motivo por el que en vez de ser el clásico botón que hemos visto en los demás menús, su interior es rojo. Del mismo modo, si el ratón estuviera sobre el botón 'Ok', este se vería de color verde.</br>
![](https://cdn.discordapp.com/attachments/496417325961052203/517116328721645588/EnterUsername.png) </br>
**Lobby** </br>
Al confirmar el nombre de usuario el jugador se habrá conectado a una partida online, y los jugadores serán redirigidos a esta sala de espera. </br>
En ella se nos muestra un contador de jugadores conectados, y una tabla que se irá actualizando con los jugadores conectados y el elemento al que pertenecerán. Como el control sobre los jugadores conectados y que se desconectan es bastante visual ya con estos elementos, hemos optado por no lanzar mensajes de alerta cuando los jugadores se conecten o desconecten.</br>
También se mostrará la puntuación máxima que ha registrado el servidor y que, como ya dijimos anteriormente, es el dato persistente que guardamos en el txt.</br>
Mientras el jugador se encuentre en esta ventana estará a tiempo de abandonar la partida antes de unirse definitivamente a esta clicando el botón de retorceso, o clicar en el botón 'Ready' y unirse definitivamente a la partida. </br>
![](https://cdn.discordapp.com/attachments/453581461371486210/517135711959384075/unknown.png) </br>

## Diagrama de Navegabilidad
![](https://cdn.discordapp.com/attachments/453581461371486210/517136110812528640/indice.png) </br>

## Diagrama de clases y API REST
![](https://cdn.discordapp.com/attachments/453581461371486210/517133580254707753/Diagrama_de_Claser_-_API_REST.png) </br>

## Instrucciones para ejecutar la aplicación
* Para **ejecutar la aplicación** introducimos el comando 'java -jar gaiasSouls.jar' desde la carpeta target.
* Cargamos la IP que nos devuelve el servidor en el navegador y accedemos al juego a través del puert 8080.
* Para que los **clientes** puedan cargar los items del servidor, primero se les tendrá que proporcionar la IP del servidor, resultando en 'IP_del_servidor:8080'.

## Equipo de desarrollo
|                  Nombre                 | Correo | Cuenta de Github |
|:---------------------------------------:|:------:|:----------------:|
|          Enrique Rico González          |    Rickenric@gmail.com    |         https://github.com/Richenric         |
| María de los Ángeles Saint-Mard Álvarez |    mawyn.lovegood@gmail.com    |         https://github.com/MawynNeko         |
|           Lucas A. Muñoz Muñoz          |    Lukasa707@gmail.com    |         https://github.com/Lukasha707         |

|                  Trello de desarrollo                 |
|:---------------------------------------:|
|          [Trello Gaia's Souls](https://trello.com/b/B6S8UT7g/a-%C3%BAltima-hora)          |