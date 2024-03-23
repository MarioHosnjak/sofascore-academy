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

    document.getElementById("ask_the_audience_pop_up").style.display = "none"
}

//          ask the audience

function ask_the_audience() {
    document.getElementById("lifeline-button-3").disabled = true
    document.getElementById("ask_the_audience_pop_up").style.display = "block"

    let rightAnswerPercentage = Math.random() * 0.25 + 0.5 // random number from range [0.5, 0.75]
    let wrongAnswerPercentages = [Math.random() * (1 - rightAnswerPercentage)] // 3 more random numbers for wrong answers
    wrongAnswerPercentages.push(Math.random() * (1 - rightAnswerPercentage - wrongAnswerPercentages[0]))
    wrongAnswerPercentages.push(1 - rightAnswerPercentage - wrongAnswerPercentages[0] - wrongAnswerPercentages[1])

    setTimeout(() => {
        let buttons = document.querySelectorAll(".answer-button")
        for (let i = 0; i < 4; i++) {
            if (buttons[i].value === questions.results[currentQuestionNumber].correct_answer) {
                document.getElementById(`${buttons[i].id.substring(7, 8)}-percentage-span`).innerHTML =
                    " " + Math.floor(rightAnswerPercentage * 100) + "%"
                document.getElementById(`${buttons[i].id.substring(7, 8)}-percentage-bar`).style.width =
                    Math.floor(rightAnswerPercentage * 100) * 2 + "px"
            } else {
                let wrongPercentage = wrongAnswerPercentages.pop()
                document.getElementById(`${buttons[i].id.substring(7, 8)}-percentage-span`).innerHTML = " " + Math.floor(wrongPercentage * 100) + "%"
                document.getElementById(`${buttons[i].id.substring(7, 8)}-percentage-bar`).style.width = Math.floor(wrongPercentage * 100) * 2 + "px"
            }
        }
    }, 2000)
}

function enableLifelineButtons() {
    let buttons = document.querySelectorAll(".lifeline-button")
    buttons.forEach((button) => {
        button.disabled = false
    })
}
