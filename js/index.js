let DataStoryJson;
let DataQuestionJson;
const storyTitle = document.querySelector(".card-header");
const storyTexte = document.querySelector(".StoryContent");
const question = document.querySelector(".questionContent");
const choice1 = document.querySelector(".ChoiceOne");
const choice2 = document.querySelector(".ChoiceTwo");
const choice3 = document.querySelector(".ChoiceThree");
const mainBody = document.querySelector("#Main");
const box = document.querySelector(".box")
const body = document.body;

let storyId = 0;
let answer, c1, c2, c3;
let game, raining, snowing;

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

function buttonstart(){
  let buttonStart = document.createElement("button");
  box.hidden = true;
  buttonStart.innerHTML = "START";
  mainBody.append(buttonStart);
  buttonStart.addEventListener('click',() => {
    start();
    box.hidden = false;
    buttonStart.hidden = true;
  })
}



function start() {
  let story;
  if(DataStoryJson[storyId].meteo == "rain"){
    raining = setInterval(rain, 10);
  } else if (DataStoryJson[storyId].meteo == "snow"){
    snowing = setInterval(snow, 10);
  } else if (DataStoryJson[storyId].meteo == "sun"){
    stopWeather()
  }
  if (storyId < Object.keys(DataStoryJson).length) {
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
    // Début de ajout de Kevin pour End Box
      box.innerHTML = " ";
    restart();
    }


    // Fin de ajout de Kevin pour End Box
  }

function restart (){
  let buttonRestart = document.createElement("button");
  box.hidden = true;
  buttonRestart.innerHTML = "Restart";
  mainBody.append(buttonRestart);
  buttonRestart.addEventListener('click',() => {
    reload()
  });
}
function reload()
{
  window.location.reload()
}
function clickButton(choice) {
  if (choice == 1) {
    answer = c1;
    storyId++;
    console.log('choix 1 click btn', answer)
  } else if (choice == 2) {
    answer = c2;
    storyId++;
    console.log('choix 2 click btn', answer)
  } else if (choice == 3) {
    answer = c3;
    storyId++;
    console.log('choix 3 click btn', answer)
  }
  start();
}

// =============> Weather  <==============
function rain() {
  const waterDrop = document.createElement('i');
  waterDrop.classList.add('fas');
  waterDrop.classList.add('fa-tint');
  waterDrop.style.fontSize = Math.random()* 10 + 'px';
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
  waterDrop.style.fontSize = Math.random()* 8 + 'px';
  waterDrop.style.animationDuration = Math.random() * 9 + 's';
  waterDrop.opacity = Math.random() + 0.3;
  waterDrop.style.left = Math.random() * window.innerWidth + 'px';
  body.appendChild(waterDrop);
  setTimeout(() => {
    waterDrop.remove();
  }, 10000)
}

function stopWeather(){
  clearInterval(raining);
  clearInterval(snowing);
}

// function dotheThing(response)
// {
//     let newDiv = document.createElement("div");
//     newDiv.innerHTML=response;
//     mainBody.append(newDiv);
// }

// function history(txt) {
//   let newDiv = document.createElement("div");
//   newDiv.innerHTML= txt;
//   mainBody.append(newDiv);
// }

// function question(length, a, b, c, ra, rb, rc) {
//   let newbutton1 = document.createElement("button");
//   let newbutton2 = document.createElement("button");
//   let newbutton3 = document.createElement("button");
//   newbutton1.innerHTML = a;
//   newbutton2.innerHTML = b;
//   newbutton3.innerHTML = c;
//   if (length == 2){
//     mainBody.append(newbutton1);
//     mainBody.append(newbutton2);
//   } else if (length == 3) {
//     mainBody.append(newbutton1);
//     mainBody.append(newbutton2);
//     mainBody.append(newbutton3);
//   }
//   newbutton1.addEventListener('click', ()=> {
//     dotheThing(ra);
//     for(let i = 1; i <= length; i++){
//       eval('newbutton'+ i ).remove();
//     }
//     compteur++;
//     question(3, eval('c'+compteur+'a'), eval('c'+compteur+'b'), eval('c'+compteur+'c'), eval('r'+compteur+'a'), eval('r'+compteur+'b'), eval('c'+compteur+'c')); 
//   })
//   newbutton2.addEventListener('click', ()=> {
//     dotheThing(rb);
//     for(let i = 1; i <= length; i++){
//       eval('newbutton'+ i ).remove();
//     } 
//     compteur++;
//     question(3, eval('c'+compteur+'a'), eval('c'+compteur+'b'), eval('c'+compteur+'c'), eval('r'+compteur+'a'), eval('r'+compteur+'b'), eval('c'+compteur+'c')); 
//   })
//   newbutton3.addEventListener('click', ()=> {
//     dotheThing(rc);
//     for(let i = 1; i <= length; i++){
//       eval('newbutton'+ i ).remove();
//     } 
//     compteur++;
//     question(3, eval('c'+compteur+'a'), eval('c'+compteur+'b'), eval('c'+compteur+'c'), eval('r'+compteur+'a'), eval('r'+compteur+'b'), eval('c'+compteur+'c'));  
//   })
// }

// function start() {
//     history(templatestory)
//     question(3, eval('c'+compteur+'a'), eval('c'+compteur+'b'), eval('c'+compteur+'c'), eval('r'+compteur+'a'), eval('r'+compteur+'b'), eval('c'+compteur+'c'));
// }