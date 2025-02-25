export function uncheckAllCheckboxes() {
  document.querySelectorAll('.task-item-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
  document.querySelector('.task-header-checkbox input[type="checkbox"]').checked = false;
}