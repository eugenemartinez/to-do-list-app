import { saveTasks } from './storage.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';

export function displayTaskOptions() {
  const taskOptionsMenu = document.querySelector('.task-header-actions');
  const taskHeaderName = document.querySelector('.task-header-name');

  // Function to show or hide the task options menu
  const toggleTaskOptionsMenu = (show) => {
    if (show) {
      taskOptionsMenu.style.display = 'block';
      taskHeaderName.style.display = 'none';
    } else {
      taskOptionsMenu.style.display = 'none';
      taskHeaderName.style.display = 'block'; // Always show Task List on mobile
    }
  };

  // Function to check if any task checkbox is checked
  const anyTaskCheckboxChecked = () => {
    const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
    return Array.from(taskCheckboxes).some(checkbox => checkbox.checked);
  };

  // Function to update the task options menu visibility
  const updateTaskOptionsMenu = () => {
    const headerCheckbox = document.querySelector('.task-header-checkbox input[type="checkbox"]');
    if (headerCheckbox.checked || anyTaskCheckboxChecked()) {
      toggleTaskOptionsMenu(true);
    } else {
      toggleTaskOptionsMenu(false);
    }
  };

  // Initial update of the task options menu
  updateTaskOptionsMenu();

  // Event listener for the header checkbox
  const headerCheckbox = document.querySelector('.task-header-checkbox input[type="checkbox"]');
  headerCheckbox.addEventListener('change', updateTaskOptionsMenu);

  // Event listeners for individual task checkboxes
  const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTaskOptionsMenu);
  });

  // Function to mark selected tasks with a given status
  const markSelectedTasks = (status) => {
    const selectedCheckboxes = document.querySelectorAll('.task-item-checkbox:checked');
    selectedCheckboxes.forEach(checkbox => {
      const taskItem = checkbox.closest('.task-list-item');
      const taskStatus = taskItem.querySelector('.task-item-status');
      taskStatus.value = status;
      taskStatus.dispatchEvent(new Event('change')); // Trigger change event to update color
    });
    saveTasks(); // Save tasks to local storage
    uncheckAllCheckboxes(); // Uncheck all checkboxes, including the header checkbox
    updateTaskOptionsMenu(); // Update task options menu visibility
  };

  // Function to remove selected tasks
  const removeSelectedTasks = () => {
    const selectedCheckboxes = document.querySelectorAll('.task-item-checkbox:checked');
    selectedCheckboxes.forEach(checkbox => {
      const taskItem = checkbox.closest('.task-list-item');
      taskItem.classList.add('fade-out');
      setTimeout(() => {
        taskItem.remove();
        saveTasks(); // Save tasks to local storage
        displayTaskOptions(); // Update task options menu visibility
      }, 500); // Match the duration of the fade-out animation
    });
    setTimeout(() => {
      uncheckAllCheckboxes(); // Uncheck all checkboxes, including the header checkbox
      updateTaskOptionsMenu(); // Update task options menu visibility
    }, 500); // Match the duration of the fade-out animation
  };

  // Event listeners for task options menu buttons
  document.getElementById('markSelectedInProgressBtn').addEventListener('click', () => {
    markSelectedTasks('In Progress');
  });
  document.getElementById('markSelectedStuckBtn').addEventListener('click', () => {
    markSelectedTasks('Stuck');
  });
  document.getElementById('markSelectedDoneBtn').addEventListener('click', () => {
    markSelectedTasks('Done');
  });
  document.getElementById('removeSelectedBtn').addEventListener('click', removeSelectedTasks);
}