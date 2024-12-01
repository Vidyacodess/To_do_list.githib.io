const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("categorySelect");
const dueDate = document.getElementById("dueDate");
const prioritySelect = document.getElementById("prioritySelect");
const searchBar = document.getElementById("searchBar");
const progressFill = document.getElementById("progressFill");
const progressPercentage = document.getElementById("progressPercentage");
const themeToggle = document.getElementById("themeToggle");

let tasks = [];

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const due = dueDate.value;
    const priority = prioritySelect.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        category,
        due,
        priority,
        completed: false
    };

    tasks.push(task);
    updateTasks();
    taskInput.value = "";
});

// Update task list
function updateTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");

        // Task details
        taskItem.innerHTML = `
            <span>${task.text} (${task.category}) - Due: ${task.due} - Priority: ${task.priority}</span>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        `;

        // Mark task as completed
        taskItem.querySelector(".complete-btn").addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            updateTasks();
        });

        // Delete task
        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTasks();
        });

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskList.appendChild(taskItem);
    });

    updateProgress();
}

// Search tasks
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
    taskList.innerHTML = "";
    filteredTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.text;
        taskList.appendChild(taskItem);
    });
});

// Update progress
function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressFill.style.width = `${progress}%`;
    progressPercentage.textContent = progress.toFixed(0);
}

// Toggle dark mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
