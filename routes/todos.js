const router = require('express').Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const { validateTodo } = require('../middleware/todoValidation');

// Create a new todo
router.post('/', auth, validateTodo, async (req, res) => {
  try {
    // Use validated data from middleware
    const todo = new Todo({
      ...req.validatedData,
      userId: req.user.id
    });
    
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todos for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific todo
router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put('/:id', auth, validateTodo, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.validatedData,
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle todo completion status
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Toggle the completed status
    todo.completed = !todo.completed;
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 