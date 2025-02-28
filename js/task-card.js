import { saveTasks } from './storage.js';
import { updateStatusColor } from './status-color.js'; // Import the function from status-color.js
import { initializeFlatpickr } from './default-date.js';

export function initializeTaskCards() {
  // Get the task card modal elements based on your HTML structure
  const taskDetailOverlay = document.getElementById('taskDetailOverlay');
  const taskDetailCard = document.getElementById('taskDetailCard');
  const detailTaskName = document.getElementById('detailTaskName');
  const detailDueDateInput = document.getElementById('detailDueDateInput');
  const detailStatusDropdown = document.getElementById('detailStatusDropdown');
  const detailDescription = document.getElementById('detailDescription');
  const closeTaskDetail = document.getElementById('closeTaskDetail');
  const detailSaveBtn = document.getElementById('detailSaveBtn');
  const detailDeleteBtn = document.getElementById('detailDeleteBtn');
  
  // Currently active task element
  let activeTaskElement = null;
  
  // Initialize Flatpickr for the date input
  const detailDatePicker = initializeFlatpickr(detailDueDateInput, () => {
    // Call saveTaskChanges when the date is selected
    saveTaskChanges();
  });
  
  // Function to open the task card with details
  function openTaskCard(taskElement) {
    // Store reference to the clicked task
    activeTaskElement = taskElement;
    
    // Fill in task details from dataset
    detailTaskName.value = taskElement.dataset.name || '';
    
    // Use flatpickr's setDate method
    if (taskElement.dataset.dueDate) {
      detailDatePicker.setDate(taskElement.dataset.dueDate);
    } else {
      detailDatePicker.clear();
    }
    
    // Set status dropdown value, ensuring it matches the option values in HTML
    const taskStatus = taskElement.dataset.status || 'In Progress';
    
    // Convert task status to match the values in your HTML dropdown
    let statusValue = 'in-progress'; // Default
    switch(taskStatus) {
      case 'In Progress':
        statusValue = 'in-progress';
        break;
      case 'Stuck':
        statusValue = 'stuck';
        break;
      case 'Done':
        statusValue = 'done';
        break;
      case 'Not Started':
        statusValue = 'not-started';
        break;
      default:
        statusValue = 'in-progress';
    }
    
    detailStatusDropdown.value = statusValue;
    detailDescription.value = taskElement.dataset.description || '';
    
    // Show the task detail card and overlay
    taskDetailOverlay.style.display = 'block';
    taskDetailCard.style.display = 'block';
    
    // Apply status color to the status dropdown
    updateStatusColor(detailStatusDropdown, taskStatus);
    
    // Add event listener to update status color on change
    detailStatusDropdown.addEventListener('change', () => {
      const selectedStatus = detailStatusDropdown.options[detailStatusDropdown.selectedIndex].text;
      updateStatusColor(detailStatusDropdown, selectedStatus);
      saveTaskChanges(); // Auto-save on status change
    });
    
    // Auto-save on blur (when focus is lost) for task name
    detailTaskName.addEventListener('blur', saveTaskChanges);
    
    // Auto-save on blur (when focus is lost) for due date
    detailDueDateInput.addEventListener('blur', saveTaskChanges);
    
    // Auto-save on blur (when focus is lost) for description
    detailDescription.addEventListener('blur', saveTaskChanges);
    
    // Add event listener to deactivate input on Enter key press for task name
    detailTaskName.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        detailTaskName.blur(); // Remove focus from the input
      }
    });
    
    // Add event listener to deactivate input on Enter key press for description
    detailDescription.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default Enter behavior
        detailDescription.blur(); // Remove focus from the input
      }
    });
    
    // Focus on the task name input for immediate editing
    setTimeout(() => {
      detailTaskName.focus();
      detailTaskName.select(); // Select all text for easy editing
    }, 50);
    
    // Add animation classes if desired
    setTimeout(() => {
      taskDetailOverlay.classList.add('active');
      taskDetailCard.classList.add('active');
    }, 10); // Small delay for the CSS transition to work properly
  }
  
  // Function to close the task card
  function closeTaskCard() {
    // Remove active classes for animations
    taskDetailOverlay.classList.remove('active');
    taskDetailCard.classList.remove('active');
    
    // Hide elements after animation completes
    setTimeout(() => {
      taskDetailOverlay.style.display = 'none';
      taskDetailCard.style.display = 'none';
      activeTaskElement = null;
    }, 300); // Match this with your CSS transition duration
  }
  
  // Function to save task changes
  function saveTaskChanges() {
    if (!activeTaskElement) return;
    
    // Convert the status value from HTML back to the format used in task.js
    let taskStatus = 'In Progress'; // Default
    switch(detailStatusDropdown.value) {
      case 'in-progress':
        taskStatus = 'In Progress';
        break;
      case 'stuck':
        taskStatus = 'Stuck';
        break;
      case 'done':
        taskStatus = 'Done';
        break;
    }
    
    // Get the selected date from flatpickr in YYYY-MM-DD format
    const dueDateValue = detailDatePicker.selectedDates.length > 0 
      ? detailDatePicker.formatDate(detailDatePicker.selectedDates[0], 'Y-m-d')
      : '';
    
    // Update the task element's dataset
    activeTaskElement.dataset.name = detailTaskName.value;
    activeTaskElement.dataset.dueDate = dueDateValue;
    activeTaskElement.dataset.status = taskStatus;
    activeTaskElement.dataset.description = detailDescription.value;
    
    // Update the visible task elements
    const nameInput = activeTaskElement.querySelector('.task-item-name-input');
    if (nameInput) nameInput.value = detailTaskName.value;
    
    // Update the date input in the task list item
    const dateInput = activeTaskElement.querySelector('.task-item-date-input');
    if (dateInput) {
      // Don't try to directly set the flatpickr instance from here
      // Just update the dataset and let the next refresh handle it
      dateInput.dataset.originalDate = dueDateValue;
      
      // If there's a formatted date string visible, update it
      if (dueDateValue) {
        // Only update the display value, not the flatpickr directly
        const date = new Date(dueDateValue);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateInput.value = date.toLocaleDateString(undefined, options);
      } else {
        dateInput.value = '';  // Clear the input if no date
      }
    }
    
    const statusSelect = activeTaskElement.querySelector('.task-item-status');
    if (statusSelect) {
      statusSelect.value = taskStatus;
      // Trigger change event to update visual styles
      const changeEvent = new Event('change');
      statusSelect.dispatchEvent(changeEvent);
    }
    
    // Save to localStorage
    saveTasks();
  }
  
  // Function to delete the task
  function deleteTask() {
    if (!activeTaskElement) return;
    
    // Add fade-out animation
    activeTaskElement.classList.add('fade-out');
    
    // Remove the task after animation completes
    setTimeout(() => {
      activeTaskElement.remove();
      saveTasks();
      closeTaskCard();
    }, 500); // Match with your CSS fade-out animation duration
  }
  
  // Set up click handlers for task items
  function setupTaskItemListeners() {
    // Handle clicks on task items to open the detail card
    document.addEventListener('click', (event) => {
      // Check if we clicked on a task item
      const taskItem = event.target.closest('.task-list-item');
      
      if (taskItem) {
        // Don't open the card if we clicked on interactive elements
        const isInteractiveElement = 
          event.target.classList.contains('task-item-checkbox') ||
          event.target.classList.contains('task-item-name-input') ||
          event.target.classList.contains('task-item-date-input') ||
          event.target.classList.contains('task-item-status') ||
          event.target.classList.contains('task-item-delete');
        
        if (!isInteractiveElement) {
          openTaskCard(taskItem);
        }
      }
    });
    
    // Close button event
    closeTaskDetail.addEventListener('click', closeTaskCard);
    
    // Close when clicking on the overlay
    taskDetailOverlay.addEventListener('click', closeTaskCard);
    
    // Save button event
    detailSaveBtn.addEventListener('click', closeTaskCard);
    
    // Delete button event
    detailDeleteBtn.addEventListener('click', deleteTask);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // Only process if the task card is open
      if (taskDetailCard.style.display === 'block') {
        if (event.key === 'Escape') {
          closeTaskCard();
        } else if (event.key === 'Enter' && event.ctrlKey) {
          // Ctrl+Enter to save (allows regular Enter to work in textarea)
          saveTaskChanges();
        }
      }
    });
    
    // Prevent clicks inside the card from closing it
    taskDetailCard.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    
    // Make clicking the date input open the flatpickr calendar
    detailDueDateInput.addEventListener('click', () => {
      detailDatePicker.open();
    });
  }
  
  // Initialize everything
  setupTaskItemListeners();
}

