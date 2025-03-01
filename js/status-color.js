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
        container.style.backgroundColor = 'rgba(255, 255, 0, 1)'; // Stronger yellow
        container.style.color = 'black';
        button.style.backgroundColor = 'rgba(255, 255, 0, 1)'; // Stronger yellow
        button.style.color = 'black';
        dropdown.style.backgroundColor = 'rgba(255, 255, 0, 1)'; // Stronger yellow
        dropdown.style.color = 'black';
        break;
      case 'Stuck':
      case 'stuck-first':
        container.style.backgroundColor = 'rgba(255, 0, 0, 1)'; // Solid red
        container.style.color = 'white';
        button.style.backgroundColor = 'rgba(255, 0, 0, 1)'; // Solid red
        button.style.color = 'white';
        dropdown.style.backgroundColor = 'rgba(255, 0, 0, 1)'; // Solid red
        dropdown.style.color = 'white';
        break;
      case 'Done':
      case 'done-first':
        container.style.backgroundColor = 'rgba(0, 255, 0, 1)'; // Solid green
        container.style.color = 'white';
        button.style.backgroundColor = 'rgba(0, 255, 0, 1)'; // Solid green
        button.style.color = 'white';
        dropdown.style.backgroundColor = 'rgba(0, 255, 0, 1)'; // Solid green
        dropdown.style.color = 'white';
        break;
      default:
        container.style.backgroundColor = 'white';
        container.style.color = 'black';
        button.style.backgroundColor = '#007bff'; // Default blue color
        button.style.color = 'white';
        dropdown.style.backgroundColor = 'white';
        dropdown.style.color = 'black';
        break;
    }
  });
}