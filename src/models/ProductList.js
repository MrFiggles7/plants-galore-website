import Product from "./Product";
import PlantFactory from "./PlantFactory";

function ProductList(){
    let arr = [];
    let plantFactory = new PlantFactory();

    // for(let i = 0; i < list.length; i++){
    //     arr.addItem(list[i]);
    // }


    arr.addItem = function (item, uid) {
        this.push(new Product(
            plantFactory.create(item),
            uid,
            item.price,
            item.category,
        ));

        return this;
    }

    return arr;
}

export default ProductList;
