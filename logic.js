window.onload = function(){
	
	var gameSpeed = 80;
	
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	
	var cvsW = cvs.width = window.innerWidth;
	var cvsH = cvs.height = window.innerHeight;
	
	
	var snakeW = 15;
	var snakeH = 15;
	
	var direction = "right";
	
	var score = 0;
	
	const dead = new Audio();
	const eat = new Audio();
	dead.src = "audio/dead.mp3";
	eat.src = "audio/eat.mp3";
	
	document.addEventListener("keydown", getDirection);
//testing some logic

var startX = 0;
var startY = 0;

document.addEventListener('touchstart', function(e){
    var touch = e.changedTouches[0]
    startX = touch.pageX
    startY = touch.pageY
    startTime = new Date().getTime()
    e.preventDefault()
}, false)

document.addEventListener('touchmove', function(e){
    e.preventDefault()
}, false)

document.addEventListener('touchend', function(e){
    var touch = e.changedTouches[0]
    distX = touch.pageX - startX
    distY = touch.pageY - startY

    if (Math.abs(distX) > Math.abs(distY)) {
      if (distX > 0 && direction!="left") {
        direction = "right";
      }
      else if (distX < 0 && direction!="right") {
        direction = "left";
      }
    } else {
      if (distY < 0 && direction!="down") {
        direction = "up";
      }
      else if (distY > 0 && direction!="up") {
       direction = "down";
      }
    }
    e.preventDefault();

}, false)


//testing ends
	
	
	
	
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
	
	function drawSnake(x,y,color){
			
				
				ctx.fillStyle = color;
				ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
			
				ctx.strokeStyle = "black";
				ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
		

	}
	
	
	var len = 2;
	var snake = [];
	
	for(var i=len-1;i>=0;i--){
		snake.push({x:i, y:0});
			}
	
	
	food = {
		x : Math.floor(Math.random()*((cvsW/snakeW)-1)+1),
		y : Math.floor(Math.random()*((cvsH/snakeH)-1)+1)
	}
	
	
	
	function drawFood(x,y){
	ctx.fillStyle = "blue";
	ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	ctx.strokeStyle = "white";
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
		ctx.fillStyle = "White";
		ctx.font = "30px Cinzel";
		ctx.fillText("Score: "+x,5, cvsH-5);
		
	}
	
	
	function draw(){
		ctx.clearRect(0,0,cvsW,cvsH);
		for(var i=0;i<snake.length;i++){
			var x = snake[i].x;
			var y = snake[i].y;
			if(i==0){
				var color = "red";
			}
			else if (i==snake.length-1){
				var color = "black";
			}
			else var color = "white";
			drawSnake(x,y,color);
		}
		
		drawFood(food.x, food.y);
		
		var snakeX = snake[0].x;
		var snakeY = snake[0].y;
		
		
		if(direction == "left") snakeX--;
			else if(direction == "up") snakeY--;
				else if(direction == "right") snakeX++;
					else if(direction == "down") snakeY++;
					
		
		if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH || checkCollision(snakeX,snakeY,snake) ){
			
			dead.play();
			var confirmation = confirm("Game Over.\nYour Score is : "+ score+ ".\n\nPress 'OK' to replay , press 'Cancel' to exit!");
			
			if(confirmation){
				
				window.location = "gameScreen.html";
			}
			else
			window.location = "index.html";
			
		}
		
		
		if(snakeX == food.x && snakeY == food.y){
			food = {
		x : Math.floor(Math.random()*((cvsW/snakeW)-1)+1),
		y : Math.floor(Math.random()*((cvsH/snakeH)-1)+1)
	}
	
			var newHead = {x:snakeX, y:snakeY};
			eat.play();
			score++;
			if((score%2)==0){
				gameSpeed-=2;
			}
		}
		else {
			snake.pop();	
			var newHead = {x:snakeX, y:snakeY};
		}
		
		
		
		
		snake.unshift(newHead);
		drawScore(score);
	}
	console.log(snake);
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