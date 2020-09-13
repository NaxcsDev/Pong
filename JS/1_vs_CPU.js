window.onload=function(){

			//---------------Motor de Juego--------------//
			canvas = document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			FPS = 30;
            canvas.width = 600;
            canvas.height = 300;
            canvas.style.width = '99%';
            canvas.style.display = 'block';
            canvas.style.margin = 'auto';
			//---------------Objetos---------------------//
			var jugador;
			var puntosJugador = 0;
			var enemigo;
			var puntosEnemigo = 0;
			var bola;
			//var bolaDH = 4;
			//var bolaDV = 4;

			//Velocidad de la bola
			var velocidadMin = 2;
			var velocidadMax = 4;
			var velocidad = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;


				jugador = {
					x1: 40,
					y1: canvas.height/2 - 20,
					w:  10,
					h:  40,
					v: 8
				};

				enemigo = {
					x1: canvas.width - 10 - 40,
					y1: canvas.height/2 - 20,
					w: 10,
					h: 40,
					v: 2
				}

				bola = {
					x1: (canvas.width / 2) - 10,
					y1: (canvas.height / 2) - 10,
					w: 10,
					h: 10,
					vh: 4,
					vv: 4
				}
			
			//---------------Funciones-------------------//

			//Bucle
			setInterval(function(){bucle()}, 1000/FPS);
			function bucle(){
				limpiarCanvas();
				dibujar();
				colisiones();
				logicaBola();
				logicaEnemigo();
			}

			function limpiarCanvas(){
				canvas.width = canvas.width;
			}

			function dibujar(){

				ctx.fillStyle = "white";

				//jugador
				ctx.fillRect(jugador.x1,jugador.y1,jugador.w,jugador.h);

				//enemigo
				ctx.fillRect(enemigo.x1,enemigo.y1,enemigo.w,enemigo.h);

				//bola
				ctx.fillRect(bola.x1,bola.y1,bola.w,bola.h);

				//Puntos
				ctx.font = "30px impact";
				//puntos jugador
				ctx.fillText(puntosJugador, 200, canvas.height/2 + 15);
				//puntos enemigo
				ctx.fillText(puntosEnemigo, canvas.width - 215, canvas.height/2 + 15);

				/*
				//Pausa
				if (estado == "reanudar"){
					ctx.font = "50px impact";
					ctx.fillText("PAUSA", canvas.width/2 - 65, canvas.height/3);
				}
				*/

			}

			function arriba(){
				if (jugador.y1 >= 1){
					jugador.y1 -= jugador.v;
				}
				
			}

			function abajo(){
				if (jugador.y1 <= canvas.height - jugador.h -1){
					jugador.y1 += jugador.v;	
				}
			}

			function colisiones(){

				//Jugador y canvas
				if (jugador.y1 < 0) {jugador.y1 = 0}
				if (jugador.y1 > canvas.height - jugador.h) {jugador.y1 = canvas.height - jugador.h}

				//Bola y Canvas
				if (bola.y1 < 0) {

					//bola.vh = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;
					//bola.vv = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;

					//bolaDV = bolaDV * -1;
					bola.vv = bola.vv * -1;
				}
				if (bola.y1 > canvas.height - bola.h) {

					//bola.vh = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;
					//bola.vv = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;

					//bolaDV = bolaDV * -1;
					bola.vv = bola.vv * -1;
					
				}
				if (bola.x1 < 0){
					//bolaDH = bolaDH * -1;
					//bolaDV = bolaDV * -1;
					bola.vv = bola.vv * -1;
					puntosEnemigo++;
					reiniciar()
				}
				if (bola.x1 + bola.w > canvas.width){
					//bolaDH = bolaDH * -1;
					//bolaDV = bolaDV * -1;
					bola.vv = bola.vv * -1;
					puntosJugador++;
					reiniciar()
				}

				//Bola y Enemigo
				if (bola.x1 + bola.w > enemigo.x1 && bola.x1 < enemigo.x1 + enemigo.w &&
					bola.y1 + bola.h > enemigo.y1 && bola.y1 < enemigo.y1 + enemigo.h)
					{

						bola.vh = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;
						bola.vv = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;

						//bolaDV = bolaDV * -1;
						//bolaDH = bolaDH * -1;
						bola.vh = bola.vh * -1;
						bola.vv = bola.vv * -1;
					}

				//Bola y Jugador
				if (bola.x1 + bola.w > jugador.x1 && bola.x1 < jugador.x1 + jugador.w &&
					bola.y1 + bola.h > jugador.y1 && bola.y1 < jugador.y1 + jugador.h)
					{

						bola.vh = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;
						bola.vv = Math.random() * (velocidadMax - velocidadMin) + velocidadMin;

						//bolaDH = bolaDH * -1;
						//bolaDV = bolaDV * -1;
						//bola.vh = bola.vh * -1;
						//bola.vv = bola.vv * -1;
					}
			}

			//Jugador
			document.addEventListener('keydown', teclado);
			function teclado(tecla){
				if (tecla.keyCode == 87){arriba()}
				if (tecla.keyCode == 83){abajo()}
				if (tecla.keyCode == 65 || tecla.keyCode == 8 || tecla.keyCode == 37){location.href = "../index.html"}
			}

			//logicaEnemigo
			function logicaEnemigo(){
				if (enemigo.y1 + (enemigo.h/2) > bola.y1 + (bola.h/2)){
					enemigo.y1 -= enemigo.v
				}else if (enemigo.y1 + (enemigo.h/2) < bola.y1 + (bola.h/2)){
					enemigo.y1 += enemigo.v
				}
			}

			//logicaBola
			function logicaBola(){
				bola.x1 += bola.vh;
				bola.y1 += bola.vv;
			}

			//Reiniciar
			function reiniciar(){

				//var bolaDH = 4;
				//var bolaDV = 4;

				jugador = {
					x1: 40,
					y1: canvas.height/2 - 20,
					w:  10,
					h:  40,
					v: 8
				};

				enemigo = {
					x1: canvas.width - 10 - 40,
					y1: canvas.height/2 - 20,
					w: 10,
					h: 40,
					v: 2
				};

				bola = {
					x1: (canvas.width / 2) - 10,
					y1: (canvas.height / 2) - 10,
					w: 10,
					h: 10,
					vh: 4,
					vv: 4
				};

			}

			/*
			//Pausar/Reanudar
			var estado = "pausar"
			document.addEventListener('keydown', function(tecla){

				if (tecla.keyCode == 32){

					if (estado == "pausar"){
						estado = "reanudar"
						bola.vh = 0
						bola.vv = 0
						jugador.v = 0
						enemigo.v = 0
					}
					else if (estado == "reanudar"){
						estado = "pausar"
						//bola.vh = bolaDH;
						//bola.vv = bolaDV;
						jugador.v = 8
						enemigo.v = 2
					}
				}
			});
			*/

		}