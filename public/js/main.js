$(document).ready(function(){
    //alert('111');
});
var grid = {
    vSpacing:80,
    gSpacing:80,
    padding:0,
    draw:function(ctx){
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;

        ctx.save();
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
        ctx.restore();
    }
}

function draw() {
    var canvas = document.getElementById('supercanvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.beginPath();
        grid.draw(ctx);
        ctx.strokeStyle = '#5dd7fb';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(50, 50, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
setInterval(draw, 10);
