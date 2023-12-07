const questions = [
    {
        qustion: "What is the capital of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Paris", correct: true},
            {text: "Berlin", correct: false},
            {text: "Rome", correct: false},
        ]
    },
    {
        qustion: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
        ]
    },
    {
        qustion: "Who wrote the play Romeo and Juliet?",
        answers: [
            {text: " Charles Dickens", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Jane Austen", correct: false},
            {text: "Mark Twain", correct: false},
        ]
    },
    {
        qustion: "What is the largest mammal in the world?",
        answers: [
            {text: "Elephant", correct: false},
            {text: " Lion", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Blue Whale", correct: true},
        ]
    },
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.qustion;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
            console.log(answer.correct)
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuesIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();