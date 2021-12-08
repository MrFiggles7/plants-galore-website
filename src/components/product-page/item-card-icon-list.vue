<template>
    <div class="ml-2">
        <v-navigation-drawer
            permanent
            style="background-color: transparent; border: none;"
            mini-variant-width="100%"
            expand-on-hover
            absolute
            @transitionend="expanded = !expanded"
        >
            <item-card-icon v-if="item.drainage != null"
                            icon="water_drop"
                            :text="expanded ? 'Drainage' : ''"
                            :response="expanded ? item.drainage : ''">
            </item-card-icon>
            <!--                <item-card-icon v-if="item.size != null"-->
            <!--                                icon="water_drop"-->
            <!--                                text="Drainage"-->
            <!--                                :response="item.size.long">-->
            <!--                </item-card-icon>-->
            <item-card-icon v-if="item.light != null"
                            icon="light_mode"
                            :text="expanded ? 'Light' : ''"
                            :response="expanded ? item.light : ''">
            </item-card-icon>
            <item-card-icon v-if="item.difficulty != null"
                            icon="handyman"
                            :text="expanded ? 'Difficulty' : ''"
                            :response="expanded ? item.difficulty.short : ''">
            </item-card-icon>
            <item-card-icon v-if="item.size != null"
                            icon="height"
                            :text="expanded ? 'Size' : ''"
                            :response="expanded ? item.size : ''">
            </item-card-icon>
            <item-card-icon v-if="item.petFriendly != null"
                            icon="pets"
                            :text="expanded ? 'Pet Friendly' : ''"
                            :response="expanded ? item.petFriendly : ''">
            </item-card-icon>
        </v-navigation-drawer>

    </div>
</template>

<script>
    import ItemCardIcon from './item-card__icon'

    export default {
        name: "item-card-icon-list",

        data(){
            return{
                expanded: false,
            }
        },

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
