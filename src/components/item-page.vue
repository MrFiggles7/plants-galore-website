<template>
    <div>
        <v-card-title class="text-md-h1 text-sm-h2 text-h4 font-weight-medium ml-sm-9 mb-sm-9 ml-4 mb-2 pb-0 pb-sm-4" style="color: #5CB59A">
            Products
        </v-card-title>
        <filter-bar class="mb-sm-9 mb-2 mr-5 ml-5 mt-0 mt-sm-3"></filter-bar>
        <v-row class="mt-0 mb-0 ml-sm-3 mr-sm-3 ml-0 mr-0" style="background-color: transparent">
            <v-col v-for="item in list"
                   :key="item.id"
                   cols="6"
                   lg="3"
                   md="4"
                   sm="4"
            >

                <item-card :item="item" @add-me="addToShoppingCart(item)"></item-card>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import ItemCard from './item-card';
    import FilterBar from './filter-bar'

    export default {
        name: "item-page",

        props: {
            list: {
                type: Array
            },


        },

        data() {
            return {
            }
        },

        components: {
            ItemCard,
            FilterBar
        },
        methods: {
            addToShoppingCart: function (item) {
                this.$emit('add-me', item);
            },
        },
    }
</script>

<style scoped>

</style>
