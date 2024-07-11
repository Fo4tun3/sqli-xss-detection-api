const form = document.querySelector("form"),
  emailField = document.querySelector(".email-field"),
  emailInput = document.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = document.querySelector("#password");
  
  output = document.querySelector(".error-msg");
  // cPassField = form.querySelector(".confirm-password"),
  // cPassInput = cPassField.querySelector(".cPassword");

// Email Validtion
function checkEmail() {
  const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emaiPattern)) {
    return output.classList.add("error-msg"); //adding invalid class if email value do not mathced with email pattern
  }
  emailField.classList.remove("valid-msg"); //removing invalid class if email value matched with emaiPattern
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    pInput.type = "password";
  });
});

// Password Validation
function createPass() {
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passInput.value.match(passPattern)) {
    return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
  }
  passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
}

// // Confirm Password Validation
// function confirmPass() {
//   if (passInput.value !== cPassInput.value || cPassInput.value === "") {
//     return cPassField.classList.add("invalid");
//   }
//   cPassField.classList.remove("invalid");
// }

// Calling Funtion on Form Sumbit
// form.addEventListener("submit", (e) => {
  
// });

const register_btn = document.getElementById('register-btn');

register_btn.addEventListener('click', (e) => {
  e.preventDefault();
});

const baseUrl = 'http://localhost:8888'
async function submitForm() {
    const name = document.querySelector('#name').value;      
    const email = document.querySelector('.email').value;     
    const password = document.querySelector('#password').value; 
    
  checkEmail();
  createPass();

  //calling function on key up
  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", createPass);
  // cPassInput.addEventListener("keyup", confirmPass);

  if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid")
    // !cPassField.classList.contains("invalid")
  ) {
    location.href = form.getAttribute("action");
  }

    // const pageErrorMessage = document.getElementById('pageerror');
    // const name = document.getElementById('name').value;
    // const email =  document.getElementById('email').value;
    // const user_role =  document.querySelector('input[name="user"]:checked').value;
    // const password = document.getElementById('password').value;
    
    // const user = (name === '' || name.trim().length < 3)
    // const checkBox = (!checkbox_input.checked)
    // const radio = (!user_role_input.checked)

    // if((user) || (!email) || (!password)) {
    //     pageErrorMessage.innerHTML = 'Please fill in your details correctly!';
    //     pageErrorMessage.classList.add('pageerror');
    //     return;
    // }

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
        if (data.data.success == true) {
            // pageErrorMessage.innerHTML = 'Registration successful!';
            // pageErrorMessage.classList.add('pagevalid');
            // localStorage.setItem("user_role", data.data.data.user_role);
            // localStorage.setItem("name", data.data.data.name);
            // localStorage.setItem("email", data.data.data.email);
            
            setTimeout(function() {
                window.location = "login.html";
                // if (data.data.data.role == 'admin') {
                //     window.location = "login.html";
                // } else if(data.data.data.role == 'user') {
                //     window.location = "login.html";
                // } 
                // else if(data.data.data.role == 'administrator') {
                //     window.location = "login.html";
                // }
            }, 3000);
        } else if(data.data.success == false) {
            pageErrorMessage.innerHTML = 'Email already exists.';
            pageErrorMessage.classList.add('pageerror');
        } else {
            pageErrorMessage.innerHTML = 'Something went wrong. Please try again.';
            pageErrorMessage.classList.add('pageerror');
        }
    });
}