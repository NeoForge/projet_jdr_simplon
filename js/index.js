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

let mainBody = document.getElementById("Main");

function dotheThing()
{
    let newDiv = document.createElement("div");
    newDiv.innerHTML=templatestory;
    mainBody.appendChild(newDiv);
}
