// FILE: backend/src/routes/userRoutes.ts
import express, { Request, Response, RequestHandler } from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserData, 
  logExpense, 
  editExpense, 
  removeExpense, 
  getExpenses
} from '../controllers/userController';
import User from '../models/User';  // Ensure User is imported properly
import { IUser } from '../models/User';  // Assuming IUser is the interface for your User model

const router = express.Router();

// Existing routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/user/:username', getUserData);
router.post('/user/:username/expense', logExpense);
router.put('/user/:username/expense/:expenseId', editExpense);
router.delete('/user/:username/expense/:expenseId', removeExpense);

// New route to fetch expenses for a specific month and year
router.get('/user/:username/expenses/:year/:month', getExpenses);

export default router;
