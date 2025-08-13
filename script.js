const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Text Making Language", correct: false },
    ]
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<css>", correct: false },
      { text: "<style>", correct: true },
      { text: "<script>", correct: false },
      { text: "<link>", correct: false },
    ]
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<hyperlink>", correct: false },
    ]
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "<break>", correct: false },
      { text: "<br>", correct: true },
      { text: "<lb>", correct: false },
      { text: "<newline>", correct: false },
    ]
  },
  {
    question: "Which of the following is a semantic HTML tag?",
    answers: [
      { text: "<div>", correct: false },
      { text: "<section>", correct: true },
      { text: "<span>", correct: false },
      { text: "<b>", correct: false },
    ]
},
  {
    question: "Who developed JavaScript?",
    answers: [
      { text: "Brendan Eich", correct: true },
      { text: "Tim Berners-Lee", correct: false },
      { text: "Bill Gates", correct: false },
      { text: "Dennis Ritchie", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheet", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Colorful Style Sheet", correct: false },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 120;
  resultEl.classList.add("hide");
  restartButton.classList.add("hide");
  nextButton.classList.remove("hide");
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz("⏰ Time's up!");
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) score++;

  Array.from(answerButtons.children).forEach((btn) => {
    setStatusClass(btn, btn.dataset.correct === "true");
    btn.disabled = true;
  });

  nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  element.classList.add(correct ? "correct" : "wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz("✅ Quiz Finished!");
  }
});

function endQuiz(message) {
  clearInterval(timerInterval);
  questionContainer.classList.add("hide");
  nextButton.classList.add("hide");
  resultEl.classList.remove("hide");
  resultEl.innerHTML = `<h3>${message}</h3><p>Your Score: ${score} / ${questions.length}</p>`;
  restartButton.classList.remove('hide');
}

restartButton.addEventListener("click", () => {
  questionContainer.classList.remove("hide");
  startQuiz();
});

window.onload = startQuiz;