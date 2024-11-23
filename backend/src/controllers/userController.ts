import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import mongoose from 'mongoose';
import { IUser } from '../models/User'; // Adjust the import path as necessary

// Register User
export const registerUser = async (req: any, res: any) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created!', token });
  } catch (error) {
    console.error('Error during user registration:', error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Data
export const getUserData = async (req: any, res: any) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Log Expense
export const logExpense = async (req: any, res: any) => {
  const { username } = req.params;
  const { description, amount, saving, date } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.expenses.push({ description, amount, saving, date });
    await user.save();

    res.status(201).json({ message: 'Expense logged successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit Expense
export const editExpense = async (req: any, res: any) => {
  const { username, expenseId } = req.params;
  const { description, amount, saving, date } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const expense = user.expenses.id(expenseId); // Use .id() to access subdocument
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.description = description;
    expense.amount = amount;
    expense.saving = saving;
    expense.date = date;
    await user.save();

    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove Expense
export const removeExpense = async (req: any, res: any) => {
  const { username, expenseId } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure `expenseId` is correctly typed and handled
    user.expenses.pull({ _id: expenseId });

    await user.save(); // Save the updated user document

    res.status(200).json({ message: 'Expense removed successfully' });
  } catch (error) {
    console.error('Error removing expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExpenses = async (req: any, res: any) => {
  const { username, year, month } = req.params;

  try {
    // Explicitly type the return of findOne to match IUser
    const user = await User.findOne({ username }) as IUser | null;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure expenses is an array of objects that have a `date` field
    const expenses = user.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === parseInt(year) && expenseDate.getMonth() === (parseInt(month) - 1);
    });

    return res.json(expenses);  // Send the filtered expenses
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};