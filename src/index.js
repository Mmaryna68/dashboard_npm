import "./index.html";
import "./style.css";
import Chart from "chart.js/auto";
import moment from "moment";
import _ from "lodash";

(async function () {
  // Массив данных о задачах
  const tasks = [
    {
      name: "Task 1: Разработка интерфейса",
      progress: 70,
      date: "2023-06-10",
      priority: 2,
      status: "In Progress",
      description:
        "Задача по разработке пользовательского интерфейса для нового веб-приложения. Необходимо создать прототипы, дизайн и реализовать интерфейс с использованием HTML, CSS и JavaScript.",
    },
    {
      name: "Task 2: Тестирование функционала",
      progress: 40,
      date: "2023-06-11",
      priority: 1,
      status: "Pending",
      description:
        "Задача по тестированию функционала веб-приложения. Требуется написать и выполнить тестовые сценарии, выявить и исправить возможные ошибки и несоответствия требованиям.",
    },
    {
      name: "Task 3: Оптимизация производительности",
      progress: 90,
      date: "2023-06-12",
      priority: 3,
      status: "Completed",
      description:
        "Задача по оптимизации производительности веб-приложения. Необходимо исследовать и улучшить скорость работы приложения, оптимизировать запросы к базе данных и устранить узкие места в коде.",
    },
  ];

  // Создание графика с использованием Chart.js
  const ctx = document.getElementById("chart").getContext("2d");

  // Обработка данных о задачах
  const taskData = processData(tasks); // Обработка данных с помощью Lodash
  const taskLabels = taskData.map((task) => task.label);
  const taskProgress = taskData.map((task) => task.progress);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: taskLabels,
      datasets: [
        {
          label: "Прогресс задач",
          data: taskProgress,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Максимальное значение шкалы установлено на 100
          ticks: {
            stepSize: 10, // Шаг шкалы установлен на 10
          },
        },
      },
    },
  });

  // Функция для обработки данных о задачах
  function processData(tasks) {
    const groupedTasks = _.groupBy(tasks, "status");

    const processedData = _.map(groupedTasks, (tasks, status) => {
      return {
        label: status,
        count: tasks.length,
        progress: calculateAverageProgress(tasks), // Добавление значения прогресса
      };
    });

    return processedData;
  }

  // Функция для вычисления среднего значения прогресса
  function calculateAverageProgress(tasks) {
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / tasks.length);
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
    titleElement.textContent = task.name;
    taskElement.appendChild(titleElement);

    const statusElement = document.createElement("p");
    statusElement.classList.add("task-status");
    statusElement.textContent = `Статус: ${task.progress}`;
    taskElement.appendChild(statusElement);

    const dateElement = document.createElement("p");
    const formattedDate = moment(task.date).format("DD.MM.YYYY"); // форматирование даты задачи с помощью moment
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

  // Функция для отображения данных о профиле
  function displayProfile() {
    const profileNameElement = document.getElementById("profile-name");
    const profilePositionElement = document.getElementById("profile-position");
    profileNameElement.textContent = "Maryna O";
    profilePositionElement.textContent = "Web Developer";
  }

  // Вызов функции для отображения задач
  displayTasks();

  // Вызов функции для отображения данных о профиле
  displayProfile();
})();
