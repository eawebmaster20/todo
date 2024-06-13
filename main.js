let todoTasks = []
let idCounter = 0;
let inEditModeId = ''
let editingTaskId = ''
document.getElementById('updateExisting').classList.add('d-none')
const addTodo = ()=>{
    let title = document.getElementById('title').value
    let dateDue = document.getElementById('dueDate').value
    let description = document.getElementById('description').value
    todoTasks.push({title, dateDue, description});
    let newLi = document.createElement('li');
    newLi.innerHTML= updateLi(title, dateDue, description)
    newLi.id = idCounter
    idCounter += 1;
    document.getElementById('emptyList').classList.add('d-none');
    document.getElementById('taskList').appendChild(newLi);
    clearInput()
    console.log(newLi);
}

const updateLi = (title, dateDue, description)=>{
    return `
        <div class="d-flex w-100 align-items-center mb-2 todo-item card">
            <div class="row row-cols-4 w-100 ">
                <span class="fw-bold">${title.replace(title.charAt(0),title.charAt(0).toUpperCase())}</span>
                <span class="small text-secondary">${dateDue}</span>
                <span class="small task-desc text-secondary">${description}</span>
                <span class="d-flex options">
                    <i class="ms-auto complete" onClick= "toggleComplete(this)"><input type="checkbox"/></i>
                    <i class="ms-auto editbtn" onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"><img class="btn-icon" src="./assets/edit.svg" alt="" srcset=""></i>
                    <i class="ms-2 editbtn" onClick ="deleteTask(this)"><img class="btn-icon" src="./assets/delete.svg" alt="" srcset=""></i>
                </span>
            </div>
            
        </div>`
}

const deleteTask = (el)=>{
    let index = el.parentNode.parentNode.parentNode.parentNode.id;
    todoTasks.splice(index, 1);
    el.parentNode.parentNode.parentNode.parentNode.remove()
}

const editTask = (el)=>{
    let index = el.parentNode.parentNode.parentNode.parentNode.id;
    inEditModeId = index;
    document.getElementById('add').classList.add('d-none')
    document.getElementById('updateExisting').classList.remove('d-none')
    document.getElementById('title').value= todoTasks[index].title;
    document.getElementById('dueDate').value = todoTasks[index].dateDue;
    document.getElementById('description').value = todoTasks[index].description;
}

const updateTodo = (el)=>{
    let index = el.parentNode.parentNode.parentNode.parentNode.id;
    console.log(inEditModeId);
    document.getElementById(inEditModeId).firstElementChild.firstElementChild.firstElementChild.textContent = document.getElementById('title').value
    todoTasks[inEditModeId].title = document.getElementById('title').value
    document.getElementById(inEditModeId).firstElementChild.firstElementChild.childNodes[3].textContent = document.getElementById('dueDate').value
    todoTasks[inEditModeId].dateDue = document.getElementById('dueDate').value
    document.getElementById(inEditModeId).firstElementChild.firstElementChild.childNodes[5].textContent = document.getElementById('description').value
    todoTasks[inEditModeId].description = document.getElementById('description').value
}

function clearInput() {
    document.getElementById('title').value='';
    document.getElementById('dueDate').value='';
    document.getElementById('description').value='';
}


document.getElementById('title').addEventListener('keydown',()=>{
    if (document.getElementById('dueDate').value && document.getElementById('title').value.length-1) return document.getElementById('add').disabled = false;
    return document.getElementById('add').disabled =true;
})

document.getElementById('dueDate').addEventListener('change',()=>{
    if (document.getElementById('title').value.length-1>0) return document.getElementById('add').disabled = false;
    return document.getElementById('add').disabled =true;
})

document.getElementById('sortTodo').addEventListener('change',()=>{
    let filterVal = document.getElementById('sortTodo').value;
    let listItems = document.getElementById('taskList')
    let newList = []
    if (todoTasks.length) {
        while (listItems.firstChild) {
            listItems.removeChild(listItems.firstChild)
        }
        switch (filterVal) {
            case '1':
                let sortedByTitle = todoTasks.sort((a, b) => a.title.localeCompare(b.title));
                for (let i = 0; i < sortedByTitle.length; i++) {
                    newList.push(sortedByTitle[i])
                    let newLi =document.createElement('li');
                        newLi.innerHTML =updateLi(sortedByTitle[i].title, sortedByTitle[i].dateDue, sortedByTitle[i].description) 
                        document.getElementById('taskList').appendChild(newLi);
                }
                break;
            case '2':
                let sortedByDuedate = todoTasks.sort((a, b) => a.dateDue.localeCompare(b.dateDue));
                for (let i = 0; i < sortedByDuedate.length; i++) {
                    newList.push(sortedByDuedate[i])
                    let newLi =document.createElement('li');
                        newLi.innerHTML = updateLi(sortedByDuedate[i].title, sortedByDuedate[i].dateDue, sortedByDuedate[i].description);
                        document.getElementById('taskList').appendChild(newLi);
                }
                break;
            default:
                break;
        }
    }
    else{
        console.log('eliii');
    }
})

document.getElementById('filterTodo').addEventListener('keyup', (ev)=>{

    let filteredList = todoTasks.filter(el=>el.title.includes(ev.target.value));
    let listItems = document.getElementById('taskList')
    
    if (!filteredList.length) {
        listItems.removeChild(listItems.firstChild)
        document.getElementById('emptyList').classList.add('d-block');
        document.getElementById('emptyList').classList.remove('d-none');
    }
   else{
        while (listItems.firstChild) {
            listItems.removeChild(listItems.firstChild)
        }
        for (let i = 0; i < filteredList.length; i++) {
            let newLi =document.createElement('li');
                newLi.innerHTML = updateLi(filteredList[i].title, filteredList[i].dateDue, filteredList[i].description)
                document.getElementById('taskList').appendChild(newLi);   
                document.getElementById('emptyList').classList.add('d-none');
        }
   }
   

})
const toggleComplete = (el)=>{
    if (el.firstElementChild.checked) {
    console.log(el.parentNode.parentNode.firstElementChild.innerHTML);
    el.parentNode.parentNode.firstElementChild.innerHTML= `<del class="text-muted">${el.parentNode.parentNode.firstElementChild.textContent}</del>`
    }
    else{
        
    console.log(el.parentNode.parentNode.firstElementChild.innerHTML);
    el.parentNode.parentNode.firstElementChild.innerHTML= el.parentNode.parentNode.firstElementChild.textContent
    }
}
document.getElementById('dueDate').setAttribute('min', new Date().toISOString().split("T")[0])