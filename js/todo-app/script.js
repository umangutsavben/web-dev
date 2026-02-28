// Wait until full HTML document is loaded before running JS
// This prevents querySelector from returning null
document.addEventListener("DOMContentLoaded", () => {

  // Select important DOM elements
  let todoInput = document.querySelector("#todo-input");     // Input field
  let addTaskButton = document.querySelector("#add-task-btn"); // Add button
  let todoList = document.querySelector("#todo-list");       // <ul> container


  // Load tasks from localStorage
  // If nothing exists, fallback to empty array
  // localStorage stores only strings → so we convert back using JSON.parse
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // When page reloads, re-render all saved tasks
  tasks.forEach(task => renderTask(task));

  // Add new task when button is clicked
  addTaskButton.addEventListener("click", () => {

    // Remove extra spaces from input
    const taskText = todoInput.value.trim();

    // Prevent adding empty task
    if (taskText === "") return;

    // Create task object (single source of truth)
    const newTask = {
      id: Date.now(),     // Unique ID using timestamp
      text: taskText,     // Task content
      completed: false    // Default state
    }

    // Add task to array (state update)
    tasks.push(newTask);

    // Persist updated state in localStorage
    saveTasks();

    // Clear input field after adding
    todoInput.value = "";

    // Render only newly added task (efficient)
    renderTask(newTask);
  });


  // Responsible only for creating DOM element from task object
  // This separates UI logic from state logic
  function renderTask(task) {

    const li = document.createElement('li');

    // Store task ID in DOM (helps in deletion / tracking)
    li.setAttribute("data-id", task.id);

    // If task already completed (from localStorage), reflect it visually
    if (task.completed) {
      li.classList.add('completed');
    }

    // Insert task text + delete button
    li.innerHTML = `
      <span>${task.text}</span>
      <button id="${task.id}">delete</button>
    `;

    // Append to list
    todoList.appendChild(li);


    // =============================
    // TOGGLE COMPLETION LOGIC
    // =============================
    // Clicking anywhere except button toggles completion
    li.addEventListener("click", (e) => {

      // If delete button clicked, ignore this block
      if (e.target.tagName === 'BUTTON') return;

      // Flip boolean value
      task.completed = !task.completed;

      // Toggle CSS class
      li.classList.toggle('completed');

      // Save updated state
      saveTasks();
    });


    // =============================
    // DELETE LOGIC
    // =============================
    li.addEventListener("click", (e) => {

      // Only run if delete button was clicked
      if (e.target.tagName === 'BUTTON') {

        // Remove task from array (state update)
        tasks = tasks.filter(t => t.id !== task.id);

        // Remove element from DOM
        li.remove();

        // Save updated state
        saveTasks();
      }
    });
  }


  // Save current tasks array into localStorage
  // Convert JS object → string using JSON.stringify
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

});
