<template>
    <v-container
            :fluid="$vuetify.breakpoint.mdAndDown"
            color="basil">
        <v-card-title class="text-h2">
            Your Cart
        </v-card-title>
        <v-row
                no-gutters
        >
            <v-col
                    class="mb-15"
                    cols="12"
                    md="8"
            >
                <v-row
                        class="mt-0 ml-lg-5 ml-md-4 ml-sm-1 mx-2"
                        v-for="item in list"
                        :key="item.id">
                    <shopping-cart-item :item="item" @add-me="addToShoppingCart"
                                        @remove-me="removeFromShoppingCart"
                                        @trash-me="trashItem"
                    >

                    </shopping-cart-item>
                </v-row>

            </v-col>
            <v-col
                    cols="12"
                    md="4"
            >
                <shopping-cart-total :list="list"></shopping-cart-total>
            </v-col>


        </v-row>

    </v-container>
</template>

<script>
    import ShoppingCartItem from './shopping-cart__item';
    import ShoppingCartTotal from './shopping-cart__total'

    export default {
        name: "shopping-cart__page",

        props: {
            list: {
                type: Array
            },
        },
        methods: {
            addToShoppingCart: function (item) {
                this.$emit('add-me', item);
            },
            removeFromShoppingCart: function (item) {
                this.$emit('remove-me', item);
            },
            trashItem: function (item) {
                this.$emit('trash-me', item);
            }
        },

        components: {
            ShoppingCartItem,
            ShoppingCartTotal,
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
