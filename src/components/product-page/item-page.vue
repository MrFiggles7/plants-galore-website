<template>
    <div class="container">
        <v-card-title
                class="text-md-h1 text-sm-h2 text-h4 font-weight-medium ml-sm-9 mb-sm-9 ml-4 mb-2 pb-0 pb-sm-4"
                style="color: #5CB59A">
            Products
        </v-card-title>
        <filter-bar @filter-me="FilterItems" class="mb-sm-9 mb-2 mr-5 ml-5 mt-0 mt-sm-3"></filter-bar>
        <item-list :filterList="filterList" :user="user"></item-list>
    </div>

</template>

<script>
    import ItemList from './item-list'
    import FilterBar from '../layout/filter-bar'

    export default {
        name: "item-page",

        props: {
            user: Object,
        },

        data() {
            return {
                filterList: [],
            }
        },

        components: {
            ItemList,
            FilterBar
        },
        methods: {

            FilterItems: function (name, filter, bool) {
                if(bool === false){
                    for(var i = 0; i < this.filterList.length; i++){
                        if(this.filterList[i].name === name){
                            this.filterList.splice(i, 1)
                        }
                    }
                }
                else{
                    this.filterList.push({name: name, filter: filter})
                }
            }

        },
    }
</script>

<style scoped>

</style>
