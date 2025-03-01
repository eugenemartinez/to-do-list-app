import { initializeDarkMode } from './dark-mode.js';
import { setDefaultDate } from './default-date.js';
import { initializeAddTask } from './add-task.js';
import { initializeCheckboxAll } from './header-checkbox.js';
import { initializeTaskCards, showTaskDetails } from './task-card.js';
import { activateStatusFilter } from './sort-filter/status-filter.js';
import { activateStatusSort } from './sort-filter/status-sort.js';
import { activateDateSort } from './sort-filter/date-sort.js';
import { activateDateFilter } from './sort-filter/date-filter.js';

// Initialize dark mode
initializeDarkMode();

// Set default date
setDefaultDate();

// Initialize add task functionality
initializeAddTask();

// Initialize checkbox functionality
initializeCheckboxAll();

// Initialize task cards
initializeTaskCards();

// Initialize the status filter
activateStatusFilter('filterByStatusBtn', 'filterStatusDropdown', 'resetFilterByStatusBtn');

// Initialize the status sort
activateStatusSort('sortByStatusBtn', 'sortStatusDropdown', 'resetSortByStatusBtn');

// Initialize the date sort
activateDateSort('sortByDateBtn', 'sortDateDropdown', 'resetSortByDateBtn');

// Initialize the date filter
activateDateFilter('filterByDateBtn', 'filterDateInput', 'resetFilterByDateBtn');

// Make showTaskDetails available globally for task.js to use
window.showTaskDetails = showTaskDetails;





