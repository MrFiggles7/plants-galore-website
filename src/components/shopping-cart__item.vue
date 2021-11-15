<template>
    <v-card
            class="container mb-6"
            outlined
            hover
    >
        <v-card class="d-inline">
            <v-row>
                <v-col
                        cols="4"
                >
                    <v-img :src="item.image" min-height="200px" max-height="300px"></v-img>
                </v-col>
                <v-col
                        cols="8"
                >
                    <v-row>
                        <v-col>
                            <v-card-title style="word-break: break-word">
                                {{item.title}}
                            </v-card-title>

                            <v-card-subtitle>
                                {{'$' + item.price.toFixed(2)  + ' x ' + item.qty}}
                            </v-card-subtitle>
                        </v-col>


                        <v-col
                                class="d-flex align-center justify-end"
                        >
                            <v-card class="pa-5 mr-5 d-none d-lg-block">{{'QTY: ' + item.qty}}</v-card>
                            <v-btn
                                    class="mx-2 text-right"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    @click="removeFromShoppingCart()"
                            >
                                <v-icon>
                                    remove_circle_outline
                                </v-icon>
                            </v-btn>
                            <v-btn
                                    class="mx-2 text-right"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    @click="addToShoppingCart()"
                            >
                                <v-icon>
                                    add_circle_outline
                                </v-icon>
                            </v-btn>
                            <v-btn
                                    class="mx-2 text-right"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    @click="trashItem()"
                            >
                                <v-icon>
                                    delete_outline
                                </v-icon>
                            </v-btn>
                        </v-col>

                        <div>
                            <v-divider></v-divider>

                            <v-card-text>
                                {{item.description}}
                            </v-card-text>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-card>
</template>

<script>
    export default {
        name: "shopping-cart__item",

        props: {
            item : Object,
        },
        methods: {
            addToShoppingCart: function () {
                this.$emit('add-me', this.item);
            },

            removeFromShoppingCart: function () {
                this.$emit('remove-me', this.item);
            },

            trashItem: function () {
                this.$emit('trash-me', this.item);
            }
        },
    }
</script>

<style scoped>

</style>
