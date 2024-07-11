// const env = require("dotenv").config();
const baseurl = 'http://localhost:8888/api/v1';
// const baseurl = process.env.BACKEND_LINK;

const user_id = localStorage.getItem("user_id");
const localLearner_id = localStorage.getItem("learner_id");
const email = localStorage.getItem("email");
// console.log(typeof window);



// async function changePassword() { 
//     var oldpassword = document.getElementById("oldPassword").value;
//     var newpassword = document.getElementById("newPassword").value;
//     var confNewPassword = document.getElementById("confNewPassword").value;
//     const oldPassword_error = document.querySelector(".oldPassword_error");
    
//     var oldpassword_input = document.getElementById("oldPassword");
//     var newPassword_input = document.getElementById("newPassword");
//     var confirm_NewPassword = document.getElementById("confNewPassword");
//     var newPassword_error = document.querySelector(".newPassword_error");
//     var confNewPassword_error = document.querySelector(".confNewPassword_error");
    
//     if(oldpassword_input.value === ''){
//         oldPassword_error.innerText = 'Please type a password';
//         oldPassword_error.classList.add('error');
//     }
//     else {
//         oldPassword_error.innerText = '';
//         oldPassword_error.classList.add('error');
//     }

//     function check_password(password) {
//         const uppercase_list = /[A-Z]/;
//         const lowercase_list = /[a-z]/;
//         const number_list = /[0-9]/;
//         const special_list = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    
//         if (
//             uppercase_list.test(password) &&
//             lowercase_list.test(password) &&
//             number_list.test(password) &&
//             special_list.test(password) 
//         ) {
//             newPassword_error.innerText = '';
//             newPassword_error.classList.add('error');
//         }else {
//             newPassword_error.innerText = 'Password must contain: An uppercase, A lowercase, A number, A special character';
//             newPassword_error.classList.add('error');
//             return;
//         }
//     }
//     if(newPassword_input.value === ''){
//         newPassword_error.innerText = 'Please type a password';
//         newPassword_error.classList.add('error');
//         return;
//     }
//     else if(newPassword_input.value.trim().length < 8){
//         newPassword_error.innerText = 'Password should be at least 8 characters';
//         newPassword_error.classList.add('error');
//     }
//     else{
//         check_password(newPassword_input.value);
//     }
    
//     if(confirm_NewPassword.value === ''){
//         confNewPassword_error.innerText = 'Confirm your password';
//         confNewPassword_error.classList.add('error');
//         return;
//     }else{
//         confNewPassword_error.innerText = '';
//         confNewPassword_error.classList.add('error');
//     }
//     if(confirm_NewPassword.value !== newPassword_input.value){
//         confNewPassword_error.innerText = 'Confirm that your password is the same';
//         confNewPassword_error.classList.add('error');
//     }

//     await fetch(baseurl+`/auth/oldpassword/${email}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ oldpassword })
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);

//         if (item.match == true) {
//             async function patchPassword() {
//                 await fetch(baseurl+`/auth/password-change/${email}`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ newpassword })
//                 })
//                 .then(response => response.json())
//                 .then(item => {
//                     // console.log(item);
//                     if (item.data.success == true) {
//                         alert(item.data.message);
//                         window.location.href = 'learners.html'
//                     } else {
//                         alert("Something went wrong. Couldn't Change Password...");
//                         window.location.href = 'learners.html'
//                     }
//                 })
//             }
//             patchPassword();
//         } else if (item.match == false) {
//             alert("You entered the wrong password!");
//         }
//     })
// }

// async function submitUpdateForm() {
//     var firstname = document.getElementById("update-firstname").value;
//     var lastname = document.getElementById("update-lastname").value;
//     var username = document.getElementById("update-username").value;
//     var email = document.getElementById("update-email").value;
//     var dob = document.getElementById("update-dob").value;
//     var mobile_no = document.getElementById("update-mobile_no").value;
//     var fullState = document.getElementById("update-state").value;
//     // var skill = document.getElementById("update-skill").value;
//     // const pageerror = document.getElementById("pageerror");

//     if((!firstname) || (!lastname) || (!username) || (!email) || (!dob) || (!mobile_no) || (!fullState)) {
//         // pageerror.innerHTML = 'Please fill in your Product\'s details correctly!';
//         // pageerror.classList.add('pageerror');
//         alert('Please fill in your details correctly!')
//         return;
//     }

//     // const form = document.getElementById('UpdateProfileForm');
//     // const formData = new FormData(form);
//     state = fullState.replace(fullState, fullState.slice(0, -9));
//     const bodyData = {firstname, lastname, dob, mobile_no, username, state }

