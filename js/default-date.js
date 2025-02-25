export function setDefaultDate() {
  const taskDateInput = document.getElementById('taskDate');
  if (!taskDateInput) {
    console.error('Task date input not found');
    return;
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, '0');

  const todayString = `${yyyy}-${mm}-${dd}`;
  taskDateInput.value = todayString;
}