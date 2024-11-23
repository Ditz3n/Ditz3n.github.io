import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  interface Expense {
    _id: string;
    description: string;
    amount: number;
    saving: number;
    date: Date;
  }

  interface UserData {
    username: string;
    email: string;
    expenses: Expense[];
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [expensesForMonth, setExpensesForMonth] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const navigate = useNavigate();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchUserData = async () => {
    const username = localStorage.getItem('username');

    if (!username) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/user/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const fetchExpensesForMonth = async (monthIndex: number) => {
    const username = localStorage.getItem('username');
    if (!username) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/user/${username}/expenses/${year}/${monthIndex + 1}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpensesForMonth(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== null) {
      fetchExpensesForMonth(selectedMonth);
    }
  }, [selectedMonth]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
    setSelectedMonth(null); // Reset selected month when year changes
    setExpensesForMonth([]); // Clear the expenses list
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleLogExpense = async () => {
    if (!description || description.length < 3 || amount === null || saving === null || selectedMonth === null) {
      alert('Description must be at least 3 characters long.');
      return;
    }
  
    const username = localStorage.getItem('username');
    if (!username) return;
  
    const date = new Date(year, selectedMonth, 1);
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/user/${username}/expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, saving, date }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log expense');
      }
  
      const data = await response.json();
      setExpensesForMonth((prevExpenses) => [
        ...prevExpenses,
        { _id: data._id, description, amount, saving, date },
      ]);
  
      // After logging the expense, refetch user data to update the monthly overview
      await fetchUserData();
      if (selectedMonth !== null) {
        await fetchExpensesForMonth(selectedMonth);
      }
  
      // Reset form fields
      setDescription('');
      setAmount(null);
      setSaving(null);
    } catch (error) {
      console.error('Error logging expense:', error);
    }
  };

  const handleMonthClick = (monthIndex: number) => {
    if (selectedMonth === monthIndex) {
      setSelectedMonth(null); // Deselect the month if it's already selected
    } else {
      setSelectedMonth(monthIndex);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    const username = localStorage.getItem('username');
    if (!username) return;
  
    try {
      // Updated endpoint to match backend structure
      const response = await fetch(`http://localhost:5000/api/users/user/${username}/expense/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete expense');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
  
      // Update local state
      setExpensesForMonth((prevExpenses) => 
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
      
      // Refresh the data
      await fetchUserData();
      if (selectedMonth !== null) {
        await fetchExpensesForMonth(selectedMonth);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleEditExpense = (expenseId: string) => {
    const expenseToEdit = expensesForMonth.find(expense => expense._id === expenseId);
    if (!expenseToEdit) return;

    setCurrentExpense(expenseToEdit);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExpense) return;

    const username = localStorage.getItem('username');
    if (!username) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/user/${username}/expense/${currentExpense._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to edit expense');
      }

      setIsModalOpen(false);
      await fetchUserData();
      if (selectedMonth !== null) {
        await fetchExpensesForMonth(selectedMonth);
      }
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };

  const renderEditModal = () => {
    if (!currentExpense) return null;

    return (
      <div className={`fixed inset-0 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Edit Expense</h2>
          <form onSubmit={handleConfirmEdit}>
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-white">Description:</label>
              <input
                type="text"
                id="description"
                value={currentExpense.description}
                onChange={(e) => setCurrentExpense({ ...currentExpense, description: e.target.value })}
                className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg font-medium text-gray-700 dark:text-white">Amount:</label>
              <input
                type="number"
                id="amount"
                value={currentExpense.amount}
                onChange={(e) => setCurrentExpense({ ...currentExpense, amount: Number(e.target.value) })}
                className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="saving" className="block text-lg font-medium text-gray-700 dark:text-white">Saving:</label>
              <input
                type="number"
                id="saving"
                value={currentExpense.saving}
                onChange={(e) => setCurrentExpense({ ...currentExpense, saving: Number(e.target.value) })}
                className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded-md transform transition-all duration-300 hover:scale-105">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md transform transition-all duration-300 hover:scale-105">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen w-screen">
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
              Welcome, {userData ? userData.username : 'Guest'}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md w-full mt-6 transform transition-all duration-300 hover:scale-105"
            >
              Logout
            </button>
  
            {/* Year Selector */}
            <div className="mt-8 mb-4">
              <label htmlFor="year" className="block text-lg font-medium dark:text-white">Select Year:</label>
              <select
                id="year"
                value={year}
                onChange={handleYearChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-100 dark:bg-gray-700 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {yearOptions.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>{yearOption}</option>
                ))}
              </select>
            </div>
  
            {/* Monthly Expense Overview */}
            <div className="grid grid-cols-3 gap-4">
              {months.map((month, index) => {
                const monthExpenses = userData ? userData.expenses.filter(expense => new Date(expense.date).getMonth() === index && new Date(expense.date).getFullYear() === year) : [];
                const totalSpent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                const totalSaved = monthExpenses.reduce((sum, expense) => sum + expense.saving, 0);
  
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center h-24 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => handleMonthClick(index)}
                  >
                    <div>{month}</div>
                    <div>Spent: {totalSpent}DKK</div>
                    <div>Saved: {totalSaved}DKK</div>
                  </div>
                );
              })}
            </div>
  
            {/* Log Expense Section */}
            {selectedMonth !== null && (
              <div className="mt-8">
                <h2 className="text-xl font-bold">Log Expense for {months[selectedMonth]}</h2>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-lg font-medium dark:text-white">Description:</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-lg font-medium dark:text-white">Amount Spent:</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="saving" className="block text-lg font-medium dark:text-white">Amount Saved:</label>
                  <input
                    type="number"
                    id="saving"
                    value={saving || ''}
                    onChange={(e) => setSaving(Number(e.target.value))}
                    className="mt-1 block w-full bg-gray-100 px-3 py-2 text-base border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:scale-105 ease-in-out duration-300"
                  />
                </div>
                <button
                  onClick={handleLogExpense}
                  className="bg-green-500 text-white py-2 px-4 rounded-md transform transition-all duration-300 hover:scale-105"
                >
                  Log Expense
                </button>
              </div>
            )}
  
            {/* Expenses List for Selected Month */}
            {selectedMonth !== null && (
              <div className="mt-8 -ml-3">
                <h2 className="text-xl font-bold ml-3 mb-2">Expenses for {months[selectedMonth]}</h2>
                <ul className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar ml-4">
                  {expensesForMonth.map((expense) => (
                    <li
                      key={expense._id}
                      className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <div>
                        <p>{expense.description}</p>
                        <p>Spent: ${expense.amount}</p>
                        <p>Saved: ${expense.saving}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditExpense(expense._id)}
                          className="bg-yellow-500 text-white py-1 px-2 rounded-md transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {renderEditModal()}
    </div>
  );  
}

export default Dashboard;