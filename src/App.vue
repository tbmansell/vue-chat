<style>
</style>

<template>
    <v-app id="app" @loggedin="LoggedIn">
        <Navigation :user="currentUser"/>

        <v-container id="masterContainer">
            <v-row center>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="8">
                    <component :is="PageContent" :user="currentUser"></component>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import Login from './components/pages/Login';
    import Navigation from './components/controls/Navigation';
    import PageNotFound from './components/pages/PageNotFound';
    import Posts from './components/pages/Posts';
    import Register from './components/pages/Register';

    export default  {
        name: 'App',
        components: {
            Navigation,
        },

        data: () => ({
            currentRoute: window.location.pathname,
            routes: {
                '/': Posts,
                '/register': Register,
                '/login': Login,
            },

            currentUser: null,
        }),

        computed: {
            PageContent() {
                return this.routes[this.currentRoute] || PageNotFound;
            }
        },

        methods: {
            init() {
                this.currentUser = this.$load('currentUser');
            },

            LoggedIn(user) {
                this.currentUser = user;
                this.$save('currentUser', user);
            },
        },

        mounted: function() {
            // Need to call another method, or components dont update if done in here
            this.init();
        }
    };
</script>
