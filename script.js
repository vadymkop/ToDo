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
        renderPage();
    }
}

var tasksList = [];
var currentTasks;
loadTasksListFromLocalStorage();

function loadTasksListFromLocalStorage(){
    tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
    currentTasks = JSON.parse(localStorage.getItem('currentTasks'));
    renderPage();
}

function saveTasksListToLocalStorage(){
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
}

function renderPage(){
    if (tasksList.length == 0){
        tasksList.push(createTasks("Tasks"));
    }
    if (!currentTasks){
        currentTasks = 0;
    }
    if (currentTasks >=tasksList.length){
        changeTasks(tasksList.length-1);
    }
    renderCurrentTasks();
    renderTasksList();
}

function renderCurrentTasks(){
    try{
        iCurrentTasks.removeChild(iCurrentTasks.firstChild);
    }catch{}
    iCurrentTasks.appendChild(
        renderTasks(tasksList[currentTasks])
    );
}

function renderTasks(tasks){
    var interface = document.createElement('div');
    
    tasks.tasks.forEach((element, index) => {
        interface.appendChild(renderTask(element, index));
    });
    return interface
}

function renderTask(task, index){
    var interface = document.createElement('div');
    var checker = document.createElement("input");
    var span = document.createElement("span");
    var button = document.createElement("button");
    checker.setAttribute("type", "checkbox");
    checker.setAttribute("id", "check");
    checker.checked = task.isChecked;
    checker.onclick = function (){
        editTaskChecked(this, task);
    }
    span.innerText = task.text;
    span.ondblclick = function (){
        editTaskText(this, task);
    }
    button.textContent = 'Delete';
    button.className = 'bth-delete';
    button.onclick = function (){
        deleteTask(this, index);
    }
    interface.className = "item-task";
    interface.appendChild(checker);
    interface.appendChild(span);
    interface.appendChild(button);
    return interface
}

function renderTasksList(){
    try{
        iTasksList.removeChild(iTasksList.firstChild);
    }catch{}
    var interface = document.createElement('div');
    tasksList.forEach((element, index) => {
        interface.appendChild(renderTasksListElement(element, index));
    });
    iTasksList.appendChild(interface);
}

function renderTasksListElement(element, indexElement){
    var interface = document.createElement('div');
    interface.innerText = element.name;
    interface.className = "item-tasks";
    interface.onclick = function () {
        changeTasks(indexElement);
    }
    if (indexElement == currentTasks){
        interface.className = 'selected-tasks';
        var button = document.createElement("button");
        button.textContent = 'Delete';
        button.onclick = function (){
            deleteTasks(this, indexElement);
        }
        interface.appendChild(button);
    }
    return interface;
}

function createTasks(name, tasks){
    if (!tasks){
        tasks = []
    }
    return {name:name, tasks:tasks}
}

function createTask(text, task){
    if (!task){
        task = {isChecked:false}
    }
    task.text = text
    if (!task.isChecked){
        task.isChecked = false
    }
    return task;
}

function createTaskItem(){
    if (iTaskText.value.length > 0){
        var task = createTask(iTaskText.value);
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
    tasksList.push(tasks);
    clearInputTasks();
    saveTasksListToLocalStorage();
}

function editTaskText(interface, task){
    var inputText = prompt("Edit text", task.text);
    if (inputText){
        task.text = inputText;
        interface.lastChild.textContent = task.text;
        saveTasksListToLocalStorage();
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

function deleteTasks(elem, index){
    if (tasksList.length == 1){
        tasksList.pop();
    }else{
        tasksList.splice(currentTasks, 1);
    }
    saveTasksListToLocalStorage();
    renderPage();
}

function changeTasks(index){
    currentTasks = index;
    saveTasksListToLocalStorage();
    renderPage();
}