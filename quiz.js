import { questions } from "./questions.js";

let questionId = Math.round(Math.random() * (questions.length - 1));
let selection;
let answer = questions[questionId].answer;

document.getElementById('question-title').innerText = questions[questionId].name;

for (let i = 1; i <= 4; i++) {
  let option = document.getElementById(`option${i}`);
  option.innerText = questions[questionId].options[i - 1];

  option.onclick = () => {
    selection = i;

    // reset other buttons
    for (let j = 1; j <= 4; j++) {        
      document.getElementById(`option${j}`).style.backgroundColor = "white";
      document.getElementById(`option${j}`).style.cssText = ".options option:hover { backgroundColor: #3a9eb7 }";
      document.getElementById(`option${j}`).style.fontWeight = 500;
    }

    option.style.backgroundColor = "#3a9eb7"
    option.style.fontWeight = 800;
  }
}

const resetQuestion = () => {
  questionId = Math.round(Math.random() * (questions.length - 1));
  answer = questions[questionId].answer;

  // reset button animations
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`option${i}`).style.backgroundColor = "white";
    document.getElementById(`option${i}`).style.cssText = ".options option:hover { backgroundColor: #3a9eb7 }";
  }

  // reset question
  document.querySelector(".quiz").style.display = "flex";
  document.querySelector(".quiz").style.backgroundColor = "";
  document.querySelector("#question-title").style.cssText = `
    font-size: 25px;
    font-weight: 700;
  `
  document.querySelector("#submit").style.display = "inline-block";

  for (let i = 1; i <= 4; i++) {
    document.querySelector(`#option${i}`).style.display = "inline-block";
  }

  document.getElementById('question-title').innerHTML = questions[questionId].name;

  selection = undefined;

  for (let i = 1; i <= 4; i++) {
    let option = document.getElementById(`option${i}`);
    option.innerText = questions[questionId].options[i - 1];
  
    option.onclick = () => {
      selection = i;
  
      // reset buttons
      for (let j = 1; j <= 4; j++) {
        document.getElementById(`option${j}`).style.backgroundColor = "white";
        document.getElementById(`option${j}`).style.cssText = "option:hover { backgroundColor: #00BD9D }";
        document.getElementById(`option${j}`).style.fontWeight = 500;
      }
  
      option.style.backgroundColor = "#00BD9D"
      option.style.fontWeight = 800;
    }
  }
}

const animation = (gotCorrect) => {
  document.querySelector("#submit").style.display = "none";

  for (let i = 1; i <= 4; i++) {
    document.querySelector(`#option${i}`).style.display = "none";
  }

  document.querySelector(".quiz").style.backgroundColor = gotCorrect ? "#50C878" : "#e32636";
  document.querySelector("#question-title").style.cssText = `
    font-size: 65px;
    color: white;
    margin-top: 180px;
  `
  document.querySelector("#question-title").innerHTML = gotCorrect ? 
  `
    <span class="material-symbols-outlined" style="font-size: 45px;">check_circle</span>
    Correct!
  `
  :
  `
    <span class="material-symbols-outlined" style="font-size: 45px;">dangerous</span>
    Wrong!
  ` 

  if (!gotCorrect) {
    document.querySelector("#question-title").innerHTML += `<br> The answer is ${questions[questionId].answer} (${questions[questionId].options[answer - 1]})`

    document.querySelector("#question-title").style.marginTop = "150px";
    document.querySelector("#question-title").style.fontSize = "50px";
    
    setTimeout(() => {
      questionId = Math.round(Math.random() * (questions.length - 1));
      selection = undefined;
      answer = questions[questionId].answer;
    
      resetQuestion();
    }, 5000)
  } else {
    setTimeout(() => {
      resetQuestion()
    }, 2000)
  }
}

// animations
const playAnimation = (gotCorrect) => {
  animation(gotCorrect);
}

document.getElementById('submit').onclick = () => {
  if (selection) {
    playAnimation(selection === answer);
  }
}
