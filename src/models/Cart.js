import Product from "./Product";

function Cart(){
    this.__proto__ = [];
    this.length = 0;

    this.addToCart = function(item){
        for (var i = 0; i < this.length; i++) {

            if (this[i] === item) {
                item.qty++;
                return true;
            }
        }

        console.log('pushed', item);

        this.push(new Product(
            item,
            item.price,
            item.category,

            ((collection) => function () {
                collection.removeItem(this);
            })(this),

            ((collection) => function () {
                collection.addToCart(this);
            })(this),
        ));
        item.qty++;

        return this;
    }
}

export default Cart;
