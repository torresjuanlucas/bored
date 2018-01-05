    //Brickbreaker JavaScript
    // Script written by Alex Poole

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2; //ball starting point
    var y = canvas.height-25;   //ball starting point
    var dx = 3;   //initial movement
    var dy = -3;  //initial movement
    var ballRadius = 10;  //ball size
    var ballOnPaddle = true;
    var paddleHeight = 10;
    var paddleWidth = 80;
    var paddleX = (canvas.width-paddleWidth)/2; //paddle starting point
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;  //5 rows of bricks 
    var brickColumnCount = 9; //9 columns of bricks
    var brickWidth = 50;
    var brickHeight = 16;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 10;
    var showStart = true;
    var score = 0;
    var lives = 5;
    var speed = 11;
    // all sound effects taken from www.freesound.org
    var gameStart = new Audio("sounds//243020__plasterbrain__game-start.ogg");
    var gameMusic = new Audio("sounds//251461__joshuaempyre__arcade-music-loop.wav");
    var paddleSound = new Audio("sounds//269718__michorvath__ping-pong-ball-hit.wav");
    var bouncingSound = new Audio("sounds//350905__cabled-mess__jump-c-05.wav");
    var breakingSound = new Audio("sounds//89534__cgeffex__very-fast-bubble-pop1.mp3");
    var gameOver = new Audio("sounds//350986__cabled-mess__lose-c-01.wav");
    var gameWin = new Audio("sounds//253177__suntemple__retro-accomplished-sfx.wav");

    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove",mouseMoveHandler, false);

    //array of bricks to form grid to destroy
    var bricks = [];
    for(c = 0; c < brickColumnCount; c++){
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++){
            bricks[c][r] = {x: 0 , y: 0, status: 1};
        }
    }
    
    //arrow key press
   function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if(e.keyCode === 37){
        leftPressed = true;
    }
   }

   //arrow key release
   function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if(e.keyCode === 37){
        leftPressed = false;
    }
   }

   //mouse movement
   function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
   }

   //make ball
   function drawBall(){
    //draw code
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle="#E0FBFC";
    ctx.fill();
    ctx.closePath();
    
   }

   //make paddle
   function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#F5EE9E";
    ctx.fill();
    ctx.closePath();
   }

   function drawBricks(){
    for(c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status==1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            if(r < 1){
                    ctx.fillStyle = "#40798C";  //brick colors determined by row
                  }else if(r < 2){
                    ctx.fillStyle = "#4DC6D1";
                  }else if(r < 3){
                    ctx.fillStyle = "#4DEAD3";
                  }else if(r < 4){
                    ctx.fillStyle = "#9799CA";
                  }else{
                    ctx.fillStyle = "#935FA7";
                  }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
   }

   function collisionDetection(){
    for(c=0; c < brickColumnCount;c++){
        for(r=0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                dy = -dy;
                b.status=0;
                breakingSound.play();
                score += 10;

                //when all bricks are destroyed by multiplying the array size by 10 to match the points
                if(score == (brickRowCount * brickColumnCount)*10){
                    gameWin.play();
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
              }
            }
         }
      }
   }


   function drawScore(){  //posts score on top left of canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "#C2DFE3";
    ctx.fillText("Score: " + score, 8, 20);
   }

   function drawLives() {   //posts lives on top right of canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "#C2DFE3";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

   function draw(){   //main function
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    drawBricks();
    gameMusic.play();

    //ball bounces off the left or right canvas walls
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx;   //ball ricochet
        bouncingSound.play();   //play bouncing sound
    } 
    //ball bounces of top of canvas
    if(y + dy < ballRadius){
        dy = -dy;
        bouncingSound.play();
    }
    //ball goes towards floor
    else if (y + dy > canvas.height-ballRadius){
        //ball hits paddle
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            paddleSound.play();
        }
        //ball hits floor
        else{
        lives--;  //lose life
        if(!lives){ //if user runs out of lives show game over
            gameOver.play();
            alert("GAME OVER");
            document.location.reload(); 
        }
        else{   // if lives remain reset paddle and ball to middle of canvas
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width-paddleWidth)/2;
        }
        }
        
    }

    //move paddle left and right with left and right arrow keys
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }
        x += dx;
        y += dy;

      
    // requestAnimationFrame(draw);   //replaced by function drawStart()
   }
 
  // draw();  replaced by function drawStart()

  //start game with mouse click
   function handleMouseClick(){
  showStart = false;
  setInterval(draw, speed); //draws game and sets up ball speed
  gameStart.play();   //sound effect on startup

}
//start screen
function drawStart() {
    if(showStart == true){
      ctx.font = "15px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText("Click to start",canvas.width/2-40, canvas.height/2);
    } 

}
drawStart();

canvas.addEventListener('mousedown', handleMouseClick);

