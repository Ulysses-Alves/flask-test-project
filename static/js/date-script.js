
const baseDate = currentDate;
const nextDates = [];
const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const selector = document.getElementById("date-selector");

document.addEventListener("DOMContentLoaded", getNextDates());

function getNextDates(){
    //look into progressive mutation of this code
    // for (let i = 1; i < 6; i++) {
    //     nextDates.push(new Date(date.setDate(date.getDate() + i)));
    // }
    for(let i = 0; i < 4; i++){
        const date = new Date(baseDate);
        date.setDate(date.getDate()+i);
        nextDates.push(date);
    }
    addDatesToSelector();
}

function addDatesToSelector(){
    selector.innerHTML += `
        <div class="circle">
                <div class="circle-text">-</div>
            </div>
        `;

    for(let i = 0; i < 4; i++){
        selector.innerHTML += `
        <div class="circle">
                <div class="circle-text">${weekDays[nextDates[i].getDay()]}<br>${nextDates[i].getDate() + "/" + nextDates[i].getMonth()}</div>
            </div>
        `;
    }
    selector.innerHTML += `
        <div class="circle">
                <div class="circle-text">+</div>
            </div>
        `;
}