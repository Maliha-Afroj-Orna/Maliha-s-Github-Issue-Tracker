// login page starts
const btnSignIn = document.getElementById('btn-signIn');
const userInput = document.getElementById('user-input');
const userPassword = document.getElementById('user-password');

// handle sign in functionality
btnSignIn.addEventListener('click', () => {
    // user input
    const userInputValue = userInput.value;
    
    // password
    const userPasswordValue = userPassword.value;
    
    if(userInputValue === 'admin' && userPasswordValue === 'admin123') {
        alert('Login Successful!');
        window.location.assign('./main.html');
    }
    else {
        alert("Invalid Username or Password!");
    }

})