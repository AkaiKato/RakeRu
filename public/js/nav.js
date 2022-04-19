const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = '<div class="nav">  <img src="img/RakeRU.jpg" class="brand-logo" alt="best logo"> <div class="nav-items"><div class="search"> <input type="text" class="search-box" placeholder="ищите бренд, товар"><button class="search-btn">Поиск</button></div><a><img src="img/profile.png" id="user-img" alt="cool user icon"><div class="login-logout-popup hide"><p class="account-info">Вы вошли как, name</p><button class="btn" id="user-btn">Выйти</button></div></a><a href="#"><img src="img/shoppingCart.png" alt="cool shoppingCart icon"></a></div></div><ul class="links-container"> <li class="link-item"><a href="#" class="link">Главная</a></li> <li class="link-item"><a href="#" class="link">Лопаты</a></li><li class="link-item"><a href="#" class="link">Топоры</a></li><li class="link-item"><a href="#" class="link">Грабли</a></li><li class="link-item"><a href="#" class="link">Вилы</a></li></ul>';
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
    let user = JSON.parse(sessionStorage.user || null)
    if (user != null) {
        popuptext.innerHTML = 'Вы вошли как, ' + user.map(user => user.name);
        actionBtn.innerHTML = 'Выйти';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        popuptext.innerHTML = 'Войдите чтобы сделать заказ';
        actionBtn.innerHTML = 'Войти';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}