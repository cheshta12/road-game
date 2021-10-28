const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const levelDiv = document.querySelector(".levelDiv");

let player = { speed:5, score:0};
let keys = {ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
startScreen.addEventListener('click',start);

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
};

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}

function start(){
    //gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    levelDiv.classList.add("hide");
    gameArea.innerHTML="";

    let level = levelDiv.querySelector("#level").value;
    if(level==="medium"){
        player.speed = 7;
    }
    else if(level==="hard"){
        player.speed = 10;
    }

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class","lines");
        roadLine.y = x*150;
        roadLine.style.top = roadLine.y +"px";
        gameArea.appendChild(roadLine);
    }


    let car = document.createElement("div");
    car.setAttribute("class","car");
    //car.innerText = "i am car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    //enemy cars
    for(x=0;x<3;x++){
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class","enemy");
        enemyCar.y = ((x+1) *350) * -1;
        enemyCar.style.top = enemyCar.y +"px";
        enemyCar.style.left = Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function gamePlay(){
    //console.log("I am clicked");
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect(); //give all things like x,y,width,height etc

    if(player.start){
        moveLines();
        moveEnemy(car);
        
        if(keys.ArrowUp && player.y > road.top + 70){player.y-=player.speed}
        if(keys.ArrowDown && player.y< road.bottom - 85){player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
        if(keys.ArrowRight && player.x< (road.width - 50)){player.x+=player.speed}
        
        car.style.top = player.y +"px";
        car.style.left = player.x +"px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps = player.score -1;
        score.innerText = ps;
    }
}

function isColide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top>bRect.bottom)|| (aRect.bottom<bRect.top)|| (aRect.right<bRect.left)||(aRect.left>bRect.right));
}

function moveLines(){
    let lines  = document.querySelectorAll(".lines");

    lines.forEach((item)=>{

        if(item.y>=700){
             item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function moveEnemy(car){
    let lines  = document.querySelectorAll(".enemy");

    lines.forEach((item)=>{
        if(isColide(car,item)){
            endGame();
            //console.log("boom");
        }
        if(item.y>=750){
             item.y = -300;
             item.style.left = Math.floor(Math.random()*350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    levelDiv.classList.remove("hide");
    player.speed = 5; //set to default
    startScreen.innerHTML = "Game Over <br> Your final score is "+player.score+"<br> Press Here to restart the Game.";
}
