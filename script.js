const modal = document.getElementById("modal");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const tableBody = document.getElementById("tableBody");

const nameInput = document.getElementById("name");
const eventInput = document.getElementById("event");
const teamInput = document.getElementById("team");
const beerInput = document.getElementById("beer");

const participantsCount = document.getElementById("participantsCount");
const eventsCount = document.getElementById("eventsCount");
const beerCount = document.getElementById("beerCount");

let participants =
JSON.parse(localStorage.getItem("beerChampionship")) || [];



function saveStorage(){

    localStorage.setItem(
        "beerChampionship",
        JSON.stringify(participants)
    );

}



function updateStats(){

    participantsCount.textContent = participants.length;

    const events =
        [...new Set(participants.map(p => p.event))];

    eventsCount.textContent = events.length;

    const beers =
        [...new Set(participants.map(p => p.beer))];

    beerCount.textContent = beers.length;

}



function renderTable(){

    tableBody.innerHTML = "";

    participants.forEach((person,index)=>{

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${index+1}</td>

        <td>${person.name}</td>

        <td>${person.event}</td>

        <td>${person.team}</td>

        <td>${person.beer}</td>

        <td>

            <button
            class="deleteBtn"
            onclick="deleteParticipant(${index})">

                🗑

            </button>

        </td>

        `;

        tableBody.appendChild(row);

    });

    updateStats();

}



window.deleteParticipant = function(index){

    if(confirm("Видалити учасника?")){

        participants.splice(index,1);

        saveStorage();

        renderTable();

    }

}



addBtn.onclick = ()=>{

    modal.style.display = "flex";

}



cancelBtn.onclick = ()=>{

    modal.style.display = "none";

    clearInputs();

}



saveBtn.onclick = ()=>{

    const name = nameInput.value.trim();
    const event = eventInput.value.trim();
    const team = teamInput.value.trim();
    const beer = beerInput.value.trim();

    if(
        name === "" ||
        event === "" ||
        team === "" ||
        beer === ""
    ){

        alert("Заповніть усі поля.");

        return;

    }

    participants.push({

        name:name,
        event:event,
        team:team,
        beer:beer

    });

    saveStorage();

    renderTable();

    clearInputs();

    modal.style.display = "none";

}



function clearInputs(){

    nameInput.value = "";
    eventInput.value = "";
    teamInput.value = "";
    beerInput.value = "";

}



window.onclick = function(event){

    if(event.target === modal){

        modal.style.display = "none";

        clearInputs();

    }

}



renderTable();
