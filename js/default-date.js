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

export function initializeFlatpickr(inputElement, onCloseCallback, setDefault = true) {
  if (!inputElement) {
    return; // Return early if the input element is not provided
  }

  const defaultDate = setDefault ? (inputElement.value || new Date()) : null; // Use the existing value or today's date if setDefault is true

  const datePickr = flatpickr(inputElement, {
    dateFormat: "Y-m-d",  // Store in YYYY-MM-DD format for consistency
    altInput: true,       // Show a more readable format in the input field
    altFormat: "F j, Y",  // F = full month name, j = day without leading zeros, Y = full year
    allowInput: true,
    defaultDate: defaultDate, // Set default date to the existing value or today if setDefault is true
    disableMobile: true,  // Use native date picker on mobile devices
    onClose: onCloseCallback, // Call the provided callback when the date is selected
    onReady: function(dateObj, dateStr, instance) {
      // Apply center alignment to the alt input after Flatpickr is ready
      if (instance.altInput) {
        instance.altInput.style.textAlign = "center";
      }
    }
  });

  return datePickr;
}

export function formatDate(dateString) {
  if (!dateString) return ''; // Return empty string for null/undefined/empty dates
  
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}