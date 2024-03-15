//          50:50
function fifty_fifty() {
    document.getElementById("lifeline-button-1").disabled = true
    let wrongAnswers = questions.results[currentQuestionNumber].incorrect_answers
    shuffleArray(wrongAnswers)
    disableWrongAnswers(wrongAnswers[0], wrongAnswers[1])
}

function disableWrongAnswers(wrongAnswer1, wrongAnswer2) {
    let buttons = document.querySelectorAll(".answer-button")
    for (let i = 0; i < 4; i++) {
        if (buttons[i].value === wrongAnswer1 || buttons[i].value === wrongAnswer2) {
            buttons[i].disabled = true
        }
    }
}

function enableAnswerButtons() {
    let buttons = document.querySelectorAll(".answer-button")
    for (let i = 0; i < 4; i++) {
        buttons[i].disabled = false
    }
}

//          phone a friend

function phone_a_friend() {
    document.getElementById("lifeline-button-2").disabled = true
    let popUpDiv = document.getElementById("phone_a_friend_pop_up")
    popUpDiv.style.display = "block"
    setTimeout(() => {
        let rightAnswer = questions.results[currentQuestionNumber].correct_answer
        document.getElementById("right_answer_p").innerHTML = "I think it's: " + rightAnswer
    }, 2000)
}

function close_lifeline_popup() {
    document.getElementById("phone_a_friend_pop_up").style.display = "none"
    document.getElementById("right_answer_p").innerHTML = ""
}

//          ask the audience

function ask_the_audience() {
    alert("pitaj publiku")
    document.getElementById("lifeline-button-3").disabled = true
}

function enableLifelineButtons() {
    let buttons = document.querySelectorAll(".lifeline-button")
    buttons.forEach((button) => {
        button.disabled = false
    })
}
