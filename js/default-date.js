export function setDefaultDate(inputElement) {
  if (!inputElement) {
    return; // Return early if the input element is not provided
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, '0');

  const todayString = `${yyyy}-${mm}-${dd}`;
  inputElement.value = todayString;
}

export function initializeFlatpickr(inputElement, onCloseCallback) {
  if (!inputElement) {
    return; // Return early if the input element is not provided
  }

  const datePickr = flatpickr(inputElement, {
    dateFormat: "Y-m-d",  // Store in YYYY-MM-DD format for consistency
    altInput: true,       // Show a more readable format in the input field
    altFormat: "F j, Y",  // F = full month name, j = day without leading zeros, Y = full year
    allowInput: true,
    defaultDate: new Date(), // Set default date to today
    disableMobile: true,  // Use native date picker on mobile devices
    onClose: onCloseCallback, // Call the provided callback when the date is selected
    onReady: function(dateObj, dateStr, instance) {
      // Apply center alignment to the alt input after Flatpickr is ready
      if (instance.altInput) {
        instance.altInput.style.textAlign = "center";
      }
    }
  });

  // Also force center alignment for any visible inputs
  document.querySelectorAll('.task-form .flatpickr-input:not([type="hidden"])').forEach(input => {
    input.style.textAlign = "center";
  });

  return datePickr;
}