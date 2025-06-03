let db;

async function loadDb(){
    db = await useDb();
}

async function useDb(){
    return new Promise(function(resolve, reject) {
        const openRequest = window.indexedDB.open("userTasks", 2);
        console.log("request");

        openRequest.onupgradeneeded = (event) => {
            console.log("Upgrade");

            const db = event.target.result;
        
            //Storing tasks
            const tasksStore = db.createObjectStore("tasks", {keyPath:"id", autoIncrement: true});
        
            tasksStore.createIndex("task", "task", {unique: false});
            tasksStore.createIndex("isComplete","isComplete", {unique: false});
            tasksStore.createIndex("creation_date","creation_date", {unique: false});
            tasksStore.createIndex("note","note", {unique:false});

        };
        
        openRequest.onerror = (event) => {
            reject("Error");
        };
        
        openRequest.onsuccess = (event) => {
            console.log("Success");
            resolve(event.target.result);
        };
    });
}

//get tasks that have the following date, separate them by completion status
//if selected date is newer move, task forward how? if date is equal or less than? 
// if day or month or year is less than current it's older