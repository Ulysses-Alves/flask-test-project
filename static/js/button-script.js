
const currentTaskContainer = document.getElementById("current-task-container");
const completedTaskContainer = document.getElementById("completed-task-container");
const taskNoteArea = document.getElementById("notes-area")

var taskCount = 0;
var activeInput = false;

let isDeleteModeOn = false;

function isInputActive(){
    if(activeInput){
        //blick input box??
    }
    else{
        addNewTask();
    }
}

function addNewTask() {

    activeInput = true;
    currentTaskContainer.innerHTML += `
    <div id="task-${taskCount}" class="task-input flex-row space-bet">
        <input type="text">
        <button class="btn" onclick="saveTask(this)" type="button"><img src="/static/img/bxs-save.svg" alt="add new task button"></button>
            </div>`;
    taskCount = taskCount + 1;
}

function deleteMode(){

    const buttonContainer = document.querySelectorAll(".task-buttons");

    if(!isDeleteModeOn){
        isDeleteModeOn = true;

        buttonContainer.forEach( container =>{
            container.innerHTML = `
            <button class="btn" onclick="deleteTask(this)" type="button"> <img src="/static/img/bx-trash.svg" alt="delete task"></button>
        `
        } )
    }
    else{
        isDeleteModeOn = false;

        buttonContainer.forEach( container =>{
            container.innerHTML = `
             <button class="btn" onclick="openNote(this)" type="button"> <img src="/static/img/bx-notepad.svg" alt="open task notes"></button>
             <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
        `
        } )

    }   
}

async function deleteTask(task){

    if(!db) { await loadDb();}

    const mainParent = task.parentElement.parentElement;

    const taskTx = db.transaction("tasks","readwrite");
    const taskStore = taskTx.objectStore("tasks");

    const request = taskStore.delete(Number(mainParent.dataset.id));

    request.onsuccess = () => {

        mainParent.remove();        
    }

}

async function reloadTasks(){
    currentTaskContainer.innerHTML = "";
    let currentSelection = document.querySelector('[data-status="selected"]');

    console.log(currentSelection);

    const taskStore = db.transaction("tasks", "readonly");

    let tasks = taskStore.objectStore("tasks");
    let taskIndex = tasks.index("creation_date");

    selectedDate = currentSelection.dataset.firstElementChild.dataset.date;

    let tasksRequest = taskIndex.getAll(IDBKeyRange.upperBound(selectedDate));
    tasksRequest.onsuccess = function () {
        const results = tasksRequest.result;
        results.forEach( task => {
            currentTaskContainer.innerHTML += `
   <div class="task flex-row space-bet border rm-top rm-left rm-right">
                    <p>${task.task}</p>
                    <div class="task-buttons">
                     <button class="btn" onclick="openNote(this)" type="button"> <img src="/static/img/bx-notepad.svg" alt="open task notes"></button>
                    <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                    </div>
                 </div>
                 `;
        })
    };
}

async function saveTask(task){
    if(!db) { await loadDb();}

    const parent = task.parentElement;
    const input = parent.querySelector("input");
    const currentSelection = document.querySelector('[data-status="selected"]');

    const taskTx = db.transaction("tasks","readwrite");
    const taskStore = taskTx.objectStore("tasks");

    const request = taskStore.add({
        task: input.value,
        isComplete: false,
        creation_date: currentSelection.firstElementChild.dataset.date,
        note: ""
    });

    request.onsuccess = function(event) {
        
        parent.remove();
        activeInput = false;

    currentTaskContainer.innerHTML += `
   <div data-id="${event.target.result}" class="task flex-row space-bet border rm-top rm-left rm-right">
                    <p>${input.value}</p>
                   <div class="task-buttons">
                    <button class="btn" onclick="openNote(this)" type="button"> <img src="/static/img/bx-notepad.svg" alt="open task notes"></button>
                   <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                   </div>
                 </div>
                 `;
    taskCount = taskCount + 1;
    }
}

function setAsComplete(){
    //ask for confirmation, move date.
}

function openMonthPanel(){
    
}

async function getDateToDo(element){
    if(!db) { await loadDb();}
    let currentSelection = document.querySelector('[data-status="selected"]');

    if(element.parentElement.dataset.status == currentSelection.dataset.status){
        console.log("Same");
    }
    else{

        element.parentElement.dataset.status = "selected";
        element.firstElementChild.dataset.status = "selected";

        currentSelection.dataset.status = "unselected";
        currentSelection.firstElementChild.firstElementChild.dataset.status = "unselected";
    }

    const taskStore = db.transaction("tasks", "readonly");

    let tasks = taskStore.objectStore("tasks");
    let taskIndex = tasks.index("creation_date");

    selectedDate = element.dataset.date;

    let tasksRequest = taskIndex.getAll(IDBKeyRange.upperBound(selectedDate));
    tasksRequest.onsuccess = function () {
        const results = tasksRequest.result;
        currentTaskContainer.innerHTML = "";
        results.forEach( task => {
            currentTaskContainer.innerHTML += `
   <div class="task flex-row space-bet border rm-top rm-left rm-right">
                    <p>${task.task}</p>
                    <div class="task-buttons">
                     <button class="btn" onclick="openNote(this)" type="button"> <img src="/static/img/bx-notepad.svg" alt="open task notes"></button>
                   <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                    </div>
                 </div>
                 `;
        })
      };

}
