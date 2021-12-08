<template>
    <v-card style="position: absolute;
                top: 50%;
                left: 50%; transform: translate(-50%, -50%); z-index: 5"
            width="500"
            v-show="show">
        <v-card-title class="text-h5 grey lighten-2">
            Edit Description

            <v-spacer></v-spacer>
            <v-btn
                    icon

            >
                <v-icon
                        large
                        color="#8A1F1F"
                        @click="DeleteDescription"
                >
                    delete
                </v-icon>
            </v-btn>
        </v-card-title>


        <v-card-text class="mt-9 mb-9 ml-auto mr-auto">
            <v-row class="justify-center">

                <v-btn
                        disabled
                        ripple
                        text
                >
                    <v-icon>{{currentItem.icon}}</v-icon>
                    {{currentItem.text}}
                </v-btn>


                <v-menu
                        bottom
                        :close-on-click="true"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                v-bind="attrs"
                                v-on="on"
                        >
                            {{conversion.convert(currentItem.response).short ||
                            conversion.convert(currentItem.response)}}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                                v-for="(item, index) in options"
                                :key="index"
                                @click="setResponse(item)"
                        >
                            <v-list-item-title>
                                {{conversion.convert(item).short || conversion.convert(item)}}
                            </v-list-item-title>
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
                    @click="Update"

            >
                Update
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "edit-icon-menu",

        data(){
            return{
                currentItem: this.item,
            }
        },

        props: {
            item: Object,
            options: Array,
            conversion: Object,
            show: Boolean,
        },

        methods: {
            setResponse: function (response) {
                this.currentItem.response = response;
            },

            Close: function () {
                this.$emit('close')
            },

            Update: function () {
                this.$emit('update-me', this.currentItem.text, this.currentItem.response)
            },

            DeleteDescription: function () {
                this.$emit('delete-description', this.currentItem.text)
            }
        }


    }
</script>

<style scoped>

</style>
