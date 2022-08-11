//variables needed to access all relevant elements from the html
var timerDisplay = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var quizBox = document.querySelector(".quizBox");
var myButton = document.querySelector(".myButton");
var highScore = document.querySelector(".highScore");
var answerOptions = document.querySelector(".answerButtons");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var gameOverScreen = document.querySelector(".gameOver");

//set current index for questions to zero, set wins to zero
var currentIndex = 0;
var wins = 0;

//Create button, add css styling via class, and append them
var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");

option1.classList.add("btn");
option2.classList.add("btn");
option3.classList.add("btn");
option4.classList.add("btn");

answerOptions.appendChild(option1);
answerOptions.appendChild(option2);
answerOptions.appendChild(option3);
answerOptions.appendChild(option4);


function rulesFirst() {
     //create p element to hold rules, append it to quizBox
     var rulesFirst = document.createElement("p");
     rulesFirst.setAttribute("style", "margin-bottom: 10px");
     rulesFirst.setAttribute("id", "rulesFirst");
     rulesFirst.textContent = "Answer these 5 simple questions to reach a high score. Every wrong answer will take 5 seconds from your time!";
     quizBox.appendChild(rulesFirst);
     //create start button, append it to quizBox and add click event
     var startButton = document.createElement("button");
     startButton.innerHTML = "Start Quiz";
     startButton.setAttribute("id", "startButton");
     //add styling to button using exisiting class in CSS
     startButton.classList.add("btn");
     myButton.appendChild(startButton);
     startButton.addEventListener("click", startQuiz);

}


//Set countdown timer to 30 seconds, start countdown function
var timeLeft = 30;
function updateTimer() {
     timerInterval = setInterval(function () {
//when timer reaches zero, clear interval function and display game over
        if (timeLeft === 0) {
               clearInterval(timerInterval);
               gameOver();
          } else {
          timeLeft--;
          timerDisplay.textContent = timeLeft + " seconds left";
          }
     }, 1000);
}

//function to clear display and display game over when timer runs out or questions are finished
function gameOver() {
   timerDisplay = '';
    var gameOver = document.createElement("p");
    var yourScore = document.createElement("p");
    var inputWhat = document.createElement("span");
    var userInput = document.createElement("input");
    var submitButton = document.createElement("button");

    submitButton.classList.add("btn");

     userInput.type = "text";
     userInput.value = "";
     userInput.classList.add("userInput");

     gameOver.textContent = "Game Over!"
     yourScore.textContent = "Your final score is: " + wins;
     inputWhat.textContent = "Enter initials: ";
     submitButton.innerHTML = "Submit";

    gameOverScreen.appendChild(gameOver);
    gameOverScreen.appendChild(yourScore);
    gameOverScreen.appendChild(inputWhat);
    gameOverScreen.appendChild(userInput); 
    myButton.appendChild(submitButton);


    submitButton.addEventListener("click", function (event){
         event.preventDefault();
         if (userInput.value.length === 0) {
              alert("Please enter initials before submitting");
         } else {

         localStorage.setItem("name", userInput.value);
         localStorage.setItem("score", wins);
         window.location.href = "endgame.html";
         }
    });

     answerOptions.remove();
     quizBox.remove();
}


//function to start quiz
function startQuiz() {
   updateTimer();
   var rules = document.querySelector("#rulesFirst");
   rules.remove();
   var startButton = document.querySelector("#startButton");
   startButton.remove();
   //call function that will call the questions
   getQuestion();
}

//function to go through all the questions
function getQuestion () {
      currentQuestion = theQuestions[currentIndex];
      quizBox.textContent = currentQuestion.question;

      //make answer buttons visible, add text content and click event
     answerOptions.classList.remove("visibility");

     option1.textContent = currentQuestion.choice1;
     option2.textContent = currentQuestion.choice2;
     option3.textContent = currentQuestion.choice3;
     option4.textContent = currentQuestion.choice4;

     option1.addEventListener("click", selectAnswer);
     option2.addEventListener("click", selectAnswer);
     option3.addEventListener("click", selectAnswer);
     option4.addEventListener("click", selectAnswer);
        }


//function to be called when answer buttons are clicked
function selectAnswer (event) {

   var clicked = event.currentTarget.textContent;

   if (clicked === currentQuestion.answer) {
        result.textContent = "Correct Answer!";
        wins++;
        score.textContent = "Score: " + wins;
   }   
   else {
        result.textContent = "Wrong answer!";
        timeLeft -= 5;
   }
   
   if (currentIndex === theQuestions.length - 1) {
      //gameOver();
      timeLeft = 0
   } 
   else {
        currentIndex++
        getQuestion()
   }

}

//Created variable which is array of all questions and answers
     var theQuestions = [
     {question: 'Who shot first?',
     choice1: 'Han',
     choice2: 'Greedo',
     choice3: 'Same time',
     choice4: 'Thanos',
     answer: 'Han'
     },
     { question: 'How many infinity stones are there?',
     choice1: '2',
     choice2: '4',
     choice3: '5',
     choice4: '6',
     answer: '6'
     },
     {question: 'What are Wolverines claws made of?',
     choice1: 'Vibranium',
     choice2: 'Adamantium',
     choice3: 'Steel',
     choice4: 'Tin Foil',
     answer: 'Adamantium'
     },           
     {question: 'Which race did Anakin Skywalker win?',
     choice1: 'Daytona 500',
     choice2: 'Tour de France',
     choice3: 'Boonta Eve Podrace',
     choice4: 'Kessel Run',
     answer: 'Boonta Eve Podrace'
     },             
     {question: 'What color is Darth Vaders light saber?',
     choice1: 'red',
     choice2: 'blue',
     choice3: 'green',
     choice4: 'purple',
     answer: 'red'
     }             
     ];



rulesFirst ();