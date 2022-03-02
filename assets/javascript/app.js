// GLobal variables

let username;
let objQuestion;
let mistakes = 1;
let key;
let check = "";
let arrQuestions = [
    {
        "Ölkə": "usa"
    },
    {
        "Proqramlaşdırma dili": "javascript"
    },
    {
        "Valyuta": "dollar"
    },
    {
        "Telefon markasi": "huawei"
    },
    {
        "Həftənin günü": "bazar"
    },
    {
        "Ofis ləvazimatı": "qelem"
    },
    {
        "Rəng": "qara"
    },
    {
        "Musiqi aləti": "piano"
    },
    {
        "İdman növü": "futbol"
    },
    {
        "Tərəvəz növü": "pomidor"
    },
    {
        "Meyvə növü": "alma"
    },
    {
        "Ev heyvanı": "pişik"
    },
];


//Create question
function getObject(){
    objQuestion = arrQuestions[Math.floor(Math.random() * arrQuestions.length)];   
}


// Game 
function game(){
    getObject();
    let question = Object.keys(objQuestion);
    document.getElementById("hangman-question").innerHTML = question;
    let answer = Object.values(objQuestion);

    for (let i = 0; i < answer[0].length; i ++){
        document.querySelector(".hangman-answer").innerHTML += `<span id="answer-text${[i]}"> _</span>`
    }


    // Function of game
    function keyListener(event){
        key = event.key;
    
        if (answer[0].includes(key)){
            for (let index = 0; index < answer[0].length; index++) {
                if (answer[0][index] === key) {
                    document.querySelector(`#answer-text${index}`).innerHTML = ` ${key}`;
                    check += key;
                    console.log(check)
                }
            }
            if(check.length == answer[0].length){
                setTimeout(() => {
                    alert("You win");
                    document.removeEventListener('keydown', keyListener);
                }, 1200)
            }            
        }
    
        // Mistakes
        else{
            if (mistakes < 7){
                document.getElementById("hangman-mistakes__text").innerText = mistakes;
                mistakes ++;
            }
            if (mistakes == 7){
                document.querySelector(".blood-effect").style.opacity = "1";
                document.querySelector(".blood-effect").style.visibility = "visible";
                setTimeout(() => {
                    alert("You lose, answer is " + answer[0]);
                }, 1200)
                
                document.removeEventListener('keydown', keyListener);
            }
        }
    }


    // Key EventListener
    document.querySelector(".form-link").addEventListener("click", ()=>{

        // Username
        username = document.querySelector("#username").value;
        document.querySelector("#username-text").innerHTML = username;

        // Change Theme
        document.querySelector(".main-container").style.display = "none";
        document.querySelector(".container").style.display = "block";

        document.addEventListener('keydown', keyListener);
    });
}

// Game start
game();


// Refresh game
document.querySelector(".refresh-game").addEventListener("click", ()=>{
    mistakes = 0;
    check = "";
    document.querySelector(".hangman-answer").innerHTML = "";
    game();
    document.addEventListener('keydown', keyListener);
});







// Fix autoplay
document.dispatchEvent(new KeyboardEvent('keypress'));
document.body.addEventListener("mousemove", function () {
    document.querySelector(".hangman-music").play();
});

// Mute sound
document.querySelector(".sounds").addEventListener("click", ()=>{
    if (document.querySelector(".sounds").innerHTML == '<i class="fa-solid fa-volume-xmark"></i>'){
        document.querySelector(".sounds").innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        document.querySelector(".hangman-music").muted = false;
    }else{
        document.querySelector(".sounds").innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        document.querySelector(".hangman-music").muted = true;
    }
});
