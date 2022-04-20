 const createFooter = () => {
     let footer = document.querySelector('footer');

     footer.innerHTML =
         '\
        <p class="footer-title">Об компании</p>\
        <p class="info">Maecenas mollis ligula diam, a tincidunt ligula rutrum non. In hac habitasse platea dictumst. Mauris placerat neque vulputate viverra pulvinar. In non turpis id est dapibus fermentum. Cras eros lectus, imperdiet eget maximus eget, vestibulum ultrices leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin ut arcu ac lorem dictum fermentum sit amet hendrerit lorem. Donec in volutpat nunc. Maecenas lacinia eros condimentum mi commodo commodo. Proin eget mi eget ligula dignissim ultricies finibus id purus</p>\
        <p class="info">Обратная свзяь - support@Rake.ru</p>\
        <p class="info">Телефон - +7(999)999-99-99</p>\
        <div class="footer-social-container">\
            <div>\
                <a href="/policy" class="social-link">Политика конфиденциальности</a>\
                <a href="/UA" class="social-link">Пользовательское соглашение</a>\
                <a href="/seller" class="social-link">Стать продавцом</a>\
                <a href="/" class="social-link">На главную</a>\
            </div>\
        </div>\
    ';
 }
 createFooter();