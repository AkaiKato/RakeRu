const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = '<div class="nav">  <img src="img/RakeRU.jpg" class="brand-logo" alt="best logo"> <div class="nav-items"><div class="search"> <input type="text" class="search-box" placeholder="ищите бренд, товар"><button class="search-btn">Поиск</button></div><a href="#"><img src="img/profile.png" alt="cool user icon"></a><a href="#"><img src="img/shoppingCart.png" alt="cool shoppingCart icon"></a></div></div><ul class="links-container"> <li class="link-item"><a href="#" class="link">Главная</a></li> <li class="link-item"><a href="#" class="link">Лопаты</a></li><li class="link-item"><a href="#" class="link">Топоры</a></li><li class="link-item"><a href="#" class="link">Грабли</a></li><li class="link-item"><a href="#" class="link">Вилы</a></li><li class="link-item"><a href="#" class="link">Буры садовые</a></li></ul>';
}

createNav();