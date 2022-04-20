const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = '\
    <div class="nav">  \
        <img src="../img/RakeRU.jpg" class="brand-logo" alt="best logo"> \
        <div class="nav-items">\
            <a><img src="../img/profile.png" id="user-img" alt="cool user icon">\
            <div class="login-logout-popup hide">\
                <p class="account-info">Вы вошли как, name</p>\
                <button class="btn" id="user-btn">Выйти</button>\
            </div>\
            </a>\
            \
        </div>\
    </div>\
   ';
}


createNav();

const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

window.onload = () => {
    setupProducts();
    let user = JSON.parse(sessionStorage.user || null)
    if (user != null) {
        popuptext.innerHTML = 'Вы вошли как, ' + user.map(user => user.name);
        actionBtn.innerHTML = 'Выйти';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        popuptext.innerHTML = 'Войдите чтобы иметь возможность стать продавцом';
        actionBtn.innerHTML = 'Войти';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}

const setupProducts = () => {
    var getProducts = { name: 'all' }
    $.post("/get-product-all", getProducts, function(response) {
        response.forEach(product => createProductIndex(product))
    })
}