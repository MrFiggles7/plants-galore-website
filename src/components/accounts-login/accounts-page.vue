<template>
    <v-container>


        <v-card
                :loading="loading"
                class="mx-auto my-12 text-center"
                style="width: 100%; min-height: 60vh"
        >
            <v-row>
                <v-col
                        cols="12"
                        md="6"
                >
                    <v-avatar
                            class="text-h5"
                            color="primary"
                            size="56"
                            style="
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: white;
                            "
                    >
                        {{initials}}
                    </v-avatar>

                    <v-card-title class="pt-14 justify-center">{{user.displayName}}</v-card-title>
                    <v-card-subtitle class="pt-2 text-subtitle-2 font-italic">Plant connoisseur</v-card-subtitle>
                    <v-card-subtitle>
                        <v-btn
                                text
                                style="color: #356859"
                                class="text-subtitle-2 ml-auto mr-5 d-block">
                            Edit Profile
                        </v-btn>
                        <v-btn
                                text
                                @click="user.SignOut()"
                                style="color: #356859; cursor: pointer;"
                                class="text-subtitle-2 ml-auto mr-5 mt-0 pt-0 d-block">
                            Log Out
                            <v-icon color="primary" small>logout</v-icon>
                        </v-btn>
                    </v-card-subtitle>

                </v-col>

                <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
                <v-divider v-show="$vuetify.breakpoint.smAndDown" class="mx-4"></v-divider>

                <v-col
                        cols="12"
                        md="6"
                >
                    <v-card-title class="justify-center pt-md-14 pt-0">Order History</v-card-title>
                </v-col>


            </v-row>
        </v-card>


    </v-container>
</template>

<script>
    export default {
        name: "accounts-page",

        data: () => ({
            loading: false,
            selection: 1,
        }),

        props: {
            user: Object,
        },

        methods: {
            reserve() {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
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

</style>
