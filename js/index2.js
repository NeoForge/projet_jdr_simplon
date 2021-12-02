
let mainBody = document.querySelector("#Main")
let indexStory = 0;
let storyString = "1";
let DataStoryJson;
let DataQuestionJson;
let LastQuestionId;

let TitleCard = document.querySelector(".card-header");
let StoryCard = document.querySelector(".StoryContent");
let QuestionCard = document.querySelector(".questionContent")
let ChoiceOne = document.querySelector(".ChoiceOne");
let ChoiceTwo = document.querySelector(".ChoiceTwo");
let ChoiceThree = document.querySelector(".ChoiceThree");

let LastChoiceOne;
let LastChoiceTwo;
let LastChoiceThree;
let waiting = true;

let choiceArray = [];
let voiceArray;
let msg;

fetchInfo()


function Speak(what)
{
  let finalSpeech;
    switch(what)
    {
      case 0:
        {
          finalSpeech = TitleCard.innerHTML;
          break;
        }
        case 1:
        {
          finalSpeech = StoryCard.innerHTML;
          break;
        }
        case 2:
        {
          finalSpeech = QuestionCard.innerHTML;
          break;
        }
        case 3:
        {
          finalSpeech = ChoiceOne.innerHTML;
          break;
        }
        case 4:
        {
          finalSpeech = ChoiceTwo.innerHTML;
          break;
        }
        case 5:
        {
          finalSpeech = ChoiceThree.innerHTML;
          break;
        }
    }
    msg = new SpeechSynthesisUtterance(finalSpeech);
    msg.voice = voiceArray[37];
    window.speechSynthesis.speak(msg);
}
function StopSpeak()
{
  window.speechSynthesis.cancel()
}
let timer = setInterval(function() {
  voiceArray = speechSynthesis.getVoices();
  console.log(voiceArray);
  if (voiceArray.length !== 0) {
    clearInterval(timer);
  }
}, 200);

async function fetchInfo() {
  fetch('../js/story.json')
    .then(response => response.json())
    .then(data => DataStoryJson = data)
    .catch(error => console.log(error));
  fetch('../js/question.json')
    .then(response => response.json())
    .then(data => DataQuestionJson = data)
    .catch(error => console.log(error));

  setTimeout(() => { Start() }, 150);
}


function Start() {
  let FinalString;
  if (indexStory == Object.keys(DataStoryJson).length) {
    ChoiceOne.parentElement.classList.add("disabled");
    ChoiceTwo.parentElement.classList.add("disabled");
    ChoiceThree.parentElement.classList.add("disabled");
  }
  else {
    if (indexStory > 0) {
      FinalString = DataQuestionJson[LastQuestionId].resultat + " " + DataStoryJson[indexStory].body
    }
    else {
      FinalString = DataStoryJson[indexStory].body
    }
    TitleCard.innerHTML = DataStoryJson[indexStory].title;
    StoryCard.innerHTML = FinalString;
    QuestionCard.innerHTML = DataStoryJson[indexStory].question;
    for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
      if (DataQuestionJson[i].storyid == indexStory) {
        switch (DataQuestionJson[i].choiceid) {
          case 1:
            {
              ChoiceOne.innerHTML = DataQuestionJson[i].body;
              LastChoiceOne = i;
              break;
            }
          case 2:
            {
              ChoiceTwo.innerHTML = DataQuestionJson[i].body;
              LastChoiceTwo = i;
              break;
            }
          case 3:
            {
              ChoiceThree.innerHTML = DataQuestionJson[i].body;
              LastChoiceThree = i;
              break;
            }
        }
      }
    }
  }
}

function EndGame() {
  let endContext = document.createElement("div");
  endContext.classList += "card_context";
  endContext.id += "context";
  let FinalString = "<br>" + DataStoryJson[0].title + "<br>" + DataStoryJson[0].body + " ";
  for (let i = 1; i < choiceArray.length; i++) {
    FinalString += "<br>" + DataStoryJson[i].title + "<br> " + DataQuestionJson[choiceArray[i]].resultat + " " + DataStoryJson[i].body
  }
  endContext.innerHTML = `
  <h5 class="card-header">Résumé des Actions</h5>
  <div class="card-body">
      <p class="card-text" id="StoryContent">${FinalString}</p>
  </div>`;
  mainBody.innerHTML = "";
  mainBody.appendChild(endContext);
}
// function EndGame() {

//   let FinalString;
//   mainBody.innerHTML = "";
//   for (let i = 0; i < choiceArray.length; i++) {
//     let endContext = document.createElement("div");
//     endContext.classList += "card_context";
//     endContext.id += "context";
//     if (i == 0) {
//       FinalString = DataStoryJson[0].body + " ";
//     }
//     else {
//       FinalString = " " + DataQuestionJson[choiceArray[i]].resultat + " " + DataStoryJson[i].body
//     }
//     endContext.innerHTML = `
//     <h5 class="card-header">Résumé des Actions</h5>
//     <div class="card-body">
//         <p class="card-text" id="StoryContent">${FinalString}</p>
//     </div>`
//     mainBody.appendChild(endContext);
//   }
// }




function clickButton(int) {
  if (ChoiceOne.parentElement.classList.contains("disabled")) { EndGame(); }
  else {
    switch (int) {
      case 1:
        {    
          LastQuestionId = LastChoiceOne;
          break;
        }
      case 2:
        {
          LastQuestionId = LastChoiceTwo;
          break;
        }
      case 3:
        {
          LastQuestionId = LastChoiceThree;
          break;
        }
    }
    choiceArray.push(LastQuestionId);
    indexStory++;
    Start();
  }

}
