// Create a Math question
// Math question will have a random generated
// Question Type Multiplicatin question  with random number range 1-10
// Answer will be the product of the random number range and the random number range
// User will have to answer question
// On submit  answer answer will be compared with random generated answer
// If answer will be correct than score will be incremented
// If answer will be wrong than score will be decremented


// Generate 4 Types of question
// For Subtract first number should be greater than second number also for Divide
// Store the score in local storage and display the score on the screen
// Give Feedback to user using toast


const QuestionEl =document.getElementById("question");
const QuestionformEl =document.getElementById("Questionform");
const scoreEl =document.getElementById("score");
let storedAnswer;
let score=0;
// let score = localStorage.getItem("score");
const randomNumber=(min, max)=>{
    return Math.floor(Math.random() * (max - min) + min);
};
const generateQuestion=()=>{
    const RandomNumber1 = randomNumber(1, 50);
    const RandomNumber2 = randomNumber(1, 50);
    const questionType = randomNumber(1, 4);

    let FirstNumber;
    let SecondNumber;

    if(RandomNumber1 > RandomNumber2 && questionType > 2) {
        FirstNumber = RandomNumber1;
        SecondNumber = RandomNumber2;
    } else {
        FirstNumber = RandomNumber2;
        SecondNumber = RandomNumber1;
    }
    let question;
    let answer;
    switch (questionType) {
        case 1:
            question = `Q.what is ${FirstNumber} multiply by ${SecondNumber}`;
            answer = FirstNumber * SecondNumber;
            break;
        case 2:
            question = `Q.what is ${FirstNumber} add to ${SecondNumber}`;
            answer = FirstNumber + SecondNumber;
            break;
        case 3:
            question = `Q.what is ${FirstNumber} subtract from ${SecondNumber}`;
            answer = FirstNumber - SecondNumber;
            break;
        case 4:
            question = `Q.what is ${FirstNumber} divided by ${SecondNumber}`;
            answer = FirstNumber / SecondNumber;
        default:
            question = `Q.what is ${FirstNumber} divided by ${SecondNumber}`;
            answer = FirstNumber / SecondNumber;
            break;
    }
    return { question, answer }
};
// console.log(generateQuestion());
const showQuestion = () => {
    const { question, answer }=generateQuestion();
    QuestionEl.innerText = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
};
showQuestion();

const checkAnswer = (event) => {
    event.preventDefault();
    const formData = new FormData(QuestionformEl);
    //  const UserAnswer=parseInt(formData.get("answer"));
    const UserAnswer = +formData.get("answer");
    if (UserAnswer === storedAnswer) {
        score += 1;
        Toastify({
            text: `Your are right and your score is ${score}`,
            gravity:"bottom",
            position:"center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    } else {
        score -= 1;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity:"bottom",
            position:"center",
            style: {
                background: "linear-gradient(to right, #e33217, #ff001e)",
            },
        }).showToast();
}
    scoreEl.innerText = score;
    localStorage.setItem("score", score);
    event.target.reset();
    showQuestion();
    console.log("answer", UserAnswer);
};

