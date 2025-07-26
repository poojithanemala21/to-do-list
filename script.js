// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  // Dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    document.getElementById("mode-toggle").checked = true;
  }
});

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("span");
  delBtn.textContent = "✖";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  const taskList = document.getElementById("task-list");

  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const delBtn = document.createElement("span");
    delBtn.textContent = "✖";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
}
