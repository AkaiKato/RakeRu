const setData = (data) => {
    console.log(data);
    const name = document.querySelector('.product-brand');
    const price = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');
    const totalLength = document.querySelector('#total-length');
    const width = document.querySelector('#width');
    const cuttingMaterial = document.querySelector('#cutting-material');
    const materialWorkingPart = document.querySelector('#material-working-part');
    const lengthWorkingPart = document.querySelector('#length-working-part');


    name.innerHTML = data.map(data => data.name);
    price.innerHTML = data.map(data => data.sellPrice);
    actualPrice.innerHTML = data.map(data => data.actualPrice);
    discount.innerHTML = "(Скидка " + data.map(data => data.discount) + "%)";
    totalLength.innerHTML = data.map(data => data.totalLength);
    width.innerHTML = data.map(data => data.width);
    cuttingMaterial.innerHTML = data.map(data => data.cuttingMaterial);
    materialWorkingPart.innerHTML = data.map(data => data.materialWorkingPart);
    lengthWorkingPart.innerHTML = data.map(data => data.lengthWorkingPart);

    $("#prew").attr('src', data.map(data => data.img));
}

let productName = null;

if (location.pathname != '/product') {
    productName = decodeURI(location.pathname.split('/').pop());
    var findPr = { name: productName }
    $.post('/get-product-one', findPr, function(response) {
        setData(response);
    })
}