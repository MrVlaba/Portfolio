
function toSmallDate(date) {
    let smallDate = new Date(date);
    return smallDate.toLocaleString("es-mx", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }
  
  function App() {
   
    let taskList;

    let filteredTasks;
    let taskListElement;
  

    function init() {

      taskList = [];
  

      if (localStorage.getItem("task-list") != null) {

        taskList = JSON.parse(localStorage.getItem("task-list"));
      }
  

      filteredTasks = taskList;
  

      filter = "";
  
      taskListElement = document.getElementById("task-list");
      let addTaskForm = document.getElementById("add-task");
      addTaskForm.addEventListener("submit", handleSubmit);
  
      let filterInput = document.getElementById("filter-task");

  
      render();
    }
  

    init();
  

    function render() {

      let template = "<ul>";
  

      for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];
        let dateCreated = toSmallDate(task.dateCreated);
  

        let className = "task-item";
        if (task.done) {

          className += " -done";
        }
  
        template =
          template +
          `
        <li class="${className}" data-index=${i} data-done="${task.done}">
         <span class="task-date">${dateCreated}</span>
          <span class="task-text">${task.text}</span>
          <button>×</button>
        </li>
      `;
      }
  
      if (filteredTasks.length > 0) {
        template = template + "</ul>";
      } else if (taskList.length === 0) {

        template = `
        <div class="task-empty">
          <h2>Be the first to ask for a fan art</h2>
        </div>
        `;
      }
  
      taskListElement.innerHTML = template;
  
      let taskListElementList = document.getElementsByClassName("task-item");
  

      for (task of taskListElementList) {
        task.querySelector(".task-text").addEventListener("click", toggleTask);
        task.querySelector("button").addEventListener("click", deteleTask);
      }
    }
  

    function handleSubmit(event) {
      event.preventDefault();
      let form = event.target;
      let input = form.querySelector("input");
      addTask(input.value);
      input.value = "";
    }
  
    function saveTasks() {
      localStorage.setItem("task-list", JSON.stringify(taskList));
    }
  
    function addTask(task) {
      taskList.push({
        text: task,
        done: false,
        dateCreated: Date.now(),
      });

      saveTasks();
      render();
    }
  

    function deteleTask(event) {
      let parent = event.target.parentNode;
      let index = parent.dataset.index;
      taskList.splice(index, 1);
      saveTasks();
      render();
    }
  
    function toggleTask(event) {
      let parent = event.target.parentNode;
      let done = parent.dataset.done === "true";
      let index = parent.dataset.index;
      taskList[index].done = !done;
      saveTasks();
      render();
    }
  }
  
  document.addEventListener("DOMContentLoaded", App);