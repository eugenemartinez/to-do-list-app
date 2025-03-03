import { initializeDarkMode } from './dark-mode.js';
import { setDefaultDate } from './default-date.js';
import { initializeAddTask } from './add-task.js';
import { initializeCheckboxAll } from './header-checkbox.js';
import { initializeTaskCards, showTaskDetails } from './task-card.js';
import { activateStatusFilterBtn } from './sort-filter/buttons/status-filter-btn.js';
import { activateStatusSortBtn } from './sort-filter/buttons/status-sort-btn.js';
import { activateDateSortBtn } from './sort-filter/buttons/date-sort-btn.js';
import { activateDateFilterBtn } from './sort-filter/buttons/date-filter-btn.js';
import { initializeSortFilterButtons } from './sort-filter/buttons/sort-filter-btn.js';
import { activateDateSort } from './sort-filter/date-sort.js';
import { activateStatusSort } from './sort-filter/status-sort.js';
import { activateStatusFilter } from './sort-filter/status-filter.js';
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

// Initialize the status filter button behaviors
activateStatusFilterBtn('filterByStatusBtn', 'filterStatusDropdown', 'resetFilterByStatusBtn');

// Initialize the status sort button behaviors
activateStatusSortBtn('sortByStatusBtn', 'sortStatusDropdown', 'resetSortByStatusBtn');

// Initialize the date sort button behaviors
activateDateSortBtn('sortByDateBtn', 'sortDateDropdown', 'resetSortByDateBtn');

// Initialize the date filter button behaviors
activateDateFilterBtn('filterByDateBtn', 'filterDateInput', 'resetFilterByDateBtn');

// Initialize sort and filter buttons control
initializeSortFilterButtons();

// Initialize the date sort functionality
activateDateSort('sortByDateBtn', 'sortDateDropdown', 'resetSortByDateBtn');

// Initialize the status sort functionality
activateStatusSort('sortByStatusBtn', 'sortStatusDropdown', 'resetSortByStatusBtn');

// Initialize the status filter functionality
activateStatusFilter('filterStatusDropdown', 'resetFilterByStatusBtn');

// Initialize the date filter functionality
activateDateFilter('filterByDateBtn', 'resetFilterByDateBtn');

// Make showTaskDetails available globally for task.js to use
window.showTaskDetails = showTaskDetails;