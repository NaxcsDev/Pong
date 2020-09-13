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
			var flecha;
			var menu = 1;

				flecha = {
					x: canvas.width/2 - 100,
					y: canvas.height/2
				}

			//---------------Funciones-------------------//

			//Bucle
			setInterval(function(){bucle()}, 1000/FPS);
			function bucle(){
				limpiarCanvas();
				dibujar();
				logicaFlecha();
			}

			function limpiarCanvas(){
				canvas.width = canvas.width;
			}

			function logicaFlecha(){
				if (flecha.y < canvas.height/2){flecha.y = canvas.height/2}
				if (flecha.y > canvas.height/2 + 120){flecha.y = canvas.height/2 + 120}
			}

			function dibujar(){
				
				ctx.fillStyle = "white";

				if (menu == 1){
					//Menu
					ctx.font = "50px impact";
					ctx.fillText("PONG", canvas.width/2 - 65, canvas.height/5);

					//Practica
					ctx.font = "40px impact";
					ctx.fillText("Practica", canvas.width/2 - 65, canvas.height/2);

					//CPU
					ctx.font = "30px impact";
					ctx.fillText("CPU", canvas.width/2 - 65, (canvas.height/2) + 40);

					//1 v 1
					ctx.font = "30px impact";
					ctx.fillText("Modo 2 Jugadores", canvas.width/2 - 65, (canvas.height/2) + 80);

					//Opciones
					ctx.font = "30px impact";
					ctx.fillText("Controles", canvas.width/2 - 65, (canvas.height/2) + 120);

					//Flecha
					ctx.font = "30px impact";
					ctx.fillText(">", flecha.x, flecha.y);
				}

				if (menu == 2){
					//OPCIONES
					ctx.font = "50px impact";
					ctx.fillText("Controles", canvas.width/2 - 100, canvas.height/5);

					//General
					ctx.font = "40px impact";
					ctx.fillText("GENERAL", 40, (canvas.height/2));

                    //Arriba: W
					ctx.font = "20px impact";
					ctx.fillText("Subir: W / Arriba", 40, (canvas.height/2) + 40);

					//Abajo: S
					ctx.font = "20px impact";
					ctx.fillText("Bajar: S / Abajo", 40, (canvas.height/2) + 60);
                    
					//Seleccionar: D
					ctx.font = "20px impact";
					ctx.fillText("Seleccionar: D / Derecha / Enter", 40, (canvas.height/2) + 80);

					//Volver: A
					ctx.font = "20px impact";
					ctx.fillText("Volver: A / Izquierda / Atras", 40, (canvas.height/2) + 100);
                    
					//Jugador 1
					ctx.font = "40px impact";
					ctx.fillText("Jugador 1", canvas.width/2 + canvas.width/8, (canvas.height/2) - 40);

					//Arriba: W
					ctx.font = "20px impact";
					ctx.fillText("Subir: W", canvas.width/2 + canvas.width/8, (canvas.height/2) - 0);

					//Abajo: S
					ctx.font = "20px impact";
					ctx.fillText("Bajar: S", canvas.width/2 + canvas.width/8, (canvas.height/2) + 20);

					//Jugador 2
					ctx.font = "40px impact";
					ctx.fillText("Jugador 2", canvas.width/2 + canvas.width/8, (canvas.height/2) + 60);

					//Flecha Arriba: W
					ctx.font = "20px impact";
					ctx.fillText("Subir: Arriba", canvas.width/2 + canvas.width/8, (canvas.height/2) + 100);

					//Flecha Abajo: S
					ctx.font = "20px impact";
					ctx.fillText("Bajar: Abajo", canvas.width/2 + canvas.width/8, (canvas.height/2) + 120);

					//Pausar/Reanudar
					//ctx.font = "30px impact";
					//ctx.fillText("Pausar/Reanudar: Espacio", canvas.width/2 - 35, (canvas.height - 20));
				}
			}

			//Jugador
			document.addEventListener('keydown', teclado);
			function teclado(tecla){

				if (menu == 1){
					if (tecla.keyCode == 87 || tecla.keyCode == 38){
						if (flecha.y > canvas.height/2){
							flecha.y -= 40;
						}
					}

					if (tecla.keyCode == 83 || tecla.keyCode == 40){
						if (flecha.y < canvas.height/2 + 120){
							flecha.y += 40;
						}
					}

					//Practica
					if (tecla.keyCode == 68 && flecha.y == (canvas.height/2) + 0 
                        || tecla.keyCode == 13 && flecha.y == (canvas.height/2) + 0
                        || tecla.keyCode == 39 && flecha.y == (canvas.height/2) + 0){
						location.href = "Rooms/Practica.html";
					}

					//CPU
					if (tecla.keyCode == 68 && flecha.y == (canvas.height/2) + 40
                       || tecla.keyCode == 13 && flecha.y == (canvas.height/2) + 40
                       || tecla.keyCode == 39 && flecha.y == (canvas.height/2) + 40){
						location.href = "Rooms/1_vs_CPU.html";
					}

					//1vs1
					if (tecla.keyCode == 68 && flecha.y == (canvas.height/2) + 80
                       || tecla.keyCode == 13 && flecha.y == (canvas.height/2) + 80
                       || tecla.keyCode == 39 && flecha.y == (canvas.height/2) + 80){
						location.href = "Rooms/1_vs_1.html";
					}


					//Opciones
					if (tecla.keyCode == 68 && flecha.y == (canvas.height/2) + 120
                       || tecla.keyCode == 13 && flecha.y == (canvas.height/2) + 120
                       || tecla.keyCode == 39 && flecha.y == (canvas.height/2) + 120){
						menu = 2;
					}
				}

					if (menu == 2){
						if (tecla.keyCode == 65 || tecla.keyCode == 8 || tecla.keyCode == 37){
							menu = 1;
						}
					}
				}
			}