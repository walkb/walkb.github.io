// settings

var defaultWork = 25;
var defaultBreak = 5;
var notifications = false;
var isBreak = false;
var settingsVisible = false;

var timeInterval = null;
var isRunning = false;
var clock = null;

const blue = 0;
const red = 1;
const blue_gray = 2;
const red_gray = 3;

function changeColor(num) {
  switch (num) {
    case 0:
      $("#pomobox").animate({ backgroundColor: "#7488c3" });
      break;
    case 1:
      $("#pomobox").animate({ backgroundColor: "#b54a4a" });
      break;
    case 2:
      $("#pomobox").animate({ backgroundColor: "#6e727c" });
      break;
    case 3:
      $("#pomobox").animate({ backgroundColor: "#7c6e6e" });
      break;
  }
}




function toggleSettings() {
  if (settingsVisible) {
    $("#settings_tab").animate({ opacity: 0 }, function() {
      document.getElementById("settings_tab").style.display = "none";
    });
    settingsVisible = false;
    console.log("...");
    // move pomo box up
    // fade settings in
  }
  else {
    document.getElementById("settings_tab").style.display = "flex";
    $("#settings_tab").animate({ opacity: 1 })

    settingsVisible = true;
    // fade settings out
    // move pomo box down
  }
}

function resetOnBlur() {
  if (!isRunning) {
    if (isBreak) {
      var minutes = document.getElementById("break_min_input").value;
    }
    else {
      var minutes = document.getElementById("work_min_input").value;
    }
    current = new Countdown(minutes, 0);
    display();
  }
}

function toggleBreakButton() {
  var button = document.getElementById("switch_button");
  if (isRunning == true) {
    button.disabled = true;
  }
  else {
    button.disabled = false;
  }
}

// swap to break

function toggleBreak() {
  isBreak = !isBreak;
  if (isBreak) {

    var minutes = document.getElementById("break_min_input").value;
    changeColor(blue);
    // make it pretty and calming
  }
  else {
    var minutes = document.getElementById("work_min_input").value;
    changeColor(red);
    // make it not that
  }
  current = new Countdown(minutes, 0);
  display();
}

// alert and notifications

function playAlert() {
  var sound = document.getElementById('alert_sound')
  sound.volume = 0.2;
  sound.play();
}

// code from Mozilla
// function askNotification() {
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     notifications = true;
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         notifications = true;
//         console.log("notifications granted");
//       }
//     });
//   }
// }

var options = {
  body: 'This is where a message body goes.',
  silent: true
}

function sendNotification(msg) {
  alert(msg);
  playAlert();
}

// timer functionality

class Countdown {
  constructor(min, sec) {
    this.minutes = min;
    this.seconds = sec;
    this.target = new Date();
    // sets the target -- one minute is 60000 ms and a second is 1000 ms
    this.target.setTime(this.target.getTime() + min * 60000 + sec * 1000);
  }

  isDone() {
    if (Date.now() >= this.target.getTime()) {
      return true;
    }
    return false;
  }

  tick() {
    if (this.isDone()) {
      clearInterval(timeInterval);
      isRunning = false;
      if (isBreak) {
        sendNotification("Back to work!");
      }
      else {
        sendNotification("Take a breather!");
      }
      toggleBreak();
    }
    else {
      this.minutes = Math.floor((this.target.getTime() - Date.now()) / 60000);
      this.seconds = Math.floor(((this.target.getTime() - Date.now()) % 60000) / 1000);
    }
  }
}


var current = new Countdown(0, 0);

function display() {
  clock.innerHTML = current.minutes + "M " + current.seconds + "S";
}

function startTimer() {
  // if (!notifications) {
  //   askNotification();
  // }
  // check if already running
  if (!isRunning) {
    isRunning = true;
    //check resume
    if (current.isDone()) {
      // starting a new timer
      if (isBreak) {
        var minutes = document.getElementById("break_min_input").value;
      }
      else {
        var minutes = document.getElementById("work_min_input").value;
      }
      current = new Countdown(minutes, 0);
    }
    // enable pause button
    var button = document.getElementById("pause_button");
    button.disabled = false;
    // fix color
    if (isBreak) {
      changeColor(blue);
    }
    else {
      changeColor(red);
    }
    // resuming / starting
    toggleBreakButton();
    display();
    tick();
    timeInterval = setInterval(tick, 500);
  }
}

function pauseTimer() {
  var button = document.getElementById("pause_button");
  button.disabled = true;
  clearInterval(timeInterval);
  isRunning = false;
  if (isBreak) {
    changeColor(blue_gray);
  }
  else {
    changeColor(red_gray);
  }
}

function resetTimer() {
  clearInterval(timeInterval);
  isRunning = false;
  toggleBreakButton();
  if (isBreak) {
    changeColor(blue);
    var minutes = document.getElementById("break_min_input").value;
  }
  else {
    changeColor(red);
    var minutes = document.getElementById("work_min_input").value;
  }
  current = new Countdown(minutes, 0);
  display();
}

function tick() {
  // tick countdown
  current.tick();
  // adjust timer
  if (!current.isDone()) {
    display();
  }
  else {
    clock.innerHTML = "Done!"
  }
}

const in_reset = 0;
const in_start = 1;
const in_pause = 2;
const in_switch = 3;
const in_settings = 4;
// main function

function main(input) {
  // ensure clock is initialized
  clock = document.getElementById("clock");
  switch (input) {
    case 0:
      resetTimer();
      break;
    case 1:
      startTimer();
      break;
    case 2:
      pauseTimer();
      break;
    case 3:
      toggleBreak();
      break;
    case 4:
      toggleSettings();
      break;
  }
}