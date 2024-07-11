const loggedin = document.querySelector(".logged-in-form");
const loggedout = document.querySelector(".logged-out-form");
const token = localStorage.getItem("token");
const localName = localStorage.getItem("name");

if (token) {
    document.getElementById("username").innerHTML = `${localName.replace(localName[0], localName[0].toUpperCase())}`;
    
    loggedout.style.display = 'none';
    loggedin.style.display = 'block';
} else {
    loggedout.style.display = 'block';
    loggedin.style.display = 'none';
}

function logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    window.location = "index.html"
}


