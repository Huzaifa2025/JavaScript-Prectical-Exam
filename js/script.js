const taskForm = document.getElementById("taskForm");
const taskIdField = document.getElementById("taskId");
const filterInput = document.getElementById("filter");
const taskTable = document.getElementById("taskTable");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const displayTask = (filter = "All") => {
  taskTable.innerHTML = "";

  const list =
    filter === "All" ? tasks : tasks.filter((t) => t.priority === filter);

  list.forEach((t) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.title}</td>
      <td>${t.desc}</td>
      <td>${t.date}</td>
      <td>${t.priority}</td>
      <td>
        <button onclick="editTask(${t.id})" class="btn btn-sm btn-warning">Edit</button>
        <button onclick="deleteTask(${t.id})" class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    taskTable.appendChild(row);
  });
};

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = taskIdField.value;
  const newTask = {
    id: id ? parseInt(id) : Date.now(),
    title: title.value,
    desc: desc.value,
    date: date.value,
    priority: priority.value,
  };

  if (id) {
    tasks = tasks.map((t) => (t.id == id ? newTask : t));
  } else {
    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskForm.reset();
  taskIdField.value = "";
  displayTask();
});

window.deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask();
};

window.editTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  title.value = task.title;
  desc.value = task.desc;
  date.value = task.date;
  priority.value = task.priority;
  taskIdField.value = task.id;
};

filterInput.addEventListener("change", (e) => displayTask(e.target.value));

displayTask();
