export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting local storage for key "${key}":`, error);
  }
}

export function loadFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error accessing local storage for key "${key}":`, error);
    return null;
  }
}

// Add your task-specific storage functions
export function saveTasks(tasks) {
  try {
    // Get all task elements
    const taskItems = document.querySelectorAll('.task-list-item');
    
    // Create an array to store task data
    const tasksData = [];
    
    // Extract data from each task element
    taskItems.forEach(taskItem => {
      tasksData.push({
        name: taskItem.dataset.name,
        dueDate: taskItem.dataset.dueDate || '',
        status: taskItem.dataset.status || 'In Progress',
        description: taskItem.dataset.description || ''
      });
    });
    
    // Save to localStorage
    saveToLocalStorage('tasks', tasksData);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

export function loadTasks() {
  try {
    // Load tasks from localStorage
    return loadFromLocalStorage('tasks') || [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}