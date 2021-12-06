let DataStoryJson;
let DataQuestionJson;

// Selectors
const storyTitle = document.querySelector(".card-header");
const storyTexte = document.querySelector(".StoryContent");
const question = document.querySelector(".questionContent");
const choice1 = document.querySelector(".ChoiceOne");
const choice2 = document.querySelector(".ChoiceTwo");
const choice3 = document.querySelector(".ChoiceThree");
const mainBody = document.querySelector("#Main");
const box = document.querySelector(".box");
const voice = document.querySelector(".muteVoice");
const ending = document.querySelector(".card_ending");
const imgPnj = document.querySelector(".img-pnj");
const imgHero = document.querySelector(".img-hero");
const backgroundBody = document.querySelector('body');
const powerOfLove = document.querySelector(".power_of_love");
const ghostbuster = document.querySelector(".ghostbusters");
const makeAChoice = document.querySelector(".makeAChoice");
let startScreen = document.querySelector(".btn-start");
let muteSong = document.querySelector(".mute");
const body = document.body;

// VARIABLES

var selectHero;

let storyId = 0;
let answer, c1, c2, c3;
let game, raining, snowing;
let choiceHero;
let voiceArray;
let muteVoice = false;
let muteTheSong = false;
let msg;
let choiceArray = [];


// FETCH DATA JSON

fetchInfo();
buttonstart();
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

// GAME LOOP
let hasBottle = true;
function start(choiceHero) {
  StopSpeak();
  let story;
  // console.log("Story Id : " + storyId + "/" + Object.keys(DataStoryJson).length);
  // console.log(storyId < Object.keys(DataStoryJson).length);
  if (storyId < Object.keys(DataStoryJson).length) {
    if (choiceArray[0] == "1" || choiceArray[2] == "7" || choiceArray[4] == "12" || choiceArray[5] == "15" || choiceArray[8] == "24" || choiceArray[9] == "29") {
      gameOver();
      tryAgain();
    }
    if (DataStoryJson[storyId].meteo == "rain") {
      raining = setInterval(rain, 1);
    } else if (DataStoryJson[storyId].meteo == "snow") {
      snowing = setInterval(snow, 100);
    } else if (DataStoryJson[storyId].meteo == "sun") {
      stopWeather();
    }
    if (storyId > 0) {
      urlImage = "url('../assets/" + DataStoryJson[storyId].background + "')";
      if (storyId == 7 && selectHero == "Bill") {
        story = DataQuestionJson[answer].resultat + " <br /><br />" + DataStoryJson[storyId].body1;
      } else if (storyId == 7 && selectHero == "Marty") {
        story = DataQuestionJson[answer].resultat + " <br /><br />" + DataStoryJson[storyId].body2;
      } else {
        story = DataQuestionJson[answer].resultat + " <br /><br />" + DataStoryJson[storyId].body;
      }
      body.style.backgroundImage = urlImage;
      imgPnj.src = DataStoryJson[storyId].imagePnj;
      if (selectHero == "Bill") {
        imgHero.src = DataStoryJson[storyId].imageHero1;
      } else if (selectHero == "Marty") {
        imgHero.src = DataStoryJson[storyId].imageHero2;
      }

    } else {
      story = DataStoryJson[storyId].body;
      if (selectHero == "Bill") {
        imgHero.src = DataStoryJson[storyId].imageHero1;
      } else if (selectHero == "Marty") {
        imgHero.src = DataStoryJson[storyId].imageHero2;
      }
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
          if(storyId == 9 && hasBottle)
          {
            choice3.innerHTML = DataQuestionJson[i].body2;
          }
          else if(storyId == 9 && !hasBottle)
          {
            choice3.innerHTML = DataQuestionJson[i].body1;
          }
          else
          {
            choice3.innerHTML = DataQuestionJson[i].body;
          }
          c3 = i;
        }
      }
    }
  } else {
    box.innerHTML = " ";
    box.hidden = true;
    endBox();
    restart();
  }
  return choiceHero;
}