//     await fetch(baseurl+`/learners/update/${localUser_id}`, {
//         method: 'PATCH',
//         // body: formData,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( bodyData )
//     })
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         localStorage.setItem("learner_id", data.data.data.learner_id);
//         localStorage.setItem("firstname", data.data.data.firstname);
//         localStorage.setItem("lastname", data.data.data.lastname);
//         localStorage.setItem("username", data.data.newUsername.username);
//         localStorage.setItem("state", data.data.data.state);
//         localStorage.setItem("dob", data.data.data.dob);
//         localStorage.setItem("mobile_no", data.data.data.mobile_no);
//         localStorage.setItem("skill", data.data.data.skill);
//         localStorage.setItem("img_url", data.data.data.img_url);
//         localStorage.setItem("gender", data.data.data.gender)


//         if (data.data.success == true) {
//             alert(`${data.data.message}`);
//             window.location = 'learners.html'
//             // pageerror.innerHTML = 'Details Updated successfully!';
//             // pageerror.classList.add('pagevalid');
//         } else if(data.success == false) {
//             alert(`${data.data.message}`)
//             // pageerror.innerHTML = 'Failed to Update Details! Please try again.';
//             // pageerror.classList.add('pageerror');
//         } else {
//             alert(`Something went wrong. Please try again later!`)
//             // pageerror.innerHTML = 'Error adding Details.';
//             // pageerror.classList.add('pageerror');
//         }
//     })
// }


async function deleteaccount() {
    localStorage.removeItem('username');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token');
    localStorage.removeItem('updatetoken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('learner_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('state');
    localStorage.removeItem('dob');
    localStorage.removeItem('gender');
    localStorage.removeItem('mobile_no');
    localStorage.removeItem('skill');
    localStorage.removeItem('img_url');

    await fetch(baseurl+`/auth/delete-account/${email}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.success == true) {
            alert("Account Deleted Successfully")
        } else {
            alert("Failed to Delete Account")
        }
    })
    window.location = "index.html";
}



//          ADDING A PRODUCT
// const localLearner_id = localStorage.getItem("learer_id");

async function submitAddCustomersForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value; 
    var gender = document.getElementById("gender").value;
    var contact = document.getElementById("contact").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;

    if((!name) || (!email) || (!gender) || (!contact) || (!city) || (!country)) {
        alert('please fill the form correctly. Empty fields are not allowed')
        return;
    }

    await fetch(baseurl+`/auth/add-customer/${user_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, gender, contact, city, country })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        setTimeout(function() {                  
            if (data.data.success == true) {
                alert(`${data.data.message}`)
                window.location = 'user.html';
            } else if(data.success == false) {
                alert(`Customer could not be added try again...`)
            } else {
                alert('Something went wrong! Try again later!!!')
            }
        }, 1000);
    })
}

