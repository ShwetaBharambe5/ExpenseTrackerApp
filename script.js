// Get references to DOM elements
const expenseForm = document.getElementById("expenseForm");
const expenseAmount = document.getElementById("expenseAmount");
const expenseDescription = document.getElementById("expenseDescription");
const expenseCategory = document.getElementById("expenseCategory");
const expensesList = document.getElementById("expensesList");

let editingIndex = -1; // Index of the expense being edited

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to add an expense
function addExpense(amount, description, category) {
    expenses.push({ amount, description, category });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

// Function to remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

// Function to display expenses
function displayExpenses() {
    expensesList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("alert", "alert-primary", "mb-2", "d-flex", "justify-content-between", "align-items-center");
        expenseItem.innerHTML = `
            <span>${expense.description} - $${expense.amount} - Category: ${expense.category}</span>
            <div>
                <button class="btn btn-danger btn-sm mr-2" onclick="removeExpense(${index})">Delete</button>
                <button class="btn btn-primary btn-sm" onclick="startEdit(${index})">Edit</button>
            </div>
        `;
        expensesList.appendChild(expenseItem);
    });
}

// Function to start editing an expense
function startEdit(index) {
    editingIndex = index;
    expenseAmount.value = expenses[index].amount;
    expenseDescription.value = expenses[index].description;
    expenseCategory.value = expenses[index].category;
}

// Function to save edited expense
function saveEdit() {
    const amount = parseFloat(expenseAmount.value);
    const description = expenseDescription.value;
    const category = expenseCategory.value;
    if (!isNaN(amount)) {
        expenses[editingIndex] = { amount, description, category };
        localStorage.setItem("expenses", JSON.stringify(expenses));
        editingIndex = -1;
        displayExpenses();
    }
}

// Function to cancel editing
function cancelEdit() {
    editingIndex = -1;
    expenseAmount.value = "";
    expenseDescription.value = "";
    expenseCategory.value = "";
}

// Event listener for form submission
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseFloat(expenseAmount.value);
    const description = expenseDescription.value;
    const category = expenseCategory.value;
    if (!isNaN(amount)) {
        if (editingIndex !== -1) {
            saveEdit();
        } else {
            addExpense(amount, description, category);
        }
        expenseForm.reset();
    }
});

// Initial display of expenses
displayExpenses();
