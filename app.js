let body = document.querySelector("body");
let h3 = document.querySelector("h3");
let buttons = document.querySelectorAll(".btn")
let started = false;
let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let level = 0;
let colors = ["red","green","purple","orange"]

function gameFlash(){
    let randomColor = colors[Math.floor(Math.random()*4)];
    let randomButton = document.querySelector(`.${randomColor}`);
    randomButton.classList.add("white");
    setTimeout(()=>randomButton.classList.remove("white"),200);
    gameSeq.push(randomColor);
}

function userFlash(btn){
    if(started===false){
        return;
    }
    btn.classList.add("greenB");
    setTimeout(()=>btn.classList.remove("greenB"),200);
    userSeq.push(btn.id);
    updateLevel();
}

function updateLevel(){
    if(userSeq[userSeq.length-1]!=gameSeq[userSeq.length-1]){
        body.classList.add("redB");
        setTimeout(()=>body.classList.remove("redB"),300);
        h3.innerHTML = `Game Over! Your score was ${level-1}<br>Press any Key to start.`
        highestScore = Math.max(highestScore,level-1);
        document.querySelector("h2").innerText = `Highest Score : ${highestScore}`;
        started = false;
        level = 0;
        gameSeq = [];
        userSeq = [];
    }else if(userSeq.length==gameSeq.length){
        userSeq = [];
        setTimeout(()=>{
            gameFlash();
            level++;
            h3.innerText = `Level ${level}`;
        },1000)
    }
}

body.addEventListener('keydown',()=>{
    if(started === false){
        level++;
        h3.innerText = `Level ${level}`;
        started=true;
        gameFlash();
    }
})

for(btn of buttons){
    btn.addEventListener('click',function(){
        userFlash(this);
    });
}


