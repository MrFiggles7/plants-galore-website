<template>
    <div>
        <sign-in-page :user="user" v-show="user.role === 'anonymous'"></sign-in-page>
        <accounts-page :user="user" v-show="(user.isCustomer() || user.isAdmin())"></accounts-page>
    </div>
</template>

<script>
    import SignInPage from './sign-in-page'
    import AccountsPage from "./accounts-page";
    export default {
        name: "accounts",

        props: {
            user: Object,
        },

        components: {
            AccountsPage,
            SignInPage
        },
    }
</script>

<style scoped>

</style>
