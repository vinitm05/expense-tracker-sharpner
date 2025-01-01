// Select DOM elements
const expenseForm = document.querySelector('form');
const expenseAmount = document.getElementById('expense-amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expensesContainer = document.querySelector('.Expenses');

// Load expenses from local storage on page load
document.addEventListener('DOMContentLoaded', loadExpensesFromLocalStorage);

// Function to create an expense element
function createExpenseElement(expense) {
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'p-2', 'mb-2');

    expenseDiv.innerHTML = `
    <div>
      <strong>Amount:</strong> ₹${expense.amount} |
      <strong>Description:</strong> ${expense.description} |
      <strong>Category:</strong> ${expense.category}
    </div>
    <div>
      <button class="btn btn-sm btn-warning edit-expense me-2">Edit</button>
      <button class="btn btn-sm btn-danger delete-expense">Delete</button>
    </div>
  `;

    // Add event listeners to buttons
    expenseDiv.querySelector('.edit-expense').addEventListener('click', () => editExpense(expense, expenseDiv));
    expenseDiv.querySelector('.delete-expense').addEventListener('click', () => deleteExpense(expense, expenseDiv));

    return expenseDiv;
}

// Add expense to the list
function addExpense(e) {
    e.preventDefault();

    const amount = expenseAmount.value.trim();
    const desc = description.value.trim();
    const cat = category.value;

    if (!amount || !desc || !cat) {
        alert('Please fill in all fields');
        return;
    }

    const expense = { amount, description: desc, category: cat };

    // Save to local storage
    saveExpenseToLocalStorage(expense);

    // Add to the DOM
    const expenseElement = createExpenseElement(expense);
    expensesContainer.appendChild(expenseElement);

    // Clear form fields
    expenseAmount.value = '';
    description.value = '';
    category.value = '';
}

// Save expense to local storage
function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from local storage
function loadExpensesFromLocalStorage() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        expensesContainer.appendChild(expenseElement);
    });
}

// Delete expense
function deleteExpense(expense, expenseElement) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(e => e.amount !== expense.amount || e.description !== expense.description || e.category !== expense.category);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    expenseElement.remove();
}

// Edit expense
function editExpense(expense, expenseElement) {
    expenseAmount.value = expense.amount;
    description.value = expense.description;
    category.value = expense.category;

    deleteExpense(expense, expenseElement); // Remove old entry
}

// Attach event listener
expenseForm.addEventListener('submit', addExpense);
