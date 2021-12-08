<template>
    <v-container class="justify-center"
                 :style="width">
        <v-card-title class="justify-center font-weight-bold">
            Sign In
        </v-card-title>

        <v-form
                @submit.prevent="validate"
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-card-subtitle class="text-h6 pb-0">
                <v-row>
                    <v-col
                            cols="3"
                    >
                        Email
                    </v-col>
                    <v-col>
                        <transition-group name="fade">
                            <div
                                    :key="1"
                                    class="text-subtitle-2 text-right"
                                    style="color: darkred"
                                    v-show="alreadyLoggedIn">User already logged in
                            </div>
                            <div
                                    :key="2"
                                    class="text-subtitle-2 text-right"
                                    style="color: darkred; overflow: hidden; max-width: 100%"
                                    v-show="error">{{errorMessage}}
                            </div>
                        </transition-group>
                    </v-col>
                </v-row>
            </v-card-subtitle>

            <v-card class="px-8 pb-2">
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        required
                ></v-text-field>
            </v-card>


            <v-card-subtitle class="text-h6 mt-2 pb-0">
                Password
            </v-card-subtitle>
            <v-card class="px-8 pb-2">
                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        required
                ></v-text-field>
            </v-card>

            <v-card-subtitle class="text-center">
                New here?
                <router-link to="/register-page">Register Now</router-link>
            </v-card-subtitle>

            <v-btn
                    :disabled="!valid"
                    :loading="isLoading"
                    type="submit"
                    color="primary"
                    class="mt-2 justify-center text-subtitle-1"
                    style="width: 100%; height: 3rem"
            >
                Sign In
            </v-btn>
            <v-btn
                    :disabled="user.isLoggedIn() && user.role === 'customer'"
                    color="white"
                    class="text-subtitle-1 mt-4 justify-center text-center"
                    style="width: 100%; height: 3rem"
                    @click="GoogleSignIn"
            >
                <v-img src="../../assets/google.jpg" height="40" max-width="40" contain
                       class="mr-4 d-inline-block">

                </v-img>
                Sign In with Google
            </v-btn>
            <div v-show='user.isLoggedIn() && user.role === "customer"' style="width: 100%; height: 3rem" class="text-right">
                <v-btn

                        @click="user.SignOut()"
                        icon
                        class="mr-9"
                        color="primary"
                >
                    Log Out
                    <v-icon medium class="ml-2">logout</v-icon>
                </v-btn>
            </div>

        </v-form>
    </v-container>
</template>

<script>
    import firebase from "firebase/compat";
    import router from "../../router";
    // import router from "../router";
    // import {db} from "../models/FirebaseContext";

    export default {
        name: "sign-in-page",

        data: () => ({
            provider: new firebase.auth.GoogleAuthProvider(),
            alreadyLoggedIn: false,
            error: false,
            errorMessage: '',
            isLoading: false,
            valid: true,
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            checkbox: false,
        }),

        props: {
            user: Object,
        },

        computed: {
            // isLoggedIn: function () {
            //     if(this.user){
            //         return true
            //     }
            //     else{
            //         return false
            //     }
            // }

            width: function () {
                switch (this.$vuetify.breakpoint.name) {
                    case 'sm':
                        return 'width: 90%; height: 100%';
                    case 'md':
                        return 'width: 60%; height: 100%';
                    case 'lg':
                        return 'width: 40%; height: 100%';
                    case 'xl':
                        return 'width: 40%; height: 100%';
                }
                return 'width: 90%; height: 100%';
            }

        },

        methods: {
            GoogleSignIn() {
                this.isLoading = true;
                this.user.GoogleSignIn()
                    .then(() => {
                        this.isLoading = false

                    })
                .finally(() => {
                    router.push('/')
                })
                // firebase.auth()
                //     .signInWithPopup(this.provider)
                //     .then((result) => {
                //         /** @type {firebase.auth.OAuthCredential} */
                //         var credential = result.credential;
                //
                //         // This gives you a Google Access Token. You can use it to access the Google API.
                //         var token = credential.accessToken;
                //         // The signed-in user info.
                //         var user = result.user;
                //         // ...
                //         console.log(token)
                //         console.log(user)
                //         // this.user = new User(user);
                //
                //
                //         db.collection('users').doc(user.uid)
                //             .set({
                //                 displayName: user.displayName,
                //                 email: user.email,
                //                 cart: [],
                //             });
                //         // ...
                //
                //         console.log('user added: ' + user)
                //     })
                //     .catch((error) => {
                //         var errorCode = error.code;
                //         var errorMessage = error.message;
                //         // ..
                //         console.log(errorCode)
                //         console.log(errorMessage)
                //     }).finally(() => {
                //     this.isLoading = false;
                //
                // }).catch((error) => {
                //     // Handle Errors here.
                //     var errorCode = error.code;
                //     var errorMessage = error.message;
                //     // The email of the user's account used.
                //     var email = error.email;
                //     // The firebase.auth.AuthCredential type that was used.
                //     var credential = error.credential;
                //     // ...
                //     console.log(errorCode)
                //     console.log(errorMessage)
                //     console.log(email)
                //     console.log(credential)
                // });
            },

            SignIn() {
                this.alreadyLoggedIn = false;
                this.error = false;
                this.errorMessage = '';

                var promise = new Promise((resolve) => {resolve()})

                promise.then(()=>{
                    this.user.SignIn(this.email, this.password)
                    .then((userCredential) => {
                        var user = userCredential.user;
                        // ...
                        console.log('User Signed in: ' + user)
                    })
                })
                    .catch((error) => {
                        console.log('caught')
                        switch(error.name){
                            case 'Already Logged In' :
                                this.alreadyLoggedIn = true;
                                break;

                            default:
                                this.errorMessage = 'Please try again';
                                this.error = true;
                        }

                    })

                    .finally(() => {
                        this.isLoading = false;
                        router.push('/')
                    })





                // this.alreadyLoggedIn = false;
                // this.error = false;
                // this.errorMessage = '';
                // if (firebase.auth().currentUser !== null) {
                //     firebase.auth().currentUser.providerData.forEach((profile) => {
                //         if (profile.email === this.email) {
                //             this.alreadyLoggedIn = true;
                //             this.isLoading = false;
                //             return false;
                //         } else {
                //             firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                //                 .then((userCredential) => {
                //                     // Signed in
                //                     var user = userCredential.user;
                //                     // ...
                //                     console.log('User Signed in: ' + user)
                //                     router.push('./')
                //                 })
                //                 .catch((error) => {
                //                     var errorCode = error.code;
                //                     var errorMessage = error.message;
                //                     console.log(errorCode)
                //                     console.log(errorMessage)
                //                     this.error = true;
                //                     this.errorMessage = 'Please Try Again'
                //
                //                     this.isLoading = false;
                //                 }).finally(() => {
                //                 this.isLoading = false;
                //             });
                //         }
                //     })
                // } else {
                //     firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                //         .then((userCredential) => {
                //             // Signed in
                //             var user = userCredential.user;
                //             // ...
                //             console.log('User Signed in: ' + user)
                //             router.push('./')
                //         })
                //         .catch((error) => {
                //             var errorCode = error.code;
                //             var errorMessage = error.message;
                //             console.log(errorCode)
                //             console.log(errorMessage)
                //             this.error = true;
                //             this.errorMessage = 'Please Try Again'
                //
                //             this.isLoading = false;
                //         }).finally(() => {
                //         this.isLoading = false;
                //     });
                // }

            },
            validate() {
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true) {
                    this.isLoading = true;
                    this.SignIn();
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
        },

    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
