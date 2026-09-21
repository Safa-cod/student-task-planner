# Student Task Manager

Student Task Manager is a simple full-stack web application designed to help students organize, track, and manage their academic tasks in one place.

The application allows students to create tasks with a title, description, and due date. Users can view all their tasks, mark completed tasks, delete tasks, and filter tasks based on their current status. The main goal of this project is to provide a simple and user-friendly way for students to keep track of their academic activities and deadlines.

## Features

* Add new academic tasks
* Add a task title and description
* Set a due date for each task
* View all added tasks
* Mark tasks as completed
* Delete tasks
* Filter tasks by:

  * All Tasks
  * Pending Tasks
  * Completed Tasks
* Simple and clean user interface
* Responsive design for different screen sizes
* Persistent task storage using SQLite
* FastAPI backend for handling application operations
* Frontend and backend communication using HTTP requests

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* FastAPI
* Uvicorn

### Database

* SQLite

## Project Structure

```text
Student Task Manager/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   └── backend.py
│
├── database.sql
│
└── README.md
```

## How It Works

The application follows a simple frontend-backend-database structure.

The frontend provides the user interface where students can enter and manage their tasks. JavaScript sends requests to the FastAPI backend whenever a user adds, completes, or deletes a task.

The FastAPI backend processes these requests and communicates with the SQLite database. The task information is stored in the database so that the application can retrieve and display the saved tasks.

### Application Flow

```text
User
  ↓
Frontend
  ↓
JavaScript
  ↓
FastAPI Backend
  ↓
SQLite Database
```

## Main Functions

### 1. Add Task

Users can enter a task title, description, and due date. After submitting the form, the task is sent to the backend and stored in the SQLite database.

### 2. View Tasks

All saved tasks are retrieved from the backend and displayed on the application interface.

### 3. Complete Task

Users can mark a task as completed. The task status is then updated in the database.

### 4. Delete Task

Users can remove tasks that are no longer needed. The selected task is deleted from the database.

### 5. Filter Tasks

Users can filter the task list to display all tasks, pending tasks, or completed tasks.

## Database

The application uses SQLite as its database system. SQLite was selected because it is lightweight and does not require a separate database server such as MySQL or XAMPP.

The main `tasks` table contains information such as:

* Task ID
* Task Title
* Task Description
* Due Date
* Completion Status
* Creation Time

## Installation and Setup

### Step 1: Clone the Repository

Clone this repository to your computer and open the project folder in VS Code.

### Step 2: Install Python Packages

Open the VS Code terminal and run:

```bash
pip install fastapi uvicorn
```

### Step 3: Start the Backend

Open the terminal inside the `backend` folder:

```bash
cd backend
```

Then run:

```bash
python -m uvicorn backend:app --reload
```

The backend will start at:

```text
http://127.0.0.1:8000
```

### Step 4: Run the Frontend

Open the `frontend/index.html` file using the VS Code Live Server extension.

The Student Task Manager interface will open in your browser.

## API Endpoints

The FastAPI backend provides the following basic endpoints:

| Method | Endpoint      | Purpose                              |
| ------ | ------------- | ------------------------------------ |
| GET    | `/`           | Check whether the backend is running |
| GET    | `/tasks`      | Retrieve all tasks                   |
| POST   | `/tasks`      | Add a new task                       |
| PUT    | `/tasks/{id}` | Mark a task as completed             |
| DELETE | `/tasks/{id}` | Delete a task                        |

## Application Screenshots

Screenshots of the application can be added below to demonstrate the main features and user interface.

### Home Page

![Home Page](screenshots/home.png)

### Add Task

![Add Task](screenshots/add-task.png)

### Completed Task

![Completed Task](screenshots/completed.png)

### Task Filter

![Task Filter](screenshots/filter.png)

### Final View

![Final View](screenshots/final-view.png)

## Project Purpose

The purpose of this project is to create a simple task management system specifically for students. It helps users keep their academic activities organized and makes it easier to remember important deadlines.

This project also demonstrates how a frontend application can communicate with a Python backend and how the backend can store and manage data using a database.

## Future Improvements

Some possible improvements for future versions include:

* User registration and login
* Individual task lists for different users
* Task priority levels
* Task categories such as Assignment, Exam, Lab, and Project
* Reminder notifications
* Search functionality
* Dark mode
* Edit existing tasks
* Calendar-based task management
* Deployment to an online server

## Author

**Made by Safayet**

**Safayet Hossain Bhuiyan Munna**

Student, Department of Computer Science and Engineering

Southeast University

## License

This project was developed for educational and academic purposes.
