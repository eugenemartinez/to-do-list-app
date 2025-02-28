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