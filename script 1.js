// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromStorage();
});

// Add task functionality
document.getElementById('add-task-btn').addEventListener('click', function () {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    let taskList = document.getElementById('task-list');

    // Create task item element
    let taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
        <button class="complete-btn">Complete</button>
    `;

    // Event listener to mark task as completed or uncompleted
    taskItem.querySelector('.complete-btn').addEventListener('click', function () {
        taskItem.querySelector('.task-text').classList.toggle('completed');
        saveTasksToStorage();
    });

    // Event listener to delete task
    taskItem.querySelector('.delete-btn').addEventListener('click', function () {
        taskList.removeChild(taskItem);
        saveTasksToStorage();
    });

    taskList.appendChild(taskItem);
    taskInput.value = ''; // Clear the input field
    taskInput.focus();

    // Save tasks to localStorage
    saveTasksToStorage();
});

// Function to save all tasks to localStorage
function saveTasksToStorage() {
    let taskList = document.getElementById('task-list');
    let tasks = [];

    // Iterate over all tasks and store them in an array
    Array.from(taskList.children).forEach(taskItem => {
        let taskText = taskItem.querySelector('.task-text').textContent;
        let isCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
        tasks.push({ taskText, isCompleted });
    });

    // Save tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks && tasks.length > 0) {
        let taskList = document.getElementById('task-list');
        tasks.forEach(task => {
            let taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span class="task-text ${task.isCompleted ? 'completed' : ''}">${task.taskText}</span>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            `;

            // Add event listener to mark task as completed or uncompleted
            taskItem.querySelector('.complete-btn').addEventListener('click', function () {
                taskItem.querySelector('.task-text').classList.toggle('completed');
                saveTasksToStorage();
            });

            // Add event listener to delete task
            taskItem.querySelector('.delete-btn').addEventListener('click', function () {
                taskList.removeChild(taskItem);
                saveTasksToStorage();
            });

            taskList.appendChild(taskItem);
        });
    }
}
