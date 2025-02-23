const express = require("express");
const router = express.Router();

let tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Buy groceries" },
    { id: 3, isCompleted: false, description: "Read a book" }
];

router.get("/", (req, res) => {
    res.json(tasks);
});


router.get("/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
});


router.get("/filter/completed", (req, res) => {
    const completed = req.query.completed === "true"; 
    const filteredTasks = tasks.filter(t => t.isCompleted === completed);
    res.json(filteredTasks);
});

module.exports = router;
 
