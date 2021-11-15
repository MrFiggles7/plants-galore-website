<template>
    <div class="ml-2">
        <item-card-icon v-if="item.drainage != null"
                        icon="water_drop"
                        text="Drainage"
                        :response="item.drainage">
        </item-card-icon>
        <!--                <item-card-icon v-if="item.size != null"-->
        <!--                                icon="water_drop"-->
        <!--                                text="Drainage"-->
        <!--                                :response="item.size.long">-->
        <!--                </item-card-icon>-->
        <item-card-icon v-if="item.light != null"
                        icon="light_mode"
                        text="Light"
                        :response="item.light">
        </item-card-icon>
        <item-card-icon v-if="item.difficulty != null"
                        icon="handyman"
                        text="Difficulty"
                        :response="item.difficulty.short">
        </item-card-icon>
        <item-card-icon v-if="item.height != null"
                        icon="light_mode"
                        text="Light"
                        :response="item.light">
        </item-card-icon>
    </div>
</template>

<script>
    import ItemCardIcon from './item-card__icon'

    export default {
        name: "item-card-icon-list",

        props: {
            item: Object,
        },

        components: {
            ItemCardIcon,
        }
    }
</script>

<style scoped>

</style>
