<style>
    header .menuitem {
        margin: 0 20px;
    }
    .signedIn {
        color: white;
        padding-top: 5px;
    }
    .date {
        font-size: 0.75rem;
    }
</style>

<template>
    <v-card color="grey lighten-4" height="100px" tile>
        <v-toolbar src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <template v-if="user">
                <span class="signedIn">
                    Signed in as
                    <strong class="currentUser">{{ user.username }}</strong>
                    <br>
                    <sup class="date">{{ user.signedIn }}</sup>
                </span>
            </template>

            <v-spacer></v-spacer>

            <template v-for="item in menu">
                <v-btn v-if="item.show()" :href="item.href" :key="item.label" class="menuitem">
                    {{ item.label }}
                </v-btn>
            </template>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn v-if="user" icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn v-if="user" @click="logout" text small color="white">
                logout
            </v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    export default {
        name: 'Navigation',

        props: {
            'user': Object,
        },

        methods: {
            logout() {
                this.$store.clear();
                window.location = '/';
            }
        },

        computed: {
            signedIn() {
                return this.user !== null;
            },
            menu() {
                return [
                    {
                        label: 'Posts',
                        href: '/',
                        show: () => true
                    },
                    {
                        label: 'Register',
                        href: '/register',
                        show: () => !this.signedIn
                    },
                    {
                        label: 'Login',
                        href: '/login',
                        show: () => !this.signedIn
                    },
                    /***
                    {
                        label: 'Account',
                        href: '/account',
                        show: () => this.signedIn
                    },
                    {
                        label: 'Finder',
                        href: '/finder',
                        show: () => this.signedIn
                    },
                    ***/
                ];
            }
        },
    };
</script>
