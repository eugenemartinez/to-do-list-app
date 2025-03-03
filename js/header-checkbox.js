import { displayTaskOptions } from './checkbox-menu.js';
import { uncheckAllCheckboxes } from './checkbox-refresh.js';

export function initializeCheckboxAll() {
  document.addEventListener('DOMContentLoaded', () => {
    const headerCheckbox = document.querySelector('.task-header-checkbox input[type="checkbox"]');

    // Function to get only visible task checkboxes (for when filtering is active)
    const getVisibleTaskCheckboxes = () => {
      const allTaskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      return Array.from(allTaskCheckboxes).filter(checkbox => {
        const taskItem = checkbox.closest('.task-list-item');
        return taskItem && taskItem.style.display !== 'none';
      });
    };

    // Function to update the state of visible task checkboxes
    const updateTaskCheckboxes = (checked) => {
      const visibleTaskCheckboxes = getVisibleTaskCheckboxes();
      visibleTaskCheckboxes.forEach(checkbox => {
        checkbox.checked = checked;
      });
      saveCheckboxState();
      displayTaskOptions(); // Update task options menu visibility
    };

    // Function to attach event listeners to task checkboxes
    const attachTaskCheckboxListeners = () => {
      const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          // Only consider visible checkboxes for the "all checked" state
          const visibleTaskCheckboxes = getVisibleTaskCheckboxes();
          const allChecked = visibleTaskCheckboxes.length > 0 && 
                            visibleTaskCheckboxes.every(checkbox => checkbox.checked);
          
          headerCheckbox.checked = allChecked;
          saveCheckboxState();
          displayTaskOptions(); // Update task options menu visibility
        });
      });
    };

    // Event listener for the header checkbox
    headerCheckbox.addEventListener('change', () => {
      updateTaskCheckboxes(headerCheckbox.checked);
    });

    // Function to save the state of the checkboxes to local storage
    const saveCheckboxState = () => {
      const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
      const checkboxStates = Array.from(taskCheckboxes).map(checkbox => checkbox.checked);
      localStorage.setItem('taskCheckboxStates', JSON.stringify(checkboxStates));
    };

    // Function to load the state of the checkboxes from local storage
    const loadCheckboxState = () => {
      const checkboxStates = JSON.parse(localStorage.getItem('taskCheckboxStates'));
      if (checkboxStates) {
        const taskCheckboxes = document.querySelectorAll('.task-item-checkbox');
        taskCheckboxes.forEach((checkbox, index) => {
          if (index < checkboxStates.length) {
            checkbox.checked = checkboxStates[index];
          }
        });
      }
      // Ensure the header checkbox is unchecked on page load
      uncheckAllCheckboxes();
      displayTaskOptions(); // Update task options menu visibility
    };

    // Function to update the header checkbox state based on visible checkboxes
    const updateHeaderCheckboxState = () => {
      const visibleTaskCheckboxes = getVisibleTaskCheckboxes();
      const allChecked = visibleTaskCheckboxes.length > 0 && 
                        visibleTaskCheckboxes.every(checkbox => checkbox.checked);
      
      headerCheckbox.checked = allChecked;
    };

    // Load the checkbox state on page load
    loadCheckboxState();

    // Attach event listeners to task checkboxes on page load
    attachTaskCheckboxListeners();

    // Reattach event listeners to task checkboxes whenever a new task is added
    const taskList = document.getElementById('taskList');
    const observer = new MutationObserver(() => {
      attachTaskCheckboxListeners();
      updateHeaderCheckboxState(); // Update header checkbox when tasks change
    });
    observer.observe(taskList, { childList: true });

    // Create an observer for task visibility changes (when filtering occurs)
    const visibilityObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          updateHeaderCheckboxState();
        }
      });
    });

    // Observe all task items for style changes (which happen during filtering)
    taskList.querySelectorAll('.task-list-item').forEach(taskItem => {
      visibilityObserver.observe(taskItem, { attributes: true, attributeFilter: ['style', 'class'] });
    });
    
    // Also update the observer when new tasks are added
    const taskObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('task-list-item')) {
              visibilityObserver.observe(node, { attributes: true, attributeFilter: ['style', 'class'] });
            }
          });
        }
      });
    });
    taskObserver.observe(taskList, { childList: true });

    // Listen for filter changes to update the checkbox state
    document.querySelectorAll('.filter-container').forEach(container => {
      container.addEventListener('click', () => {
        // Use setTimeout to wait for the filter to be applied
        setTimeout(updateHeaderCheckboxState, 100);
      });
    });
  });
}