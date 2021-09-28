// retrieve DOM elements
const taskFrom = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name-input');
const taskList = document.getElementById('task-list');
const resetDoneTaskBtn = document.getElementById('reset-all-done-task-btn');

// load saved tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

function persistInMemoryTasks() {
  localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
}

function addTask(task) {
  const taskItemElement = document.createElement('li');
  function toggleDone() {
    taskItemElement.classList.toggle('task-done');
    task.done = !task.done;
    persistInMemoryTasks();
  }
  taskItemElement.innerText = task.name;
  if (task.done) {
    taskItemElement.classList.add('task-done');
  }
  taskItemElement.addEventListener('click', toggleDone);
  taskList.appendChild(taskItemElement);
}

// add saved tasks to the DOM when the app starts
for (let i = 0; i < savedTasks.length; i++) {
  addTask(savedTasks[i]);
}

function createTask(name) {
  const newTask = { name: name, done: false };
  // save to memory
  savedTasks.push(newTask);
  // save to storage
  persistInMemoryTasks();
  return newTask;
}

function forgetDoneTasks() {
  // remove from memory
  for (let i = 0; i < savedTasks.length; i++) {
    if (savedTasks[i].done) savedTasks.splice(i, 1);
  }
  // remove from storage
  persistInMemoryTasks();
}

function removeDoneTasks() {
  const doneTasks = document.querySelectorAll('.task-done');
  for (let i = 0; i < doneTasks.length; i += 1) {
    const doneTask = doneTasks[i];
    doneTask.remove();
  }
}

taskFrom.addEventListener('submit', function (event) {
  event.preventDefault();
  if (taskNameInput.value) {
    // update data
    const newTask = createTask(taskNameInput.value);
    // update the view
    addTask(newTask);
    taskNameInput.value = '';
  }
});

resetDoneTaskBtn.addEventListener('click', function () {
  // update data
  forgetDoneTasks();
  // update view
  removeDoneTasks();
});
