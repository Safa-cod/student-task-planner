import sqlite3
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DB_FILE = "tasks.db"


def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    try:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                due_date TEXT NOT NULL,
                completed INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
    finally:
        conn.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: অ্যাপ চালু হওয়ার সময় ডাটাবেস প্রস্তুত হবে
    init_db()
    yield
    # Shutdown logic (প্রয়োজন হলে এখানে কাস্টম ক্লিনআপ রাখতে পারেন)


app = FastAPI(title="Student Task Manager", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Title cannot be empty")
    description: str = ""
    due_date: str = Field(..., min_length=1, description="Due date is required")


@app.get("/")
def home():
    return {"message": "Student Task Manager Backend is Running"}


@app.get("/tasks")
def get_tasks():
    conn = get_connection()
    try:
        rows = conn.execute("""
            SELECT id, title, description, due_date, completed, created_at
            FROM tasks
            ORDER BY id DESC
        """).fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()


@app.post("/tasks", status_code=status.HTTP_201_CREATED)
def add_task(task: TaskCreate):
    conn = get_connection()
    try:
        cursor = conn.execute("""
            INSERT INTO tasks (title, description, due_date, completed)
            VALUES (?, ?, ?, 0)
        """, (task.title.strip(), task.description.strip(), task.due_date.strip()))
        conn.commit()
        new_id = cursor.lastrowid
        
        # নতুন তৈরি হওয়া টাস্কটি ফেচ করে রিটার্ন করা হচ্ছে
        row = conn.execute("SELECT * FROM tasks WHERE id = ?", (new_id,)).fetchone()
        return dict(row)
    finally:
        conn.close()


@app.put("/tasks/{task_id}")
def complete_task(task_id: int):
    conn = get_connection()
    try:
        cursor = conn.execute(
            "UPDATE tasks SET completed = 1 WHERE id = ?",
            (task_id,)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        return {"message": "Task marked as completed"}
    finally:
        conn.close()


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_connection()
    try:
        cursor = conn.execute(
            "DELETE FROM tasks WHERE id = ?",
            (task_id,)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        return {"message": "Task deleted successfully"}
    finally:
        conn.close()