document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    // Handle task list actions (edit, delete)
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement.getAttribute('data-id'));
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement.getAttribute('data-id'));
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => displayTask(task.id, task.text));
    }

    function addTask(taskText) {
        const taskId = Date.now().toString();
        const task = { id: taskId, text: taskText };
        saveTaskToLocalStorage(task);
        displayTask(taskId, taskText);
    }

    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTask(taskId, taskText) {
        const li = document.createElement('li');
        li.setAttribute('data-id', taskId);
        li.innerHTML = `
            ${taskText}
            <span class="edit">Edit</span>
            <span class="delete">Delete</span>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        document.querySelector(`li[data-id="${taskId}"]`).remove();
    }

    function editTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.id === taskId);
        const newText = prompt('Edit task', task.text);
        if (newText) {
            task.text = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            document.querySelector(`li[data-id="${taskId}"]`).childNodes[0].textContent = newText;
        }
    }
});
