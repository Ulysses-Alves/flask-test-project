
const baseDate = currentDate;
const nextDates = [];
const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const selectorDays = 5;
const dateAmount = 19;
const calendarStart = 5;

const selector = document.getElementById("date-selector");
const calendar = document.getElementById("calendar-container");

document.addEventListener("DOMContentLoaded", () => {
    addDatesToSelector();
    loadCalendar();
    loadCurrentTasks();
});

    //look into progressive mutation of this code
    // for (let i = 1; i < 6; i++) {
    //     nextDates.push(new Date(date.setDate(date.getDate() + i)));
    // }

function addDatesToSelector(){

    for(let i = 0; i < dateAmount; i++){
        const date = new Date(baseDate);
        date.setDate(date.getDate()+i);
        nextDates.push(date);
    }

    selector.innerHTML += `
        <div class="circle" data-status="selected">
                <button class="btn" onclick="getDateToDo(this)" type="button" data-date="${nextDates[0].toISOString()}"><div class="circle-text" data-status="selected">${weekDays[nextDates[0].getDay()]}<br>${nextDates[0].getDate() + "/" + (nextDates[0].getMonth() + 1)}</div></button>
            </div>
        `;

    //start a i = 1, to skip the current date
    for(let i = 1; i < selectorDays; i++){
        selector.innerHTML += `
        <div class="circle" data-status="unselected">
                <button class="btn" onclick="getDateToDo(this)" type="button" data-date="${nextDates[i].toISOString()}"><div class="circle-text" data-status="unselected">${weekDays[nextDates[i].getDay()]}<br>${nextDates[i].getDate() + "/" + (nextDates[i].getMonth() + 1)}</div></button>
            </div>
        `;
    }
    selector.innerHTML += `
        <div class="circle" data-status="unselected">
               <button class="btn" onclick="openMonthPanel(this)" type="button"><div class="circle-text" data-status="unselected"><img src="/static/img/bx-calendar.svg" alt="move back one day"></div></button>
            </div>
        `;
}

function loadCalendar(){
    for(let i = calendarStart; i < dateAmount; i++){
        calendar.innerHTML += `
        <div class="circle" data-status="unselected">
                <button class="btn" onclick="getDateToDo(this)" type="button" data-date="${nextDates[i].toISOString()}"><div class="circle-text" data-status="unselected">${weekDays[nextDates[i].getDay()]}<br>${nextDates[i].getDate() + "/" + (nextDates[i].getMonth() + 1)}</div></button>
            </div>
        `;
    }
}

async function loadCurrentTasks(){

    if(!db) { await loadDb();}

    const taskStore = db.transaction("tasks", "readonly");

    let tasks = taskStore.objectStore("tasks");
    let taskIndex = tasks.index("creation_date");
    
    defaultDate = document.querySelector('[data-status="selected"]');
    
    let tasksRequest = taskIndex.getAll(IDBKeyRange.only(defaultDate.firstElementChild.dataset.date)); //get all that are equal or older the element data-date
    
    tasksRequest.onsuccess = function () {
        const results = tasksRequest.result;

        results.forEach( task => {
            currentTaskContainer.innerHTML += `
        <div class="task flex-row space-bet">
                <p>${task.task}</p>
                <div>
                <button class="btn" onclick="openNote(this)" type="button"> <img src="/static/img/bx-notepad.svg" alt="open task notes"></button>
                <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                </div>
            </div>
            <hr>`;
        })
    }
}