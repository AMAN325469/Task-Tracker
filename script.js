const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  let pending = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";
    if (!task.completed) pending++;

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  totalCount.innerText = tasks.length;
  pendingCount.innerText = pending;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");

  const isLight = document.body.classList.contains("light-mode");
  themeToggle.innerText = isLight ? "☀️" : "🌙";
}

renderTasks(); // On load
