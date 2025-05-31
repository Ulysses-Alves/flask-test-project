
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

function setAsComplete(){
    //ask for confirmation, move date.
}

function openMonthPanel(){
}

function getDateToDo(){
    // need to get incomplete task, completed tasks
}