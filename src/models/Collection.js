import ProductList from "./ProductList";
import Cart from "./Cart";

function Collection(){
    this.__proto__ = [];
    this.length = 0;

    this.cart = new Cart();

    this.productList = new ProductList(this.cart);

    return this;
}

export default Collection;
