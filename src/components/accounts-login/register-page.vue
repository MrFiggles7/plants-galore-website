<template>
    <v-container class="justify-center"
                 :style="$vuetify.breakpoint.smAndUp ? 'width: 40%; height: 100%;' : 'width: 90%; height: 100%'">

        <v-card-title class="justify-center font-weight-bold">
            Register
        </v-card-title>

        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="validate"
        >
            <v-row>
                <v-col>
                    <v-card-subtitle class="text-h6 pb-0">
                        First Name
                    </v-card-subtitle>
                    <v-card class="px-8 pb-2">
                        <v-text-field
                                v-model="firstName"
                                :rules="firstNameRules"
                                required
                        ></v-text-field>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card-subtitle class="text-h6 pb-0">
                        Last Name
                    </v-card-subtitle>
                    <v-card class="px-8 pb-2">
                        <v-text-field
                                v-model="lastName"
                                :rules="lastNameRules"
                                required
                        ></v-text-field>
                    </v-card>
                </v-col>
            </v-row>
            <v-card-subtitle class="text-h6 pb-0">
                Email
            </v-card-subtitle>
            <v-card class="px-8 pb-2">
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        required
                ></v-text-field>
            </v-card>


            <v-card-subtitle class="text-h6 pb-0">
                Password
            </v-card-subtitle>
            <v-card class="px-8 pb-2">
                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        required
                ></v-text-field>
            </v-card>


            <v-btn
                    :disabled="!valid"
                    :loading="isLoading"
                    color="primary"
                    class="mt-2 justify-center text-subtitle-1"
                    style="width: 100%; height: 3rem"
                    type="submit"

            >
                Register
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import {db} from '../../models/FirebaseContext';
    import firebase from "firebase/compat";
    import router from "../../router";
    export default {
        name: "register-page",

        data: () => ({
            role: 'customer',
            valid: true,
            firstName: '',
            firstNameRules: [
                v => !!v || 'First Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            lastName: '',
            lastNameRules: [
                v => !!v || 'Last Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            select: null,
            isLoading: false,
        }),

        methods: {
            AddUser: function () {

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;


                            user.updateProfile({
                                displayName: this.firstName + ' ' + this.lastName
                        }).then(
                                ()=> {
                                    console.log('Added Display Name', user.displayName)
                                }
                            )


                        db.collection('users').doc(user.uid)
                            .set({
                                displayName: this.firstName + ' ' + this.lastName,
                                email: this.email,
                                role: 'customer'
                            });
                        // ...

                        console.log('user added: ' + user)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ..
                        console.log(errorCode)
                        console.log(errorMessage)
                    }).finally(() => {
                    this.isLoading = false;
                    router.push('/')
                });

            },

            validate () {
                this.isLoading = true;
                this.$refs.form.validate();

                if(this.$refs.form.validate() === true){
                    this.AddUser();
                }
                else{
                    this.isLoading = false;
                }
            },
        }
    }
</script>

<style scoped>

</style>
