import Product from "./Product";
import PlantFactory from "./PlantFactory";

function ProductList(bag){
    let arr = [];
    let plantFactory = new PlantFactory();

    // for(let i = 0; i < list.length; i++){
    //     arr.addItem(list[i]);
    // }

    arr.addItem = function (item) {
        this.push(new Product(
            plantFactory.create(item),
            item.price,
            item.category,

            ((collection) => function(){
                collection.removeItem(this); // "this" refers to the LibraryItem
            })(this),

            ((collection) => function () {
                collection.addToCart(this);
            })(bag),
        ));

        return this;
    }

    return arr;
}

export default ProductList;
