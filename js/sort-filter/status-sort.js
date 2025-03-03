let originalTasks = [];

/**
 * Sorts tasks by status.
 * @param {HTMLElement[]} tasks - Array of task elements to sort.
 * @param {string} order - The order to sort by ('in-progress-first', 'stuck-first', 'done-first').
 * @returns {HTMLElement[]} - Sorted array of task elements.
 */
function sortTasksByStatus(tasks, order) {
  let statusPriority = {
    'Not Started': 3,
    'In Progress': 2,
    'Stuck': 1,
    'Done': 0
  };

  if (order === 'in-progress-first') {
    statusPriority = { 'In Progress': 3, 'Stuck': 2, 'Not Started': 1, 'Done': 0 };
  } else if (order === 'stuck-first') {
    statusPriority = { 'Stuck': 3, 'In Progress': 2, 'Not Started': 1, 'Done': 0 };
  } else if (order === 'done-first') {
    statusPriority = { 'Done': 3, 'In Progress': 2, 'Stuck': 1, 'Not Started': 0 };
  }

  return tasks.sort((taskA, taskB) => {
    const statusA = taskA.getAttribute('data-status') || '';
    const statusB = taskB.getAttribute('data-status') || '';

    return statusPriority[statusB] - statusPriority[statusA];
  });
}

/**
 * Sorts tasks by status and reattaches them to the DOM.
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 * @param {string} order - The order to sort by ('in-progress-first', 'stuck-first', 'done-first').
 */
function sortAndReattachTasksByStatus(taskContainer, order) {
  const tasks = Array.from(taskContainer.querySelectorAll('.task-list-item'));

  const sortedTasks = sortTasksByStatus(tasks, order);

  // Clear and reattach tasks
  taskContainer.innerHTML = '';
  sortedTasks.forEach(task => {
    taskContainer.appendChild(task);
  });
}

/**
 * Reattaches tasks to the DOM in their original order.
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 */
function reattachOriginalTasks(taskContainer) {
  // Clear and reattach tasks in their original order
  taskContainer.innerHTML = '';
  originalTasks.forEach(task => {
    taskContainer.appendChild(task);
  });
}

/**
 * Activates the status sort functionality.
 * @param {string} sortButtonId - The ID of the sort button.
 * @param {string} sortDropdownId - The ID of the sort dropdown.
 * @param {string} resetButtonId - The ID of the reset button.
 */
export function activateStatusSort(sortButtonId, sortDropdownId, resetButtonId) {
  const sortButton = document.getElementById(sortButtonId);
  const sortDropdown = document.getElementById(sortDropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const taskContainer = document.getElementById('taskList');

  if (!sortButton || !sortDropdown || !resetButton || !taskContainer) {
    console.error('Status sort elements not found');
    return;
  }

  // Store the original order of tasks
  originalTasks = Array.from(taskContainer.querySelectorAll('.task-list-item'));

  const applySort = () => {
    const order = sortDropdown.value;
    if (order) {
      sortAndReattachTasksByStatus(taskContainer, order);
    } else {
      reattachOriginalTasks(taskContainer); // Reattach tasks in their original order
    }
  };

  sortButton.addEventListener('click', applySort);
  sortDropdown.addEventListener('change', applySort);

  resetButton.addEventListener('click', () => {
    sortDropdown.value = '';
    reattachOriginalTasks(taskContainer); // Reattach tasks in their original order
  });
}