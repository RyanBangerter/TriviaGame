

//----------------start timer
let questionIndex = 0;
//----------------- welcome message.
function myfunction(){
    $('#welcInfo')[0].innerHTML = "Welcome To Everything Movies Trivia! Test your general movie knowledge. There are 6 questions each question has 4 answers to choose from, but only 1 is right. You'll be given 30s to answer each, question. Good luck!";
    $('#trivia')[0].style.visibility = "hidden";
}


//-----------------when button is pressed game starts
function startfunction(){
    $('#wcm').remove();
    $('#btnn').remove();
    $('#trivia')[0].style.visibility = "visible";  
 var timerstart = setInterval(decrement, 1000);
 function decrement() {
        $('#timer')[0].innerHTML = --number;


//------------when the timer is 0
        if (number == 0) {
            $('#right')[0].innerHTML = 'Times Up!';
            $('#timer')[0].style.visibility = 'hidden';
            $('#question')[0].style.visibility = "hidden";
            $('#btn0')[0].style.visibility = "hidden";
            $('#btn1')[0].style.visibility = "hidden";
            $('#btn2')[0].style.visibility = "hidden";
            $('#btn3')[0].style.visibility = "hidden";
            clearInterval(timerstart);
                setTimeout(function() {
                    $('#question')[0].style.visibility = "visible";
                    $('#timer')[0].style.visibility = 'visible';
                    $('#btn0')[0].style.visibility = "visible";
                    $('#btn1')[0].style.visibility = "visible";
                    $('#btn2')[0].style.visibility = "visible";
                    $('#btn3')[0].style.visibility = "visible";
                    $('#right')[0].innerHTML = '';
                    questionIndex++;
                    populate();
                    number = 30;
                    setInterval(decrement, 1000);
                }, 3000);
            }
      }
 }

 //---------------------------------------------------------

let number = 30
function Trivia(questions) {
    this.score = 0;
    this.questions = questions;
}
Trivia.prototype.getQuestionIndex = function() {
    return this.questions[questionIndex];
}
Trivia.prototype.guess = function(answer) {



//------------------if guessed right
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
     this.score++;
    $('#right')[0].innerHTML = 'CORRECT';
    $('#timer')[0].style.visibility = 'hidden';
    $('#question')[0].style.visibility = "hidden";
    $('#btn0')[0].style.visibility = "hidden";
    $('#btn1')[0].style.visibility = "hidden";
    $('#btn2')[0].style.visibility = "hidden";
    $('#btn3')[0].style.visibility = "hidden";
    }
//----------------if guessed wrong
    else{
        $('#right')[0].innerHTML = 'WRONG';
        $('#timer')[0].style.visibility = 'hidden';
        $('#question')[0].style.visibility = "hidden";
        $('#btn0')[0].style.visibility = "hidden";
        $('#btn1')[0].style.visibility = "hidden";
        $('#btn2')[0].style.visibility = "hidden";
        $('#btn3')[0].style.visibility = "hidden";
    }
//----------------after guess
    setTimeout(function() {
    number = 30;
    questionIndex++;
    $('#question')[0].style.visibility = "visible";
    $('#timer')[0].style.visibility = 'visible';
    $('#btn0')[0].style.visibility = "visible";
    $('#btn1')[0].style.visibility = "visible";
    $('#btn2')[0].style.visibility = "visible";
    $('#btn3')[0].style.visibility = "visible";
    }, 3000);
}
//-----------------
Trivia.prototype.isEnded = function() {
    return questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
//-----------------startGame
function populate() {
    if(trivia.isEnded()) {
        showScores();
    }
      else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = trivia.getQuestionIndex().text;
        // show options
        var choices = trivia.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        // $('#timer').text(number);
        showProgress();
    }
};
//------------------when guess is pressed.
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        trivia.guess(guess);
        setTimeout(function() {
        $('#right')[0].innerHTML = ''; 
        populate();
        }, 3000);
    }
};
//-------------------During game show how many questions left
function showProgress() {
    var currentQuestionNumber = questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + trivia.questions.length;
};
//---------------------- when game is over add up score, and show.
function showScores() {
    var gameOverHTML = "<h1>GAME OVER!</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + trivia.score + "</h2>";
    if(trivia.score >= 3){
    gameOverHTML += "<h3 id='goodjob'> Good Job! </h3>";
    }
    if(trivia.score == 6){
    gameOverHTML += "<h3 id='goodjob'> YOU WIN! </h3>";
    }
   if(trivia.score < 3){
    gameOverHTML += "<h3 id= 'betterluck'> Too Bad Better Luck Next Time! </h3>";
    }
    gameOverHTML += "<div class='row' id='btnn'><div class='col-12'><div class='wrapper'><div class='buttons'><button type='button' class='btn btn-light' id='btnnnnn' onclick='window.location.reload()'><h4>Play Again?</h4></button></div></div></div></div>";
    var element = document.getElementById("trivia");
    element.innerHTML = gameOverHTML;
};

//----------questions
let questions = [
    new Question('Who was the male lead actor in the movie FURY?',["Hugh Jackman", "Johnny Depp", "Brad Pitt", "Channing Tatum"], "Brad Pitt"),
    new Question('How many movies has Will Smith Starred in?', ["20","44","55","110"], "44"),
    new Question('What movie is this quote from?, ILL BE BACK',["Terminator", "Commando","Total Recall","Twins"], "Terminator"),
    new Question('In what year did the FIRST starwars show?', ["1982","1998","1951","1977"], "1977"),
    new Question('Who was the lead male actor in the movie Oblivion?', ["Matt Damon", "Tom Hanks", "Tom Cruise", "Mark Wahlberg"], "Tom Cruise"),
    new Question('Who was the lead actor in the movie I Am Legend?', ["Will Smith", "Dwayne Johnson", "Clint Eastwood", "Ryan Reynolds"], "Will Smith")
];
// create trivia
var trivia = new Trivia(questions);

// display game
populate();
