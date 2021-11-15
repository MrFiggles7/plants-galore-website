function Product(item, price, category, remove, addToCart) {

    item.price = price;
    item.show = false;
    item.qty = 0;
    item.category = category;

    item.remove = remove || function(){};
    item.addToCart = addToCart || function(){}

    return item;
}

export default Product;
