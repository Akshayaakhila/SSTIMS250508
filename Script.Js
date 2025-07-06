const salaryForm = document.getElementById('salary-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

const totalAmount = document.getElementById('total-amount');
const remainingBalance = document.getElementById('remaining-balance');
const monthlyIncomeDisplay = document.getElementById('monthly-income');

let expenses = [];
let monthlySalary = 0;

salaryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  monthlySalary = parseFloat(document.getElementById('monthly-salary').value);
  updateTotals();
  salaryForm.reset();
});

expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;
  const date = new Date(document.getElementById('expense-date').value);

  if (!name || !amount || !category || !date) return;

  expenses.push({
    name,
    amount,
    category,
    date
  });

  updateList();
  updateTotals();
  expenseForm.reset();
});

function updateList() {
  expenseList.innerHTML = '';

  const groupedByDate = {};

  expenses.forEach(exp => {
    const dateStr = exp.date.toLocaleDateString();
    if (!groupedByDate[dateStr]) groupedByDate[dateStr] = [];
    groupedByDate[dateStr].push(exp);
  });

  for (let date in groupedByDate) {
    const dayTotal = groupedByDate[date].reduce((sum, e) => sum + e.amount, 0);
    const li = document.createElement('li');
    li.innerHTML = `<strong>${date}</strong> - Total: ₹${dayTotal.toFixed(2)}`;

    groupedByDate[date].forEach(e => {
      const detail = document.createElement('span');
      detail.textContent = `${e.name} - ₹${e.amount} (${e.category})`;
      li.appendChild(detail);
    });

    expenseList.appendChild(li);
  }
}

function updateTotals() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses.filter(exp => {
    return (
      exp.date.getMonth() === currentMonth &&
      exp.date.getFullYear() === currentYear
    );
  });

  const totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.textContent = totalSpent.toFixed(2);
  remainingBalance.textContent = (monthlySalary - totalSpent).toFixed(2);
  monthlyIncomeDisplay.textContent = monthlySalary.toFixed(2);
}
