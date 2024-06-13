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