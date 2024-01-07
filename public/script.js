const expenseForm = document.querySelector('#expenseForm');
const expenseAmount = document.querySelector('#expenseAmount');
const expenseDescription = document.querySelector('#expenseDescription');
const expenseCategory = document.querySelector('#expenseCategory');
const expenseList = document.querySelector('#expenses');

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get("/get-expense",{headers:{"Authorization":token}});
    console.log('Received Expenses:', response.data);
    for(let i=0; i<response.data.expense.length; i++)
      showUsersOnScreen(response.data.expense[i]);
  }
  catch (err) {
    console.log(err);
  }
});

expenseForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();


  const expenseDetails = {
    amount: expenseAmount.value,
    description: expenseDescription.value,
    category: expenseCategory.value,
  };

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post("/add-expense", expenseDetails, {headers:{"Authorization":token}});
    console.log('expense details created successfully:', response.data);
    //const responseData = response.data;

    //const updatedUsersResponse = await axios.get("/get-expense")
    //console.log('updated expenses:', updatedUsersResponse.data);

    showUsersOnScreen(response.data.newExpenseDetails);
    clearInputs();

  } catch (err) {
    console.log('Error creating expense:', err);
  }

}


function showUsersOnScreen(expense) {
  const parentNode=document.getElementById('expenses');

    const childNode= `<li id="${expense.id}">${expense.amount}--${expense.description}--${expense.category}
    <button class="btn btn-danger" onclick="deleteUserExpense(${expense.id})">DeleteExpense</button></li>`

    parentNode.innerHTML+=childNode;
}

async function deleteUserExpense(id) {
  try {
    const token=localStorage.getItem('token');
    const res=await axios.delete(`/delete-expense/${id}`,{headers:{"Authorization":token}});
    removeUserFromScreen(id);
    
} catch (error) {
    console.log(error);
    document.body.innerHTML+=`<h4>Something went wrong --${error}</h4>`
}
}

function removeUserFromScreen(id)
{
    const parentNode=document.getElementById('expenses');

    const childNode=document.getElementById(id);

    parentNode.removeChild(childNode);

}

function clearInputs() {
  expenseAmount.value = '';
  expenseDescription.value = '';
  expenseCategory.value = '';
}

document.getElementById('rzp-button').onclick = async function (e) {
  const token=localStorage.getItem('token');
  const response = await axios.get('/purchase/premiummembership', {headers:{"Authorization":token}});
  console.log(response);

  var options = 
  {
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler":async function(response){
      const res = await axios.post('/purchase/updatetransactionstatus', {
        order_id:options.order_id,
        payment_id:response.razorpay_payment_id
      }, {headers:{"Authorization":token}});
    
      alert('You are a premium user now');
      showPremiumusermessage();
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function(response){
    console.log(response)
    alert('Something went wrong');
  });
}

function showPremiumusermessage()
{
    const rzp=document.getElementById('rzp-button').style.display="none";
    //visibility hidden takes space display none takes no space
    document.getElementById('premium').innerHTML+="You are now a Premium User"
   
}