// RESUME END GAME
let StoryToSay = "";
function endBox() { // ending = varialble js / card_ending = HTML
  StopSpeak();
  ending.style.display = "flex";
  ending.innerHTML += `<h4 class="win">Félicitation ! vous avez vaincu le Roi des Scorpions !!</h4>`;
  StoryToSay = "Félicitation ! vous avez vaincu le Roi des Scorpions !! ";
  let storyRank = 0;
  choiceArray.forEach(element => {
    StoryToSay = " " + DataStoryJson[storyRank].title + " " + DataStoryJson[storyRank].body + " " + DataQuestionJson[storyId].body + " " + DataQuestionJson[element].resultat;
    ending.innerHTML += `<h5 class="card-header">${DataStoryJson[storyRank].title}</h5>`;
    if(storyRank == 7 && selectHero == "Bill") {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body1}</p>`;
    } else if (storyRank == 7 && selectHero == "Marty") {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body2}</p>`;
    } else {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body}</p>`;
    } 
    if (storyRank == 9 && hasBottle  && element == 29) {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body2}</p>`;
    ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat2}</p>`;
    } else if (storyRank == 9 && !hasBottle  && element == 29) {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body1}</p>`;
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat1}</p>`;
    } else {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body}</p>`;
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat}</p>`;
    }
    storyRank++;
  });
  ending.scrollTop = ending.scrollHeight;
  Speak(6);
}

// GAME OVER 

function gameOver() {
  StopSpeak();
  ending.style.display = "flex";
  ending.innerHTML += `<h4 class="nowin">GAME OVER</h4>`;
  let storyRank = 0;
  StoryToSay = "Game Over ";
  choiceArray.forEach(element => {
    StoryToSay = " " + DataStoryJson[storyRank].title + " " + DataStoryJson[storyRank].body + " " + DataQuestionJson[storyId].body + " " + DataQuestionJson[element].resultat;
    ending.innerHTML += `<h5 class="card-header">${DataStoryJson[storyRank].title}</h5>`;
    if(storyRank == 7 && selectHero == "Bill") {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body1}</p>`;
    } else if (storyRank == 7 && selectHero == "Marty") {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body2}</p>`;
    } else {
      ending.innerHTML += `<p class="card-text StoryContent">${DataStoryJson[storyRank].body}</p>`;
    } 
    if (storyRank == 9 && hasBottle) {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body2}</p>`;
    ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat2}</p>`;
    } else if (storyRank == 9 && !hasBottle) {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body1}</p>`;
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat1}</p>`;
    } else {
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].body}</p>`;
      ending.innerHTML += `<p class="card-text StoryContent">${DataQuestionJson[element].resultat}</p>`;
    }
    storyRank++;
  });
  ending.scrollTop = ending.scrollHeight;
  Speak(6);
}

// ======================> VOICE SPEAK <===================

function Speak(what) {
  StopSpeak();
  if (muteVoice == false) {
    let finalSpeech;
    switch (what) {
      case 0:
        {
          finalSpeech = DataStoryJson[storyId].title;
          break;
        }
      case 1:
        {
          if (storyId > 0) {
            finalSpeech = DataQuestionJson[answer].resultat + DataStoryJson[storyId].body;
          }
          else {
            finalSpeech = DataStoryJson[storyId].body;
          }
          break;
        }
      case 2:
        {
          finalSpeech = DataStoryJson[storyId].question;
          break;
        }
      case 3:
        {
          for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
            if (DataQuestionJson[i].storyid == storyId) {
              if (DataQuestionJson[i].choiceid == 1) {
                finalSpeech = DataQuestionJson[i].body;
                break;
              }
            }
          }
          break;
        }
      case 4:
        {
          for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
            if (DataQuestionJson[i].storyid == storyId) {
              if (DataQuestionJson[i].choiceid == 2) {
                finalSpeech = DataQuestionJson[i].body;
                break;
              }
            }
          }
          break;
        }
      case 5:
        {
          for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
            if (DataQuestionJson[i].storyid == storyId) {
              if (DataQuestionJson[i].choiceid == 3) {
                finalSpeech = DataQuestionJson[i].body;
                break;
              }
            }
          }
          break;
        }
      case 6:
        {
          finalSpeech = StoryToSay;
          break;
        }
    }
    msg = new SpeechSynthesisUtterance(finalSpeech);
    msg.voice = voiceArray[37];
    //Voix canada 37
    //Voix RUsse 67
    window.speechSynthesis.speak(msg);
  }
  else {
    StopSpeak();
  }
}

// STOP SPEAK

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


// =====================> BUTTONS <===============================

