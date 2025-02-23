const express = require("express");
const path = require("path");
const { validateTaskData, validateRequestBody, validateIdParam } = require("./middlewares");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Buy groceries" },
    { id: 3, isCompleted: false, description: "Read a book" }
];

app.get("/tasks", (req, res) => res.json(tasks));

app.get("/tasks/:id", validateIdParam, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});

app.post("/tasks", validateRequestBody, validateTaskData, (req, res) => {
    const { description } = req.body;
    const newTask = { id: tasks.length + 1, isCompleted: false, description };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", validateRequestBody, validateIdParam, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    const { isCompleted } = req.body;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    res.json(task);
});

app.put("/tasks/:id/description", validateRequestBody, validateIdParam, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    const { description } = req.body;
    task.description = description;

    res.json(task);
});

app.delete("/tasks/:id", validateIdParam, (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

