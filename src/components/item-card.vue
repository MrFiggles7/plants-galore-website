<template>
    <v-hover
            v-slot="{ hover }"
    >
    <v-card
            tile
            :elevation="hover ? 4 : 0"
            class=""
            hover
            :min-height="$vuetify.breakpoint.xsOnly ? '310px' : '324px' || $vuetify.breakpoint.smAndUp ? '324px' : '528px'"
            :max-width="$vuetify.breakpoint.mdAndUp ? 700 : 300"
    >
        <v-img
                :src="item.image"
                :min-height="$vuetify.breakpoint.mdAndUp ? 400 : 250 || $vuetify.breakpoint.xsOnly ? 200 : 250"
                :max-height="$vuetify.breakpoint.mdAndUp ? 400 : 250 || $vuetify.breakpoint.xsOnly ? 200 : 250"
        ></v-img>
        <v-card-title :class="$vuetify.breakpoint.xsOnly ? 'pl-2 pr-2' : ''" style="word-break: break-word;">
            <div class="text-subtitle-1 text-sm-h6 text-md-h5"
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
                    @click="item.addToCart()"
            >
                <v-icon>
                    add_shopping_cart
                </v-icon>

                <v-btn v-if="item.qty > 0" fab max-height="20px" max-width="20px" class="align-corner font-weight-bold" light color="basil">
                    {{item.qty}}
                </v-btn>
            </v-btn>
        </v-card-title>

        <v-card-subtitle :class="$vuetify.breakpoint.xsOnly ? 'pl-2 pr-2' : ''" class="text-subtitle-2 text-sm-subtitle-1 text-md-h6">
            Price: {{'$' + item.price}}<br>

        </v-card-subtitle>
    </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "item-card",

        props: {
            item: Object,
        },

        components: {},

        data: () => ({
            show: false,
        }),


        methods: {
            addToShoppingCart: function () {
                this.$emit('add-me', this.item);
            }
        },
    }
</script>

<style scoped>

    .align-corner{
        position: absolute;
        top: 70%;
        left: 70%;
    }
</style>
