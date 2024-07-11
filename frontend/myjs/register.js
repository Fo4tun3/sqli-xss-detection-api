const name_input = document.querySelector('#name');      
const email_input = document.querySelector('#email');     
const user_role_input =  document.querySelector('input[name="user_role"]:checked');
const password_input = document.querySelector('#password');          
const confirm_password = document.querySelector('#confirm-password');
// const checkbox_input = document.querySelector('#checkbox');  

const name_error = document.querySelector('.name-error');      
const email_error = document.querySelector('.email-error');      
const role_error = document.querySelector('.role-error');      
const password_error = document.querySelector('.password-error');          
const confPassword_error = document.querySelector('.confirmPassword-error');
const checkbox_error = document.querySelector('.checkbox-error');      
const register_btn = document.getElementById('register-btn');

register_btn.addEventListener('click', (e) => {
    e.preventDefault();
});




const baseUrl = 'http://localhost:8888'
async function submitForm() {
    const name = document.querySelector('#name').value;      
    const email = document.querySelector('#email').value;     
    const password = document.querySelector('#password').value;          

    const pageErrorMessage = document.querySelector('.error-msg');
    // console.log(pageErrorMessage);
    // const name = document.getElementById('name').value;
    // const email =  document.getElementById('email').value;
    // const user_role =  document.querySelector('input[name="user"]:checked').value;
    // const password = document.getElementById('password').value;
    
    const user = (name === '' || name.trim().length < 3)
    // const checkBox = (!checkbox_input.checked)
    // const radio = (!user_role_input.checked)
    // console.log(radio);

    if((user) || (!email) || (!password)) {
        pageErrorMessage.innerHTML = 'Please fill in your details correctly!';
        pageErrorMessage.classList.add('errormsg');
        return;
    }


    await fetch(baseUrl+'/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.data.success == true && data.data.message == "User added Successfully") {
            pageErrorMessage.innerHTML = 'Registration successful!';
            pageErrorMessage.classList.add('valid-msg');
            
            setTimeout(function() {
                window.location = "login.html";
            }, 3000);
        } else if(data.data.success == false) {
            pageErrorMessage.innerHTML = 'Email already exists.';
            pageErrorMessage.classList.add('errormsg');
        } else {
            pageErrorMessage.innerHTML = 'Something went wrong. Please try again.';
            pageErrorMessage.classList.add('errormsg');
        }
    });
}


emailInput = document.querySelector("#email")
form = document.querySelector("#signup-form")
passInput = document.querySelector("#password")
const pageErrorMessage = document.querySelector('.error-msg');

// Email Validtion
function checkEmail() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailPattern)) {
        pageErrorMessage.innerHTML = 'Please enter a valid email!';
        return pageErrorMessage.classList.add("errormsg"); //adding invalid class if email value do not mathced with email pattern
    }
    pageErrorMessage.classList.add("valid"); //removing invalid class if email value matched with emailPattern
}

// Password Validation
function createPass() {
    const passPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passInput.value.match(passPattern)) {
        pageErrorMessage.innerHTML = 'Please enter atleast 8 charatcer with number, symbol, small and capital letter!';
        return pageErrorMessage.classList.add("errormsg"); //adding invalid class if password input value do not match with passPattern
    }
    pageErrorMessage.classList.add("valid"); //removing invalid class if password input value matched with passPattern
}
  
form.addEventListener('input', (e) => {
    checkEmail();
    createPass();

    //calling function on key up
    emailInput.addEventListener("keyup", checkEmail);
    passInput.addEventListener("keyup", createPass);

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid")
    ) {
        location.href = form.getAttribute("action");
    }
});
