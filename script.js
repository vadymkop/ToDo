var baseUrl = "http://localhost:3000/";
var urlLists = baseUrl + `lists/`;
var urlTasks = baseUrl + `tasks/`;
var workWithServer = false;
var iCurrentTasks = document.querySelector('#current-tasks');
var iTasksList = document.querySelector('#tasks-list');
var iTaskText = document.querySelector('#task-text');
var iTaskBth = document.querySelector('#bth-task');
var iTasksText = document.querySelector('#tasks-text');
var iTasksBth = document.querySelector('#bth-tasks');
iTaskText.onsubmit = createTaskItem;
iTaskBth.onclick = createTaskItem;
iTasksBth.onclick = function (){
    if (iTasksText.value.length > 0){
        var tasks = createTasks(iTasksText.value);
        addTasksToTaskList(tasks);
    }
}

var tasksList = [];
var currentTasks = 0;
main();

function main(){
    if (workWithServer){
        loadTasksListFromServer();
    } else {
        loadTasksListFromLocalStorage();
    }
}

function loadTasksListFromLocalStorage(){
    tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
    currentTasks = JSON.parse(localStorage.getItem('currentTasks'));
    renderPage();
}

function saveTasksListToLocalStorage(){
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
}


function createTasks(name, tasks, id){
    if (!tasks){
        tasks = []
    }
    return {name:name, tasks:tasks, id:id}
}

function createTask(text, isChecked, parentID){
    var task = {}
    task.text = text
    task.isChecked = isChecked;
    task.parentID = parentID;
    if (!isChecked){
        task.isChecked = false
    }
    return task;
}

function createTaskItem(e){
    e.preventDefault();
    if (iTaskText.value.length > 0 && currentTasks >= 0){
        var task = createTask(iTaskText.value, false, currentTasks);
        addTaskToTasks(task);
        renderCurrentTasks();
    }
}

function clearInputTask(){
    iTaskText.value = "";
}

function clearInputTasks(){
    iTasksText.value = "";
}

function addTaskToTasks(task){
    tasksList[currentTasks].tasks.push(task);
    clearInputTask();
    saveTasksListToLocalStorage();
}

function addTasksToTaskList(tasks){
    currentTasks = tasksList.length;
    clearInputTasks();
    if (workWithServer){
        addTasksInServer(tasks).then((taskData)=>{
            tasks.id = taskData.id;
            tasksList.push(tasks);
            renderPage();
        });
    } else {
        tasksList.push(tasks);
        saveTasksListToLocalStorage();
        renderPage();
    }
    
}

function editTaskText(interface, task){
    var inputText = prompt("Edit text", task.text);
    if (inputText){
        task.text = inputText;
        interface.lastChild.textContent = task.text;
        if (workWithServer){
            editTaskTextInServer(task);
        } else {
            saveTasksListToLocalStorage();
        }
    }
}

function deleteTask(elem, index){
    tasksList[currentTasks].tasks.splice(index, 1);
    saveTasksListToLocalStorage();
    renderPage();
}

function editTaskChecked(interface, task){
    task.isChecked = interface.checked;
    saveTasksListToLocalStorage();
}

function deleteTasks(event, tasks, index){
    event.parentNode.remove();
    if (tasksList.length == 1){
        tasksList.pop();
    }else{
        tasksList.splice(currentTasks, 1);
    }
    if (workWithServer){
        deleteTasksInServer(tasks).then(renderPage);
    } else {
        saveTasksListToLocalStorage();
        renderPage();
    }
}

function changeTasks(index){
    currentTasks = index;
    saveTasksListToLocalStorage();
    renderPage();
}