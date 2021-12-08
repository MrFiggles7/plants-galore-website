<template>
    <v-card
            class="container mb-6 pa-0 "
            outlined
    >
        <!-- image menu -->




        <v-row>
            <!-- image -->
            <v-col
                    cols="5"
            >
                <image-menu :show="show" :item="item" @close-image="show = !show"></image-menu>
                <v-img :src="image" min-height="650px" max-height="650px">

                    <v-btn absolute icon
                           @click="show = !show"
                           style="top: 2%; right: 3%; z-index: 10"
                    >
                        <v-icon>add_a_photo</v-icon>
                    </v-btn>
                </v-img>
            </v-col>
            <!-- Title Bar -->
            <v-col
                    class="pr-5"
                    cols="7"
            >
                <v-row class="pt-5 pb-3">
                    <v-col>
                        <v-row>
                            <v-col
                                    cols="12"
                            >
                                <v-text-field v-model="item.title" hide-details :value="currentTitle"
                                              :placeholder="currentTitle"
                                              style="width: 60%"
                                              @change="changed = true"
                                              class="title-input"
                                              solo flat>
                                </v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        style="width: 30%"
                                        v-model="item.price"
                                        @change="changed = true"
                                        hide-details height="1"
                                        class="text-left pt-1 subtitle-input"
                                        prefix="$"
                                        :value="currentPrice.toFixed(2)" id="text-input"
                                        :placeholder="currentPrice.toFixed(2)"
                                        solo flat>
                                </v-text-field>
                            </v-col>
                        </v-row>

                    </v-col>
                    <v-btn
                            fab
                            absolute
                            v-if="changed === false"
                            style="top:0; right:0; transform: translate(-40%, 35%)"
                    >
                        <v-icon
                                x-large
                                color="#8A1F1F"
                        >

                            delete
                        </v-icon>
                    </v-btn>
                    <v-btn
                            @click="UpdateData"
                            fab
                            absolute
                            v-if="changed === true"
                            style="top:0; right:0; transform: translate(-40%, 35%)"
                    >
                        <v-icon
                                x-large
                                color="primary"

                        >

                            save
                        </v-icon>
                    </v-btn>

                </v-row>

                <v-row>
                    <v-col cols="12">
                        <span class="text-h6">
                            Category:
                        </span>
                        &nbsp;
                        <v-menu
                                bottom
                                :close-on-click="true"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    {{conversions.convert(item.category)}}
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item
                                    v-for="category in categories"
                                    :key="category.id"
                                >
                                    <v-list-item @click="item.category = category, changed = true">
                                        <v-list-item-title>
                                            {{conversions.convert(category)}}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>

                </v-row>


                <v-row class="pr-4">
                    <v-divider></v-divider>
                </v-row>

                <!-- Description -->
                <v-row class="pt-2 pl-2 pr-2">

                    <v-textarea append-outer-icon="edit" v-model="item.description" @change="changed = true"
                                :value="currentDescription" hide-details solo flat>

                    </v-textarea>
                </v-row>


                <!-- Descriptions -->
                <v-card-subtitle class="pl-0" style="color: #356859">Descriptions</v-card-subtitle>
                <icon-list
                        class="pt-7"
                        @update-me="Update"
                        @add-description="AddDescription"
                        @delete-description="DeleteDescription"
                        :item="item"
                >

                </icon-list>

            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import IconList from './manage-inventory-icon-list'
    import Conversion from "../../models/Conversions";
    import {db, storageRef} from '../../models/FirebaseContext'
    import ImageMenu from "./image-menu";

    export default {
        name: "manage-inventory-item",

        data() {
            return {
                conversions: new Conversion(),
                changed: false,
                currentTitle: this.item.title,
                currentPrice: this.item.price,
                currentDescription: this.item.description,
                show: false,

                categories: ['indoor', 'outdoor', 'cactiSucculent', 'pot'],

                image: ''
            }
        },

        props: {
            item: Object,
        },

        created() {
            storageRef.child(this.item.id).getDownloadURL().then((url)=>{
                this.image = url
            })
        },

        methods: {
            Update: function (text, response) {
                this.changed = true;
                if (text === 'Light') {
                    this.item.light = response
                } else if (text === 'Drainage') {
                    this.item.drainage = response
                }
                if (text === 'Difficulty') {
                    this.item.difficulty = response
                }
                if (text === 'Size') {
                    this.item.size = response
                }
            },

            UpdateData: function(){
                this.changed = false
                this.item.price = parseFloat(this.item.price)
                db.collection('products').doc(this.item.id)
                .set(this.item).then((item)=>{
                    console.log('Success', item)
                })
            },

            AddDescription: function (item) {
                this.changed = true;
                if (item.text === 'Light') {
                    this.item.light = item.response
                    this.$forceUpdate()

                } else if (item.text === 'Drainage') {
                    this.item.drainage = item.response
                    this.$forceUpdate()
                }
                if (item.text === 'Difficulty') {
                    this.item.difficulty = item.response
                    this.$forceUpdate()
                }
                if (item.text === 'Size') {
                    this.item.size = item.response
                    this.$forceUpdate()
                }
                if (item.text === 'Pet Friendly') {
                    this.item.petFriendly = item.response
                    this.$forceUpdate()
                }
            },

            DeleteDescription: function (text) {
                this.changed = true;
                if (text === 'Light') {
                    this.item.light = null
                    this.$forceUpdate()

                } else if (text === 'Drainage') {
                    this.item.drainage = null
                    this.$forceUpdate()
                }
                if (text === 'Difficulty') {
                    this.item.difficulty = null
                    this.$forceUpdate()
                }
                if (text === 'Size') {
                    this.item.size = null
                    this.$forceUpdate()
                }
                if (text === 'Pet Friendly') {
                    this.item.petFriendly = null
                    this.$forceUpdate()
                }
            }
        },

        components: {
            ImageMenu,
            IconList
        },


    }
</script>

<style scoped>

    .v-text-field__prefix {
        font-size: 2rem !important;
    }

    .title-input.v-text-field >>> label {
        font-size: 2rem;
        height: 2rem;
        color: black;
    }

    .title-input.v-text-field >>> input {
        font-size: 2rem;
        padding: 1.6rem 0;
    }

    .subtitle-input.v-text-field >>> label {
        font-size: 1.4rem;
        height: 1.4rem;
        color: black;
    }

    .subtitle-input.v-text-field >>> input {
        font-size: 1.4rem;
        height: 1.4rem;
    }

    .subtitle-input.v-text-field {
        font-size: 1.4rem;
    }
</style>
