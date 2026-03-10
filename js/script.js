const taskForm = document.getElementById("taskForm");
const taskIdField = document.getElementById("taskId");
const taskTable = document.getElementById("taskTable");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTask() {
  taskTable.innerHTML = "";

  tasks.forEach(function (t, index) {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${t.title}</td>
      <td>${t.desc}</td>
      <td>${t.date}</td>
      <td>${t.priority}</td>
      <td>
        <button class="btn btn-success" onclick="editTask(${t.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTask(${t.id})">Delete</button>
      </td>
    `;

    taskTable.appendChild(row);
  });
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let id = taskIdField.value;

  let newTask = {
    id: id ? Number(id) : Date.now(),
    title: title.value,
    desc: desc.value,
    date: date.value,
    priority: priority.value
  };

  if (id) {
    tasks = tasks.map(function (t) {
      return t.id == id ? newTask : t;
    });
  } else {
    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();
  taskIdField.value = "";

  displayTask();
});

function deleteTask(id) {
  tasks = tasks.filter(function (t) {
    return t.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask();
}

function editTask(id) {
  let task = tasks.find(function (t) {
    return t.id === id;
  });

  title.value = task.title;
  desc.value = task.desc;
  date.value = task.date;
  priority.value = task.priority;

  taskIdField.value = task.id;
}

displayTask();