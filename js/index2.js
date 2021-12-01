
let mainBody = document.querySelector("#Main")
let Title;
let Story;
let indexStory = 0;
let storyString = "";

let q1;
let q2;
let q3;







function test()
{
 
}

function newStory() {
  let templateStory =
    `
<div class="card-body">
  <p class="card-text">${Story}</p>
</div>`
  let newDiv = document.createElement("div");
  newDiv.innerHTML = templateStory;
  newDiv.classList.add("card");
  newDiv.id = `story${indexStory}`;
  indexStory++;
  mainBody.appendChild(newDiv);
}

function newQuestion() {
  let newDiv = document.createElement("div");
  newDiv.classList.add("list-group");
  let templateQuestion = `
  <button type="button" onclick="choice(1)" class="list-group-item list-group-item-action">${q1}</button>
  <button type="button" onclick="choice(2)" class="list-group-item list-group-item-action">${q2}</button>
  <button type="button" onclick="choice(3)" class="list-group-item list-group-item-action">${q3}</button>`
  newDiv.innerHTML = templateQuestion;
  mainBody.appendChild(newDiv);
}


function Start() {
  Title = "L'AVENTURE DE SCORPION BUSTER"
  Story = "You are Scorpion Buster, a survivor trying to survive in a post apocalyptic world by scavenging among the ruins of what is left. You have a backpack and a canteen. You haven't eaten in two days so you're desperately searching for food. You enter a rundown building and  find a wounded mutant child in a corner. You help it stand up and then grab it by it's shoulder to help it hobble toward you."
  newStory();
  Title = "Vous trouvez un enfant"
  Story = "L'enfant Mutant est blessé que faites vous"
  newStory();
  q1 = "Vous tuer l'enfant"
  q2 = "Vous amenez l'enfant au bar"
  q3 = "Vous soignez l'enfant"
  newQuestion();
  q1 = "Vous tueeeeeeeeeeeent"
  q2 = "Vous ameneeeeeeeeeeeeeeu bar"
  q3 = "Vous soignez l'enfantzzzzzzzzzzzzzzz"
  newQuestion();
}



function choice(int) {
  switch (int) {
    case 1:
      { console.log("1");break; }
    case 2:
      { console.log("2");break; }
    case 3:
      { console.log("3");break; }
  }
}


