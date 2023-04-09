let input = document.getElementById("text-input");
let tasks = document.getElementById("tasks");
(window.onload = loadTasks), input.focus();

function loadTasks() {
  let allTasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.innerHTML = "";
  allTasks.forEach((task) => {
    let li = document.createElement("li");
    if (task.completed) {
      li.innerHTML = `
      <div class="check-text">
          <input type="checkbox" onclick="markComplete(this, ${task.id})" checked>
          <p>${task.task}</p>
      </div>
      <button onclick="removeTask(this, ${task.id})">x</button>
      `;
      li.children[0].children[0].nextElementSibling.style.textDecoration =
        "line-through";
    } else {
      li.innerHTML = `
      <div class="check-text">
          <input type="checkbox" onclick="markComplete(this, ${task.id})">
          <p>${task.task}</p>
      </div>
      <button onclick="removeTask(this, ${task.id})">x</button>
      `;
    }
    tasks.appendChild(li);
  });
}

const markComplete = (e, x) => {
  // console.log("x :>> ", e, x);
  let allTasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  allTasks.forEach((task) => {
    if (task.id === x) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));

  e.nextElementSibling.style.textDecoration =
    e.nextElementSibling.style.textDecoration === "line-through"
      ? "none"
      : "line-through";
};

const removeTask = (e, x) => {
  // console.log("x :>> ", e, x);
  let allTasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  allTasks = allTasks.filter((tasks) => tasks.id !== x);
  localStorage.setItem("tasks", JSON.stringify(allTasks));

  e.parentElement.remove();
};

const addTask = () => {
  if (input.value.trim() === "") {
    alert("Task can't be empty");
    return;
  }
  let taskId = Date.now();
  let currTasks = Array.from(JSON.parse(localStorage.getItem("tasks")) ?? []);
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...currTasks,
      { task: input.value.trim(), id: taskId, completed: false },
    ])
  );

  let li = document.createElement("li");
  li.innerHTML = `
    <div class="check-text">
        <input type="checkbox" onclick="markComplete(this, ${taskId})">
        <p>${input.value}</p>
    </div>
    <button onclick="removeTask(${taskId})">x</button>
    `;
  tasks.appendChild(li);

  input.value = "";
  input.focus();
};

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});
