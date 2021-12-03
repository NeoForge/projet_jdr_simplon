let DataStoryJson;
let DataQuestionJson;
const storyTitle = document.querySelector(".card-header");
const storyTexte = document.querySelector(".StoryContent");
const question = document.querySelector(".questionContent");
const choice1 = document.querySelector(".ChoiceOne");
const choice2 = document.querySelector(".ChoiceTwo");
const choice3 = document.querySelector(".ChoiceThree");
const mainBody = document.querySelector("#Main");
const box = document.querySelector(".box");
const audio = document.querySelector("audio");
const voice = document.querySelector(".muteVoice")
const muteSong = document.querySelector(".mute")
const body = document.body;
let storyId = 0;
let answer, c1, c2, c3;
let game, raining, snowing;
let voiceArray;
let muteVoice = false;
let msg;

function Speak(what) {
  if (muteVoice == false) {

    let finalSpeech;
    switch (what) {
      case 0:
        {
          finalSpeech = storyTitle.innerHTML;
          break;
        }
      case 1:
        {
          finalSpeech = storyTexte.innerHTML;
          break;
        }
      case 2:
        {
          finalSpeech = question.innerHTML;
          break;
        }
      case 3:
        {
          finalSpeech = choice1.innerHTML;
          break;
        }
      case 4:
        {
          finalSpeech = choice2.innerHTML;
          break;
        }
      case 5:
        {
          finalSpeech = choice3.innerHTML;
          break;
        }
    }
    msg = new SpeechSynthesisUtterance(finalSpeech);
    msg.voice = voiceArray[37];
    //Voix canada 37
    //Voix RUsse 67
    window.speechSynthesis.speak(msg);

  }
}
function StopSpeak() {
  window.speechSynthesis.cancel()
}
let timer = setInterval(function () {
  voiceArray = speechSynthesis.getVoices();
  console.log(voiceArray);
  if (voiceArray.length !== 0) {
    clearInterval(timer);
  }
}, 200);


fetchInfo();
buttonstart()
async function fetchInfo() {
  fetch('../js/story.json')
    .then(response => response.json())
    .then(data => DataStoryJson = data)
    .catch(error => console.log(error));
  fetch('../js/question.json')
    .then(response => response.json())
    .then(data => DataQuestionJson = data)
    .catch(error => console.log(error));
}

function buttonstart() {
  let buttonStart = document.createElement("button");
  box.hidden = true;
  buttonStart.innerHTML = "START";
  mainBody.append(buttonStart);
  buttonStart.addEventListener('click', () => {
    start();
    audio.play();
    box.hidden = false;
    buttonStart.hidden = true;
  })
}

// ===============> Mute <============================
function btnMute() {
  if (audio.muted === false) {
    audio.muted = true;
    muteVoice = true;
    muteSong.innerHTML = "Unmute song"
    console.log(audio.muted)
  }
  else {
    audio.muted = false;
    muteVoice = false;
    muteSong.innerHTML = "Mute song"
    console.log(audio.muted)
    audio.innerHTML = "mute";
  }
}
function btnmuteVoice() {
  if (muteVoice === false) {
    muteVoice = true;
    voice.innerHTML = "Unmute Voice"
  }
  else {
    muteVoice = false;
    voice.innerHTML = "Mute Voice"
    console.log(muteVoice)

  }
}


function start() {
  let story;
  console.log("Story Id : " + storyId + "/" + Object.keys(DataStoryJson).length);
  console.log(storyId < Object.keys(DataStoryJson).length);

  if (storyId < Object.keys(DataStoryJson).length) {
    if (DataStoryJson[storyId].meteo == "rain") {
      raining = setInterval(rain, 10);
    } else if (DataStoryJson[storyId].meteo == "snow") {
      snowing = setInterval(snow, 10);
    } else if (DataStoryJson[storyId].meteo == "sun") {
      stopWeather()
    }
    if (storyId > 0) {
      story = DataQuestionJson[answer].resultat + " <br /><br />" + DataStoryJson[storyId].body
    } else {
      story = DataStoryJson[storyId].body
    }
    storyTitle.innerHTML = DataStoryJson[storyId].title;
    storyTexte.innerHTML = story;
    question.innerHTML = DataStoryJson[storyId].question;
    for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
      if (DataQuestionJson[i].storyid == storyId) {
        if (DataQuestionJson[i].choiceid == '1') {
          choice1.innerHTML = DataQuestionJson[i].body;
          c1 = i;
        }
        if (DataQuestionJson[i].choiceid == '2') {
          choice2.innerHTML = DataQuestionJson[i].body;
          c2 = i;
        }
        if (DataQuestionJson[i].choiceid == '3') {
          choice3.innerHTML = DataQuestionJson[i].body;
          c3 = i;
        }
      }
    }
  } else {
    console.log("Hello this is the end");
    // Début de ajout de Kevin pour End Box
    box.innerHTML = " ";
    restart();
  }


  // Fin de ajout de Kevin pour End Box
}

function restart() {
  let buttonRestart = document.createElement("button");
  box.hidden = true;
  buttonRestart.innerHTML = "Restart";
  mainBody.append(buttonRestart);
  buttonRestart.addEventListener('click', () => {
    reload()
  });
}
function reload() {
  window.location.reload()
}
function clickButton(choice) {
  if (choice == 1) {
    answer = c1;
    storyId++;
  } else if (choice == 2) {
    answer = c2;
    storyId++;
  } else if (choice == 3) {
    answer = c3;
    storyId++;
  }
  start();
}

// =============> Weather  <==============
function rain() {
  const waterDrop = document.createElement('i');
  waterDrop.classList.add('fas');
  waterDrop.classList.add('fa-tint');
  waterDrop.style.fontSize = Math.random() * 10 + 'px';
  waterDrop.style.animationDuration = Math.random() * 7 + 's';
  waterDrop.opacity = Math.random();
  waterDrop.style.left = Math.random() * window.innerWidth + 'px';
  body.appendChild(waterDrop);
  setTimeout(() => {
    waterDrop.remove();
  }, 6000)
}

function snow() {
  const waterDrop = document.createElement('i');
  waterDrop.classList.add('far');
  waterDrop.classList.add('fa-snowflake');
  waterDrop.style.fontSize = Math.random() * 8 + 'px';
  waterDrop.style.animationDuration = Math.random() * 9 + 's';
  waterDrop.opacity = Math.random() + 0.3;
  waterDrop.style.left = Math.random() * window.innerWidth + 'px';
  body.appendChild(waterDrop);
  setTimeout(() => {
    waterDrop.remove();
  }, 10000)
}

function stopWeather() {
  clearInterval(raining);
  clearInterval(snowing);
}

