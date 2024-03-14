// globalne varijable
// ?? dal je ovo okej i postoji li neki drugi nacin kak ovo postici osim local/session storagea ??
let questions;
let currentQuestionNumber = 0;

async function getQuestions() {
  const url = "https://opentdb.com/api.php?amount=15&type=multiple";
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      questions = await response.json();
      console.log(questions);
      document.getElementById("question-container").style.display = "flex";
      document.getElementById("start-div").style.display = "none";
      currentQuestionNumber = 0;
      nextQuestion(questions, currentQuestionNumber);
    }
  } catch (error) {
    console.error(error);
  }
}
function nextQuestion() {
  const div = document.getElementById("question-h3");
  div.innerHTML = questions.results[currentQuestionNumber].question;
  let answerArray = [questions.results[currentQuestionNumber].correct_answer];
  questions.results[currentQuestionNumber].incorrect_answers.forEach(
    (element) => {
      answerArray.push(element);
    }
  );
  shuffleArray(answerArray);
  document.getElementById("answer-A-button").innerText = "A: " + answerArray[0];
  document.getElementById("answer-A-button").value = answerArray[0];
  document.getElementById("answer-B-button").innerText = "B: " + answerArray[1];
  document.getElementById("answer-B-button").value = answerArray[1];
  document.getElementById("answer-C-button").innerText = "C: " + answerArray[2];
  document.getElementById("answer-C-button").value = answerArray[2];
  document.getElementById("answer-D-button").innerText = "D: " + answerArray[3];
  document.getElementById("answer-D-button").value = answerArray[3];
}

function validateAnswer(answer, abcd) {
  const rightAnswer = questions.results[currentQuestionNumber].correct_answer;
  if (answer === rightAnswer) {
    document.getElementById(`answer-${abcd}-button`).style.backgroundColor =
      "green";
    setTimeout(() => {
      // alert("Correct! Next question.")
      document.getElementById(`answer-${abcd}-button`).style.backgroundColor =
        "buttonface";
      currentQuestionNumber += 1;
      nextQuestion(questions, currentQuestionNumber);
    }, 1500);
  } else {
    document.getElementById(`answer-${abcd}-button`).style.backgroundColor =
      "red";
    setTimeout(() => {
      alert(`Incorrect! Try again. Correct answer is: ${rightAnswer}`);
      document.getElementById(`answer-${abcd}-button`).style.backgroundColor =
        "buttonface";
      getQuestions();
    }, 1500);
  }
}

// ukradeno
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
