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