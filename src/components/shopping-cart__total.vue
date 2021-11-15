<template>
    <v-card class="pt-8 pb-8 pl-lg-8 pl-0 d-md-inline-block d-block text-center text-md-left" id="shopping-cart__total">
        <v-card-title>

        </v-card-title>

        <v-card-text
                v-for="item in list"
                :key="item.id"
        >
            {{item.title}} -- {{'QTY: ' + item.qty + ' x $' + item.price + ' = $' + (item.qty * item.price).toFixed(2)}}
        </v-card-text>
        <v-card-subtitle class="text-h4">
            {{'Subtotal: $' + subTotal.toFixed(2)}}
        </v-card-subtitle>
        <v-card-text>
            {{'x Tax (5.5%): $' + taxAmount.toFixed(2)}}
        </v-card-text>
        <v-card-text class="text-lg-h2 text-md-h3 text-sm-h4 text-h2" style="color: black">
            Total: {{'$' + total.toFixed(2)}}
        </v-card-text>
        <v-btn x-large color="#356859" class="white--text ml-5 mt-5">Checkout</v-btn>
    </v-card>
</template>

<script>
    export default {
        name: "shopping-cart__total",

        props: {
            list: {
                type: Array
            },
        },
        methods: {

        },


        computed: {
            subTotal: function(){
                var subtotal = 0;

                for(var i = 0; i < this.list.length; i++){
                    if(this.list[i].qty > 0){
                        subtotal += (this.list[i].price * this.list[i].qty);
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
        },
    }
</script>

<style scoped>

</style>
