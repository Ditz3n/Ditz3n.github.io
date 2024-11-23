// FILE: backend/src/models/User.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the Expense interface
interface IExpense extends Document {
  description: string;
  amount: number;
  saving: number;
  date: Date;
}

// Define the User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  expenses: Types.DocumentArray<IExpense>;
}

// Define the Expense schema
const ExpenseSchema = new Schema<IExpense>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  saving: { type: Number, required: true },
  date: { type: Date, required: true },
});

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expenses: [ExpenseSchema], // Use the subdocument schema here
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
