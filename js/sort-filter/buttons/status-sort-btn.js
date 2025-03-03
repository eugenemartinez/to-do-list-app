import { setupButtonColors } from '../../status-color.js';

export function activateStatusSortBtn(buttonId, dropdownId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');
  
  // Get the date sort button to listen for clicks
  const dateSortBtn = document.getElementById('sortByDateBtn');
  
  if (!button || !dropdown || !resetButton || !container) {
    return;
  }

  // Store default icon if needed
  button.dataset.defaultIcon = button.innerHTML;
  
  // Track the current cycle position
  let clickCount = 0;

  // Function to check if dropdown has a meaningful value (not the default)
  const hasValue = () => {
    return dropdown.value !== '' && dropdown.value !== 'Select Sort Order';
  };

  // Function to update reset button visibility based on dropdown value
  const updateResetButtonVisibility = () => {
    if (hasValue()) {
      resetButton.classList.remove('hidden');
    } else {
      resetButton.classList.add('hidden');
    }
  };
  
  // Set up the color change functionality
  setupButtonColors(button, dropdown, resetButton, container);
  
  // Listen for date sort button clicks to reset status sort
  if (dateSortBtn) {
    dateSortBtn.addEventListener('click', () => {
      // Only trigger reset if our sort is active
      if (!resetButton.classList.contains('hidden')) {
        resetButton.click();
      }
    });
  }

  // Button click handler - cycle through options
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    
    // Hide any visible dropdowns in other filter containers
    document.querySelectorAll('.filter-container').forEach(otherContainer => {
      if (otherContainer !== container) {
        const otherDropdown = otherContainer.querySelector('select');
        if (otherDropdown) otherDropdown.classList.add('hidden');
      }
    });
    
    // Cycle through options using the correct values
    if (dropdown.value === 'in-progress-first') {
      dropdown.value = 'stuck-first';
      clickCount = 2;
    } else if (dropdown.value === 'stuck-first') {
      dropdown.value = 'done-first';
      clickCount = 3;
    } else {
      // If on done-first or any other value (including default), go to in-progress-first
      dropdown.value = 'in-progress-first';
      clickCount = 1;
    }
    
    // Trigger change event to update any listeners
    dropdown.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Keep dropdown visible after clicking the button
    dropdown.classList.remove('hidden');
    
    // Update reset button visibility
    updateResetButtonVisibility();
  });

  // Add change event listener to dropdown to update reset button visibility
  dropdown.addEventListener('change', () => {
    updateResetButtonVisibility();
  });

  // Reset button click handler
  resetButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    
    // Reset the dropdown value to default empty value
    dropdown.value = '';
    clickCount = 0;
    
    // Hide UI elements
    dropdown.classList.add('hidden');
    resetButton.classList.add('hidden');
    
    // Trigger change event
    dropdown.dispatchEvent(new Event('change'));
  });

  // Document click handler to hide dropdown when clicking outside
  const handleDocumentClick = (event) => {
    if (!container.contains(event.target)) {
      dropdown.classList.add('hidden');
      
      // Update reset button visibility when clicking outside
      updateResetButtonVisibility();
    }
  };
  
  document.addEventListener('click', handleDocumentClick);

  // Initialize reset button visibility
  updateResetButtonVisibility();

  return {
    destroy: () => {
      document.removeEventListener('click', handleDocumentClick);
      dropdown.removeEventListener('change', () => {});
    }
  };
}