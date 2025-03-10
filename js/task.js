import { saveTasks } from './storage.js';
import { updateStatusColor } from './status-color.js'; // Import the function from status-color.js
import { initializeFlatpickr, formatDate } from './default-date.js';

export class Task {
  constructor(name, dueDate, description = '') {
    this.name = name;
    this.dueDate = dueDate;
    this.status = 'In Progress'; // Default status changed to 'In Progress'
    this.description = description; // Add description property with empty string default
  }

  createTaskElement() {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-list-item');
    // Store task data as attributes for easy access when showing task details
    taskItem.dataset.name = this.name;
    taskItem.dataset.dueDate = this.dueDate;
    taskItem.dataset.status = this.status;
    taskItem.dataset.description = this.description;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-item-checkbox');

    // Create editable task name input
    const taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.classList.add('task-item-name-input');
    taskName.value = this.name;

    // Save task name function to avoid code duplication
    const saveTaskName = () => {
      this.name = taskName.value;
      taskItem.dataset.name = this.name;
      saveTasks(); // Call centralized saveTasks function
    };

    // Save on Enter key press
    taskName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission if in a form
        taskName.blur(); // Remove focus
        saveTaskName();
      }
    });

    // Save on blur (when focus is lost)
    taskName.addEventListener('blur', () => {
      taskName.classList.remove('editing');
      saveTaskName();
    });

    // Add focus styling effect
    taskName.addEventListener('focus', () => {
      taskName.classList.add('editing');
    });

    // Create editable due date container
    const taskDueDateContainer = document.createElement('div');
    taskDueDateContainer.classList.add('task-date-container');
    
    // Create date input that will use Flatpickr
    const taskDueDate = document.createElement('input');
    taskDueDate.type = 'text'; // Use text type, not date
    taskDueDate.classList.add('task-item-date-input');
    taskDueDate.placeholder = 'Select date';
    taskDueDate.value = this.dueDate; // Use the original date format
    
    // Add the input to the container first
    taskDueDateContainer.appendChild(taskDueDate);
    
    // Initialize Flatpickr AFTER adding to DOM so both inputs appear in the container
    const datePicker = initializeFlatpickr(taskDueDate, (selectedDates, dateStr, instance) => {
      if (selectedDates.length > 0) {
        // Get date in YYYY-MM-DD format directly from flatpickr
        const formattedDate = instance.formatDate(selectedDates[0], "Y-m-d");
        
        this.dueDate = formattedDate;
        taskItem.dataset.dueDate = formattedDate;
        
        saveTasks(); // Call centralized saveTasks function
      }
    });
    
    // Make both the input and alt input visible (Flatpickr normally hides the original)
    if (taskDueDate.nextElementSibling) {
      // This is the alt input created by Flatpickr
      const altInput = taskDueDate.nextElementSibling;
      
      // Apply the same classes for consistent styling
      altInput.classList.add('task-item-date-input');
      
      // Remove the original input from tab order
      taskDueDate.tabIndex = -1;
      taskDueDate.style.display = 'none';
      
      // Ensure the alt input opens the calendar
      altInput.addEventListener('click', () => {
        datePicker.open();
      });
    }
    
    // Ensure Flatpickr opens when clicking the container too
    taskDueDateContainer.addEventListener('click', (e) => {
      if (e.target === taskDueDateContainer) {
        datePicker.open();
      }
    });
    
    taskDueDateContainer.appendChild(taskDueDate);

    const taskStatus = document.createElement('select');
    taskStatus.classList.add('task-item-status');
    ['In Progress', 'Stuck', 'Done'].forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      if (status === this.status) {
        option.selected = true;
      }
      taskStatus.appendChild(option);
    });

    // Initial color update
    updateStatusColor(taskStatus, this.status);

    // Update color and save tasks on change
    taskStatus.addEventListener('change', () => {
      this.status = taskStatus.value;
      taskItem.dataset.status = this.status; // Update the data attribute
      updateStatusColor(taskStatus, this.status);
      saveTasks(); // Call centralized saveTasks function
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-item-delete');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      taskItem.classList.add('fade-out');
      setTimeout(() => {
        taskItem.remove();
        saveTasks(); // Call centralized saveTasks function
      }, 500); // Match the duration of the fade-out animation
    });

    // Add double click event to show task details
    taskItem.addEventListener('dblclick', (e) => {
      // Don't trigger if clicking on inputs or buttons
      if (e.target === taskItem) {
        if (window.showTaskDetails) {
          window.showTaskDetails(this);
        }
      }
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(taskDueDateContainer);
    taskItem.appendChild(taskStatus);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }
}