// This function can be called from task.js when double-clicking on a task
export function showTaskDetails(task) {
  // Find the corresponding task element by name and due date
  const taskElements = document.querySelectorAll('.task-list-item');
  let taskElement = null;
  
  for (const element of taskElements) {
    if (element.dataset.name === task.name && element.dataset.dueDate === task.dueDate) {
      taskElement = element;
      break;
    }
  }
  
  if (taskElement) {
    // Get our function to open the task card
    const taskDetailOverlay = document.getElementById('taskDetailOverlay');
    const taskDetailCard = document.getElementById('taskDetailCard');
    const detailTaskName = document.getElementById('detailTaskName');
    const detailDescription = document.getElementById('detailDescription');
    
    // Set active task element
    window.activeTaskElement = taskElement;
    
    // Fill in task details
    detailTaskName.value = task.name || '';
    
    // Find flatpickr instance and set the date
    const detailDatePicker = document.getElementById('detailDueDateInput')._flatpickr;
    if (detailDatePicker) {
      detailDatePicker.setDate(task.dueDate || '');
    }
    
    // Convert status to match HTML options
    const detailStatusDropdown = document.getElementById('detailStatusDropdown');
    let statusValue = 'in-progress'; // Default
    switch(task.status) {
      case 'In Progress':
        statusValue = 'in-progress';
        break;
      case 'Stuck':
        statusValue = 'stuck';
        break;
      case 'Done':
        statusValue = 'done';
        break;
      case 'Not Started':
        statusValue = 'not-started';
        break;
    }
    
    detailStatusDropdown.value = statusValue;
    detailDescription.value = task.description || '';
    
    // Show the task detail card and overlay
    taskDetailOverlay.style.display = 'block';
    taskDetailCard.style.display = 'block';
    
    // Apply status color to the status dropdown
    updateStatusColor(detailStatusDropdown, task.status);
    
    // Add event listener to update status color on change
    detailStatusDropdown.addEventListener('change', () => {
      const selectedStatus = detailStatusDropdown.options[detailStatusDropdown.selectedIndex].text;
      updateStatusColor(detailStatusDropdown, selectedStatus);
      saveTaskChanges(); // Auto-save on status change
    });
    
    // Auto-save on blur (when focus is lost) for task name
    detailTaskName.addEventListener('blur', saveTaskChanges);
    
    // Auto-save on blur (when focus is lost) for due date
    detailDueDateInput.addEventListener('blur', saveTaskChanges);
    
    // Auto-save on blur (when focus is lost) for description
    detailDescription.addEventListener('blur', saveTaskChanges);
    
    // Add animation classes
    setTimeout(() => {
      taskDetailOverlay.classList.add('active');
      taskDetailCard.classList.add('active');
      
      // Focus on the task name for immediate editing
      detailTaskName.focus();
      detailTaskName.select(); // Select all text for easy editing
    }, 10);
  }
}