let timerInterval, time, original;
let color;
let mode;
var paused = false

document.getElementById("enter").classList.add("inactive");
const progressBar = document.getElementById("progress-bar")
document.getElementById("progress-bar").style.display = "none";

document.getElementById("enter").onclick = () => {
  document.querySelector("body").classList.add("unscrollable")
  document.getElementById("mainhead").style.fontSize = "30px"
  document.getElementById("timer-div").classList.remove("paused")
  document.querySelector(".headline").style.display = "none";
  document.getElementById('title').style.height = "40px";
  document.querySelector('#title h1').style.fontSize = "25px";
  document.querySelector('.burger').style.marginLeft = "10px"
  document.querySelector('.burger').style.marginTop = "3px"
  if (
    (document.getElementById("minutesBreak").value > 0 || document.getElementById("hoursBreak").value > 0)
    && (document.getElementById("minutesStudy").value > 0 || document.getElementById("hoursStudy").value > 0)
  ) {
    document.querySelector("#pause").style.backgroundColor = "#3a9eb7";
    document.querySelectorAll(".pageSelector")[0].style.display = "none";
    document.querySelectorAll(".pageSelector")[1].style.display = "none";
    document.getElementById("demo").style.fontWeight = "700"
    paused = false;
    document.getElementById("progress-bar").style.display = "flex";
    document.getElementById("demo").style.color = "#3a9eb7";
    var distance1 = document.getElementById("minutesStudy").value * 1000 * 60 + document.getElementById("hoursStudy").value * 60 * 1000 * 60;
    var distance2 = document.getElementById("minutesBreak").value * 1000 * 60 + document.getElementById("hoursBreak").value * 60 * 1000 * 60;
    document.getElementById("enter").style.display = "none";
    document.getElementById("hoursStudy").style.display = "none";
    document.getElementById("minutesBreak").style.display = "none";
    document.getElementById("hoursBreak").style.display = "none";
    document.getElementById("minutesStudy").style.display = "none";
    document.getElementById("break").style.display = "none";
    document.getElementById("cancel").style.display = "flex";
    document.getElementById("pause").style.display = "flex";
    document.querySelector(".mainContent").style.display = "none";

    document.getElementById("mainhead").innerHTML = "Study Time!";

    let time = distance1
    mode = "Study"


    var hoursStudy = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesStudy = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var secondsStudy = Math.floor((time % (1000 * 60)) / 1000);
    document.getElementById("demo").innerHTML = hoursStudy + "h " + minutesStudy + "m " + secondsStudy + "s";
    let origin = distance1
    color = "#3a9eb7";
    progressBar.style.background = `conic-gradient(${color} ${(time / origin) * 360}deg, #ededed 0deg)`;

    const refresh = () => {

      var hoursStudy = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutesStudy = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      var secondsStudy = Math.floor((time % (1000 * 60)) / 1000);

      if (!paused) {
        time -= 10;
        if (time % 1000 === 0) {
          document.getElementById("demo").innerHTML = hoursStudy + "h " + minutesStudy + "m " + secondsStudy + "s";
        }
        progressBar.style.background = `conic-gradient(${color} ${(time / origin) * 360}deg, #ededed 0deg)`;
      } else {
        progressBar.style.background = `conic-gradient(#333 ${(time / origin) * 360}deg, #ededed 0deg)`;
      }

      if (time < 0) {
        document.getElementById("demo").style.color = "#333";
        document.getElementById("demo").innerHTML = "0h 0m 0s"
        if (mode == "Study") {
          setTimeout(() => {
            alert("Study time is over! It's time for you to take a well deserved break!")
          }, 10)
          origin = distance2
          time = distance2
          localStorage.setItem("TimeLeft", time)
          var hoursStudy = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutesStudy = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
          var secondsStudy = Math.floor((time % (1000 * 60)) / 1000);
          document.getElementById("demo").innerHTML = hoursStudy + "h " + minutesStudy + "m " + secondsStudy + "s";
          document.getElementById("demo").style.color = "#3a9eb7";
          progress = origin
          document.getElementById("mainhead").innerHTML = "Break Time!";
          mode = "Break"
          progressBar.style.background = `conic-gradient(${color} ${(time / original) * 360}deg, #ededed 0deg)`;
        } else if (mode == "Break") {
          setTimeout(() => {
            alert("Break time is over! It's time for you to get back to work!")
          }, 10)
          origin = distance1
          time = distance1
          localStorage.setItem("TimeLeft", time)
          var hoursStudy = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutesStudy = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
          var secondsStudy = Math.floor((time % (1000 * 60)) / 1000);
          document.getElementById("demo").innerHTML = hoursStudy + "h " + minutesStudy + "m " + secondsStudy + "s";
          document.getElementById("demo").style.color = "#3a9eb7";
          progress = origin
          document.getElementById("mainhead").innerHTML = "Study Time!";
          mode = "Study"
          progressBar.style.background = `conic-gradient(${color} ${(time / original) * 360}deg, #ededed 0deg)`;
        }
      }
    };
    clearInterval(timerInterval);
    timerInterval = setInterval(refresh, 10);
  }
}

