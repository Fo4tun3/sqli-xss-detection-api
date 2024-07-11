const nav_btns = document.getElementById("nav_btns");
const hello_msg = document.getElementById("hello_msg");
const token = localStorage.getItem("token");
const localusername = localStorage.getItem("username");
if (token) {
    document.getElementById("username").innerHTML = `${localusername.replace(localusername[0], localusername[0].toUpperCase())}`;
    const nav_link = document.getElementById("nav_links_list_item");
    nav_link.innerHTML = `DASHBOARD`;
    nav_link.addEventListener('click', () => {
        gotoDaskboard();
    })
    const nav_slide = document.getElementById("nav_slide_item");
    nav_slide.innerHTML = `MY DASHBOARD`;
    nav_slide.addEventListener('click', () => {
        gotoDaskboard();
    })
    const nav_action = document.getElementById("nav_action");
    nav_action.innerHTML = `LOGOUT`;
    nav_action.addEventListener('click', () => {
        logout();
    })
    nav_btns.style.display = 'none';
    hello_msg.style.display = 'block';
} else {
    const nav_link = document.getElementById("nav_links_list_item");
    nav_link.innerHTML = `HOME`;
    nav_link.addEventListener('click', () => {
        window.location.href = 'index.html#home';
    })
    const nav_slide = document.getElementById("nav_slide_item");
    nav_slide.innerHTML = `HOME`;
    nav_slide.addEventListener('click', () => {
        window.location.href = 'index.html#home';
    })
    const nav_action = document.getElementById("nav_action");
    nav_action.innerHTML = `LOGIN`;
    nav_action.addEventListener('click', () => {
        window.location.href = 'login.html';
    })
    nav_btns.style.display = 'block';
    hello_msg.style.display = 'none';
}

function logout() {
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
    window.location = "index.html"
}


const baseUrl = 'http://localhost:8888/api/v1'

function color(id) {
    let links = [
        document.querySelector(`#nav_links_list_item`),
        document.querySelector(`#nav_links_list_item1`),
        document.querySelector(`#nav_links_list_item2`),
        document.querySelector(`#nav_links_list_item3`),
        document.querySelector(`#nav_links_list_item4`)
    ]
    links.forEach(link => link.style.color = '#000')
    const nav_links_list_item = document.getElementById(`nav_links_list_item${id}`);
    nav_links_list_item.style.color = '#19205e';
}

function hoverColor() {
    let links = [
        document.querySelector(`#nav_links_list_item`),
        document.querySelector(`#nav_links_list_item${1}`),
        document.querySelector(`#nav_links_list_item${2}`),
        document.querySelector(`#nav_links_list_item${3}`),
        document.querySelector(`#nav_links_list_item${4}`)
    ]
    // links.forEach(link => link.style.color = '#000')
    links.forEach(link => link.addEventListener('hover', () => {
        link.style.color = '#19205e';
    }))
    // const nav_links_list_item = document.getElementById(`nav_links_list_item${id}`);
    // nav_links_list_item.classList.add("color");
    // nav_links_list_item.style.color = '#19205e';
}

const subscriptionEmails_btn = document.getElementById('subscription_emails-btn');


async function displayCart() {
    const allCarts_container = document.getElementById("cart_items");
    const role = localStorage.getItem("user_role");
    const localLearner_id = localStorage.getItem("learner_id")
    const localEntreprenuer_id = localStorage.getItem("entreprenuer_id")
    
    if (role == 'entrepreneur') {
        await fetch(`${baseUrl}/cart/entreprenuer/${localEntreprenuer_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            document.querySelectorAll("#cart_number").forEach(id => id.innerHTML = (item.data.cart_item.length + item.data.cart_product.length));
            document.querySelectorAll("#cart_number-title").forEach(id => id.innerHTML = `Cart items (${item.data.cart_item.length + item.data.cart_product.length})`);
            
            if (item.success == true) {
                allCarts_container.innerHTML = '';

                if (item.data.cart_info.length == 0) {
                    allCarts_container.innerHTML = '<h4 style="padding: 10px 0px; text-align: center;">Your cart basket is empty 😟😔🙁!</h4>';
                    return;
                }
                
                for (let i = 0; i < 2; i++) {
                    const single_item = document.createElement("div");
                    single_item.classList.add('single_item');
                    
                    var imgurl = item.data.cart_info[i].skill_url;
                    single_item.innerHTML = `
                    <div class="cart_item_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="item_desc">
                        <h2 class="text">${item.data.cart_info[i].name.replace(item.data.cart_info[i].name[0], item.data.cart_info[i].name[0].toUpperCase())}</h2>
                        <p class="text">${item.data.cart_info[i].location.replace(item.data.cart_info[i].location[0], item.data.cart_info[i].location[0].toUpperCase())}</p>
                        <p class="text">${item.data.cart_info[i].period}</p>
                        <h4 class="text price">₦${item.data.cart_info[i].price}</h4>
                        <div class="item_btns">
                            <button class="text">Book</button>
                            <div class="del">
                                <button id="del_btn" onclick = "deleteCart(${item.data.cart_info[i].cart_id})"><img src="assets/images/icons/delete2.png" alt=""></button>
                            </div>
                        </div>
                    </div>`
                    allCarts_container.appendChild(single_item);
                }
            return;
            }
        })
    } else if (role == 'learner') {
        await fetch(`${baseUrl}/cart/learner/${localLearner_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            document.querySelectorAll("#cart_number").forEach(id => id.innerHTML = (item.data.cart_item.length + item.data.cart_product.length));
            document.querySelectorAll("#cart_number-title").forEach(id => id.innerHTML = `Cart items (${item.data.cart_item.length + item.data.cart_product.length})`);
    
            if (item.success == true) {
                allCarts_container.innerHTML = '';

                if (item.data.cart_info.length == 0) {
                    allCarts_container.innerHTML = '<h4 style="padding: 10px 0px; text-align: center;">Your cart basket is empty 😟😔🙁!</h4>';
                    return;
                }

                for (let i = 0; i < 2; i++) {
                    const single_item = document.createElement("div");
                    single_item.classList.add('single_item');
                    
                    var imgurl = item.data.cart_info[i].skill_url;
                    single_item.innerHTML = `
                    <div class="cart_item_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="item_desc">
                        <h2 class="text">${item.data.cart_info[i].name.replace(item.data.cart_info[i].name[0], item.data.cart_info[i].name[0].toUpperCase())}</h2>
                        <p class="text">${item.data.cart_info[i].location.replace(item.data.cart_info[i].location[0], item.data.cart_info[i].location[0].toUpperCase())}</p>
                        <p class="text">${item.data.cart_info[i].period}</p>
                        <h4 class="text price">₦${item.data.cart_info[i].price}</h4>
                        <div class="item_btns">
                            <button class="text">Book</button>
                            <div class="del">
                                <button id="del_btn" onclick = "deleteCart(${item.data.cart_info[i].cart_id})"><img src="assets/images/icons/delete2.png"></button>
                            </div>
                        </div>
                    </div>`
                    allCarts_container.appendChild(single_item);
                }
            return;
            }
        })
    }
}

