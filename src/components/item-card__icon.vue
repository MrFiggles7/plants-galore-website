<template>
    <v-row class="mt-2">
        <v-card-text class="pt-0 text-h6">

            <div class="">
                <v-icon color="primary">
                    {{icon}}
                </v-icon>
                <span class="font-weight-bold ml-1">{{text}}: </span>{{response}}

            </div>
        </v-card-text>
    </v-row>
</template>

<script>
    export default {
        name: "item-card__icon",

        props: {
            icon: String,
            text: String,
            response: String,
        }
    }
</script>

<style scoped>

</style>
