function fifty_fifty() {
    document.getElementById("lifeline-button-1").disabled = true
    let wrongAnswers = questions.results[currentQuestionNumber].incorrect_answers
    shuffleArray(wrongAnswers)
    disableWrongAnswers(wrongAnswers[0], wrongAnswers[1])
}

function phone_a_friend() {
    alert("zovi ćovika")
    document.getElementById("lifeline-button-2").disabled = true
}

function ask_the_audience() {
    alert("pitaj publiku")
    document.getElementById("lifeline-button-3").disabled = true
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

function enableLifelineButtons() {
    let buttons = document.querySelectorAll(".lifeline-button")
    buttons.forEach((button) => {
        button.disabled = false
    })
}
