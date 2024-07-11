const ApibaseUrl = 'http://localhost:8888'
const login_btn = document.getElementById('login-btn');

login_btn.addEventListener('click', (e) => {
    e.preventDefault();
});

async function submitLoginForm() {
    const pageError = document.querySelector('.error-msg');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const checkbox = document.querySelector('#remember-password');  
    
    if((!email) || (!password)) {
        pageError.innerHTML = 'Please fill in your details!';
        pageError.classList.add('errormsg');
        return; 
    }
    
    await fetch(ApibaseUrl+'/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.match == true && data.data.message == "User Exists!") {
            if (data.data.userData[0].status == 1) {
                pageError.innerHTML = 'Login successful!';
                pageError.classList.add('valid-msg');

                setTimeout(function() {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user_id", data.data.userData[0].user_id);
                        localStorage.setItem("email", data.data.userData[0].email);
                        localStorage.setItem("name", data.data.userData[0].name);
                        window.location = "api-docs.html";
                }, 3000);
            
            } else {
                pageError.innerHTML = 'Login failed. Account does not exists!';
                pageError.classList.add('errormsg');
            }
    
        } else {
            pageError.innerHTML = 'Login failed. Please try again!!!';
            pageError.classList.add('errormsg');
        }
    });
}