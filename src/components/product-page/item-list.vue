<template>
    <v-row class="mt-0 mb-0 ml-sm-3 mr-sm-3 ml-0 mr-0" style="background-color: transparent">
        <v-col v-for="item in filteredList"
               :key="item.id"
               cols="6"
               lg="3"
               md="4"
               sm="4"
        >

            <item-card :item="item" :user="user"></item-card>
        </v-col>
    </v-row>
</template>

<script>
    import ItemCard from './item-card'
    import {db} from "../../models/FirebaseContext";
    // import ProductList from "../../models/ProductList";

    export default {
        name: "item-list",

        components: {
            ItemCard
        },

        data() {
            return{
                list: [],
                show: false,
                filteredList: [],
                // cart: []
            }
        },

        watch: {
            filterList: function(){
                this.filteredList = []
                    if(this.filterList.length === 0){
                        this.list.forEach((item)=>{
                            this.filteredList.push(item)
                        })
                    }
                    else{
                        for(var j = 0; j < this.filterList.length; j++){
                            if(this.filterList[j].name === 'Difficulty'){
                                for(var k = 0; k < this.list.length; k++){
                                    if(this.filterList[j].filter === this.list[k].difficulty){
                                        this.filteredList.push(this.list[k])
                                    }
                                }
                            }
                            else if(this.filterList[j].name === 'Size'){
                                for(var l = 0; l < this.list.length; l++){
                                    if(this.filterList[j].filter === this.list[l].size){
                                        this.filteredList.push(this.list[l])
                                    }
                                }
                            }
                            else if(this.filterList[j].name === 'Light'){
                                for(var m = 0; m < this.list.length; m++){
                                    if(this.filterList[j].filter === this.list[m].light){
                                        this.filteredList.push(this.list[m])
                                    }
                                }
                            }
                            else if(this.filterList[j].filter === 'Pet Friendly'){
                                for(var n = 0; n < this.list.length; n++){
                                    if(this.list[n].petFriendly === true){
                                        this.filteredList.push(this.list[n])
                                    }
                                }
                            }
                           else  if(this.filterList[j].name === 'Category'){
                                for(var o = 0; o < this.list.length; o++){
                                    if(this.filterList[j].filter === this.list[o].category){
                                        this.filteredList.push(this.list[o])
                                    }
                                }
                            }
                        }
                    }
            }
        },

        created(){
            this.filteredList = this.list;
        },


        firestore: {
            list: db.collection('products'),
        },


        props: {
            user: Object,
            filterList: Array,
        }
    }
</script>

<style scoped>

</style>
