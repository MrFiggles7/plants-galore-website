<template>
    <v-row>

        <v-row class="ml-auto mr-auto">

            <!--                <item-card-icon v-if="item.size != null"-->
            <!--                                icon="water_drop"-->
            <!--                                text="Drainage"-->
            <!--                                :response="item.size.long">-->
            <!--                </item-card-icon>-->
            <item-card-icon v-if="item.light != null"
                            icon="light_mode"
                            text="Light"
                            :response="item.light"
                            :item="item"
                            :options="Object.keys(conversion.LIGHT)"
                            @update-me="Update"
                            @delete-description="DeleteDescription"
            >
            </item-card-icon>
            <item-card-icon v-if="item.difficulty != null"
                            icon="handyman"
                            text="Difficulty"
                            :item="item"
                            :response="item.difficulty"
                            :options="Object.keys(conversion.DIFFICULTY)"
                            @update-me="Update"
                            @delete-description="DeleteDescription"
            >
            </item-card-icon>
            <item-card-icon v-if="item.size != null"
                            icon="height"
                            text="Size"
                            :item="item"
                            :response="item.size"
                            :options="Object.keys(conversion.SIZE)"
                            @update-me="Update"
                            @delete-description="DeleteDescription"
            >
            </item-card-icon>
            <item-card-icon v-if="item.petFriendly != null"
                            icon="pets"
                            text="Pet Friendly"
                            :item="item"
                            :response="item.petFriendly.toString() || item.petFriendly"
                            :options="Object.keys(conversion.PETFRIENDLY)"
                            @update-me="Update"
                            @delete-description="DeleteDescription"
            >
            </item-card-icon>
            <item-card-icon v-if="item.drainage != null"
                            icon="water_drop"
                            text="Drainage"
                            :item="item"
                            :response="item.drainage.toString() || item.drainage"
                            :options="Object.keys(conversion.DRAINAGE)"
                            @update-me="Update"
                            @delete-description="DeleteDescription"
            >
            </item-card-icon>
            <new-icon-menu
                    :show="show"
                    :conversion="conversion"
                    @add-description="AddDescription"
                    @close="Close"
            ></new-icon-menu>
            <v-card-text
                    v-show="item.light != null && item.difficulty != null
                && item.size != null && item.drainage != null
                 && item.petFriendly != null ? false : true"
                    class="pt-0">
                <v-btn width="225" color="primary" @click="show = !show">
                    <v-icon>add</v-icon>
                    New Description
                </v-btn>
            </v-card-text>

        </v-row>
    </v-row>

</template>

<script>
    import Conversion from "../../models/Conversions";
    import ItemCardIcon from './manage-inventory-icon'
    import NewIconMenu from './new-icon-menu'

    export default {

        name: "manage-inventory-icon-list",

        data(){
            return{
                show: false,
                conversion: new Conversion(),
            }
        },

        props: {
            item: Object
        },

        methods: {
            Update: function (text, response) {
                this.$emit('update-me', text, response)
            },

            Close: function () {
                this.show = false;
            },

            AddDescription: function (item) {
                this.show = false
                this.$emit('add-description', item)
            },

            DeleteDescription: function (text) {
                this.$emit('delete-description', text)
            }
        },

        components: {
            ItemCardIcon,
            NewIconMenu
        }
    }
</script>

<style scoped>

</style>
