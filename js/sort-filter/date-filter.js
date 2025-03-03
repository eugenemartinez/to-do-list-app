let originalTasks = [];

/**
 * Formats a date string to YYYY-MM-DD format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} - The formatted date string.
 */
function formatDateString(dateStr) {
  if (!dateStr) return '';
  
  // Try to parse the date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ''; // Invalid date
  
  // Format as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Shows or hides tasks based on due date filter.
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 * @param {string} dateStr - The date to filter by.
 */
function filterTasksByDate(taskContainer, dateStr) {
  const filterDate = formatDateString(dateStr);
  const tasks = taskContainer.querySelectorAll('.task-list-item');
  
  tasks.forEach(task => {
    const taskDateAttr = task.getAttribute('data-due-date') || '';
    const taskDate = formatDateString(taskDateAttr);
    
    if (taskDate === filterDate) {
      task.style.display = ''; // Show tasks that match the filter
    } else {
      task.style.display = 'none'; // Hide tasks that don't match the filter
    }
  });
}

/**
 * Shows all tasks (removes filter).
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 */
function showAllTasks(taskContainer) {
  const tasks = taskContainer.querySelectorAll('.task-list-item');
  tasks.forEach(task => {
    task.style.display = ''; // Show all tasks
  });
}

/**
 * Activates the date filter functionality.
 * @param {string} filterDateInputId - The ID of the date input field.
 * @param {string} resetButtonId - The ID of the reset button.
 */
export function activateDateFilter(filterDateInputId, resetButtonId) {
  // Get both the filter button and input
  const filterDateInput = document.getElementById(filterDateInputId);
  const filterDateBtn = document.getElementById('filterByDateBtn'); // The actual button with the date value
  const resetButton = document.getElementById(resetButtonId);
  const taskContainer = document.getElementById('taskList');

  if (!filterDateInput || !resetButton || !taskContainer || !filterDateBtn) {
    console.error('Date filter elements not found');
    return;
  }

  // Watch for attribute changes on the filter date button
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
        const date = filterDateBtn.getAttribute('value');
        
        if (date) {
          filterTasksByDate(taskContainer, date);
        } else {
          showAllTasks(taskContainer);
        }
        break;
      }
    }
  });

  // Start observing attribute changes on the filter date button
  observer.observe(filterDateBtn, { attributes: true });

  // Also handle the actual date input change in case it's used
  filterDateInput.addEventListener('change', () => {
    const date = filterDateInput.value;
    
    if (date) {
      filterTasksByDate(taskContainer, date);
    } else {
      showAllTasks(taskContainer);
    }
  });

  // Handle reset button
  resetButton.addEventListener('click', () => {
    filterDateInput.value = '';
    filterDateBtn.setAttribute('value', '');
    showAllTasks(taskContainer);
  });
}