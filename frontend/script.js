const API_URL = "http://127.0.0.1:8000";


const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

const filterTasks = document.getElementById("filterTasks");


// Load tasks when website opens

document.addEventListener("DOMContentLoaded", () => {

    loadTasks();

});


// Add new task

taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const title =
        document.getElementById("taskTitle").value;


    const description =
        document.getElementById("taskDescription").value;


    const dueDate =
        document.getElementById("taskDate").value;


    const task = {

        title: title,

        description: description,

        due_date: dueDate

    };


    try {

        const response = await fetch(
            `${API_URL}/tasks`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(task)
            }
        );


        if (!response.ok) {

            throw new Error("Failed to add task");

        }


        alert("Task added successfully!");


        taskForm.reset();


        loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not add task.");

    }

});


// Get tasks from database

async function loadTasks() {

    try {

        const response =
            await fetch(`${API_URL}/tasks`);


        if (!response.ok) {

            throw new Error("Failed to load tasks");

        }


        const tasks =
            await response.json();


        displayTasks(tasks);


    } catch (error) {

        console.error(error);


        taskList.innerHTML = `

            <div class="empty-message">

                Could not connect to the server.

            </div>

        `;

    }

}


// Display tasks

function displayTasks(tasks) {

    const filter =
        filterTasks.value;


    let filteredTasks = tasks;


    if (filter === "pending") {

        filteredTasks =
            tasks.filter(
                task => task.completed === 0
            );

    }


    else if (filter === "completed") {

        filteredTasks =
            tasks.filter(
                task => task.completed === 1
            );

    }


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

            <div class="empty-message">

                No tasks found.

            </div>

        `;

        return;

    }


    taskList.innerHTML = "";


    filteredTasks.forEach(task => {

        const card =
            document.createElement("div");


        card.className = "task-card";


        if (task.completed === 1) {

            card.classList.add("completed");

        }


        const titleClass =
            task.completed === 1
            ? "completed-title"
            : "";


        card.innerHTML = `

            <h3 class="${titleClass}">

                ${escapeHTML(task.title)}

            </h3>


            <p>

                ${escapeHTML(
                    task.description || "No description"
                )}

            </p>


            <div class="task-date">

                Due Date: ${task.due_date}

            </div>


            <div class="task-actions">


                ${
                    task.completed === 0

                    ?

                    `<button
                        class="complete-btn"
                        onclick="completeTask(${task.id})">

                        Mark Complete

                    </button>`

                    :

                    `<button
                        class="complete-btn"
                        disabled>

                        Completed

                    </button>`
                }


                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>


            </div>

        `;


        taskList.appendChild(card);

    });

}


// Complete task

async function completeTask(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/tasks/${id}`,
                {
                    method: "PUT"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update task"
            );

        }


        loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not update task.");

    }

}


// Delete task

async function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete task"
            );

        }


        loadTasks();


    } catch (error) {

        console.error(error);

        alert("Could not delete task.");

    }

}


// Filter tasks

filterTasks.addEventListener(
    "change",
    () => {

        loadTasks();

    }
);


// Security function

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}