const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            userId: req.user.id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add or update this PUT route for updating tasks
router.put('/:id', auth, async (req, res) => {
    try {
        console.log('Updating task:', req.params.id, 'for user:', req.user.id);
        console.log('Update data:', req.body);
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log('Task updated successfully:', task);
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Add a specific route for marking a task as complete
router.put('/:id/complete', auth, async (req, res) => {
    try {
        console.log('Marking task as complete:', req.params.id, 'for user:', req.user.id);
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { completed: true },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log('Task marked as complete:', task);
        res.json(task);
    } catch (error) {
        console.error('Error completing task:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Add DELETE route
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;