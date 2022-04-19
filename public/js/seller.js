const becomeSellerElement = document.querySelector('.become-seller');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
// const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (!user.map(user => user.seller)) {
            becomeSellerElement.classList.remove('hide');
        } else {
            productListingElement.classList.remove('hide');
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
    }
})

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    sessionStorage.user = JSON.stringify(data);
    // location.replace('/');
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