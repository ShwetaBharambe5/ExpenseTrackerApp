const signupForm = document.querySelector('#signupForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

signupForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const userDetails = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await axios.post("/signup", userDetails);
    console.log('User created successfully:', response.data);
    clearInputs();
  } catch (err) {
    console.log('Error creating user:', err);
  }
}

function clearInputs() {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
}
