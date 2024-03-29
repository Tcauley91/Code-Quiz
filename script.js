// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const list = document.getElementById("score-list");
const scoreNamesSpan = document.getElementById("score-names");
const initialForm = document.getElementById("initial-form");
const initialInput = document.getElementById("initial-text");


// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 75;
const questionTime = 75; // 75s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }else{
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion.count){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(count=0);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
        count = count-15;
    }

    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(count=0);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML+="<h1>All done!</h1>";
   
    scoreDiv.innerHTML += "<p2>Your score is "+ scorePerCent +"%</p2>";
}

    var initials = [];

    init();

    function renderScores() {

        list.innerHTML = "";
        scoreNamesSpan.textContent = initials.length;

        // render new list item for each player

        for (var i = 0; i < initials.length; i++) {
            var initials = initials[i];

            var li = document.createElement("li");
            li.textContent = list;
            li.serAttribute("data-index", i);

            }
    }

        function init(){
    

            // get stored scores from local storage
            // parsing the Json string to an object

            var storedList = JSON.parse(localStorage.getItem("playerlist"));
            if (storedList !==null) {
                initials = storedList;
            }

            renderScores();
        }

        function storeScores(){
            localStorage.setItem("Initials", JSON.stringify(initials));
        }

        initialForm.addEvemtListener("submit", function(event) {
            event.preventDefault();

            var initialText = initialInput.value.trim();

            if (initialText === ""){
            return;
        }

        initials.push(initialText);
        storeScores();
        renderScores();
    });