function deleteCart(cart_id) {
    const del_btn = document.querySelectorAll("#del_btn");
    del_btn.forEach(btn => btn.addEventListener('click', async () => {
        await fetch(baseUrl+`/cart/delete/${cart_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            if (item.data.success == true) {
                alert('Cart item deleted successfully!!!');
                window.location.href = '';
            } else if(!item) {
                alert('Something went wrong!!!');
            }
        })
        return;
    }))
}


async function submitEmail() {
    const email = document.getElementById('subscription_emails').value;
    const errorMessage = document.getElementById('error');

    if((!email)) {
        errorMessage.innerHTML = 'Please fill in your details!';
        errorMessage.classList.add('pageerror');
        return; 
    }
    
    await fetch(baseUrl+'/subscribed-emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.data.success == true) {
            errorMessage.innerHTML = `${data.data.message}`;
            errorMessage.classList.add('valid');
        } else if (data.data.success == false) {
            errorMessage.innerHTML = `${data.data.message}`;
            errorMessage.classList.add('pageerror');
        } else {
            errorMessage.innerHTML = 'Please fill in your details!';
            errorMessage.classList.add('pageerror');
        }
    });
}


async function searchSkills() {
    const search = document.getElementById("search").value;
    console.log(search);
    localStorage.setItem("searchvalue", search);
    window.location.href = 'skills-display.html';
}


function gotoDaskboard() {
    const token = localStorage.getItem("token");
    const user_role = localStorage.getItem("user_role");
    if(token) {
        if (user_role == 'admin') {
            window.location = "admin.html";
        } else if(user_role == 'user') {
            window.location = "user.html";
        } 
        else if(user_role == 'administrator') {
            window.location = "admin.html";
        }
    } else {
        window.location = "login.html";
    }
}


// async function getAnalytics() {
//     const users = document.querySelectorAll("#users");
//     const entrepreneurs = document.getElementById("entrepreneurs");
//     const skills = document.getElementById("skills");
//     const products = document.getElementById("products");
//     const mentors = document.getElementById("mentors");
    
//     await fetch(`${baseUrl}/auth/users`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);
//         if (item.success == true) {
//             users.forEach(user => user.innerHTML = `${item.data.length}+`)
//         return;
//         }
//     })

//     await fetch(`${baseUrl}/entreprenuers/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);
//         if (item.success == true) {
//             entrepreneurs.innerHTML = `${item.data.length}+`
//         return;
//         }
//     })

//     await fetch(`${baseUrl}/skills/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);
//         if (item.success == true) {
//             skills.innerHTML = `${item.data.length}+`
//         return;
//         }
//     })

//     await fetch(`${baseUrl}/products/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);
//         if (item.success == true) {
//             products.innerHTML = `${item.data.length}+`
//         return;
//         }
//     })

//     await fetch(`${baseUrl}/learners/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(item => {
//         // console.log(item);
//         if (item.success == true) {
//             mentors.innerHTML = `${item.data.length}+`
//         return;
//         }
//     })
// }

function hambugger() {
    const li = document.querySelector(".nav_links");
    const hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener('click', (e) => {
        if (li.style.display == 'block') {
            li.style.display = 'none';
                if (e.target !== li) {
                    li.style.display = 'none';
                } else {
                    li.style.display = 'block';
                }
        } else {
            li.style.display = 'block';
            localStorage.setItem("click", 0)
        }
    })
}

const li = document.querySelector(".nav_links");
