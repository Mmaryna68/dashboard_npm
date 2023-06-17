import "./index.html";
import "./style.css";
import Chart from "chart.js/auto";
import moment from "moment";
import _ from "lodash";

(async function () {
  // Массив данных о задачах
  const tasks = [
    { name: "Task 1", progress: 70, date: "2023-06-10", priority: 2 },
    { name: "Task 2", progress: 40, date: "2023-06-11", priority: 1 },
    { name: "Task 3", progress: 90, date: "2023-06-12", priority: 3 },
  ];

  // Создание графика с использованием Chart.js
  const ctx = document.getElementById("chart").getContext("2d");

  // Обработка данных о задачах
  const taskData = processData(tasks); // Обработка данных с помощью Lodash
  const taskLabels = taskData.map((task) => task.label);
  const taskCounts = taskData.map((task) => task.count);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: taskLabels,
      datasets: [
        {
          label: "Количество задач",
          data: taskCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  });

  // Функция для обработки данных о задачах
  function processData(tasks) {
    const groupedTasks = _.groupBy(tasks, "status"); // Группировка задач по статусу с помощью Lodash

    const processedData = _.map(groupedTasks, (tasks, status) => {
      return {
        label: status,
        count: tasks.length,
      };
    });

    return processedData;
  }

  // Функция для отображения задач на странице
  function displayTasks() {
    const tasksContainer = document.getElementById("tasks");

    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      tasksContainer.appendChild(taskElement);
    });
  }

  // Функция для создания элемента задачи
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const titleElement = document.createElement("h3");
    titleElement.textContent = task.title;
    taskElement.appendChild(titleElement);

    const statusElement = document.createElement("p");
    statusElement.classList.add("task-status");
    statusElement.textContent = `Статус: ${task.status}`;
    taskElement.appendChild(statusElement);

    const dateElement = document.createElement("p");
    const formattedDate = moment(task.date).format("DD.MM.YYYY"); // форматирования даты задачи с помощью moment
    dateElement.textContent = `Дата: ${formattedDate}`;
    taskElement.appendChild(dateElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Описание: ${task.description}`;
    taskElement.appendChild(descriptionElement);

    const profileNameElement = document.getElementById("profile-name");
    const profilePositionElement = document.getElementById("profile-position");
    profileNameElement.textContent = "Maryna O";
    profilePositionElement.textContent = "Web Developer";

    return taskElement;
  }
});
// Вызов функции для отображения задач
displayTasks();

/*// Использование Moment.js для форматирования даты задачи
const formattedDates = tasks.map((task) =>
  moment(task.date).format("YYYY-MM-DD")
);

// Использование Lodash для сортировки задач по приоритету/
const sortedTasks = _.sortBy(tasks, "priority");

// Создание массивов для данных диаграммы
const labels = sortedTasks.map((task) => task.name);
const values = sortedTasks.map((task) => task.progress);

// Получение данных из JSON
fetch("tasks.json")
  .then((response) => response.json())
  .then((data) => {
    const fetchedLabels = data.map((task) => task.name);
    const fetchedValues = data.map((task) => task.progress);

    // Создание диаграммы
    const ctx = document.getElementById("chartContainer").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: fetchedLabels,
        datasets: [
          {
            label: "Progress",
            data: fetchedValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/
