;(function(){
    function line(l){
        document.getElementById('line').innerHTML += l + "<br />";
    }

    function Bot(name){
        this.name = name;
        this.MAX_SPEED = 200;
    }

    Bot.prototype.speed = 0;

    Bot.prototype.getSpeed = function(){
        return this.speed;
    }

    Bot.prototype.upSpeed = function(){
        Bot.prototype.speed +=10;
    }

    function FastBot(){
        Bot.apply(this, arguments);
    }

    function SlowBot(){
        //Bot.apply(this, arguments);
        this.MAX_SPEED = 100;
    }

    FastBot.prototype = Object.create(Bot.prototype);
    SlowBot.prototype = Object.create(Bot.prototype);


    FastBot.prototype.upSpeed = function(){
        FastBot.prototype.speed +=10;
    }

    var Looter = new FastBot();
    var LooterSecond = new FastBot();
    var Loger = new SlowBot();

    Looter.upSpeed();
    Looter.upSpeed();
    Looter.upSpeed();
    LooterSecond.upSpeed();
    Loger.upSpeed();
    // console.dir(Looter);
    // console.dir(LooterSecond);
    // console.dir(Loger);
    console.log(Looter.getSpeed());
    console.log(LooterSecond.getSpeed());
    console.log(Loger.getSpeed());
    // line(Looter.getSpeed());
    // line(LooterSecond.getSpeed());
    // line(Loger.getSpeed());
})();
