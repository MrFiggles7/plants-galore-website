<template>
    <v-btn fab max-height="20px" max-width="20px" class="align-corner font-weight-bold" light color="basil">
        {{qty}}
    </v-btn>
</template>

<script>
    export default {
        name: "button-fab",

        props: {
            qty: Number,
        }
    }
</script>

<style scoped>
    .align-corner{
        position: absolute;
        top: 70%;
        left: 70%;
    }
</style>
