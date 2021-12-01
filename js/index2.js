
let mainBody = document.querySelector("#Main")
let indexStory = 0;
let storyString = "1";
let DataStoryJson;
let DataQuestionJson;
let LastQuestionId;

let TitleCard = document.querySelector(".card-header");
let StoryCard = document.querySelector("#StoryContent");
let QuestionCard = document.querySelector("#questionContent")
let ChoiceOne = document.querySelector("#ChoiceOne");
let ChoiceTwo = document.querySelector("#ChoiceTwo");
let ChoiceThree = document.querySelector("#ChoiceThree");

let LastChoiceOne;
let LastChoiceTwo;
let LastChoiceThree;
let waiting = true;






fetchInfo().then(WaitForStart());



async function fetchInfo() {
  waiting=true;
  fetch('../js/story.json')
    .then(response => response.json())
    .then(data => DataStoryJson = data)
    .catch(error => console.log(error));
  fetch('../js/question.json')
    .then(response => response.json())
    .then(data => DataQuestionJson = data)
    .catch(error => console.log(error));
}

function WaitForStart()
{
  setTimeout(() => {  Start() }, 150);
}

function Start() {
  
  let FinalString;
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

function clickButton(int) {
  console.log("Ping " + int);
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
  indexStory++;
  Start();
}
