import { questions } from "./questions.js";

// start quiz screen
document.querySelector(".quiz").style.backgroundColor = "#3a9eb7";
document.querySelector("#submit").style.backgroundColor = "#505050";
document.querySelector("#submit").style.color = "white";
document.querySelector("#submit").style.marginBottom = "190px";
document.querySelector("#submit").innerText = "Start Quiz!"
document.getElementById("progress-bar").style.opacity = "0";

document.querySelector("#submit").onclick = () => {
  document.querySelector(".quiz").style.backgroundColor = "white";
  document.querySelector("#submit").style.cssText = `display: block; background-color: #3a9eb7; color: white;`;
  document.querySelector("#submit").innerText = "Enter";
  document.querySelector("#progress-bar").style.opacity = "1";

  let questionId = 0
  let selection;
  let answer = questions[questionId].answer;
  let interval, progressInterval;
  let time = 10;
  let score = 0;

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
      option.style.color = "white"
      option.style.fontWeight = 800;
    }
  }

  const endQuiz = () => {
    clearInterval(interval);
    clearInterval(progressInterval);
    let color = "#00ff55";
    let message = "Well Done! You are able to identify appropriate methods to reduce stress."
    let margin = "120px"
    if (score <= (5/10 * questions.length)) {
      color = "#e32636";
      message = "It's alright, sometimes it's not easy to identify the appropriate ways to manage stress, so you should try to read up more on stress management."
      margin = "60px";
    } else if (score < (8/10 * questions.length)) {
      color = "yellow";
      message = "Good job, you are usually able to identify methods to reduce stress, but you can try to read up a bit more on stress management"
      margin = "60px";
    } 

    document.querySelector("#submit").style.display = "inline-block"
    document.querySelector("#submit").style.backgroundColor = "#505050";
    document.querySelector("#submit").style.color = "white";
    document.querySelector("#submit").onclick = () => resetQuestion();

    document.querySelector("#submit").innerText = "Retry Quiz";
    document.getElementById("progress-bar").style.opacity = "0";
    for (let i = 1; i <= 4; i++) {
      document.querySelector(`#option${i}`).style.display = "none";
    }

    document.querySelector(".quiz").style.backgroundColor = "#3a9eb7";
    document.querySelector("#question-title").style.cssText = `
      font-size: 65px;
      color: ${color};
      margin-top: 200px;
    `

    document.querySelector("#question-title").innerHTML = `${score}/${questions.length}`
    document.querySelector("#question-title").style.marginTop = margin;
    document.querySelector("#question-title").style.fontSize = "50px";
    
    document.querySelector("#question-title").innerHTML += `<br><span style="font-size: 40px; color: white;">${message}</span>`

    questionId = -1;
    selection = undefined;
    score = 0;
  }

  const startInterval = () => {
    time = 10;
    document.getElementById("quiz-timer").innerText = time;
    interval = setInterval(() => {
      time--;
      if (time === 0) {
        animation(false); 
      }
      document.getElementById("quiz-timer").innerText = time;
    }, 1000)
  }

  let progressBar = document.getElementById("progress-bar");
  const startProgressBarAnimation = () => {
    let progress = 1000;
    let color = "#3a9eb7";
    progressInterval = setInterval(() => {
      if (time <= 3) {
        color = "red";
      } else if (time <= 5) {
        color = "orange";  
      } 
      progress--
      progressBar.style.background = `conic-gradient(${color} ${(progress/1000) * 360}deg, #ededed 0deg)`;
    }, 10)
  }


  startInterval();
  startProgressBarAnimation();

  const resetQuestion = () => {
    startInterval();
    startProgressBarAnimation();

    if (questionId !== questions.length-1) {
      questionId += 1
      answer = questions[questionId].answer;
    

      // reset button animations
      for (let i = 1; i <= 4; i++) {
        document.getElementById(`option${i}`).style.backgroundColor = "white";
        document.getElementById(`option${i}`).style.cssText = ".options option:hover { backgroundColor: #3a9eb7 }";
      }

      // reset question
      document.querySelector(".quiz").style.display = "flex";
      document.querySelector(".quiz").style.backgroundColor = "";
      document.querySelector("#question-title").style.cssText = ""

      document.querySelector("#submit").style.cssText = `display: inline-block; background-color: #3a9eb7; color: white;`;
      document.querySelector("#submit").innerText = "Enter";
      document.getElementById('submit').onclick = () => {
        if (selection) {
          animation(selection === answer);
        }
      }
      
      document.getElementById("progress-bar").style.opacity = "1"
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
      
          option.style.backgroundColor = "#3a9eb7"
          option.style.color = "white"
          option.style.fontWeight = 800;
        }
      }
    } else {
      endQuiz();
    }
  }

  const animation = (gotCorrect) => {
    clearInterval(interval);
    clearInterval(progressInterval);
    document.querySelector("#submit").style.display = "none";
    document.getElementById("progress-bar").style.opacity = "0";
    for (let i = 1; i <= 4; i++) {
      document.querySelector(`#option${i}`).style.display = "none";
    }

    document.querySelector(".quiz").style.backgroundColor = gotCorrect ? "#50C878" : "#e32636";
    document.querySelector("#question-title").style.cssText = `
      font-size: 65px;
      color: white;
      margin-top: 200px;
    `

    if (time <= 0) {
      document.querySelector("#question-title").innerHTML = 
      `
        <span class="material-symbols-outlined" style="font-size: 35px;">dangerous</span>
        No Time!
      ` 
    } else {
      document.querySelector("#question-title").innerHTML = gotCorrect ? 
      `
        <span class="material-symbols-outlined" style="font-size: 45px;">check_circle</span>
        Correct!
      `
      :
      `
        <span class="material-symbols-outlined" style="font-size: 35px;">dangerous</span>
        Wrong!
      ` 
    }

    if (!gotCorrect) {
      document.querySelector("#question-title").innerHTML += `<br><span style="font-size: 25px;"> The answer is ${questions[questionId].answer} (${questions[questionId].options[answer - 1]}) </span>`
      document.querySelector("#question-title").style.marginTop = "170px";
      document.querySelector("#question-title").style.fontSize = "50px";
      
      setTimeout(() => {
        resetQuestion();
      }, 4000)
    } else {
      score++
      setTimeout(() => {
        resetQuestion()
      }, 1500)
    }
  }

  document.getElementById('submit').onclick = () => {
    if (selection) {
      animation(selection === answer);
    }
  }
}