<template>
    <v-hover
            v-slot="{ hover }"
    >
    <v-card
            tile
            :elevation="hover ? 8 : 1"
            class=""
            hover

            :max-width="$vuetify.breakpoint.mdAndUp ? 700 : 300"
    >
        <v-img
                :src="image"
                :min-height="$vuetify.breakpoint.lgAndUp ? 350 : 250 || $vuetify.breakpoint.xsOnly ? 200 : 250"
                :max-height="$vuetify.breakpoint.lgAndUp ? 350 : 250 || $vuetify.breakpoint.xsOnly ? 200 : 250"
        >
<!--            <item-card-icon-list :item="item"></item-card-icon-list>-->
        </v-img>
        <v-card-title :class="$vuetify.breakpoint.xsOnly ? 'pl-2 pr-2' : ''" >
            <div class="text-subtitle-1 text-sm-h6 text-md-h5 hoverText"
                 style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
                 :style="$vuetify.breakpoint.mdAndUp ? 'width: 70%' : 'width: 100%'">
                {{item.title}}
            </div>


            <v-spacer></v-spacer>

            <v-btn
                    v-if="$vuetify.breakpoint.mdAndUp"
                    class="mr-2 text-right"
                    fab
                    dark
                    small
                    color="primary"
                    @click="user.addToCart(item)"
            >
                <v-icon>
                    add_shopping_cart
                </v-icon>

                <button-fab v-if="cartQty > 0" :qty="cartQty"></button-fab>
            </v-btn>
        </v-card-title>

        <v-card-subtitle :class="$vuetify.breakpoint.xsOnly ? 'pl-2 pr-2' : ''" class="text-subtitle-2 text-sm-subtitle-1 text-md-h6">
            Price: {{'$' + item.price}}<br>

        </v-card-subtitle>
    </v-card>
    </v-hover>
</template>

<script>
    import ButtonFab from './button-fab'
    import {storageRef} from "../../models/FirebaseContext";
    // import ItemCardIconList from "./item-card-icon-list";
    // import {db} from "../models/FirebaseContext";

    export default {
        name: "item-card",

        props: {
            item: Object,
            user: Object,
        },

        firestore: {

        },

        created() {
            storageRef.child(this.item.id).getDownloadURL().then((url)=>{
                this.image = url
            })
        },

        computed: {
            cartQty: function () {
                let cartItem = this.user.cart.filter((item) =>{
                    return item.id === this.item.id
                })
                if(cartItem.length){
                    return cartItem[0].qty
                }
                else{
                    return 0
                }
            }
        },

        components: {
            // ItemCardIconList,
            ButtonFab
        },

        data: () => ({
            image: '',
            qty: {
                qty: 0
            },
        }),


        methods: {

        },
    }
</script>

<style scoped>
        .hoverText:hover{
            text-overflow: initial;
            overflow: visible;
            white-space: normal;
        }
</style>
