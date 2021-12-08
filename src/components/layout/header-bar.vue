<template>
    <div>
        <div color="basil" class="header">
            <v-card-title class="py-0 py-sm-6">
                <v-btn

                        @click.stop="drawer = !drawer"

                        :medium="$vuetify.breakpoint.smAndUp"
                        x-small
                        :height="$vuetify.breakpoint.smAndUp ? 50 : 35"
                        :width="$vuetify.breakpoint.smAndUp ? 55 : 20"

                        class="mr-auto"
                        color="primary"
                >
                    <v-icon
                            :x-large="$vuetify.breakpoint.smAndUp"
                            medium
                    >
                        menu
                    </v-icon>
                </v-btn>
                <router-link to="/" style="text-decoration: none; color: inherit;">
                    <h1 class="ml-auto mr-auto mt-xs-0 font-weight-bold text-xl-h1 text-lg-h2 text-sm-h4 text-xs-h4 text-h5"
                        :style="$vuetify.breakpoint.smAndDown ? 'word-break: break-word' : 'word-break: none'">
                        PLANTs GALoRE
                    </h1>
                </router-link>
                <v-card-title class="ml-auto">
                    <v-btn
                            v-if="$vuetify.breakpoint.smAndUp && (user.isCustomer() || user.isAdmin())"
                            to='/accounts'
                            class="pb-0 mr-md-9 mr-sm-0 mr-9 ml-auto text-h6 font-weight-bold cart-button"
                            :x-large="$vuetify.breakpoint.smAndUp"
                            x-small
                            depressed
                            icon
                            color="primary"
                    >
                        <v-icon
                                :x-large="$vuetify.breakpoint.mdAndUp"
                                large
                        >
                            account_circle
                        </v-icon>
                    </v-btn>
                    <v-btn
                            to='/cart'
                            class="pb-0 text-h6 font-weight-bold cart-button"
                            :x-large="$vuetify.breakpoint.smAndUp"
                            x-small
                            depressed
                            icon
                            color="primary"
                    >

                        <v-icon
                                :x-large="$vuetify.breakpoint.mdAndUp"
                                large
                        >
                            shopping_cart
                        </v-icon>
                        <button-fab :qty="user.cart.length"></button-fab>
                    </v-btn>
                </v-card-title>
            </v-card-title>
        </div>
        <v-navigation-drawer
                v-model="drawer"
                width="325"
                absolute
                temporary
                class="pl-9"
        >
            <v-list
                    nav
                    dense
            >
                <v-list-item-group
                        v-model="group"
                        active-class="text--accent-4"
                        class="mt-9"

                >
                    <v-list-item
                            to="/"
                            class="mt-6"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">store</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Shop</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                            to="/accounts"
                            class="mt-6"
                            v-show="(user.isCustomer() || user.isAdmin())"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">account_circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Account</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                            to="/accounts"
                            class="mt-6"
                            v-show="user.role === 'anonymous'"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">person_add</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Log In</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                            to="/help"
                            class="mt-6"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">help_outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Help</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                            to="/manage-inventory"
                            class="mt-6"
                            v-show="user.role === 'admin'"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">inventory</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Inventory</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                            @click="user.SignOut()"
                            class="mt-6"
                            v-show="(user.isCustomer() || user.isAdmin())"
                    >
                        <v-list-item-icon>
                            <v-icon x-large class="pt-9 pb-9">logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h4 pt-9 pb-9">Log Out</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>

            </v-list>
        </v-navigation-drawer>
    </div>

</template>

<script>
    import ButtonFab from "../product-page/button-fab";
    export default {
        name: "header-bar",
        components: {ButtonFab},
        data() {
            return {
                drawer: false,
                group: null,

                navItems: [{name: "Shop", icon: 'store', link: '/', show: true},
                    {name: "Account", icon: 'account_circle', show: false},
                    {name: "Log In", icon: 'person_add', link: '/sign-in', show: false},
                    {name: "help", icon: 'help_outline', show: true}
                ]
            }
        },

        watch: {
            group() {
                this.drawer = false
            },
        },

        props: {
            user: Object
        },

        computed: {
            initials: function () {
                var fullName = this.user.displayName.split(' ');
                var initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
                return initials.toUpperCase();
            }
        }
    }
</script>

<style scoped>
    .cart-button::before {
        background-color: transparent !important;
    }

</style>
