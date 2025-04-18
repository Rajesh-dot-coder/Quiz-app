const questions = [
  {
    question: "What is the HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Transfer Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: "CSS"
    },
    {
      question: "Which is not a JavaScript data type?",
      options: ["String", "Boolean", "Number", "Float"],
      answer: "Float"
    },
    {
      question: "Which tag is used for inserting the largest heading in HTML?",
      options: ["<h6>", "<heading>", "<h1>", "<head>"],
      answer: "<h1>"
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Where is the correct place to insert a JavaScript file?",
      options: ["Both the <head> and <body>", "Only the <head>", "Only the <body>", "After </html>"],
      answer: "Both the <head> and <body>"
    },
    {
      question: "Which property is used to change the background color in CSS?",
      options: ["color", "bgcolor", "background-color", "background"],
      answer: "background-color"
    },
    {
      question: "How do you create a function in JavaScript?",
      options: ["function = myFunc()", "function:myFunc()", "function myFunc()", "create myFunc()"],
      answer: "function myFunc()"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["<!-- -->", "//", "#", "/* */"],
      answer: "//"
    },
    {
      question: "How do you call a function named `test` in JavaScript?",
      options: ["call test()", "test()", "run test", "go test()"],
      answer: "test()"
    }
];

let shuffledQuestions = shuffleArray([...questions]);
let currentQuestion = 0;
let score = 0;

const questionE1 = document.getElementById("question");
const optionsE1 = document.getElementById("option");
const nextBtn = document.getElementById("nextBtn");
const scoreE1 = document.getElementById("score");

function loadQuestion() {
  nextBtn.disabled = true;
  questionE1.textContent = shuffledQuestions[currentQuestion].question;
  optionsE1.innerHTML = "";

  shuffledQuestions[currentQuestion].options.forEach(OptionText => {
    const option = document.createElement("div");
    option.className = "option";
    option.textContent = OptionText;
    option.addEventListener("click", () => selectOption(option, OptionText));
    optionsE1.appendChild(option);
  });
}

function selectOption(selectedE1, selectedAnswer) {
  const correctAnswer = shuffledQuestions[currentQuestion].answer;

  Array.from(optionsE1.children).forEach((option) => {
    option.classList.add(
      option.textContent === correctAnswer ? "correct" : "incorrect"
    );
    option.style.pointerEvents = "none";
  });

  if (selectedAnswer === correctAnswer) {
    score++;
  }
  nextBtn.disabled = false;
}

function shuffleArray(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionE1.textContent = "Quiz Completed!";
  optionsE1.innerHTML = "";
  nextBtn.style.display = "none";
  scoreE1.textContent = `Your score: ${score} out of ${shuffledQuestions.length}`;

  const reset = document.createElement("button");
  reset.textContent = "Restart";
  reset.id = "reset";

  reset.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    scoreE1.textContent = "";
    shuffledQuestions = shuffleArray([...questions])
    reset.remove();
    loadQuestion();
  });

  optionsE1.appendChild(reset);
}

loadQuestion();

