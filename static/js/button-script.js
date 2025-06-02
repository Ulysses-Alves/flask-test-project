
const currentTaskContainer = document.getElementById("current-task-container");
const completedTaskContainer = document.getElementById("completed-task-container");

var taskCount = 0;
var activeInput = false;

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

function saveTask(task){
    const parent = task.parentElement;
    const input = parent.querySelector("input");
    const currentSelection = document.querySelector('[data-status="selected"]');

    const noteTx = db.transaction("notes", "readwrite");
    const noteStore = noteTx.objectStore("notes");

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
   <div class="task flex-row space-bet">
                    <p>${input.value}</p>
                   <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                 </div>
                 <hr>`;
    taskCount = taskCount + 1;
    }
}

function setAsComplete(){
    //ask for confirmation, move date.
}

function openMonthPanel(){
    
}

function getDateToDo(element){

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

    //get values from database

    const taskStore = db.transaction("tasks", "readonly");

    let tasks = taskStore.objectStore("tasks");
    let taskIndex = tasks.index("creation_date");

    selectedDate = element.dataset.date;

    let tasksRequest = taskIndex.getAll(IDBKeyRange.only(selectedDate)); //get all that are equal or older the element data-date

    tasksRequest.onsuccess = function () {
        const results = tasksRequest.result;

        results.forEach( task => {
            currentTaskContainer.innerHTML += `
   <div class="task flex-row space-bet">
                    <p>${task.task}</p>
                   <button class="btn" onclick="setAsComplete()" type="button"> <img src="/static/img/bx-radio-circle.svg" alt="complete task radio button"></button>
                 </div>
                 <hr>`;
        })

        console.log("Tasks for selected date:", results);
      };

}