async function displayCustomers() {
    const customers_display_div = document.getElementById("customers_display_div");
    const customers_total = document.getElementById("customers_total");
    
    await fetch(baseurl+`/auth/customers/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.success == true) {
            customers_display_div.innerHTML = ``;
            customers_total.innerHTML = `(${item.data.length})`

            for (let i = 0; i < item.data.length; i++) {
                const customer_card = document.createElement("div");
                customer_card.classList.add('admin_person');
                
                customer_card.innerHTML = `
                    <div class="adm-serial-no">
                        <!-- <p class="writetext">${item.data[i].customer_id} ${i+1}</p> --!>
                        <p class="writetext">${item.data[i].customer_id}</p>
                    </div>
                    <div class="adm-img-name">
                        <p class="writetext">${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-img-name">
                        <p class="writetext">${item.data[i].email.replace(item.data[i].email[0], item.data[i].email[0].toLowerCase())}</p>
                    </div>
                    <div class="adm-location nonebig">
                        <p class="writetext">${item.data[i].contact}</p>
                    </div>
                    <div class="adm-status nonebig">
                        <p class="writetext"> ${item.data[i].country.replace(item.data[i].country[0], item.data[i].country[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-location nonebig">
                        <p class="writetext"> ${item.data[i].gender.replace(item.data[i].gender, item.data[i].gender[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-action">
                        <div class="edit"><p class="writetext" onclick="toggleContent(3)">Edit</p></div>
                        <div class="del"><p class="writetext" onclick="toggleContent(4)">Del</p></div>
                    </div>`
                customers_display_div.appendChild(customer_card);
            }
        return;
        }
    })
}

async function searchCustomer() {
    const customers_display_div = document.getElementById("customers_display_div");
    const customers_total = document.getElementById("customers_total");
    const anysearch = document.getElementById("anysearch").value;
    if (anysearch == '') {
        displayCustomers();
    }
    
    await fetch(baseurl+`/auth/users/any/${anysearch}/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.success == true) {
            customers_display_div.innerHTML = ``;
            // customers_total.innerHTML = `(${item.data[i].user_id.length})`

           
            for (let i = 0; i < item.data.length; i++) {
                const customer_card = document.createElement("div");
                customer_card.classList.add('admin_person');

                if (item.data[i].user_id == user_id) {
                    customer_card.innerHTML = `
                    <div class="adm-serial-no">
                        <p class="writetext">${item.data[i].customer_id}</p>
                    </div>
                    <div class="adm-img-name">
                        <p class="writetext">${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-img-name">
                        <p class="writetext">${item.data[i].email.replace(item.data[i].email[0], item.data[i].email[0].toLowerCase())}</p>
                    </div>
                    <div class="adm-location nonebig">
                        <p class="writetext">${item.data[i].contact}</p>
                    </div>
                    <div class="adm-status nonebig">
                        <p class="writetext"> ${item.data[i].country.replace(item.data[i].country[0], item.data[i].country[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-location nonebig">
                        <p class="writetext"> ${item.data[i].gender.replace(item.data[i].gender, item.data[i].gender[0].toUpperCase())}</p>
                    </div>
                    <div class="adm-action">
                        <div class="edit"><p class="writetext" onclick="toggleContent(3)">Edit</p></div>
                        <div class="del"><p class="writetext" onclick="toggleContent(4)">Del</p></div>
                    </div>`
                customers_display_div.appendChild(customer_card);
                } else {
                    continue;
                }
            }
        return;
        }
    })
    .catch (err => {
        alert("No Information Available");
    })
}
displayCustomers();



async function deleteMyProductPopUp() {
    const del_customerid = document.getElementById("delete_search").value;
    // alert(del_customerid);

    await fetch(baseurl+`/auth/delete-customer/${del_customerid}/${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.data.success == true) {
            alert('Customer deleted successfully!!!');
            window.location.href = 'user.html';
            window.location.href = 'user.html#content3';
        } else if (item.data.success == false) {
            alert('Customer wasnt Deleted!!!');
            window.location.href = 'user.html';
            window.location.href = 'user.html#content3';
        } else if(!item) {
            alert('Something went wrong!!!');
        }
    })
    return;
};


localStorage.removeItem("editProduct_id")


async function findDelCustomer() {
    const delete_search = document.getElementById("delete_search").value;
    const del_customerName = document.getElementById("del_customerName");
    const del_customerEmail = document.getElementById("del_customerEmail");
    
    await fetch(baseurl+`/auth/users/id/${delete_search}/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.data.length == 0) {
            del_customerName.value = ``;            
            del_customerEmail.value = ``;
        }
        if (item.success == true) {
            del_customerName.value = `${item.data[0].name}`;            
            del_customerEmail.value = `${item.data[0].email}`;            
        }
    })
    .catch (err => {
        // console.log("No Information Available");
    })
}

async function findUpdateCustomer() {
    const update_search = document.getElementById("update_search").value;
    const update_name = document.getElementById("update_name");
    const update_gender = document.getElementById("update_gender");
    const update_city = document.getElementById("update_city");
    const update_email = document.getElementById("update_email");
    const update_contact = document.getElementById("update_contact");
    const update_country = document.getElementById("update_country");
    
    await fetch(baseurl+`/auth/users/id/${update_search}/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.data.length == 0) {
            update_name.value = ``;            
            update_email.value = ``;
            update_gender.value = ``;
            update_contact.value = ``;
            update_city.value = ``;
            update_country.value = ``;
        }
        if (item.success == true) {
            update_name.value = `${item.data[0].name}`;            
            update_email.value = `${item.data[0].email}`;
            update_gender.value = `${item.data[0].gender}`;
            update_contact.value = `${item.data[0].contact}`;
            update_city.value = `${item.data[0].city}`;
            update_country.value = `${item.data[0].country}`;
        }
    })
    .catch (err => {
        // console.log("No Information Available");
    })
}


async function UpdateCustomerInfo() {
    const update_search = document.getElementById("update_search").value;
    const name = document.getElementById("update_name").value;
    const gender = document.getElementById("update_gender").value;
    const city = document.getElementById("update_city").value;
    const email = document.getElementById("update_email").value;
    const contact = document.getElementById("update_contact").value;
    const country = document.getElementById("update_country").value;
    console.log( name, gender, city, email, contact, country );

    await fetch(baseurl+`/auth/update-customer/${update_search}/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gender, city, email, contact, country })
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
    
        if (item.data.success == true) {
            alert("Customer Updated Successfully!!");
            window.location = 'user.html';
        } else {
            alert("Failed to update Customer!!. Try Again!")
        }
    })
    .catch (err => {
        console.log("No Information Available");
    })
}