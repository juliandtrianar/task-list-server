const express = require("express");
const app = express();

const tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Buy groceries" },
    { id: 3, isCompleted: false, description: "Read a book" }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
 
