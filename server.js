const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

const tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Buy groceries" },
    { id: 3, isCompleted: false, description: "Read a book" }
];

// Rutas de API
app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
    const newTask = { id: tasks.length + 1, isCompleted: false, description: req.body.description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.isCompleted = req.body.isCompleted;
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const index = tasks.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    tasks.splice(index, 1);
    res.status(204).send();
});

app.put("/tasks/:id/description", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.description = req.body.description; 
    res.json(task);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
