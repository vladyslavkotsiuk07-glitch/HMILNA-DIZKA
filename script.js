const modal = document.getElementById("modal");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const tableBody = document.getElementById("tableBody");

const nameInput = document.getElementById("name");
const teamInput = document.getElementById("team");
const beerInput = document.getElementById("beer");
const eventInput = document.getElementById("event");

let participants =
JSON.parse(localStorage.getItem("beerChampionship")) || [];

function saveStorage(){

localStorage.setItem(

"beerChampionship",

JSON.stringify(participants)

);

}

function renderTable(){

tableBody.innerHTML="";

participants.forEach((person,index)=>{

const row=document.createElement("tr");

row.innerHTML=`

<td>${index+1}</td>

<td>${person.name}</td>

<td>${person.team}</td>

<td>${person.beer}</td>

<td>${person.event}</td>

<td>

<button
class="deleteBtn"
onclick="deleteParticipant(${index})">

⋮

</button>

</td>

`;

tableBody.appendChild(row);

});

}

window.deleteParticipant=function(index){

if(confirm("Видалити учасника?")){

participants.splice(index,1);

saveStorage();

renderTable();

}

}

addBtn.onclick=function(){

modal.style.display="flex";

nameInput.focus();

}

cancelBtn.onclick=function(){

closeModal();

}

saveBtn.onclick=function(){

const name=nameInput.value.trim();

const team=teamInput.value.trim();

const beer=beerInput.value.trim();

const event=eventInput.value.trim();

if(

name==="" ||

team==="" ||

beer==="" ||

event===""

){

alert("Заповніть усі поля.");

return;

}

participants.push({

name,

team,

beer,

event

});

saveStorage();

renderTable();

closeModal();

}

function closeModal(){

modal.style.display="none";

clearInputs();

}

function clearInputs(){

nameInput.value="";

teamInput.value="";

beerInput.value="";

eventInput.value="";

}

window.onclick=function(e){

if(e.target===modal){

closeModal();

}

}

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

closeModal();

}

});

renderTable();
