<template>
    <div>
        <v-container class="justify-center pa-14">
            <v-card-title class="text-md-h3 text-h5 justify-center">
                Whoopsie! Nothing to see here!
            </v-card-title>
        </v-container>
        <item-list :user="user"></item-list>
    </div>



</template>

<script>

    import ItemList from "../product-page/item-list";
    export default {
        name: "oopsie-page",
        components: {ItemList},

        props: {
            user: Object,
        }
    }
</script>

<style scoped>

</style>
