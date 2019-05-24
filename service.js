
function loadTasksListFromServer(){
    getTasksListsFromServer()
        .then(listDataTasks=>{
            listDataTasks.forEach(dataTasks=>{
                tasksList.push(createTasks(dataTasks.name, false, dataTasks.id));
            })
            changeTasks(0);
        }).catch(
            ()=>{
                alert("Fail with server");
                workWithServer = false;
                main();
            }
        );
}



function getTasksListsFromServer() {
    return fetch(urlLists)
        .then(response => response.json());
}

function getTasksFromServer(list){
    return fetch(urlTasks+"?listId="+list.id)
        .then(response => response.json())
        .then((tasks)=>{
            list.tasks = tasks.map(t => ({
                ...t,
                parentID: t.listId
            }));
            console.log(list)
        });
}

function addTasksInServer(tasks){
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:tasks.name})
    }
    return fetch(urlLists, options)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            return data;
        });
}

function deleteTasksInServer(tasks){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: tasks.id})
    }
    return fetch(urlLists+tasks.id, options)
        .then(response => response.json())
        .then(data=>{tasks = data});
}

function addTaskInServer(task){
    console.log(task);
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text:task.text,
            isChecked:task.isChecked,
            listId: task.parentID,
        })
    }
    return fetch(urlTasks, options)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            return data;
        });
}

function deleteTaskInServer(taskId){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: taskId})
    }
    return fetch(urlTasks+taskId, options)
        .then(response => response.json());
}