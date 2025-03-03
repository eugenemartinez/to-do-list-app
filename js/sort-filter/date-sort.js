let originalTasks = [];

/**
 * Sorts tasks by date.
 * @param {HTMLElement[]} tasks - Array of task elements to sort.
 * @param {string} order - The order to sort by ('ascending' or 'descending').
 * @returns {HTMLElement[]} - Sorted array of task elements.
 */
function sortTasksByDate(tasks, order) {
  return tasks.sort((taskA, taskB) => {
    const dateA = taskA.getAttribute('data-due-date') || '';
    const dateB = taskB.getAttribute('data-due-date') || '';

    // Handle empty dates
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    if (!dateA && !dateB) return 0;

    // Compare dates
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();

    if (order === 'descending') {
      return timeB - timeA; // Newest (larger timestamp) first
    } else {
      return timeA - timeB; // Oldest (smaller timestamp) first
    }
  });
}

/**
 * Sorts tasks by date and reattaches them to the DOM.
 * @param {HTMLElement} taskContainer - The container element for the tasks.
 * @param {string} order - The order to sort by ('ascending' or 'descending').
 */
function sortAndReattachTasksByDate(taskContainer, order) {
  const tasks = Array.from(taskContainer.querySelectorAll('.task-list-item'));

  const sortedTasks = sortTasksByDate(tasks, order);

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
 * Activates the date sort functionality.
 * @param {string} sortButtonId - The ID of the sort button.
 * @param {string} sortDropdownId - The ID of the sort dropdown.
 * @param {string} resetButtonId - The ID of the reset button.
 */
export function activateDateSort(sortButtonId, sortDropdownId, resetButtonId) {
  const sortButton = document.getElementById(sortButtonId);
  const sortDropdown = document.getElementById(sortDropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const taskContainer = document.getElementById('taskList');

  if (!sortButton || !sortDropdown || !resetButton || !taskContainer) {
    console.error('Date sort elements not found');
    return;
  }

  // Store the original order of tasks
  originalTasks = Array.from(taskContainer.querySelectorAll('.task-list-item'));

  const applySort = () => {
    const order = sortDropdown.value === 'Ascending' ? 'ascending' : 
                  sortDropdown.value === 'Descending' ? 'descending' : '';
    if (order) {
      sortAndReattachTasksByDate(taskContainer, order);
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