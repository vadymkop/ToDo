
function renderPage(){
    if (currentTasks >=tasksList.length){
        changeTasks(tasksList.length-1);
    }
    if (tasksList.length > 0){
        iTaskBth.removeAttribute("disabled");
        iTaskText.removeAttribute("disabled");
    } else {
        iTaskBth.setAttribute("disabled", "disabled");
        iTaskText.setAttribute("disabled", "disabled");
    }
    renderCurrentTasks();
    renderTasksList();
}

function renderCurrentTasks(){
    try{
        iCurrentTasks.removeChild(iCurrentTasks.firstChild);
    }catch{}
    if (currentTasks>=0){
        iCurrentTasks.appendChild(
            renderTasks(tasksList[currentTasks])
        );
    }
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

function renderTasksListElement(tasks, indexElement){
    var interface = document.createElement('div');
    interface.innerText = tasks.name;
    interface.className = "item-tasks";
    interface.onclick = function () {
        changeTasks(indexElement);
    }
    if (indexElement == currentTasks){
        interface.className = 'selected-tasks';
        var button = document.createElement("button");
        button.textContent = 'Delete';
        button.onclick = function (){
            deleteTasks(this, tasks, indexElement);
        }
        interface.appendChild(button);
    }
    return interface;
}