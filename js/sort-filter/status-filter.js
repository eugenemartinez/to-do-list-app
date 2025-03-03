/**
 * Shows or hides tasks based on status filter.
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 * @param {string} status - The status to filter by.
 */
function filterTasksByStatus(taskContainer, status) {
  const tasks = taskContainer.querySelectorAll('.task-list-item');
  
  tasks.forEach(task => {
    const taskStatus = task.getAttribute('data-status') || '';
    
    if (taskStatus === status) {
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
 * Activates the status filter functionality.
 * @param {string} filterDropdownId - The ID of the filter dropdown.
 * @param {string} resetButtonId - The ID of the reset button.
 */
export function activateStatusFilter(filterDropdownId, resetButtonId) {
  const filterDropdown = document.getElementById(filterDropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const taskContainer = document.getElementById('taskList');

  if (!filterDropdown || !resetButton || !taskContainer) {
    console.error('Status filter elements not found');
    return;
  }

  // Only apply filter when dropdown value changes
  filterDropdown.addEventListener('change', () => {
    const status = filterDropdown.value;
    if (status) {
      filterTasksByStatus(taskContainer, status);
    } else {
      showAllTasks(taskContainer);
    }
  });

  // Handle reset button
  resetButton.addEventListener('click', () => {
    filterDropdown.value = '';
    showAllTasks(taskContainer);
  });
}