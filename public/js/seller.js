const becomeSellerElement = document.querySelector('.become-seller');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');

window.onload = () => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (user.map(user => user.seller) == 'false') {
            becomeSellerElement.classList.remove('hide');
        } else {
            productListingElement.classList.remove('hide');
            setupProducts();
        }

    } else {
        location.replace('/login')
    }
}

$("#apply-btn").on("click", function() {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

const UA = document.querySelector('#user-agreement')

$("#apply-form-btn").on('click', function() {
    if (!$("#business-name").val().length || !$("#business-add").val().length || !$("#about").val().length) {
        showAlert('Заполните все поля!');
    } else if (!UA.checked) {
        showAlert('Согласитесь с пользовательским соглашением!');
    } else {
        const em = JSON.parse(sessionStorage.user)
        var newSeller = { name: $("#business-name").val(), adress: $("#business-add").val(), about: $("#about").val(), UA: $("#user-agreement").is(":checked"), email: em.map(em => em.email) }
        $.post("/seller", newSeller, function(response) {
            processData(response);
        })

        var newSes = { name: em.map(em => em.name), email: em.map(em => em.email) }
        sessionStorage.clear();
        $.post("/login", newSes, function(response) {
            sessionStorage.user = JSON.stringify(response);
        })
    }
})

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
}

const showAlert = (msg) => {
    var alertBox = document.querySelector('.alert-box');
    var alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

const setupProducts = () => {
    let userEmail = JSON.parse(sessionStorage.user);
    var getProducts = { email: userEmail.map(userEmail => userEmail.email) }
    $.post("/get-product", getProducts, function(response) {
        processData(response);
        productListingElement.classList.remove('hide');
        if (response.alertNP) {
            let emptySvg = document.querySelector('.no-product-image');
            emptySvg.classList.remove('hide')
        } else {
            response.forEach(product => createProduct(product))
        }
    })
}