import { displayTaskOptions } from './checkbox-menu.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';

export function initializeCheckboxAll() {
  document.addEventListener('DOMContentLoaded', () => {
    const headerCheckbox = document.querySelector('.task-header-checkbox input[type="checkbox"]');

    // Function to update the state of all task checkboxes
    const updateTaskCheckboxes = (checked) => {
      const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      taskCheckboxes.forEach(checkbox => {
        checkbox.checked = checked;
      });
      saveCheckboxState();
      displayTaskOptions(); // Update task options menu visibility
    };

    // Function to attach event listeners to task checkboxes
    const attachTaskCheckboxListeners = () => {
      const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const allChecked = Array.from(taskCheckboxes).every(checkbox => checkbox.checked);
          headerCheckbox.checked = allChecked;
          saveCheckboxState();
          displayTaskOptions(); // Update task options menu visibility
        });
      });
    };

    // Event listener for the header checkbox
    headerCheckbox.addEventListener('change', () => {
      updateTaskCheckboxes(headerCheckbox.checked);
    });

    // Function to save the state of the checkboxes to local storage
    const saveCheckboxState = () => {
      const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      const checkboxStates = Array.from(taskCheckboxes).map(checkbox => checkbox.checked);
      localStorage.setItem('taskCheckboxStates', JSON.stringify(checkboxStates));
    };

    // Function to load the state of the checkboxes from local storage
    const loadCheckboxState = () => {
      const checkboxStates = JSON.parse(localStorage.getItem('taskCheckboxStates'));
      if (checkboxStates) {
        const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
        taskCheckboxes.forEach((checkbox, index) => {
          checkbox.checked = checkboxStates[index];
        });
      }
      // Ensure the header checkbox is unchecked on page load
      uncheckAllCheckboxes();
      displayTaskOptions(); // Update task options menu visibility
    };

    // Load the checkbox state on page load
    loadCheckboxState();

    // Attach event listeners to task checkboxes on page load
    attachTaskCheckboxListeners();

    // Reattach event listeners to task checkboxes whenever a new task is added
    const taskList = document.getElementById('taskList');
    const observer = new MutationObserver(() => {
      attachTaskCheckboxListeners();
    });
    observer.observe(taskList, { childList: true });
  });
}