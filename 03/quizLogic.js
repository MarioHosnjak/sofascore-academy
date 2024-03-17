const STEPS_TO_VICTORY = 15

// globalne varijable
// ?? dal je ovo okej i postoji li neki drugi nacin kak ovo postici osim local/session storagea ??
let questions
let difficulty
let currentQuestionNumber = 0

async function getQuestions(difficultyFromForm) {
    if (difficultyFromForm) {
        difficulty = difficultyFromForm
    }
    currentQuestionNumber = 0
    let url = "https://opentdb.com/api.php?amount=15&type=multiple"
    if (!(difficulty === "any")) {
        url = `https://opentdb.com/api.php?amount=15&difficulty=${difficulty}&type=multiple`
    }
    try {
        const response = await fetch(url)
        if (response.status === 200) {
            questions = await response.json()
            console.log(questions.results)
            document.getElementById("question-container").style.display = "flex"
            document.getElementById("counter-div").style.display = "block"
            document.querySelector("footer").style.display = "flex"
            document.getElementById("start-div").style.display = "none"
            nextQuestion()
        }
    } catch (error) {
        console.error(error)
    }
}
function nextQuestion() {
    enableAnswerButtons()
    const div = document.getElementById("question-h3")
    div.innerHTML = questions.results[currentQuestionNumber].question

    if (currentQuestionNumber != 0) {
        let topMargin = 278.62 - currentQuestionNumber * 19.33
        document.getElementById("questionPointer").style.top = `${topMargin}px`
    } else {
        document.getElementById("questionPointer").style.top = "278.62px"
    }

    let answerArray = [questions.results[currentQuestionNumber].correct_answer]
    questions.results[currentQuestionNumber].incorrect_answers.forEach((element) => {
        answerArray.push(element)
    })
    shuffleArray(answerArray)

    let buttons = document.querySelectorAll(".answer-button")
    let abcd = ["A", "B", "C", "D"]
    for (let i = 0; i < 4; i++) {
        buttons[i].innerHTML = abcd[i] + ": " + answerArray[i]
        buttons[i].value = answerArray[i]
    }
}

function validateAnswer(answer, abcd) {
    const rightAnswer = questions.results[currentQuestionNumber].correct_answer
    if (answer === rightAnswer) {
        document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "green"
        currentQuestionNumber += 1
        setTimeout(() => {
            if (currentQuestionNumber == STEPS_TO_VICTORY) {
                document.getElementById("you_won_pop_up").style.display = "block"
                document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "#AAB6A2"
            } else {
                alert("Correct! Next question.")
                document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "#AAB6A2"
                nextQuestion()
            }
        }, 1000)
    } else {
        document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "red"
        setTimeout(() => {
            alert(`Incorrect! Try again. Correct answer is: ${rightAnswer}`)
            document.getElementById(`answer-${abcd}-button`).style.backgroundColor = "#AAB6A2"
            enableLifelineButtons()
            getQuestions()
        }, 1000)
    }
}

// ukradeno
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}

function updateDifficulty(value) {
    let startButton = document.getElementById("start-button")
    startButton.value = value
}

function close_you_won_popup() {
    document.getElementById("you_won_pop_up").style.display = "none"
    enableLifelineButtons()
    getQuestions()
}
