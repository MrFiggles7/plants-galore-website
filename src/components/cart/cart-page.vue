<template>
    <div>
        <shopping-cart-page :list="user.cart"
                            :user="user"
                            v-if="user.cart.length > 0"
                            @add-me="addToShoppingCart"
                            @remove-me="removeFromShoppingCart"
                            @trash-me="trashItem"
        >

        </shopping-cart-page>
        <oopsie-page v-else-if="user.cart.length === 0" :user="user">

        </oopsie-page>
    </div>
</template>

<script>
    import ShoppingCartPage from './shopping-cart__page'
    import OopsiePage from './oopsie-page'

    export default {
        name: "cart-page",

        props: {
            user: Object,
        },

        components: {
            ShoppingCartPage,
            OopsiePage
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
        }
    }
</script>

<style scoped>

</style>
