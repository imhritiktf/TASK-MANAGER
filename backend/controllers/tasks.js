import Task from '../models/Task.js';
import User from '../models/User.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, status } = req.body;

        if (!title || !assignedTo) {
            return res.status(400).json({ message: 'Title and assignedTo are required.' });
        }

        const assignees = Array.isArray(assignedTo) ? assignedTo : [assignedTo];

        const invalidAssignees = [];
        const validAssignees = [];

        for (const userId of assignees) {
            if (userId === req.user._id.toString()) {
                invalidAssignees.push({ userId, error: "Cannot assign task to yourself." });
                continue;
            }

            const user = await User.findById(userId);
            if (!user) {
                invalidAssignees.push({ userId, error: "User not found." });
            } else {
                validAssignees.push(userId);
            }
        }

        if (invalidAssignees.length > 0) {
            return res.status(400).json({
                message: "Some assignees are invalid.",
                errors: invalidAssignees,
            });
        }

         const task = await Task.create({
            title,
            description,
            status: status || 'To Do',
            assignedTo: validAssignees,
            createdBy: req.user._id,
        });

        res.status(201).json({ task });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const isAdmin = req.user.role === "admin";
        const isAssignee = task.assignedTo.some(assigneeId => 
            assigneeId.equals(req.user._id)
        );

        if (!isAdmin && !isAssignee) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        const allowedStatuses = ["To Do", "In Progress", "Done"];
        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({ 
                message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}` 
            });
        }

        task.status = req.body.status;
        await task.save();

        res.status(200).json({ task });

    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { status, assignedTo } = req.query;
        let query = {};

        if (req.user.role === "user") {
            query.$or = [
                { assignedTo: req.user._id },
                { createdBy: req.user._id }
            ];
        }

        if (status) {
            query.status = status;
        }

        if (assignedTo) {
            query.assignedTo = assignedTo;
        }

        const tasks = await Task.find(query)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
