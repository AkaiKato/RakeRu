$(".submit-btn").on("click", function() {
    if ($("#name").val() != null) { //signup
        var newUser = { name: $("#name").val(), email: $("#email").val(), password: $("#password").val(), UA: $("#user-agreement").is(":checked"), seller: false }
        $.post("/signup", newUser, function(response) {
            processData(response);
        })
    } else {
        var checkUser = { email: $("#email").val(), password: $("#password").val() }
        $.post("/login", checkUser, function(response) {
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
    location.replace('/');
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