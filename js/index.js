let emplacementHistoire = "Dans le QG des Scorpion Buster";
let TitreHistoire ="Début de l'aventure";
let TexteHistoire ="Les Scorpion Buster sont actuellement entrain de manger des croissant et des pain au chocolat offert par leur dernier client .Un peu plus tard dans la journée il reçoivent un appel d'un potentiel client , apparement une infastion de scorpion est apparue dans sont garage . Les scorpion Buster se prépare a y aller , mais comment vont-ils se rendre sur place ? :";
let templatestory = `
<div class="card">
<h5 class="card-header">${TitreHistoire}</h5>
<div class="card-body">
  <h5 class="card-title">${emplacementHistoire}</h5>
  <p class="card-text">${TexteHistoire}</p>
</div>
</div>`;
let c1a = "Je lui propose d'aller dans un bar";
let c1b = "Kill the kid";
let c1c = "I help the kid in order to heal him";
let r1a = "You take the kid to the bar. It limps along next to you, and you carry it over your shoulder like a sack of potatoes. You enter the rundown building and find a ransacked bar."
let r1b = "You pick the kid up with one arm and stab it in the chest with your knife. The kid dies in your arms and you take it's body, slinging it over your shoulders and continuing your search for food. "
let r1c =  "You find a rusty old first aid kit and a big medical needle. You use the needle to remove a sliver of metal from the mutant's foot."
let mainBody = document.getElementById("Main");

function dotheThing(response)
{
    let newDiv = document.createElement("div");
    newDiv.innerHTML=response;
    mainBody.append(newDiv);
}

function history(histoire) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML= histoire;
  mainBody.append(newDiv);
}

function question(length, a, b, c, ra, rb, rc) {
  history(templatestory)
  let newbutton1 = document.createElement("button");
  let newbutton2 = document.createElement("button");
  let newbutton3 = document.createElement("button");
  newbutton1.addEventListener('click', ()=> {
    dotheThing(ra)
  })
  newbutton2.addEventListener('click', ()=> {
    dotheThing(rb)
  })
  newbutton3.addEventListener('click', ()=> {
    dotheThing(rc)
  })
  newbutton1.innerHTML = a;
  newbutton2.innerHTML = b;
  newbutton3.innerHTML = c;
  if (length == 2){
    mainBody.append(newbutton1);
    mainBody.append(newbutton2);
  } else if (length == 3) {
    mainBody.append(newbutton1);
    mainBody.append(newbutton2);
    mainBody.append(newbutton3);
  }

}