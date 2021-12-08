import {db} from "./FirebaseContext";

function Product(item, uid, price, category, remove, addToCart, trash) {

    item.uid = uid;
    item.price = price;
    item.show = false;
    item.qty = 0;
    item.category = category;

    item.remove = remove || function(){};
    item.addToCart = addToCart || function(){}
    item.trashItem = trash || function(){}

    item.isInCart = function (user) {
        db.collection('users').doc(user.uid)
            .collection('cart').doc(item.uid).get()
            .then((doc) => {
                if(doc.exists){
                    return true
                }
                else{
                    return false
                }
            })
    }

    return item;
}

export default Product;
