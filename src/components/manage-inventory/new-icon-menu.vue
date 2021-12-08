<template>
    <v-card style="position: absolute;
                top: 50%;
                left: 50%; transform: translate(-50%, -50%); z-index: 5"
            width="500"
            v-show="show">
        <v-card-title class="text-h5 grey lighten-2">
            New Description
        </v-card-title>


        <v-card-text class="mt-9 mb-9 ml-auto mr-auto">
            <v-row class="justify-center">


                <!--                 First Menu-->
                <v-menu
                        bottom
                        :close-on-click="true"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                v-bind="attrs"
                                v-on="on"
                        >
                            <v-icon>{{currentItem.icon}}</v-icon>
                            {{currentItem.text}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                v-for="(item, index) in itemList"
                                :key="index"
                                @click="setCurrent(item),
                                setResponse((item.options)[0])"
                        >
                            <v-list-item>
                                <v-list-item-title>
                                    <v-icon>{{item.icon}}</v-icon>
                                    {{item.text}}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item>
                    </v-list>
                </v-menu>


                <!--                 Second Menu-->

                <v-menu
                        bottom
                        :close-on-click="true"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                v-bind="attrs"
                                v-on="on"
                        >
                            {{conversion.convert(currentItem.response).short
                            || conversion.convert(currentItem.response)}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                v-for="(item, index) in currentItem.options"
                                :key="index"
                                @click="setResponse(item)"
                        >
                            <v-list-item>
                                <v-list-item-title>
                                    {{conversion.convert(item).short || conversion.convert(item)}}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
                    color=""
                    @click="Close"
            >
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="AddDescription"

            >
                Add Description
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "new-icon-menu",

        data() {
            return {
                itemList: {
                    drainage: {
                        icon: "water_drop",
                        text: "Drainage",
                        options: Object.keys(this.conversion.DRAINAGE)
                    },
                    light: {
                        icon: "light_mode",
                        text: "Light",
                        options: Object.keys(this.conversion.LIGHT)
                    },
                    difficulty: {
                        icon: "handyman",
                        text: "Difficulty",
                        options: Object.keys(this.conversion.DIFFICULTY)
                    },
                    size: {
                        icon: "height",
                        text: "Size",
                        options: Object.keys(this.conversion.SIZE)
                    },
                    petFriendly: {
                        icon: "pets",
                        text: "Pet Friendly",
                        options: Object.keys(this.conversion.PETFRIENDLY)
                    },
                },
                currentItem: {
                    icon: 'water_drop',
                    text: 'Drainage',
                    options: Object.keys(this.conversion.DRAINAGE),
                    response: Object.keys(this.conversion.DRAINAGE)[0],
                },


            }
        },

        props: {
            conversion: Object,
            show: Boolean,
        },

        methods: {
            setCurrent: function(item){
                this.currentItem = item;
            },

            setResponse: function (response) {
                this.currentItem.response = response;
                this.$emit('set-response', response)
            },

            Close: function () {
                this.$emit('close')
            },

            AddDescription: function () {
                this.$emit('add-description', this.currentItem)
            }

        }
    }
</script>

<style scoped>

</style>
