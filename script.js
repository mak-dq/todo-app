let input = document.getElementById("text-input");
let tasks = document.getElementById("tasks");

const markComplete = (e, x) => {
  console.log("x :>> ", e, x);
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

const removeTask = (x) => {
  console.log("x :>> ", x);
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

  input.value = "";
  input.focus();

  tasks.appendChild(li);
};

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});
