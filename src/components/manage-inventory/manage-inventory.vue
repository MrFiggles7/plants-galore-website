<template>
    <div>

        <v-container :fluid="$vuetify.breakpoint.lgAndDown">
            <v-card-title
                    class="text-md-h1 text-sm-h2 text-h4 font-weight-medium ml-sm-9 mb-sm-9 ml-4 mb-2 pb-0 pb-sm-4"
                    style="color: #5CB59A">
                Manage Inventory
            </v-card-title>
            <filter-bar class="mb-sm-9 mb-2 mr-5 ml-5 mt-0 mt-sm-3"></filter-bar>
            <v-row>

                <v-col
                        class="mb-15 d-flex-inline flex-column float-left"
                        cols="12"
                        xl="8"
                >
                    <v-row
                            class="mt-0 ml-lg-5 ml-md-4 ml-sm-1 mx-2"
                            v-for="item in list"
                            :key="item.id">
                        <manage-inventory-item :user="user" :item="item"
                        >

                        </manage-inventory-item>
                    </v-row>

                </v-col>
                <v-col
                        class="d-flex flex-column float-right"
                        cols="12"
                        xl="4"
                >

                </v-col>

            </v-row>
        </v-container>

    </div>

</template>

<script>
    import ManageInventoryItem from './manage-inventory-item'
    import FilterBar from "../layout/filter-bar";
    import {db} from "../../models/FirebaseContext";

    export default {
        name: "manage-inventory",

        data(){
            return{
                list: [],

            }
        },

        props: {
            user: Object
        },

        firestore: {
            list: db.collection('products')
        },

        components: {
            FilterBar,
            ManageInventoryItem,
        }
    }
</script>

<style scoped>

</style>
