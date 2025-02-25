import { saveTasks } from './add-task.js';

export class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.status = 'In Progress'; // Default status changed to 'In Progress'
  }

  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  createTaskElement() {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-list-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-item-checkbox');

    const taskName = document.createElement('div');
    taskName.classList.add('task-item-name');
    taskName.textContent = this.name;

    const taskDueDate = document.createElement('div');
    taskDueDate.classList.add('task-item-date');
    taskDueDate.textContent = this.formatDate(this.dueDate);

    const taskStatus = document.createElement('select');
    taskStatus.classList.add('task-item-status');
    ['In Progress', 'Stuck', 'Done'].forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      if (status === this.status) {
        option.selected = true;
      }
      taskStatus.appendChild(option);
    });

    // Function to update the background color based on the status
    const updateStatusColor = () => {
      switch (taskStatus.value) {
        case 'In Progress':
          taskStatus.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'; // CMYK equivalent of mellow yellow
          taskStatus.style.color = 'black';
          break;
        case 'Stuck':
          taskStatus.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // CMYK equivalent of mellow red
          taskStatus.style.color = 'white';
          break;
        case 'Done':
          taskStatus.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // CMYK equivalent of mellow green
          taskStatus.style.color = 'white';
          break;
        default:
          taskStatus.style.backgroundColor = 'white';
          taskStatus.style.color = 'black';
          break;
      }
    };

    // Initial color update
    updateStatusColor();

    // Update color and save tasks on change
    taskStatus.addEventListener('change', () => {
      this.status = taskStatus.value;
      updateStatusColor();
      saveTasks(); // Save tasks to local storage after changing the status
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-item-delete');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      taskItem.classList.add('fade-out');
      setTimeout(() => {
        taskItem.remove();
        saveTasks(); // Save tasks to local storage after removing a task
      }, 500); // Match the duration of the fade-out animation
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(taskStatus);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }
}