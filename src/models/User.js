// import Cart from "./Cart";
import firebase from "firebase/compat";
import {db} from "./FirebaseContext";

import AlreadyLoggedIn from "./AlreadyLoggedIn";

function User(user) {
    var provider = new firebase.auth.GoogleAuthProvider();
    user = user ?? {};

    user.cart = [];

    user.role = 'anonymous';

    // user.displayName = '';

    // if(user.uid){
    //     db.collection('users').doc(user.uid).get()
    //         .then((doc)=>{
    //             user.displayName = doc.data().displayName
    //         })
    // }

    if(user.uid){
        db.collection('users').doc(user.uid).get()
            .then((doc)=>{
                user.role = doc.data().role
            })
    }



    // user.anon = true;
    //
    // user.isAnon = function () {
    //     if(user?.isAnonymous){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
    // };

    // user.cart = new Cart(
    //     // db.collection('users').doc(user.uid)
    //     //     .collection('cart')
    // );

    // user.addToCart = function (item) {
    //     user.cart.addToCart(item)
    // }

    user.isCustomer = function(){
        if(user.isLoggedIn() && user.role === 'customer'){
            return true;
        }
        else{
            return false;
        }
    }

    user.isAdmin = function(){
        if(user.isLoggedIn() && user.role === 'admin'){
            return true;
        }
        else{
            return false;
        }
    }

    user.isLoggedIn = function () {
        if (user.uid) {
            return true
        } else {
            return false
        }
    }

    user.signInAnon = function () {
        firebase.auth().signInAnonymously()
            .then((result) => {
                var user = result.user;

                db.collection('users').doc(user.uid)
                    .set({
                        displayName: user.displayName,
                        email: user.email,
                        role: 'anonymous'
                    });

            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorCode)
                console.log(errorMessage)
                console.log(email)
                console.log(credential)
                return false;
            })

    }

    user.GoogleSignIn = function () {
        var user = null;
        return firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                user = result.user;
                // ...
                console.log(token)
                console.log(user)
                // this.user = new User(user);

                return db.collection('users').doc(user.uid).get()
                // ...
            })
            .then((doc) => {
                var role = '';
                if (!doc.exists) {
                    role = 'customer'
                } else {
                    if (doc.data().role != null) {
                        role = doc.data().role
                    } else {
                        role = doc.data().role || 'customer'
                    }
                    role = doc.data().role ||  'customer'
                }
                return role;
            }).then((role) => {
                    console.log(role)

                    return db.collection('users').doc(user.uid)
                        .set({
                            displayName: user.displayName,
                            email: user.email,
                            role: role,
                        })
                }
            )
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorCode)
                console.log(errorMessage)
                console.log(email)
                console.log(credential)
                return false;
            });
    };

    user.SignIn = function (email, password) {
        if (firebase.auth().currentUser !== null) {
            firebase.auth().currentUser.providerData.forEach((profile) => {
                console.log('loop')
                if (profile.email === email) {
                    console.log('whatever')

                    throw new AlreadyLoggedIn('User already logged in')
                }

                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        throw new Error(error)
                    })
            })
        }
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                throw new Error(error)
            });

    };

    user.SignOut = function () {
        return firebase.auth().signOut().then(() => {
            // Sign-out successful.
            // this.user = new User(firebase.auth().currentUser);
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    };


    user.addToCart = function (item) {
        db.collection('users').doc(user.uid)
            .collection('cart').doc(item.id).get()
            .then((doc) => {
                if (doc.exists) {
                    db.collection('users').doc(user.uid)
                        .collection('cart').doc(item.id)
                        .update({
                            qty: firebase.firestore.FieldValue.increment(1)
                        })
                        .then(console.log('Qty added'))
                } else {
                    db.collection('users').doc(user.uid)
                        .collection('cart').doc(item.id)
                        .set(JSON.parse(JSON.stringify(item)))
                        .then(console.log('Added to Cart: ' + item))
                        .finally(
                            db.collection('users').doc(user.uid)
                                .collection('cart').doc(item.id)
                                .update({
                                    qty: firebase.firestore.FieldValue.increment(1)
                                })
                                .then(console.log('Qty added'))
                        )
                }
            })
    }

    user.subtractFromCart = function (item) {
        db.collection('users').doc(user.uid)
            .collection('cart').doc(item.id).get()
            .then((doc) => {
                if (doc.exists && doc.data().qty > 1) {
                    db.collection('users').doc(user.uid)
                        .collection('cart').doc(item.id)
                        .update({
                            qty: firebase.firestore.FieldValue.increment(-1)
                        })
                        .then(console.log('Qty subtracted'))
                } else if (doc.exists && doc.data().qty <= 1) {
                    user.deleteFromCart(item)
                } else {
                    console.log('Item Does Not Exist')
                }
            })
    }

    user.deleteFromCart = function (item) {
        db.collection('users').doc(user.uid)
            .collection('cart').doc(item.id)
            .delete()
            .then(console.log('Item Deleted'))
    }

    return user;
}

export default User;
