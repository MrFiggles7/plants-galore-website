<template>
    <v-row class="mt-2">
        <v-card-text class="pt-0 text-h6">

            <div class="">
                <v-icon color="primary">
                    {{icon}}
                </v-icon>
                {{conversion.convert(response).short || conversion.convert(response)}}

            </div>
        </v-card-text>
    </v-row>
</template>

<script>
    import Conversion from "../../models/Conversions";

    export default {
        name: "item-card__icon",

        data() {
            return{
                conversion: new Conversion()
            }
        },

        props: {
            icon: String,
            text: String,
            response: String,
        }
    }
</script>

<style scoped>

</style>
