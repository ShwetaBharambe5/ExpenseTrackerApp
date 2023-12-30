const expenseForm = document.querySelector('#expenseForm');
const expenseAmount = document.querySelector('#expenseAmount');
const expenseDescription = document.querySelector('#expenseDescription');
const expenseCategory = document.querySelector('#expenseCategory');
const expenseList = document.querySelector('#expenses');

expenseForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("/get-expense");
    console.log('Received Expenses:', response);
    showUsersOnScreen(response.data);
  }
  catch (err) {
    console.log(err);
  }
});

async function onSubmit(e) {
  e.preventDefault();


  const expenseDetails = {
    amount: expenseAmount.value,
    description: expenseDescription.value,
    category: expenseCategory.value,
  };

  try {
    const response = await axios.post("/add-expense", expenseDetails);
    console.log('expense details created successfully:', response.data);
    const responseData = response.data;

    const updatedUsersResponse = await axios.get("/get-expense")
    console.log('updated expenses:', updatedUsersResponse.data);
    showUsersOnScreen(updatedUsersResponse.data);
    clearInputs();

  } catch (err) {
    console.log('Error creating expense:', err);
  }

}


function showUsersOnScreen(expenses) {
  expenseList.innerHTML = '';

  if (Array.isArray(expenses)) {

    expenses.forEach((expense) => {
      const userElement = document.createElement('li');

      userElement.textContent =
        expense.amount + ', ' +
        expense.description + ',' +
        expense.category;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Delete";
      userElement.appendChild(deleteBtn);
      expenseList.appendChild(userElement);
      deleteBtn.addEventListener('click', (event) => deleteUserExpense(expense.id, userElement, event));
    });
  }
  clearInputs();
}

async function deleteUserExpense(id, listItem, event) {
  try {
    event.stopPropagation(); // Stop event propagation
    await axios.delete(`/delete-expense/${id}`);
    console.log(`Product Deleted Successfully.`);

  // Remove the element from the screen
  if (listItem) {
      listItem.remove();
  } else {
      console.error(`Error: Element with ID ${id} not found.`);
  }
  } catch (error) {
    console.log(error);
  }
}


function clearInputs() {
  expenseAmount.value = '';
  expenseDescription.value = '';
  expenseCategory.value = '';
}

