
let mainBody = document.querySelector("#Main")
let indexStory = 0;
let storyString = "1";
let DataStoryJson;
let DataQuestionJson;
let LastQuestionId ;

async function testFetch() {
  fetch('../js/story.json')
    .then(response => response.json())
    .then(data => DataStoryJson = data)
    .catch(error => console.log(error));

  fetch('../js/question.json')
    .then(response => response.json())
    .then(data => DataQuestionJson = data)
    .catch(error => console.log(error));

}

function Start() {
  let FinalString;
  if(indexStory>0)
  {
    FinalString = DataQuestionJson[LastQuestionId].Response + DataStoryJson[indexStory].body
  }
  else
  {
    FinalString = DataStoryJson[indexStory].body
  }
  console.log(FinalString)
  for (let i = 0; i < Object.keys(DataQuestionJson).length; i++) {
    if (DataQuestionJson[i].storyid == indexStory) {
      console.log(DataQuestionJson[i].body);
    }
  }
}

function clickButton(int)
{
  LastQuestionId=int;
  indexStory++;
  Start();
}