document.getElementById("cancel").onclick = () => {
  mode = null;
  document.querySelector("body").classList.remove("unscrollable")
  document.querySelectorAll(".pageSelector")[0].style.display = "inline-block";
  document.querySelectorAll(".pageSelector")[1].style.display = "inline-block";
  paused = false;
  document.getElementById("progress-bar").style.display = "none";
  document.getElementById("demo").style.color = "#333";
  clearInterval(timerInterval);
  document.getElementById("cancel").style.display = "none";
  document.querySelector("#pause span").innerHTML = "pause";
  document.getElementById("pause").style.display = "none";
  document.getElementById("enter").style.display = "flex";
  document.getElementById("hoursStudy").style.display = "inline-block";
  document.getElementById("minutesBreak").style.display = "inline-block";
  document.getElementById("hoursBreak").style.display = "inline-block";
  document.getElementById("minutesStudy").style.display = "inline-block";
  document.getElementById("break").style.display = "block";
  document.getElementById("demo").innerHTML = "";
  document.querySelector(".mainContent").style.display = "block";

  document.getElementById("mainhead").style.fontSize = "20px"
  document.querySelector(".headline").style.display = "block";
  document.getElementById("break").innerHTML = "Break Duration:"
  document.getElementById("mainhead").innerHTML = "Study Duration:";
  document.getElementById('title').style.height = "65px";
  document.querySelector('#title h1').style.fontSize = "40px";
  document.querySelector('.burger').style.marginLeft = "20px"
  document.querySelector('.burger').style.marginTop = "0"
}


const pause = () => {
  if (paused == false) {
    document.getElementById("demo").style.color = "#333";
    paused = true;
    progressBar.style.background = `conic-gradient(${color} ${(time / original) * 360}deg, #ededed 0deg)`;
    document.querySelector("#pause span").innerHTML = "play_arrow";
    document.querySelector("#pause").style.backgroundColor = "#333";
    document.getElementById("demo").style.fontWeight = "400"
    document.getElementById("timer-div").classList.add("paused")
    document.getElementById("demo").classList.add("paused")
  } else {
    document.getElementById("demo").style.color = "#3a9eb7";
    paused = false;
    progressBar.style.background = `conic-gradient(${color} ${(time / original) * 360}deg, #ededed 0deg)`;
    document.querySelector("#pause span").innerHTML = "pause";
    document.querySelector("#pause").style.backgroundColor = "#3a9eb7";
    document.getElementById("demo").style.fontWeight = "700"
    document.getElementById("timer-div").classList.remove("paused")
    document.getElementById("demo").classList.remove("paused")
  }
}
document.getElementById("pause").onclick = pause;


hoursStudy = document.getElementById("hoursStudy");
minutesStudy = document.getElementById("minutesStudy");
hoursBreak = document.getElementById("hoursBreak");
minutesBreak = document.getElementById("minutesBreak");

const manageHoursInput = (thing) => {
  let value = document.getElementById(thing).value
  if (value > 23) {
    document.getElementById(thing).value = 23;
  } else if (value < 0) {
    document.getElementById(thing).value = 0;
  }
  if ((document.getElementById("minutesBreak").value > 0 || document.getElementById("hoursBreak").value > 0) && (document.getElementById("minutesStudy").value > 0 || document.getElementById("hoursStudy").value > 0)) {
    document.getElementById("enter").classList.remove("inactive");
  } else {
    document.getElementById("enter").classList.add("inactive");
  }
}

const manageMinutesInput = (thing) => {
  let value = document.getElementById(thing).value;
  if (value > 59) {
    document.getElementById(thing).value = 59;
  } else if (value < 0) {
    document.getElementById(thing).value = 0;
  }
  if ((document.getElementById("minutesBreak").value > 0 || document.getElementById("hoursBreak").value > 0) && (document.getElementById("minutesStudy").value > 0 || document.getElementById("hoursStudy").value > 0)) {
    document.getElementById("enter").classList.remove("inactive");
  } else {
    document.getElementById("enter").classList.add("inactive");
  }
}

hoursStudy.oninput = () => manageHoursInput("hoursStudy");
hoursBreak.oninput = () => manageHoursInput("hoursBreak");
minutesStudy.oninput = () => manageMinutesInput("minutesStudy");
minutesBreak.oninput = () => manageMinutesInput("minutesBreak");

document.body.onkeydown = e => {
  if (e.key === " " && mode) pause();
}
    

