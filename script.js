let input = document.getElementById("text-input");
let tasks = document.getElementById("tasks");
(window.onload = loadTasks), input.focus();

const loadTasks = () => {};

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
