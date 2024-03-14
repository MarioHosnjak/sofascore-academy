// globalne varijable
// ?? dal je ovo okej i postoji li neki drugi nacin kak ovo postici osim local/session storagea ??
let questions;
let currentQuestionNumber = 0;
const topMarginForPointer = 278.62;

async function getQuestions() {
  currentQuestionNumber = 0;
  const url = "https://opentdb.com/api.php?amount=15&type=multiple";
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      questions = await response.json();
      console.log(questions);
      document.getElementById("question-container").style.display = "flex";
      document.getElementById("counter-div").style.display = "block";
      document.getElementById("start-div").style.display = "none";
      nextQuestion();
    }
  } catch (error) {
    console.error(error);
  }
}
function nextQuestion() {
  console.log(currentQuestionNumber);
  const div = document.getElementById("question-h3");
  div.innerHTML = questions.results[currentQuestionNumber].question;

  if (currentQuestionNumber != 0) {
    let topMargin = 278.62 - currentQuestionNumber * 19.33;
    document.getElementById("questionPointer").style.top = `${topMargin}px`;
  } else {
    document.getElementById("questionPointer").style.top = "278.62px";
  }

  //document.getElementById("counter-a").innerHTML = `Question: ${currentQuestionNumber + 1}`;
  let answerArray = [questions.results[currentQuestionNumber].correct_answer];
  questions.results[currentQuestionNumber].incorrect_answers.forEach((element) => {
    answerArray.push(element);
  });
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
    document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "green";
    currentQuestionNumber += 1;
    setTimeout(() => {
      if (currentQuestionNumber == 3) {
        alert("YOU WON!");
        document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "buttonface";
        getQuestions();
      } else {
        alert("Correct! Next question.");
        document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "buttonface";
      }
      nextQuestion(questions, currentQuestionNumber);
    }, 100);
  } else {
    document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "red";
    setTimeout(() => {
      alert(`Incorrect! Try again. Correct answer is: ${rightAnswer}`);
      document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "buttonface";
      getQuestions();
    }, 100);
  }
}

// ukradeno
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
