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
                          style="padding-bottom: 2rem"
                          class="text-sm-h6 text-h6 text-sm-h5 text-md-h4 text-lg-h3 pr-sm-4 pr-0"
            >
                {{filter.name}}
                <v-btn
                        icon
                        @click="show(filter)"
                >
                    <v-icon>{{ filter.show ? 'expand_less' : 'expand_more' }}</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-title class="ml-md-auto mr-5">
                <v-btn
                        @click="ClearAllFilters"
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
                        <span v-if="list.name" class="text-h6">{{list.name}}</span>
                        <v-checkbox
                                @change="FilterItem(list.name, checkbox.title, checkbox.checked)"
                                class="d-block"
                                on-icon="check_box"
                                off-icon="check_box_outline_blank"
                                v-for="checkbox in list.checkboxes"
                                :key="checkbox.id"
                                v-model="checkbox.checked"
                                :label="conversion.convert(checkbox.title).short
                                 || conversion.convert(checkbox.title)"
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
                                @change="FilterItem(list.name, checkbox.title, checkbox.checked)"
                                on-icon="check_box"
                                off-icon="check_box_outline_blank"
                                v-model="checkbox.checked"
                                :label="conversion.convert(checkbox.title).long
                                 || conversion.convert(checkbox.title)">
                        </v-checkbox>
                    </v-col>
                </v-row>


            </div>


        </v-expand-transition>
    </v-banner>
</template>

<script>
    import Conversion from "../../models/Conversions";

    export default {
        name: "filter-bar",

        data(){
            return{
                conversion: new Conversion(),
                filters: [
                    {
                        name: 'Features',
                        lists: [
                            {
                                name: 'Difficulty',
                                checkboxes: [
                                    {
                                        title: 'minimal',
                                        checked: false,
                                    },
                                    {
                                        title: 'easy',
                                        checked: false,
                                    },
                                    {
                                        title: 'moderate',
                                        checked: false,
                                    },
                                ]
                            },
                            {
                                name: 'Light',
                                checkboxes: [
                                    {
                                        title: 'low',
                                        checked: false,
                                    },
                                    {
                                        title: 'medium',
                                        checked: false,
                                    },
                                    {
                                        title: 'high',
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
                                ]
                            },
                        ],



                        show: false,
                    },
                    {
                        name: 'Category',
                        lists: [
                            {
                                name: 'Category',
                                checkboxes: [
                                    {
                                        title: 'indoor',
                                        checked: false,
                                    },
                                    {
                                        title: 'outdoor',
                                        checked: false,
                                    },
                                    {
                                        title: 'pot',
                                        checked: false,
                                    },
                                    {
                                        title: 'cactiSucculent',
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
                                name: 'Size',
                                checkboxes: [
                                    {
                                        title: 'xs',
                                        checked: false,
                                    },
                                    {
                                        title: 'sm',
                                        checked: false,
                                    },
                                    {
                                        title: 'md',
                                        checked: false,
                                    },
                                    {
                                        title: 'lg',
                                        checked: false,
                                    },
                                    {
                                        title: 'xl',
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
            ClearAllFilters: function(){
                this.filters.forEach((filter)=>{
                    filter.lists.forEach((item)=>{
                        item.checkboxes.forEach((checkbox)=>{
                            checkbox.checked = false
                            this.FilterItem(filter.name, checkbox.title, checkbox.checked)
                        })

                    })
                })
            },

            FilterItem: function(name, filter, checked){
                this.$emit('filter-me', name, filter, checked)
            },
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
    .v-input >>> label{
        font-size: 1.2rem !important;
        font-weight: bold;
    }
</style>
