import { Router } from 'express';
import { Todo } from '../models/todo';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Middleware from './../src/middleWares/handleValidations';
import TodoValidator from './../src/validators/validator';


const router = Router();

router.post(
  '/create',
  TodoValidator.checkTodo(),
  Middleware.handleValidation,
  async (req: Request, res: Response) => {
    try {
      const id = uuidv4();
      const user = await Todo.create({ ...req.body, id });
      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      console.log('Error💥', error);
      res.status(500).json({
        status: 'failed',
        message: 'An Error Occured',
      });
    }
  }
);

router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = req.query?.limit as number | undefined;
    const user = await Todo.findAll({ where: {}, limit });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log('error 💥', error);
    res.status(500).json({
      status: 'failed',
      message: 'An Error Occured',
    });
  }
});

router.patch('/update/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const user = await Todo.findOne({ where: id });
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'user not found ',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log('error💥', error);
    res.status(500).json({
      status: 'failed',
      message: 'An Error Occured',
    });
  }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const user = await Todo.destroy({ where: id });
    if (!user) {
      res.status(404).json({
        status: 'failed',
        message: 'This user does not exist',
      });
    }
    res.status(204).json({
      message: 'Todo finally deleted',
    });
  } catch (error) {
    console.log('error💥', error);
    res.status(500).json({
      status: 'failed',
      message: 'An Error Occured',
    });
  }
});

export default router;
