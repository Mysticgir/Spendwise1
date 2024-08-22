// Get the form and list elements
const form = document.getElementById("add-expense-form");
const list = document.getElementById("expense-list");
const filters = document.getElementById("filters");
const totalExpensesElement = document.getElementById("total-expenses");

// Get the expenses from local storage, or initialize an empty array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add an event listener to the form
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const newExpense = { amount, category, date };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  addExpenseToList(newExpense);
  form.reset();
  updateTotalExpenses();
});

// Add an expense to the list
function addExpenseToList(expense) {
  const listItem = document.createElement("li");
  listItem.textContent = `${expense.category} - ${expense.date} - $${expense.amount}`;
  list.appendChild(listItem);
}

// Update the total expenses and amount
function updateTotalExpenses() {
  const totalAmount = expenses.reduce((acc, current) => acc + parseFloat(current.amount), 0);
  const totalExpensesText = `Total Expenses: ${expenses.length} - Total Amount: $${totalAmount.toFixed(2)}`;
  totalExpensesElement.textContent = totalExpensesText;
}

// Load the expenses from local storage and add them to the list
expenses.forEach(addExpenseToList);
updateTotalExpenses();

// Add event listener to filters
filters.addEventListener("submit", function(event) {
  event.preventDefault();
  const categoryFilter = document.getElementById("category-filter").value;
  const dateFilter = document.getElementById("date-filter").value;
  const filteredExpenses = expenses.filter(expense => {
    if (categoryFilter && expense.category !== categoryFilter) return false;
    if (dateFilter && expense.date !== dateFilter) return false;
    return true;
  });
  list.innerHTML = "";
  filteredExpenses.forEach(addExpenseToList);
  updateTotalExpenses();
});