<template>
    <v-app id="inspire" class="basil ma-0 pa-0 fill-height">
        <div class="container">
            <header-bar :user="user" @signOut="SignOut"></header-bar>
        </div>

        <div class="container--fluid fill-height"
        >
            <router-view :list="productList"
                         :user="user"
                         @signOut="SignOut"

            ></router-view>
        </div>

    </v-app>
</template>

<script>
    import HeaderBar from './components/layout/header-bar'
    import {db} from "./models/FirebaseContext";
    import firebase from "firebase/compat";
    import User from "./models/User";
    // import ProductList from "./models/ProductList";

    export default {
        name: 'App',

        data: function () {

            return {
                tab: null,
                showPage: true,

                user: new User(firebase.auth().currentUser),

                productList: [],
            }
        },


        created() {
            // var vm = this

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    this.user = new User(user);
                    // db.collection('users')
                    //     .doc(this.user.uid).collection('cart')
                    //     .onSnapshot((querySnapshot)=>{
                    //         querySnapshot.forEach((doc)=>{
                    //             this.user.cart.push(doc.data())
                    //         })
                    //     })
                    this.$bind('user.cart', db.collection('users').doc(this.user.uid).collection('cart'))
                    // ...
                } else {
                    // User is signed out
                    // ..
                    this.user.signInAnon();
                    this.user = new User(firebase.auth().currentUser);

                }
            });

            // db.collection('products')
            //     .onSnapshot(function (querySnapshot) {
            //         querySnapshot.forEach(function (doc) {
            //             vm.productList.addItem(doc.data(), doc.id)
            //         })
            //     })
        },

        components: {
            HeaderBar
        },

        firestore: {
            productList: db.collection('products')
        },

        methods: {
            SignOut() {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    // this.user = new User(firebase.auth().currentUser);
                }).catch((error) => {
                    // An error happened.
                    console.log(error)
                });
            },

            // getData: async function () {
            //     var temp = await db.collection('products');
            //
            //     return temp;
            // },
            //
            // addToDatabase: function (list) {
            //     for (var i = 0; i < list.length; i++) {
            //
            //         this.db.context.collection('products')
            //             .add((JSON.parse(JSON.stringify(list[i]))))
            //             .then((docRef) => {
            //                 console.log('Added', docRef)
            //             })
            //     }
            // },

            // addToShoppingCart: function (item) {
            //     for (var i = 0; i < this.shoppingCart.length; i++) {
            //
            //         if (this.shoppingCart[i] == item) {
            //             item.qty++;
            //             return true;
            //         }
            //     }
            //     item.qty++;
            //     this.shoppingCart.push(item);
            // },
            //
            // removeFromShoppingCart: function (item) {
            //     if (item.qty > 1) {
            //         item.qty--;
            //     } else {
            //         this.shoppingCart.splice(this.shoppingCart.indexOf(item), 1);
            //     }
            // },
            //
            // trashItem: function (item) {
            //     item.qty = 0;
            //     this.shoppingCart.splice(this.shoppingCart.indexOf(item), 1);
            // }
        },


    };
</script>

<style lang="scss">
    /*# sourceMappingURL=main.css.map */
    @import "../public/sass/abstract/base";
    @import "../public/sass/abstract/typography";
    @import "../public/sass/abstract/variables";

    @import "../public/sass/layout/basil";

    @import "../public/sass/components/btn";

</style>
