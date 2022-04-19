let user = JSON.parse(sessionStorage.user || null)

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount')
const sellingPrice = document.querySelector('#sell-price')

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90;
    }
    let discount = actualPrice.value * discountPercentage.value / 100;
    sellingPrice.value = actualPrice.value - discount;
})

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})


function previewFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        console.log(reader)
    }
}


$("#add-btn").on('click', function() {
    if (!$("#product-name").val().length || !$("#total-length").val().length ||
        !$("#width").val().length || !$("#cutting-material").val().length ||
        !$("#material-working-part").val().length || !$("#length-working-part").val().length ||
        !$("#actual-price").val().length || !$("#discount").val().length ||
        !$("#sell-price").val().length) {
        showAlert('Заполните все поля!');
    } else {
        //console.log($("#preview").attr('src'));
        var newProduct = {
            name: $("#product-name").val(),
            img: $("#preview").attr('src'),
            totalLength: $("#total-length").val(),
            width: $("#width").val(),
            cuttingMaterial: $("#cutting-material").val(),
            materialWorkingPart: $("#material-working-part").val(),
            lengthWorkingPart: $("#length-working-part").val(),
            actualPrice: $("#actual-price").val(),
            discount: $("#discount").val(),
            sellPrice: $("#sell-price").val(),
            email: user.map(user => user.email)
        }
        $.post('/add-product', newProduct, function(response) {
            processData(response);
        })
    }
})

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    //sessionStorage.user = JSON.stringify(data);
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