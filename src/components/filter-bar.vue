<template>
    <v-banner
            elevation="0"
            outlined
            rounded
            color="white"
    >
        <v-row>
            <v-card-subtitle class="text-md-h5 text-subtitle-2" style="color: grey"
                             :style="$vuetify.breakpoint.smAndDown ? 'width: 100%' : ''">
                Filter By
            </v-card-subtitle>

            <v-card-title v-for="filter in filters" :key="filter.id"
                          class="text-sm-subtitle-1 text-subtitle-2 text-sm-h5 text-md-h3 pr-sm-4 pr-0"
            >
                {{filter.name}}
                <v-btn
                        icon
                        @click="show(filter)"
                >
                    <v-icon>{{ filter.show ? 'expand_more' : 'expand_less' }}</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-title class="ml-md-auto mr-5">
                <v-btn
                        :style="$vuetify.breakpoint.smAndDown ? 'width: 100%' : ''"
                        color="primary">
                    Clear all filters
                </v-btn>
            </v-card-title>
        </v-row>
        <v-expand-transition v-for="filter in filters" :key="filter.id" >

            <div v-show="filter.show">
                <v-divider class="mt-3"></v-divider>


                <v-row v-if="filter.lists && filter.lists.length >= 2" class="mt-3 ml-3">
                    <v-col
                            cols="6"
                            md="3"
                            v-for="list in filter.lists"
                            :key="list.id"
                    >
                        <span v-if="list.name">{{list.name}}</span>
                        <v-checkbox
                                on-icon="check_box"
                                off-icon="check_box_outline_blank"
                                v-for="checkbox in list.checkboxes"
                                :key="checkbox.id"
                                v-model="checkbox.checked"
                                :label="checkbox.title"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <v-row
                        v-else
                        v-for="list in filter.lists"
                        :key="list.id"
                        class="mt-3 ml-3"
                >
                    <span v-if="list.name">{{list.name}}</span>
                    <v-col
                            v-for="checkbox in list.checkboxes"
                            :key="checkbox.id"
                            cols="6"
                            md="2"
                            sm="4"
                    >
                        <v-checkbox
                                on-icon="check_box"
                                off-icon="check_box_outline_blank"
                                v-model="checkbox.checked"
                                :label="checkbox.title">
                        </v-checkbox>
                    </v-col>
                </v-row>


            </div>


        </v-expand-transition>
    </v-banner>
</template>

<script>
    export default {
        name: "filter-bar",

        data(){
            return{
                filters: [
                    {
                        name: 'Features',
                        lists: [
                            {
                                name: 'Style',
                                checkboxes: [
                                    {
                                        title: 'Blooming',
                                        checked: false,
                                    },
                                    {
                                        title: 'Patterned',
                                        checked: false,
                                    },
                                    {
                                        title: 'Trending',
                                        checked: false,
                                    },
                                    {
                                        title: 'Cascading',
                                        checked: false,
                                    },
                                ]
                            },
                            {
                                name: 'Light',
                                checkboxes: [
                                    {
                                        title: 'Low Light',
                                        checked: false,
                                    },
                                    {
                                        title: 'Bright Light',
                                        checked: false,
                                    },
                                ]
                            },
                            {
                                name: 'Benefit',
                                checkboxes: [
                                    {
                                        title: 'Pet Friendly',
                                        checked: false,
                                    },
                                    {
                                        title: 'Air Purifying',
                                        checked: false,
                                    },
                                ]
                            },
                        ],



                        show: false,
                    },
                    {
                        name: 'Variety',
                        lists: [
                            {
                                checkboxes: [
                                    {
                                        title: 'Air Plant',
                                        checked: false,
                                    },
                                    {
                                        title: 'Anthurium',
                                        checked: false,
                                    },
                                    {
                                        title: 'Calathea',
                                        checked: false,
                                    },
                                    {
                                        title: 'Fern',
                                        checked: false,
                                    },
                                    {
                                        title: 'Ficus',
                                        checked: false,
                                    },
                                    {
                                        title: 'Fiddle Leaf Fig',
                                        checked: false,
                                    },
                                    {
                                        title: 'Monstera',
                                        checked: false,
                                    },
                                    {
                                        title: 'Money Tree',
                                        checked: false,
                                    },
                                    {
                                        title: 'Parlor Palm',
                                        checked: false,
                                    },
                                    {
                                        title: 'Peperomia',
                                        checked: false,
                                    },
                                    {
                                        title: 'Philodendron',
                                        checked: false,
                                    },
                                    {
                                        title: 'Pilea',
                                        checked: false,
                                    },
                                    {
                                        title: 'Pothos',
                                        checked: false,
                                    },
                                    {
                                        title: 'Snake Plant',
                                        checked: false,
                                    },
                                    {
                                        title: 'Succulent',
                                        checked: false,
                                    },
                                    {
                                        title: 'ZZ',
                                        checked: false,
                                    },
                                ]
                            },
                        ],
                        show: false,
                    },
                    {
                        name: 'Size',
                        lists: [
                            {
                                checkboxes: [
                                    {
                                        title: 'Mini 2.5"',
                                        checked: false,
                                    },
                                    {
                                        title: 'X-small 4"',
                                        checked: false,
                                    },
                                    {
                                        title: 'Small 5"',
                                        checked: false,
                                    },
                                    {
                                        title: 'Medium 7"',
                                        checked: false,
                                    },
                                    {
                                        title: 'Large 10"',
                                        checked: false,
                                    },

                                ]
                            },
                        ],
                        show: false,
                    }

                ],
            }
        },

        methods: {
            show: function (filter) {
                for (var item in this.filters) {
                    if (this.filters[item] != filter) {
                        this.filters[item].show = false;
                    }
                    filter.show = !filter.show;
                }
            }
        }
    }
</script>

<style scoped>

</style>
