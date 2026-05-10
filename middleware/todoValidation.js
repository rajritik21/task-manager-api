const { z } = require('zod');

// Todo schema validation
const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  completed: z.boolean().optional().default(false),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium')
});

// Middleware for validating todo creation and update
const validateTodo = (req, res, next) => {
  try {
    const result = todoSchema.safeParse(req.body);
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: formattedErrors 
      });
    }
    
    // Add the validated data to the request
    req.validatedData = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal validation error' });
  }
};

module.exports = { validateTodo }; 