'use strict';

function display(selector, data) {
  $(selector).html(data);
}

function append(selector, data) {
  $(selector).append(data);
}

//add in correct answer object, score of how user is doing, progress of what question the person is on, 
const STORE =
  {
    questions: [
      'Who is the author of the letter Romans?',

      'Who was the ruler that exiled the Jews from Rome?',

      'When was the letter written?',

      'What chapter in Romans does Paul talk about being under obligation both to Greeks and barbarians?',

      'What is the reference verse? For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.',

      'How many chapters are there in Romans?',

      'What is the theme of Chapter 7?',

      'How long were the Jews exiled for before being able to return back to Rome?',

      'What was a main problem that was going on in the Roman church?',

      'Where in Romans does it say this: For while we were still weak, at the right time Christ died for the ungodly.',
    ],

    possibleAnswers: [
      ['John', 'David', 'Paul', 'Matthew'],
      ['Caesar', 'Claudius', 'Napoleon', 'Nero'],
      ['56 AD', '32 AD', '100 BC', '24 AD'],
      ['16', '3', '1', '8'],
      ['Romans 8:15', 'Romans 4:12', 'Romans 22:101', 'Romans 6:23'],
      ['103', '16', '57', '4'],
      ['Law', 'Justified by faith', 'Not ashamed of the gospel', 'love'],
      ['6 months', '2 years', '20 years', '5 years'],
      ['Tension with Jew and non-Jew Christians regarding laws and practices', 'People within the church stealing money', 'Leadership scandal', 'False doctrine being spread and people being stumbled by that'],
      ['Romans 2:2', 'Romans 8:10', 'Romans 5:6', 'Romans 13:2']
    ],

    correctAnswerIndexes: [
      2,
      1,
      0,
      2,
      3,
      1,
      0,
      3,
      0,
      2
    ],

    score: 0,

    currentQuestionIndex: 0
    
  };

function generateAnswers(){
  let currentQuestionIndex = STORE.currentQuestionIndex;
  let possibleAnswers= STORE.possibleAnswers[currentQuestionIndex];

  let answersMarkUp = possibleAnswers.map((answerOption, index) => {
   return `<div>
      <input type="radio" id="${index}" name="answer" value="${index}" required/>
      <label for="${index}">${answerOption}</label>
    </div>`;
  }).join("");
  return answersMarkUp;
}

function generateQuestion() {
  let currentQuestionIndex = STORE.currentQuestionIndex;
  let question = STORE.questions[currentQuestionIndex];
  
  return `
  <div class="quiz">
      <form class="questions">
        <fieldset>
          <legend>${question}</legend>
          <div class="answers">${generateAnswers()}</div>
        </fieldset>
        <button id="guess">Guess</button>
      </form>`;
}

function displayQuestion() {
  display('main', generateQuestion());
}

function displayCorrectAnswerFeedback() {
//this function tells you that you chose the right answer: and it will present a good job image
display('main', `
  <img class = 'display'
      src = "https://memecreator.org/static/images/memes/4798524.jpg"/>`);
}

function displayIncorrectAnswerFeedback() {
  //this function tells you "this is the right answer"
  let currentQuestionIndex = STORE.currentQuestionIndex;
  let correctAnswerIndex = STORE.correctAnswerIndexes[currentQuestionIndex];
  let currentQuestionPossibleAnswers = STORE.possibleAnswers[currentQuestionIndex];
  let correctAnswer = currentQuestionPossibleAnswers[correctAnswerIndex];

    display ('main', `
    <p>Sorry, the correct answer is "${correctAnswer}"</p>
    <img class = 'display'
      src = "http://i.imgur.com/T3v5SdD.jpg"/>`);
}

function displayNextOrFinishButton() {
  let currentQuestionIndex = STORE.currentQuestionIndex;
  if (currentQuestionIndex === 9) {
    append('main', `<div><button id="submit">Submit for Final Score</button></div>`);
  }else {
    append('main', `<div><button id="next">Next</button></div>`);
  }
}

function displayScore() {
  //this function calculates and displays how many questions you got right so far
  let currentScore = STORE.score;
  display('.js-userScore', currentScore);
}

function displayQuestionNumber(){
  //this function indicates what question you are on
  let currentQuestion = 1 + STORE.currentQuestionIndex;
  display('.js-questionNumber', currentQuestion);
}

function startQuiz() {
  displayQuestion();
  displayQuestionNumber();
}

function handleStartButton () {
  $('#start').on('click', event => {
    event.preventDefault();
    startQuiz();
  });
}

function checkUserAnswer() {
  //checks answer submitted by user, grab answer user
  let userChoice = parseInt($('input:checked').val(), 10);
  let currentQuestionIndex = STORE.currentQuestionIndex;
  let correctAnswerIndex = STORE.correctAnswerIndexes[currentQuestionIndex];

  if (isNaN(userChoice)) {
    alert("Please choose an answer")
    return; 
  }

  if (userChoice === correctAnswerIndex) {
    displayCorrectAnswerFeedback();
    STORE.score++;
  } else {
    displayIncorrectAnswerFeedback();
  }
  displayNextOrFinishButton();
}

function handleCheckAnswer(){
  $('main').on('click', '#guess', event => {
    event.preventDefault();
    checkUserAnswer();
    displayScore();
  });
}

function handleSubmitAnswer(){
  $('main').on('click', '#next', event => {
    STORE.currentQuestionIndex++;
    displayQuestion();
    displayQuestionNumber();
  });
}

function handleFinalAnswer(){
  $('main').on('click', '#submit', event => {
    display('main', `
    <p>You finished!</p> <p>You're done.</p>
    <p>You made it out!</p>
    <p>#hallelujah</p><div><button id="start-again">Start Over</button></div>`);
  });
}

function restartQuiz(){
  $('main').on('click', '#start-again', event => {
    location.reload();
  });
}

handleStartButton();
handleCheckAnswer();
handleSubmitAnswer();
handleFinalAnswer();
restartQuiz();