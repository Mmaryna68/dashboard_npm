import "./index.html";
import "./style.css";
import Chart from "chart.js/auto";
import moment from "moment";
import _ from "lodash";

(async function () {
  // Array of task data
  const tasks = [
    {
      name: "Task 1: Interface development",
      progress: 70,
      date: "2023-06-10",
      priority: 2,
      status: "In Progress",
      description:
        "The task of developing a user interface for a new web application. You need to prototype, design and implement the interface using HTML, CSS and JavaScript.",
    },
    {
      name: "Task 2: Functionality testing",
      progress: 40,
      date: "2023-06-11",
      priority: 1,
      status: "Pending",
      description:
        "The task of testing the functionality of a web application. It is required to write and execute test scenarios, identify and correct possible errors and inconsistencies with the requirements.",
    },
    {
      name: "Task 3: Performance optimization",
      progress: 90,
      date: "2023-06-12",
      priority: 3,
      status: "Completed",
      description:
        "The task of optimizing the performance of a web application. It is necessary to investigate and improve the speed of the application, optimize database queries and eliminate bottlenecks in the code.",
    },
  ];

  // Creating a chart using Chart.js
  const ctx = document.getElementById("chart").getContext("2d");

  // Processing task data
  const taskData = processData(tasks); // Processing data with the Lodash
  const taskLabels = taskData.map((task) => task.label);
  const taskProgress = taskData.map((task) => task.progress);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: taskLabels,
      datasets: [
        {
          label: "Task progress",
          data: taskProgress,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Maximum scale value set to 100
          ticks: {
            stepSize: 10, // Scale step set to 10
          },
        },
      },
    },
  });

  // Function for progressing task data
  function processData(tasks) {
    const groupedTasks = _.groupBy(tasks, "status");

    const processedData = _.map(groupedTasks, (tasks, status) => {
      return {
        label: status,
        count: tasks.length,
        progress: calculateAverageProgress(tasks), // Adding a progress value
      };
    });

    return processedData;
  }

  // Function for calclating the average progress value
  function calculateAverageProgress(tasks) {
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / tasks.length);
  }

  // Function for displaying tasks on a page
  function displayTasks() {
    const tasksContainer = document.getElementById("tasks");

    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      tasksContainer.appendChild(taskElement);
    });
  }

  // Function to create a task item
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const titleElement = document.createElement("h3");
    titleElement.textContent = task.name;
    taskElement.appendChild(titleElement);

    const statusElement = document.createElement("p");
    statusElement.classList.add("task-status");
    statusElement.textContent = `Status: ${task.status}`;
    taskElement.appendChild(statusElement);

    const dateElement = document.createElement("p");
    const formattedDate = moment(task.date).format("DD.MM.YYYY"); // Formatting a task date using the Moment
    dateElement.textContent = `Date: ${formattedDate}`;
    taskElement.appendChild(dateElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${task.description}`;
    taskElement.appendChild(descriptionElement);

    const profileNameElement = document.getElementById("profile-name");
    const profilePositionElement = document.getElementById("profile-position");
    profileNameElement.textContent = "Maryna O";
    profilePositionElement.textContent = "Web Developer";

    return taskElement;
  }
  // Calling a function to display tasks
  displayTasks();

  // Function to display profile data
  function displayProfile() {
    const profileNameElement = document.getElementById("profile-name");
    const profilePositionElement = document.getElementById("profile-position");
    profileNameElement.textContent = "Maryna O";
    profilePositionElement.textContent = "Web Developer";
  }
  // Calling a function to display profile data
  displayProfile();
})();
