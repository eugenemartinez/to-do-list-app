// Function to update the background color based on the status
export const updateStatusColor = (element, status) => {
  switch (status) {
    case 'In Progress':
      element.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'; // CMYK equivalent of mellow yellow
      element.style.color = 'black';
      break;
    case 'Stuck':
      element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // CMYK equivalent of mellow red
      element.style.color = 'white';
      break;
    case 'Done':
      element.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // CMYK equivalent of mellow green
      element.style.color = 'white';
      break;
    default:
      element.style.backgroundColor = 'white';
      element.style.color = 'black';
      break;
  }
};

export function setupButtonColors(button, dropdown, resetButton, container) {
  dropdown.addEventListener('change', (event) => {
    const selectedStatus = event.target.value;
    
    switch (selectedStatus) {
      case 'In Progress':
      case 'in-progress-first':
        // Yellow theme
        container.style.cssText = 'background-color: rgba(255, 255, 0, 1) !important; color: black !important;';
        button.style.cssText = 'background-color: rgba(255, 255, 0, 1) !important; color: black !important;';
        dropdown.style.cssText = 'background-color: rgba(255, 255, 0, 1) !important; color: black !important;';
        break;
        
      case 'Stuck':
      case 'stuck-first':
        // Red theme
        container.style.cssText = 'background-color: rgba(255, 0, 0, 1) !important; color: white !important;';
        button.style.cssText = 'background-color: rgba(255, 0, 0, 1) !important; color: white !important;';
        dropdown.style.cssText = 'background-color: rgba(255, 0, 0, 1) !important; color: white !important;';
        break;
        
      case 'Done':
      case 'done-first':
        // Green theme
        container.style.cssText = 'background-color: rgba(0, 255, 0, 1) !important; color: white !important;';
        button.style.cssText = 'background-color: rgba(0, 255, 0, 1) !important; color: white !important;';
        dropdown.style.cssText = 'background-color: rgba(0, 255, 0, 1) !important; color: white !important;';
        break;

      default:
        container.style.cssText = 'background-color: #3a4a5a !important; color: black !important;';
        button.style.cssText = 'background-color: #3a4a5a !important; color: white !important;';
        dropdown.style.cssText = '';
        break;
    }
  });
}