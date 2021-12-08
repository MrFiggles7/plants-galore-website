import Product from "./Product";

function Cart(cart){
    let arr = cart || [];

    arr.addToCart = function(item){
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

            ((collection) => function () {
                collection.trashItem(this);
            })(this),
        ));
        item.qty++;

        return this;
    }

    arr.removeItem = function(item){
        for (var i = 0; i < this.length; i++) {

            if (this[i] === item) {
                if(item.qty > 1){
                    item.qty--;
                    return true;
                }
                else{
                    arr.trashItem(item)
                }

            }
        }

        console.log('removed', item);

        return this;
    }

    arr.trashItem = function(item){
        for (var i = 0; i < this.length; i++) {

            if (this[i] === item) {
                item.qty = 0;
                arr.splice(this[i], 1);
                return true;
            }
        }

        console.log('trashed', item);

        return this;
    }

    return arr;
}

export default Cart;