// BUTTON CHOICES

function clickButton(choice) {
  if (choice == 1) {
    answer = c1;
    choiceArray[storyId] = answer;
    storyId++;
  } else if (choice == 2) {
    answer = c2;
    if(storyId == 5 )
    {
      hasBottle = false;
    }
    choiceArray[storyId] = answer;
    storyId++;
  } else if (choice == 3) {
    answer = c3;
    choiceArray[storyId] = answer;
    storyId++;
  }
  start();
}

// BUTTON START

function buttonstart() {
  StopSpeak();
  let choiceHero = "";
  let buttonStart = document.createElement("button");
  let btnHero1 = document.createElement("button");
  let btnHero2 = document.createElement("button");
  buttonStart.className = "start";
  btnHero1.className = "Bill";
  btnHero2.className = "Marty";
  btnHero1.addEventListener('click', () => {
    choiceHero = "Bill";
    makeAChoice.innerHTML = "A moins que vous ne soyez une pizza, la réponse est oui : je peux vivre sans vous.";
    startScreen.append(makeAChoice);
  });
  btnHero2.addEventListener('click', () => {
    choiceHero = "Marty";
    makeAChoice.innerHTML = "Nom de Zeus !";
    startScreen.append(makeAChoice)
  });
  box.hidden = true;
  buttonStart.innerHTML = "START";
  btnHero1.innerHTML = "Bill Murray";
  btnHero2.innerHTML = "Marty Mcfly";
  startScreen.append(btnHero1);
  startScreen.append(btnHero2);
  startScreen.append(buttonStart);
  buttonStart.addEventListener('click', () => {
    if (choiceHero == "") {
      makeAChoice.innerHTML = "Veuillez choisir un Hero";
      startScreen.append(makeAChoice)
    } else if (choiceHero == "Bill") {
      ghostbuster.volume = 0.3;
      ghostbuster.play();
      box.hidden = false;
      startScreen.hidden = true;
      buttonStart.hidden = true;
      choiceHero = "Bill";
      start(choiceHero);
      globalThis.selectHero = choiceHero;
    }
    else if (choiceHero == "Marty") {
      powerOfLove.volume = 0.3;
      powerOfLove.play();
      box.hidden = false;
      buttonStart.hidden = true;
      startScreen.hidden = true;
      choiceHero = "Marty";
      globalThis.selectHero = choiceHero;
      start(choiceHero);
    }
  })
}

// BUTTON RESTART

function restart() {
  let buttonRestart = document.createElement("button");
  buttonRestart.className = "restart";
  box.hidden = true;
  buttonRestart.innerHTML = "Restart";
  ending.append(buttonRestart);
  buttonRestart.addEventListener('click', () => {
    reload()
  });
}



//BUTTON TRY AGAIN

function tryAgain() {
  let buttonTryAgain = document.createElement("button");
  buttonTryAgain.className = "tryAgain";
  box.hidden = true;
  buttonTryAgain.innerHTML = "Try again";
  ending.append(buttonTryAgain);
  buttonTryAgain.addEventListener('click', () => {
    reload()
  });
}

// RELOAD GAME

function reload() {

  window.location.reload()

}

//BUTTON MUTE SONG

function btnMute() {
  if (powerOfLove.muted === false || ghostbuster.muted === false) {
    powerOfLove.muted = true;
    ghostbuster.muted = true;
    muteTheSong = true;
    muteSong.innerHTML = "&#128263;";
  }
  else {
    powerOfLove.muted = false;
    ghostbuster.muted = false;
    muteTheSong = false;
    muteSong.innerHTML = "&#127925;";
  }
}

// BUTTON MUTE VOICE

function btnmuteVoice() {
  if (muteVoice === false) {
    muteVoice = true;
    voice.innerHTML = "&#128586;"
    StopSpeak();
  }
  else {
    muteVoice = false;
    voice.innerHTML = "&#128483;"
  }
}


// =============> WEATHER <==============

function rain() {
  const waterDrop = document.createElement('i');
  waterDrop.classList.add('fas');
  waterDrop.classList.add('fa-tint');
  waterDrop.style.fontSize = Math.random() * 10 + 'px';
  waterDrop.style.animationDuration = Math.random() * 7 + 's';
  waterDrop.opacity = Math.random() + 0.3;
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
