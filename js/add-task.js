import { Task } from './task.js';
import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';
import { setDefaultDate } from './default-date.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';
import { displayTaskOptions } from './checkbox-menu.js';

export function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-list-item').forEach(taskItem => {
    const name = taskItem.querySelector('.task-item-name').textContent;
    const dueDate = taskItem.querySelector('.task-item-date').textContent;
    const status = taskItem.querySelector('.task-item-status').value;
    tasks.push({ name, dueDate, status });
  });
  saveToLocalStorage('tasks', tasks);
}

export function initializeAddTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDateInput = document.getElementById('taskDate');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  function loadTasks() {
    const tasks = loadFromLocalStorage('tasks') || [];
    tasks.forEach(taskData => {
      const task = new Task(taskData.name, taskData.dueDate);
      task.status = taskData.status;
      const taskElement = task.createTaskElement();
      taskList.appendChild(taskElement);
    });
  }

  function addTask() {
    const taskName = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    console.log('Adding task:', taskName, taskDate); // Debugging statement

    if (taskName && taskDate) {
      const task = new Task(taskName, taskDate);
      const taskElement = task.createTaskElement();
      taskList.appendChild(taskElement);

      // Save tasks to local storage
      saveTasks();

      // Clear the input fields
      taskInput.value = '';
      setDefaultDate(); // Reset the date input to today's date

      // Uncheck all checkboxes
      uncheckAllCheckboxes();

      // Update task options menu visibility
      displayTaskOptions();
    } else {
      console.log('Task name or date is missing'); // Debugging statement
    }
  }

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  taskDateInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from local storage on page load
  loadTasks();
}