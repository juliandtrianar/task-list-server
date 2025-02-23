const validateTaskData = (req, res, next) => {
    const { description, isCompleted } = req.body;

    if (!description || typeof description !== "string") {
        return res.status(400).json({ error: "Description is required and must be a string." });
    }

    if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
        return res.status(400).json({ error: "isCompleted must be a boolean value." });
    }

    next();
};

const validateRequestBody = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }
    next();
};

const validateIdParam = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid task ID. Must be a positive integer." });
    }
    next();
};

module.exports = { validateTaskData, validateRequestBody, validateIdParam };

