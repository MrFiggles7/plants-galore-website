<template>
    <div class="mt-2">
        <edit-icon-menu
            :item="item"
            :conversion="conversion"
            :options="options"
            :show="show"
            @update-me="Update"
            @delete-description="DeleteDescription"
            @close="show = false"
        ></edit-icon-menu>



        <v-card-text class="pt-0 text-h6">
            <v-btn class="justify-start pl-1" width="225" @click="show = !show">
                <v-icon medium color="primary">
                    {{icon}}
                </v-icon>
                <span class="font-weight-bold text-subtitle-2 ml-1">{{text}}: </span>
                <span class="text-subtitle-2">
                    {{conversion.convert(response).short || conversion.convert(response)}}
                </span>

            </v-btn>
        </v-card-text>
    </div>
</template>

<script>
    import EditIconMenu from './edit-icon-menu'
    import Conversion from "../../models/Conversions";

    export default {
        name: "manage-inventory-icon",

        components: {
            EditIconMenu
        },

        data() {
            return {
                conversion: new Conversion,
                show: false,

                item: {
                    icon: this.icon,
                    text: this.text,
                    response: this.response,
                    options: this.options,
                },
            }
        },

        methods: {
            Update: function (text, response) {
                this.show = false;
                this.$emit('update-me', text, response)
            },
            DeleteDescription: function (text) {
                this.$emit('delete-description', text)
            }
        },

        props: {
            icon: String,
            text: String,
            response: String,
            options: Array,
        }
    }
</script>

<style scoped>
    .theme--light.v-btn.v-btn--disabled {
        color: rgba(0, 0, 0, 1) !important;
    }

    .theme--light.v-btn.v-btn--disabled .v-icon, .theme--light.v-btn.v-btn--disabled .v-btn__loading {
        color: rgba(0, 0, 0, 1) !important;
    }
</style>
