export function initializeSortFilterButtons() {
  const filterTasksBtn = document.getElementById('filterTasksBtn');
  const sortTasksBtn = document.getElementById('sortTasksBtn');
  const filterButtons = document.querySelectorAll('.filter-container');

  // Initially hide all filter and sort buttons
  filterButtons.forEach(button => button.classList.add('hidden'));

  // Toggle visibility of filter buttons
  filterTasksBtn.addEventListener('click', () => {
    filterButtons.forEach(button => {
      if (button.classList.contains('date-filter-container') || button.classList.contains('status-filter-container')) {
        button.classList.toggle('hidden');
      }
    });
  });

  // Toggle visibility of sort buttons
  sortTasksBtn.addEventListener('click', () => {
    filterButtons.forEach(button => {
      if (button.classList.contains('date-sort-container') || button.classList.contains('status-sort-container')) {
        button.classList.toggle('hidden');
      }
    });
  });
}