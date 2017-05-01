$(document).ready(function(){
    //alert('111');
});
var interval = undefined;
var ctx = undefined;
var grid = {
    vSpacing:80,
    gSpacing:80,
    padding:0,
    draw:function(ctx){
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;

        ctx.save();
        ctx.beginPath();
        for(var x = this.gSpacing; x <= canvasWidth; x += this.gSpacing)
        {
            ctx.moveTo(0.5 + x + this.padding, this.padding);
            ctx.lineTo(0.5 + x + this.padding, canvasHeight + this.padding);
        }

        for(var y = this.vSpacing; y <= canvasHeight; y += this.vSpacing)
        {
            ctx.moveTo(this.padding, 0.5 + y + this.padding);
            ctx.lineTo(canvasWidth + this.padding, 0.5 + y + this.padding);
        }
        ctx.strokeStyle = '#555';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
var ball = {
    startPointX:150,
    startPointY:150,
    radius:20,
    dx:6,
    dy:-6,
    color:'#fff',
    init:function(x,y){
        this.startPointX = x;
        this.startPointY = y;
    },
    draw:function(ctx,paddle){
        ctx.beginPath();
        ctx.arc(this.startPointX, this.startPointY, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        if(this.startPointX + this.dx > ctx.canvas.width - this.radius || this.startPointX + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if(this.startPointY + this.dy < this.radius) {
            this.dy = -this.dy;
        }else if(this.startPointY + this.dy > ctx.canvas.height - this.radius){
            if(this.startPointX > paddle.x && this.startPointX < paddle.x + paddle.width)
            {
                this.dy = -this.dy;
            }
            else {
                console.log("GAME OVER");
                if(interval!=undefined)
                    clearInterval(interval);
            }
        }
    },
    move:function(){
        this.startPointX += this.dx;
        this.startPointY += this.dy;
    }
}

var paddle = {
    x:0,
    y:0,
    height:25,
    width:200,
    color:"#fff",
    rightPressed:false,
    leftPressed:false,
    init:function(x, y){
        this.x = x;
        this.y = y;
        self = this;
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        //document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    },
    keyDownHandler:function(e){
        if(e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = true;
        }
    },
    keyUpHandler:function(e){
        if(e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = false;
        }
    },
    mouseMoveHandler:function(e){

        var relativeX = e.clientX - ctx.canvas.offsetLeft;
        console.log(relativeX);
        if(relativeX > 0 && relativeX < ctx.canvas.width) {
            this.x = relativeX - this.width/2;
        }
    },
    draw:function(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        if(this.rightPressed && this.x < ctx.canvas.width-this.width) {
            this.x += 7;
        }
        else if(this.leftPressed && this.x > 0) {
            this.x -= 7;
        }
    }
}

var bricks = {
    brickRowCount:3,
    brickColumnCount:6,
    brickWidth:75,
    brickHeight:20,
    brickPadding:10,
    brickOffsetTop:50,
    brickOffsetLeft:150,
    bricks:[],
    color:'orange',
    init:function(ctx){
        this.bricks = [];
        for(c=0; c< this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(r=0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        this.brickWidth = (ctx.canvas.width - this.brickOffsetLeft*2 - this.brickPadding*(this.brickColumnCount-1)) / this.brickColumnCount;
    },
    draw:function(ctx){
        for(c=0; c<this.brickColumnCount; c++) {
            for(r=0; r<this.brickRowCount; r++) {
                if(this.bricks[c][r].status == 1) {
                    var brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    var brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    },
    collisionDetection:function(ball){
        for(c=0; c < this.brickColumnCount; c++) {
            for(r=0; r < this.brickRowCount; r++) {
                var b = this.bricks[c][r];
                //console.log(b);
                if(b.status == 1) {
                    if(ball.startPointX > b.x && ball.startPointX < b.x+this.brickWidth && ball.startPointY > b.y && ball.startPointY < b.y + this.brickHeight) {
                        //console.log(ball.x);
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score.score++;
                        if(score.score == this.brickRowCount*this.brickColumnCount) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
}
 var score = {
     score:0,
     draw:function(ctx){
         ctx.font = "16px Arial";
         ctx.fillStyle = "#fff";
         ctx.fillText("Score: "+this.score, 8, 20);
     }
 }
 function init() {
     var canvas = document.getElementById('supercanvas');
     if (canvas.getContext) {
         ctx = canvas.getContext('2d');
         ctx.canvas.width  = window.innerWidth;
         ctx.canvas.height = window.innerHeight;
         ball.init(ctx.canvas.width/2, ctx.canvas.height-50);
         paddle.init((ctx.canvas.width-paddle.width)/2, ctx.canvas.height-paddle.height);
         bricks.init(ctx);
         interval = setInterval(function(){draw(ctx)}, 10);
     }
 }

function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    grid.draw(ctx);
    bricks.draw(ctx);
    ball.draw(ctx,paddle);
    bricks.collisionDetection(ball,score);
    score.draw(ctx);
    ball.move();
    paddle.draw(ctx);
}
