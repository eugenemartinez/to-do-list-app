export function activateDateSortBtn(buttonId, dropdownId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');
  
  // Get the status sort button for cross-sort reset
  const statusSortBtn = document.getElementById('sortByStatusBtn');

  if (!button || !dropdown || !resetButton || !container) {
    return;
  }

  // Store default icons for reset
  button.dataset.defaultIcon = '<i class="fas fa-sort" style="margin-right: 5px;"></i> <i class="fas fa-calendar-alt" style="margin-right: 5px;"></i>';
  
  let clickCount = 0;
  
  // Function to update button icon based on dropdown value
  const updateButtonIcon = (value) => {
    if (value === 'Ascending') {
      button.innerHTML = '<i class="fas fa-arrow-up" style="margin-right: 5px;"></i> <i class="fas fa-calendar-alt" style="margin-right: 5px;"></i>';
      container.classList.add('active');
      clickCount = 1;
    } else if (value === 'Descending') {
      button.innerHTML = '<i class="fas fa-arrow-down" style="margin-right: 5px;"></i> <i class="fas fa-calendar-alt" style="margin-right: 5px;"></i>';
      container.classList.add('active');
      clickCount = 2;
    } else {
      button.innerHTML = button.dataset.defaultIcon;
      container.classList.remove('active');
      clickCount = 0;
    }
    
    // Update reset button visibility
    if (value !== '') {
      resetButton.classList.remove('hidden');
    } else {
      resetButton.classList.add('hidden');
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

    // Toggle between Ascending and Descending only
    if (dropdown.value === 'Ascending') {
      dropdown.value = 'Descending';
      clickCount = 2;
    } else {
      dropdown.value = 'Ascending';
      clickCount = 1;
    }
    
    // Update button icon based on new dropdown value
    updateButtonIcon(dropdown.value);
    
    // Show dropdown
    dropdown.classList.remove('hidden');
  });
  
  // Add event listener to dropdown to update button icon when dropdown value changes
  dropdown.addEventListener('change', (event) => {
    const value = event.target.value;
    updateButtonIcon(value);
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
    
    // Reset button icon and click count
    button.innerHTML = button.dataset.defaultIcon;
    clickCount = 0;
  });

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

  // Listen for status sort button clicks to reset date sort
  if (statusSortBtn) {
    statusSortBtn.addEventListener('click', () => {
      // Only trigger reset if sort is active
      if (!resetButton.classList.contains('hidden')) {
        resetButton.click();
      }
    });
  }

  // Apply initial icon state if dropdown has a value
  if (dropdown.value) {
    updateButtonIcon(dropdown.value);
  }

  return {
    destroy: () => {
      // Clean up event listeners
      document.removeEventListener('click', handleDocumentClick);
      if (statusSortBtn) {
        statusSortBtn.removeEventListener('click', () => {});
      }
      resetButton.removeEventListener('click', () => {});
      dropdown.removeEventListener('change', () => {});
    },
    setValue: (value) => {
      dropdown.value = value;
      updateButtonIcon(value);
    },
    getValue: () => dropdown.value
  };
}