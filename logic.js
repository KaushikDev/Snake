window.onload = function(){
	
	var gameSpeed = 60;
	
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	
	var cvsW = cvs.width = window.innerWidth * 0.99;
	var cvsH = cvs.height = window.innerHeight * 0.90;
	
	
	var snakeW = 10;
	var snakeH = 10;
	
	var direction = "right";
	
	var score = 0;
	
	const dead = new Audio();
	const eat = new Audio();
	dead.src = "audio/dead.mp3";
	eat.src = "audio/eat.mp3";
	
	document.addEventListener("keydown", getDirection);
	
	function getDirection(e){
		if(e.keyCode == 37 && direction!="right"){
			direction = "left";
		}
			else if(e.keyCode == 38 && direction!="down"){
			direction = "up";
			}
				else if(e.keyCode == 39 && direction!="left"){
				direction = "right";
				}
					else if(e.keyCode == 40 && direction!="up"){
						direction = "down";
					}
		
		
	}
	
	function drawSnake(x,y){
	ctx.fillStyle = "#fff";
	ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	ctx.fillStyle = "#000";
	ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}
	
	
	var len = 4;
	var snake = [];
	
	for(var i=len-1;i>=0;i--){
		snake.push({x:i, y:0});
			}
	
	
	food = {
		x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
		y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
	}
	
	
	function drawFood(x,y){
	ctx.fillStyle = "yellow";
	ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	ctx.fillStyle = "#fff";
	ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}
	
	function checkCollision(x,y,array){
		for(var i=0;i<array.length;i++){
			if(x == array[i].x && y == array[i].y){
				return true;
			}
			//else {return false;}
		}
		return false;
	}
	
	
	function drawScore(x){
		ctx.fillStyle = "Yellow";
		ctx.font = "20px Verdana";
		ctx.fillText("Score: "+x,5, cvsH-5);
		
	}
	
	
	function draw(){
		ctx.clearRect(0,0,cvsW,cvsH);
		for(var i=0;i<snake.length;i++){
			var x = snake[i].x;
			var y = snake[i].y;
			drawSnake(x,y);
		}
		
		drawFood(food.x, food.y);
		
		var snakeX = snake[0].x;
		var snakeY = snake[0].y;
		
		
		if(direction == "left") snakeX--;
			else if(direction == "up") snakeY--;
				else if(direction == "right") snakeX++;
					else if(direction == "down") snakeY++;
					
		
		if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH || checkCollision(snakeX,snakeY,snake) ){
			//location.reload();
			dead.play();
			if(confirm("Game Over. Your Score : "+ score)){
				location.reload();
			}else window.location.href = "http://google.com";
		}
		
		
		if(snakeX == food.x && snakeY == food.y){
			food = {
		x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
		y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
	}
			var newHead = {x:snakeX, y:snakeY};
			eat.play();
			score++;
		}
		else {
			snake.pop();	
			var newHead = {x:snakeX, y:snakeY};
		}
		
		
		
		
		snake.unshift(newHead);
		drawScore(score);
	}
	
	setInterval(draw, gameSpeed);
	
	
	function onDeviceReady(){
		document.addEventListener("backbutton", onBackKeyDown, false);
		document.addEventListener("saveButton", save, false);
		devicePlatform = device.platform;
		console.log(devicePlatform);
		}
		function onBackKeyDown() {
			if(confirm("Hey!! You really wanna leave??")){
				navigator.app.exitApp();
			}
 		}
	
	
}