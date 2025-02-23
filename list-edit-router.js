const express = require("express");
const router = express.Router();

let tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Buy groceries" },
    { id: 3, isCompleted: false, description: "Read a book" }
];


router.use(express.json());


router.post("/", (req, res) => {
    const { description } = req.body;
    if (!description) return res.status(400).json({ message: "Description is required" });

    const newTask = { id: tasks.length + 1, isCompleted: false, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


router.put("/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { description, isCompleted } = req.body;
    if (description !== undefined) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    res.json(task);
});


router.delete("/:id", (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

module.exports = router;
 
