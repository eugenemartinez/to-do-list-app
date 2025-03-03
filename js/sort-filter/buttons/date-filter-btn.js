import { formatDate } from '../../default-date.js';

export function activateDateFilterBtn(buttonId, inputId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');
  const taskInput = document.getElementById('taskInput'); // Add Task input box

  if (!button || !input || !resetButton || !container) {
    return;
  }

  // Function to adjust the input width based on its content
  const adjustInputWidth = (element) => {
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = window.getComputedStyle(element).fontSize;
    tempSpan.style.fontFamily = window.getComputedStyle(element).fontFamily;

    if (element.tagName === 'SELECT') {
      // For select elements, use the selected option's text
      tempSpan.innerText = element.options[element.selectedIndex].text;
    } else {
      // For input elements, use the value or placeholder
      tempSpan.innerText = element.value || element.placeholder;
    }

    document.body.appendChild(tempSpan);
    element.style.width = `${tempSpan.offsetWidth + 15}px`; // Add more padding to ensure content is fully viewable
    document.body.removeChild(tempSpan);
  };

  // Initially hide the input
  input.classList.add('hidden');

  // Function to update reset button visibility based on input value
  const updateResetButtonVisibility = () => {
    if (input.value !== '') {
      resetButton.classList.remove('hidden');
      container.classList.add('active');
      input.classList.remove('hidden');
      adjustInputWidth(input); // Adjust the input width based on its content
    } else {
      resetButton.classList.add('hidden');
      container.classList.remove('active');
      input.classList.add('hidden');
    }
  };

  // Initialize Flatpickr on the button
  const datePicker = flatpickr(button, {
    dateFormat: "Y-m-d",  // Store in YYYY-MM-DD format for consistency
    altInput: true,       // Show a more readable format in the input field
    altFormat: "F j, Y",  // F = full month name, j = day without leading zeros, Y = full year
    allowInput: true,
    disableMobile: true,  // Use native date picker on mobile devices
    onChange: function(selectedDates, dateStr, instance) {
      // Update the input value and show reset button if needed
      input.value = formatDate(dateStr);
      updateResetButtonVisibility(); // Update reset button based on input value
    },
    onOpen: function(dateObj, dateStr, instance) {
      // Remove inline styles for top and left
      instance.calendarContainer.style.top = 'auto';
      instance.calendarContainer.style.left = 'auto';
    },
    onReady: function(dateObj, dateStr, instance) {
      // Add custom styles to the Flatpickr input element
      if (instance.altInput) {
        instance.altInput.style.position = 'absolute';
      }
      adjustInputWidth(input); // Adjust the input width based on its initial content
    }
  });

  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    
    // Hide any visible dropdowns in other filter containers
    document.querySelectorAll('.filter-container').forEach(otherContainer => {
      if (otherContainer !== container) {
        const otherDropdown = otherContainer.querySelector('select');
        if (otherDropdown) otherDropdown.classList.add('hidden');
      }
    });
    
    datePicker.open(); // Open the Flatpickr calendar
    
    // Update reset button visibility based on input value
    updateResetButtonVisibility();
  });

  resetButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    
    // Reset the input value
    input.value = '';
    
    // Hide the input and reset button
    input.classList.add('hidden');
    resetButton.classList.add('hidden');
    container.classList.remove('active');
    
    // Clear Flatpickr selection
    datePicker.clear();
  });
  
  // Add event listener to the task input to reset the date filter
  if (taskInput) {
    taskInput.addEventListener('click', () => {
      // Only trigger reset if the filter is active
      if (!resetButton.classList.contains('hidden')) {
        resetButton.click();
      }
    });
  }

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target) && !event.target.closest('.flatpickr-calendar')) {
      // Don't hide the input field as we're showing the reset button instead
      
      // Update reset button visibility based on input value
      updateResetButtonVisibility();
    }
  });

  // Set the placeholder text for the input box
  input.placeholder = 'Select Date';
  
  // Initialize state based on current input value
  updateResetButtonVisibility();

  return {
    destroy: () => {
      // Clean up event listeners
      document.removeEventListener('click', () => {});
      resetButton.removeEventListener('click', () => {});
      if (taskInput) {
        taskInput.removeEventListener('click', () => {});
      }
      datePicker.destroy();
    },
    setValue: (value) => {
      input.value = value;
      updateResetButtonVisibility();
    },
    getValue: () => input.value
  };
}