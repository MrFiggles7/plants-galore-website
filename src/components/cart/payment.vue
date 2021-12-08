<template>
    <v-container
            :fluid="$vuetify.breakpoint.mdAndDown"
            color="basil">

        <v-card class="pa-16">
            <v-card-title class="text-h2">
                Total

                <v-spacer></v-spacer>
                {{'$' + total.toFixed(2)}}
            </v-card-title>
            <v-divider></v-divider>

            <v-container class="pt-16 pb-16">
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-row>
                        <v-col>
                            <v-text-field
                                    v-model="firstName"
                                    :counter="10"
                                    :rules="nameRules"
                                    label="First Name"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                    v-model="lastName"
                                    :counter="10"
                                    :rules="nameRules"
                                    label="Last Name"
                                    required
                            ></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                    v-model="cardNumber"
                                    label="Card Number"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                    v-model="CVV"
                                    label="CVV"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-menu
                                    bottom
                                    :close-on-click="true"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="dateShow = !dateShow"
                                            v-model="picker"
                                            label="MM/YY"
                                            required
                                    ></v-text-field>
                                </template>

                                <v-date-picker
                                        @change="dateShow = !dateShow"
                                        v-show="dateShow"
                                        v-model="picker"
                                        color="primary"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                    </v-row>
                    <v-btn
                            :disabled="!valid"
                            color="primary"
                            class="mr-4"
                            @click="validate"
                    >
                        Submit Payment
                    </v-btn>
                </v-form>
            </v-container>
        </v-card>



    </v-container>
</template>

<script>
    export default {
        name: "payment",

        data(){
            return{
                dateShow: false,
                picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
        },

        props: {
            user: Object,
        },

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
        },

        computed: {
            subTotal: function(){
                var subtotal = 0;

                for(var i = 0; i < this.user.cart.length; i++){
                    if(this.user.cart[i].qty > 0){
                        subtotal += (this.user.cart[i].price * this.user.cart[i].qty);
                    }
                }

                return subtotal;
            },

            taxAmount: function(){
                return this.subTotal * .055;
            },

            total: function(){
                return this.subTotal + this.taxAmount;
            }
        }
    }
</script>

<style scoped>

</style>
