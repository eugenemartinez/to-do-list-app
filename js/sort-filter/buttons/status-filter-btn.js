import { setupButtonColors } from '../../status-color.js';

export function activateStatusFilterBtn(buttonId, dropdownId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');
  const taskInput = document.getElementById('taskInput'); // Add Task input box

  if (!button || !dropdown || !resetButton || !container) {
    return;
  }

  // Store default icon if needed
  button.dataset.defaultIcon = button.innerHTML;

  // Set up the color change functionality from status-color.js
  const applyColors = setupButtonColors(button, dropdown, resetButton, container);

  // Function to update reset button visibility
  const updateResetButtonVisibility = () => {
    if (dropdown.value !== '') {
      resetButton.classList.remove('hidden');
      container.classList.add('active');
    } else {
      resetButton.classList.add('hidden');
      container.classList.remove('active');
    }
  };

  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    
    // Hide any visible dropdowns in other filter containers
    document.querySelectorAll('.filter-container').forEach(otherContainer => {
      if (otherContainer !== container) {
        const otherDropdown = otherContainer.querySelector('select');
        if (otherDropdown) otherDropdown.classList.add('hidden');
      }
    });
    
    dropdown.classList.remove('hidden');
    
    // Only show reset button if dropdown has a non-empty value
    if (dropdown.value !== '') {
      resetButton.classList.remove('hidden');
    }
  });

  // Add event listener to dropdown to update reset button visibility
  dropdown.addEventListener('change', () => {
    updateResetButtonVisibility();
  });

  // Reset handler
  resetButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    
    // Reset the dropdown value
    dropdown.value = '';
    
    // Hide UI elements
    dropdown.classList.add('hidden');
    resetButton.classList.add('hidden');
    
    // Remove active classes
    container.classList.remove('active');
    
    // Reset any icons
    if (button.dataset.defaultIcon) {
      button.innerHTML = button.dataset.defaultIcon;
    }
    
    // Trigger a change event to update colors
    dropdown.dispatchEvent(new Event('change'));
  });
  
  // Add event listener to the task input to reset the status filter
  if (taskInput) {
    taskInput.addEventListener('click', () => {
      // Only trigger reset if the filter is active
      if (!resetButton.classList.contains('hidden')) {
        resetButton.click();
      }
    });
  }

  // Document click handler
  const handleDocumentClick = (event) => {
    if (!container.contains(event.target)) {
      dropdown.classList.add('hidden');
      
      // Keep reset button visible if dropdown has a value
      if (dropdown.value !== '') {
        resetButton.classList.remove('hidden');
        container.classList.add('active');
      } else {
        resetButton.classList.add('hidden');
        container.classList.remove('active');
      }
    }
  };
  
  // Add document click handler
  document.addEventListener('click', handleDocumentClick);

  // Apply initial state if dropdown has a value
  updateResetButtonVisibility();

  return {
    destroy: () => {
      // Clean up event listeners
      document.removeEventListener('click', handleDocumentClick);
      resetButton.removeEventListener('click', () => {});
      dropdown.removeEventListener('change', () => {});
      if (taskInput) {
        taskInput.removeEventListener('click', () => {});
      }
    },
    setValue: (value) => {
      dropdown.value = value;
      updateResetButtonVisibility();
      dropdown.dispatchEvent(new Event('change')); // Trigger color change
    },
    getValue: () => dropdown.value
  };
}