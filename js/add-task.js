import { Task } from './task.js';
import { saveToLocalStorage, loadFromLocalStorage, saveTasks, loadTasks as getTasksFromStorage } from './storage.js';
import { setDefaultDate } from './default-date.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';
import { displayTaskOptions } from './checkbox-menu.js';

export function initializeAddTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDateInput = document.getElementById('taskDate');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Initialize Flatpickr for the task form date input
  const datePickr = flatpickr(taskDateInput, {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
    defaultDate: new Date(), // Set default date to today
    placeholder: "Select date",
    onReady: function(dateObj, dateStr, instance) {
      // Apply center alignment to the alt input after Flatpickr is ready
      if (instance.altInput) {
        instance.altInput.style.textAlign = "center";
      }
    }
  });

  // Also force center alignment for any visible inputs
  document.querySelectorAll('.task-form .flatpickr-input:not([type="hidden"])').forEach(input => {
    input.style.textAlign = "center";
  });

  function loadTasks() {
    // Use the centralized function from storage.js
    const tasks = getTasksFromStorage();
    
    // Clear existing tasks first to avoid duplicates
    taskList.innerHTML = '';
    
    tasks.forEach(taskData => {
      const task = new Task(taskData.name, taskData.dueDate, taskData.description);
      task.status = taskData.status || 'In Progress';
      const taskElement = task.createTaskElement();
      taskList.appendChild(taskElement);
    });
  }

  function addTask() {
    const taskName = taskInput.value.trim();
    
    // Get the date value from Flatpickr
    let taskDate = '';
    if (datePickr.selectedDates.length > 0) {
      taskDate = datePickr.formatDate(datePickr.selectedDates[0], 'Y-m-d');
    } else {
      // If no date is selected, use today's date
      const today = new Date();
      taskDate = datePickr.formatDate(today, 'Y-m-d');
    }

    if (taskName) {
      const task = new Task(taskName, taskDate);
      const taskElement = task.createTaskElement();
      taskList.appendChild(taskElement);

      // Save tasks to local storage using centralized function
      saveTasks();

      // Clear the task name input but keep today's date
      taskInput.value = '';
      
      // Instead of clearing the date, set it to today
      datePickr.setDate(new Date());
      
      // Uncheck all checkboxes
      uncheckAllCheckboxes();

      // Update task options menu visibility
      displayTaskOptions();
      
      // Focus back on the task input for quick entry of multiple tasks
      taskInput.focus();
    } else {
      alert('Please enter a task name');
    }
  }

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  
  // For the Flatpickr alt input (the visible one)
  if (taskDateInput.nextElementSibling && taskDateInput.nextElementSibling.classList.contains('flatpickr-input')) {
    taskDateInput.nextElementSibling.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  }

  // Load tasks from local storage on page load
  loadTasks();
}