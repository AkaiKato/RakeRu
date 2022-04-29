changeHeading = (text) => {
    $(".heading").text("");
    var $span = $("<span>").text(text);
    $(".heading").append($span);
}

changeHeadingSearch = (text) => {
    $(".heading").text("Результат по запросу ");
    var $span = $("<span>").text(text);
    $(".heading").append($span);
}

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    location.replace('/seller');
}

findForSearch = (text) => {
    var findPr = { name: text }
    $.post('/get-product-name', findPr, function(response) {
        if (response.alertNP) {
            let emptySvg = document.querySelector('.no-product-image');
            emptySvg.classList.remove('hide')
            return;
        }
        response.forEach(product => createProductIndex(product))
    })
}

if (location.pathname != '/search') {
    productType = decodeURI(location.pathname.split('/').pop());
    if (productType == "shovels") {
        productType = "Лопата";
    } else if (productType == "axes") {
        productType = "Топор";
    } else if (productType == "rakes") {
        productType = "Грабли";
    } else if (productType == "forks") {
        productType = "Вилы";
    }
    changeHeading(productType)
    var findPr = { type: productType }
    $.post('/get-product-type', findPr, function(response) {
        response.forEach(product => createProductIndex(product))
    })
} else {
    var text = localStorage.getItem("find");
    changeHeadingSearch(text)
    findForSearch(text)
}