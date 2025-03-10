import { Task } from './task.js';
import { saveToLocalStorage, loadFromLocalStorage, saveTasks, loadTasks as getTasksFromStorage } from './storage.js';
import { setDefaultDate, initializeFlatpickr } from './default-date.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';
import { displayTaskOptions } from './checkbox-menu.js';

export function initializeAddTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDateInput = document.getElementById('taskDate');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Function to create and add sample tasks
  function addSampleTasks() {
    // Check if sample tasks have been added before
    if (localStorage.getItem('sampleTasksAdded') === 'true') {
      return;
    }
    
    // Get dates for yesterday, today, and tomorrow
    const today = new Date();
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const yesterdayStr = formatDate(yesterday);
    const todayStr = formatDate(today);
    const tomorrowStr = formatDate(tomorrow);
    
    // Sample tasks data
    const sampleTasks = [
      {
        name: "Sample Task 1",
        dueDate: yesterdayStr,
        status: "Done",
        description: "This is a sample completed task with yesterday's due date."
      },
      {
        name: "Sample Task 2",
        dueDate: todayStr,
        status: "Stuck",
        description: "This is a sample stuck task due today."
      },
      {
        name: "Sample Task 3",
        dueDate: tomorrowStr,
        status: "In Progress",
        description: "This is a sample in-progress task due tomorrow."
      }
    ];
    
    // Add the sample tasks to the task list
    sampleTasks.forEach(taskData => {
      const task = new Task(taskData.name, taskData.dueDate, taskData.description);
      task.status = taskData.status;
      const taskElement = task.createTaskElement();
      taskList.appendChild(taskElement);
    });
    
    // Save tasks to local storage
    saveTasks();
    
    // Mark that sample tasks have been added
    localStorage.setItem('sampleTasksAdded', 'true');
  }

  // Ensure the task date input exists before initializing Flatpickr
  if (taskDateInput) {
    // Initialize Flatpickr for the task form date input
    const datePickr = initializeFlatpickr(taskDateInput);

    function loadTasks() {
      // Check if tasks exist in local storage
      const tasks = getTasksFromStorage();
      
      // If there are no tasks, add sample tasks
      if (tasks.length === 0) {
        addSampleTasks();
        return; // The sample tasks were just added and saved, no need to load again
      }
      
      // Clear existing tasks first to avoid duplicates
      taskList.innerHTML = '';
      
      // Load tasks from storage
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
  } else {
    console.error('Task date input not found');
  }
}

// Function to reset to sample tasks (for development/testing)
export function resetToSampleTasks() {
  localStorage.clear();
  localStorage.removeItem('sampleTasksAdded');
  window.location.reload();
}