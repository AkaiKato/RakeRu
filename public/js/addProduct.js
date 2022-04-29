let user = JSON.parse(sessionStorage.user || null)
let id;

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
    }
}


$("#add-btn").on('click', function() {
    if (!$("#product-name").val().length || !$("#total-length").val().length ||
        !$("#width").val().length || !$("#cutting-material").val().length ||
        !$("#material-working-part").val().length || !$("#length-working-part").val().length ||
        !$("#actual-price").val().length || !$("#discount").val().length ||
        !$("#sell-price").val().length) {
        console.log($("#type_list option:selected").text());
        showAlert('Заполните все поля!');
    } else {
        if (location.pathname != '/add-product') {
            var changeProduct = {
                id: id,
                name: $("#product-name").val().toLowerCase(),
                type: $("#type_list option:selected").text(),
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
            $.post('/add-product-change', changeProduct, function(response) {
                processData(response);
            })
        } else {
            var newProduct = {
                name: $("#product-name").val().toLowerCase(),
                type: $("#type_list option:selected").text(),
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
    }
})

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    location.replace('/seller');
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

const setForm = (data) => {
    console.log(data.map(data => data._id));
    id = data.map(data => data._id);
    $("#product-name").val(data.map(data => data.name));
    $("#type_list").val(data.map(data => data.type));
    $("#total-length").val(data.map(data => data.totalLength));
    $("#width").val(data.map(data => data.width));
    $("#cutting-material").val(data.map(data => data.cuttingMaterial));
    $("#material-working-part").val(data.map(data => data.materialWorkingPart));
    $("#length-working-part").val(data.map(data => data.lengthWorkingPart));
    $("#actual-price").val(data.map(data => data.actualPrice));
    $("#discount").val(data.map(data => data.discount));
    $("#sell-price").val(data.map(data => data.sellPrice));
    $("#preview").attr('src', data.map(data => data.img));
}

let productName = null;

if (location.pathname != '/add-product') {
    productName = decodeURI(location.pathname.split('/').pop());

    delete sessionStorage.tempProduct;
    var getPr = {
        email: user.map(user => user.email),
        name: productName
    }
    $.post('/get-product-change', getPr, function(response) {
        setForm(response);
    })

}