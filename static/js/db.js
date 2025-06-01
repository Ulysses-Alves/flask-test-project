let db;

const openRequest = window.indexedDB.open("userTasks", 1);

openRequest.onupgradeneeded = (event) => {
    console.log("Upgrade")
};

openRequest.onerror = (event) => {
    console.log("Error")
};

openRequest.onsuccess = (event) => {
    console.log("Success")
    db = openRequest.result;
};

const tasksStore = db.createObjectStore("tasks", {keyPath:"taskTitle",});

tasksStore.createIndex("creation_d","creation_d", {unique: false});
tasksStore.createIndex("creation_m","creation_m", {unique: false});
tasksStore.createIndex("creation_y","creation_y", {unique: false});
tasksStore.createIndex("isComplete","isComplete", {unique: false});
tasksStore.createIndex("","", {unique: false});