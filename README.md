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
En primer lugar mostramos los menús de que disponemos, para más adelante mostrar un diagrama de navegación.

**Menú Principal**
Es el nexo inicial desde el que parte el juego. 
Desde aquí el jugador tendrá acceso a la configuración del juego, la selección de moalidad de juego y una guía con los controles.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568719142354955/mainMenu.png)

**Menú Opciones**
El jugador accederá a este menú desde el menú principal, clicando sobre el icono con un engranaje en su interior.
Actualmente nos permite modificar el volumen de la música de los menús y el juego.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729422725130/optionsMenu.png)

**Guía de Controles**
El jugador accederá a este menú desde el menú principal, clicando sobre el icono con un mando en su interior.
Aquí el jugador podrá comprobar los controles de juego.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568705938817036/controlesMenu1.png)
![](https://cdn.discordapp.com/attachments/496417325961052203/514568708237033472/controlesMenu2.png)

**Selección de Modo de Juego**
Al hacer clic en el menú principal sobre el botón central de play, el jugador accederá al menú de selección de modo de juego, desde donde decidirá entre las dos modalidades de que se dispondrá: offline y online.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568721071865869/modoMenu.png)

## Menús e Interfaces Offline
**Selección de Objetivo**
Si el jugador decide jugar offline, se tendrá que enfrentar a un segundo jugador en un 1 vs 1, para lo que antes tendrá que seleccionar el objetivo de puntuación que marcará el final de la partida, y por tanto al victorioso.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568728940380160/objetivoMenu.png)

**Interfaz de juego**
Al principio de la partida un letrero advertirá a cada jugador de su ubicación en pantalla (P1 para el jugador 1 y P2 para el jugador 2).
![](https://cdn.discordapp.com/attachments/496417325961052203/514568729330450432/offlineGame.png)
En la zona inferior de la pantalla se verán los iconos de cada habilidad, siendo solo utilizables cuando estén resaltadas completamente del color del jugador. 
![](https://cdn.discordapp.com/attachments/496417325961052203/514579787319083028/cargaDeHabilidades.gif)
Entre los iconos del jugador 1 y 2 se muestra un contador de victorias. 
![](https://cdn.discordapp.com/attachments/496417325961052203/514582704608509965/contadorVictorias.gif)
Se sumará un punto cada vez que se destruya al contrincante, y la partida finalizará cuando cualquiera de los dos llegue a la puntuación objetivo.
![](https://cdn.discordapp.com/attachments/496417325961052203/514584324725538816/theWinner.png)
Una vez finalizada una partida, se puede empezar una nueva bajo las mismas condiciones con solo pulsar enter.

**Menú Pausa**
Durante la partida esta se puede poner en pausa pulsando el botón en forma de anillo de la esquina superior izquierda.
En este menú de pausa tenemos tres posibilidades. 
![](https://cdn.discordapp.com/attachments/496417325961052203/514568733612703746/pauseMenu.png)
Volver al juego clicando el botón play, retroceder al menú de selección de objetivo para poder empezar una nueva partida, o acceder a la configuración de sonido con el botón de engranaje.
![](https://cdn.discordapp.com/attachments/496417325961052203/514568736972341258/pauseSoundMenu.png)

## Menús e Interfaces Online
**Lobby**
Al acceder a una partida online los jugadores serán redirigidos a esta sala de espera.
En ella se nos muestra un contador de jugadores conectados, una tabla que se irá actualizando con los jugadores conectados y el elemento al que pertenecerán.
Mientras el jugador se encuentre en esta ventana estará a tiempo de abandonar la partida antes de unirse definitivamente a esta clicando el botón de retorceso, o clicar en el botón 'Ready' y unirse definitivamente a la aprtida.
![](https://cdn.discordapp.com/attachments/496417325961052203/514588178041012244/lobbyElements.png)

## Equipo de desarrollo
|                  Nombre                 | Correo | Cuenta de Github |
|:---------------------------------------:|:------:|:----------------:|
|          Enrique Rico González          |    Rickenric@gmail.com    |         https://github.com/Richenric         |
| María de los Ángeles Saint-Mard Álvarez |    mawyn.lovegood@gmail.com    |         https://github.com/MawynNeko         |
|           Lucas A. Muñoz Muñoz          |    Lukasa707@gmail.com    |         https://github.com/Lukasha707         |
