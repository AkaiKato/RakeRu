let openEditor;

const createProduct = (data) => {

    openEditor = () => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = '/add-product/' + data.name;
    }

    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += '\
    <div class="product-card">\
        <div class="product-image">\
            <img src="' + data.img + '" class="product-thumb" alt="">\
            <button class="card-action-btn edit-btn" onclick="openEditor()"><img src="img/edit.png" alt=""></img></button>\
            <button class="card-action-btn delete-popup-btn" onclick="deleteBtnClick(' + "'" + data.name + "'" + ')"><img src="img/delete.png" alt=""></img></button>\
        </div>\
        <div class="product-info">\
            <h2 class="product-brand">' + data.name + '</h2>\
            <span class="price">' + data.sellPrice + '</span><span class="actual-price">' + data.actualPrice + '</span>\
        </div>\
    </div> \
    ';
}

const deleteBtnClick = (named) => {
    var getName = { name: named }
    $.post("/del-product", getName, function(response) {
        location.reload();
    })
}