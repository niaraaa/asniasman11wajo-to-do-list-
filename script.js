
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("next-btn").addEventListener("click", function () {
    document.getElementById("welcome-page").classList.add("hidden");
    document.getElementById("todo-page").classList.remove("hidden");
    loadTasks(); // Muat data dari localStorage
  });

  document.getElementById("dark-mode-toggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
  });
});

function addTask() {
  const name = document.getElementById("task-name").value;
  const time = document.getElementById("task-time").value;
  const date = document.getElementById("task-date").value;

  if (!name || !time || !date) {
    alert("Lengkapi semua kolom!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    time,
    date,
    done: false
  };

  renderTask(task);
  saveTask(task);
  alert("Tugas berhasil ditambahkan!");

  document.getElementById("task-name").value = "";
  document.getElementById("task-time").value = "";
  document.getElementById("task-date").value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = `${task.name} - ${task.time} - ${task.date}`;

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️ Hapus";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
      deleteTask(task.id);
      li.remove();
      alert("Tugas telah dihapus.");
    }
  };

  if (task.done) {
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "↩️ Batal";
    undoBtn.className = "undo-btn";
    undoBtn.onclick = function () {
      task.done = false;
      updateTask(task);
      li.remove();
      renderTask(task);
      alert("Tugas dikembalikan ke daftar belum selesai.");
    };
    buttonGroup.appendChild(undoBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(buttonGroup);
    document.getElementById("done-list").appendChild(li);
  } else {
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "✅ Selesai";
    doneBtn.className = "done-btn";
    doneBtn.onclick = function () {
      task.done = true;
      updateTask(task);
      li.remove();
      renderTask(task);
      alert("Tugas ditandai selesai!");
    };
    buttonGroup.appendChild(doneBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(buttonGroup);
    document.getElementById("todo-list").appendChild(li);
  }
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(updatedTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filtered = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(filtered));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}
