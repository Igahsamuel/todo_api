import { body } from 'express-validator';

class TodoValidator {
  checkTodo() {
    return [
      body('title').notEmpty().withMessage('Please provide a title'),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('The value must be a boolean')
        .isIn([true, false])
        .withMessage('The value should be true or false'),
      body('description')
        .notEmpty()
        .withMessage('Please provide a brief description'),
    ];
  }
}

export default new TodoValidator();
