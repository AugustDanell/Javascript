<script src = "http://spelprogrammering.nu/simple.js">
function start(){
	
	ball = {sx: 0,
			sy: 0,
			v0: 57, //Jag är 19 år så v0 = 19 m/s. I det här försöket har jag dock multiplicerat hastigheten med tre för att man bättre ska se att kastet är
			// av horisontell karaktär eftersom det är svårt att se annars då gradantalet är väldigt lågt (10 grader).
			// Det är viktigt att veta att den är av horisontell karaktär så att vi kan använda oss av formeln: vy = voy - gt.
			alpha: pi/6, //Jag är född den åttonde Februari så det blir en summa på 10, alltså 10 grader eller pi/18 radianer. (8+2) 
		};
	
	AirResistance = {
			Form: 0.15, // Eftersom föremålet i fråga är av sfärisk karaktär så ger vi formkonstanten ett värde på 0.15.
			Mass: 20, //Vi antar att massan är 20kg.
			Area: (0.5*0.5*3.14), //Vi förmodar att diametern på kulan är en meter, så radien blir alltså en halvmeter och arean 0.5 * 0.5 * pi. 
			Density: 1.226}; //Luftens densitet vid havsnivå och vid 20 grader celsius. 
			
	
	world = {g: -9.8,
			 t: 0,
			 t2: 0,};
			 
	ball.v0x = ball.v0 * cos(ball.alpha);
	ball.v0y = ball.v0 * sin(ball.alpha);
	
	
	}
	
	Panzerkampfwagen = { Umzug:  0,
						 Umzug2: 0,
						 Umzug3: 0,
						 Umzug4: 0,
						 Umzug5: 0,
						 Feuer:  0,
						 alive:  0,
						 Verloren: 0,
	};

	function update()
	{
		
		ball.v0x = ball.v0 * cos(ball.alpha);
		ball.v0y = ball.v0 * sin(ball.alpha);
		
		if(keyboard.space){Panzerkampfwagen.Feuer = 1;}
		if(Panzerkampfwagen.Feuer == 1){world.t += 0.1;}
		
		if(ball.sy <= -10){ world.t = 0; Panzerkampfwagen.Feuer = 0;}
		//Kontrollerar kanonelden
		world.t2 += 0.01;
		
	
		if(Panzerkampfwagen.Verloren == 0){
			Panzerkampfwagen.Umzug2 ++;
		}	
		
		//Kontrollerar motståndarna
		
		ball.AirResistanceY = (AirResistance.Form * ((AirResistance.Area * AirResistance.Density * (ball.v0y - world.g*world.t) * (ball.v0y - world.g*world.t))/2))/AirResistance.Mass; 
		// Ovanstående kod är formeln för luftmotstånd i y-led. 
		// Koden "(ball.v0y - world.g*world.t) * (ball.v0y - world.g*world.t )" är då lika med v^2 eftersom "(ball.v0y - world.g*world.t)" = v0y - gt = v i x-led.
		
		ball.AirResistanceX = (AirResistance.Form * ((AirResistance.Area * AirResistance.Density * ball.v0x * ball.v0x)/2))/AirResistance.Mass; 
		// Ovanstående kod är formeln för luftmotstånd i x-led.
		
		
		ball.sy = ball.v0y*world.t + (world.g*world.t*world.t) / 2;
		ball.sx = ball.v0x*world.t;
		      
		
		
		clearScreen();
		
		
		
		//Marken och himmel
		rectangle(0,0, 6000, 600, "lightblue");
		rectangle(0, 600, 6000, 400, "green");
		 
		//Stridsvagnen
		rectangle(30 +Panzerkampfwagen.Umzug, 600, 45, 34, "gray");
		rectangle(30+Panzerkampfwagen.Umzug, 575, 40, 30, "gray");
		rectangle(30+Panzerkampfwagen.Umzug, 580, 110, 10, "gray");
		rectangle(140+Panzerkampfwagen.Umzug, 577.5, 15, 15, "gray");
		circle(30+Panzerkampfwagen.Umzug, 615, 19, "gray");
		circle(70+Panzerkampfwagen.Umzug, 615, 19, "gray");
		
		//Hjulen
		//circle(35, 615, 5, "black");
		
		//Järnkorset
		rectangle(45 +Panzerkampfwagen.Umzug, 580, 15, 15, "white");
		rectangle(45 +Panzerkampfwagen.Umzug, 585, 15, 5, "black");
		rectangle(57 +Panzerkampfwagen.Umzug, 592, 5, 5, "gray");
		rectangle(43 +Panzerkampfwagen.Umzug, 592, 5, 5, "gray");
		rectangle(57 +Panzerkampfwagen.Umzug, 578, 5, 5, "gray");
		rectangle(43 +Panzerkampfwagen.Umzug, 578, 5, 5, "gray");
		rectangle(50 +Panzerkampfwagen.Umzug, 580, 5, 15, "black");
		
		//Kanoneld
		/*if(ball.sy = 0)
		{ circle(30, 615, 600, "yellow");}*/
		
		//För att hålla koll på projektilen
		var projectileX = 150 + (Panzerkampfwagen.Umzug) + (ball.sx - ball.AirResistanceX); 
		var projectileY = 585 - (ball.sy - ball.AirResistanceY);
		
		//var alive = 0;
		var hitbox = 1030 - Panzerkampfwagen.Umzug2; var hitbox2 = 1030 - Panzerkampfwagen.Umzug2; var hitbox3 = 960 - Panzerkampfwagen.Umzug2;
		var hitbox4 = 1040 - Panzerkampfwagen.Umzug2; var hitbox5 = 1030 - Panzerkampfwagen.Umzug2; var hitbox6 = 1070 - Panzerkampfwagen.Umzug2;
		
		if(projectileX >= hitbox && projectileY >= 600){
		Panzerkampfwagen.alive = 1;
		}
		if(world.t2 >= 0.1){
			if(Panzerkampfwagen.alive == 0){
				rectangle(1030 - Panzerkampfwagen.Umzug2, 600, 45, 34, "black");
				rectangle(1030 - Panzerkampfwagen.Umzug2, 575, 40, 30, "black");
				rectangle(960 - Panzerkampfwagen.Umzug2, 580, 110, 10, "black");
				rectangle(1040 - Panzerkampfwagen.Umzug2, 577.5, 15, 15, "black");
				circle(1030 - Panzerkampfwagen.Umzug2, 615, 19, "black");
				circle(1070 - Panzerkampfwagen.Umzug2, 615, 19, "black");
			}
		}
		
		
		
		//Kolideringskoll 
		var hitbox7 = 1230 - Panzerkampfwagen.Umzug2;	var hitbox8 = 1230 - Panzerkampfwagen.Umzug2; var hitbox9 = 1160 - Panzerkampfwagen.Umzug2;
		var hitbox10 = 1240 - Panzerkampfwagen.Umzug2;	var hitbox11 = 1230 - Panzerkampfwagen.Umzug2; var hitbox12 = 1270 - Panzerkampfwagen.Umzug2;
		if(projectileX >= hitbox7 && projectileY >= 600){
			Panzerkampfwagen.alive = 2;
			}
			
		if(world.t2 >= 0.3){
			if(Panzerkampfwagen.alive <= 1){
				rectangle(1230 - Panzerkampfwagen.Umzug2, 600, 45, 34, "black");
				rectangle(1230 - Panzerkampfwagen.Umzug2, 575, 40, 30, "black");
				rectangle(1160 - Panzerkampfwagen.Umzug2, 580, 110, 10, "black");
				rectangle(1240 - Panzerkampfwagen.Umzug2, 577.5, 15, 15, "black");
				circle(1230 - Panzerkampfwagen.Umzug2, 615, 19, "black");
				circle(1270 - Panzerkampfwagen.Umzug2, 615, 19, "black");
				text(1200 - Panzerkampfwagen.Umzug2, 540, 10, "");
				}
		}
		
		var hitbox13 = 1430 - Panzerkampfwagen.Umzug2;	var hitbox14 = 1430 - Panzerkampfwagen.Umzug2; var hitbox15 = 1360 - Panzerkampfwagen.Umzug2;
		var hitbox16 = 1440 - Panzerkampfwagen.Umzug2;
		
		if(projectileX >= hitbox13 && projectileY >= 600){
			Panzerkampfwagen.alive = 3;
			}
		
		if(world.t2 >= 0.7){
			if(Panzerkampfwagen.alive <= 2){
				rectangle(1430 - Panzerkampfwagen.Umzug2, 600, 45, 34, "black");
				rectangle(1430 - Panzerkampfwagen.Umzug2, 575, 40, 30, "black");
				rectangle(1360 - Panzerkampfwagen.Umzug2, 580, 110, 10, "black");
				rectangle(1440 - Panzerkampfwagen.Umzug2, 577.5, 15, 15, "black");
				circle(1430 - Panzerkampfwagen.Umzug2, 615, 19, "black");
				circle(1470 - Panzerkampfwagen.Umzug2, 615, 19, "black");
				text(1400 - Panzerkampfwagen.Umzug2, 540, 10, "Cyka blyat");
				}
		}
		
		if(keyboard.space){
			var audio = new Audio("Lasersound.mp3" ) ;
			audio.oncanplaythrough = function(){
				audio.play();
			}
			audio.loop = false;


		
		}
		circle((150+Panzerkampfwagen.Umzug) + (ball.sx - ball.AirResistanceX), 585 - (ball.sy - ball.AirResistanceY), 5, "gray"); //Jag börjar med Sy = 150m, det är för att vi bättre ska kunna se hur bollen färdas.
		
		//Skjutfunktionen
		
		if(keyboard.up){ 
		ball.alpha +=  ((3.14/180));
		}
		//Problemet jag hade här var att få keyonpress att fungera.
		
		if(keyboard.down){ 
		ball.alpha -= ((3.14/180));
		}
		
		if(keyboard.right){ 
		Panzerkampfwagen.Umzug +=  5;
		}
		
		if(keyboard.left){ 
		Panzerkampfwagen.Umzug -=  5;
		}
		
		ball.winkel = ball.alpha * (180/3.14);
		
		
		text(20, 50, 25, " Tryck uppåtpilen för att öka vinkeln på kanonen " +ball.winkel);
		text(20, 80, 25, " Tryck nedåtpilen för att minska vinkeln på kanonen" +ball.sy);
		text(20, 110, 25, " Kill count: " +Panzerkampfwagen.alive + " Sovjetstridsvagnar"); 
		
		if(Panzerkampfwagen.alive >= 3){
		text(50, 310, 50, "Du har vunnit"); 
		Panzerkampfwagen.Feuer = 0;
		
		//if (Panzerkampfwagen.alive == 3){
			var audio = new Audio("NationalLeid.mp3" ) ;
			audio.oncanplaythrough = function(){
			if (Panzerkampfwagen.alive  == 3){
				Panzerkampfwagen.alive = 10;
				audio.play();
				
			}
			}
			audio.loop = false;
			
			
		}
		
		if(hitbox <= 45 +Panzerkampfwagen.Umzug && Panzerkampfwagen.alive == 0 || hitbox7 <= 45 +Panzerkampfwagen.Umzug && Panzerkampfwagen.alive == 1 || hitbox13 <= 45 +Panzerkampfwagen.Umzug && Panzerkampfwagen.alive == 2){
		text(50, 310, 50, "Du har förlorat"); 
		Panzerkampfwagen.Verloren = 1;
		}
		//if(keyboard.space){circle(150 + (ball.sx - ball.AirResistanceX), 585 - (ball.sy - ball.AirResistanceY), 5, "gray");} //Jag börjar med Sy = 150m, det är för att vi bättre ska kunna se hur bollen färdas.
		
		
	}
	

</script>
<!--<input type=onkeypress ="audio.play()"> -->
