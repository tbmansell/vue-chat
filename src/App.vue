<style>
</style>

<template>
    <v-app id="app" @loggedin="loggedIn">
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
            // Persisted:
            currentUser: null,
        }),

        computed: {
            PageContent() {
                return this.routes[this.currentRoute] || PageNotFound;
            }
        },

        methods: {
            init() {
                const token = this.$load('authToken');
                if (token) {
                    this.$http.defaults.headers.common['X-Auth'] = token;
                }
                this.currentUser = this.$load('currentUser');

                const wss = new WebSocket(this.$config.postWssDomain);
                wss.onopen = () => {
                    console.log(`Websocket connected`);
                }
                wss.onmessage = event => {
                    const payload = JSON.parse(event.data);
                    this.$bus.$emit('ws:'+payload.topic, payload.data);
                }
            },

            loggedIn(authToken, user) {
                this.$http.defaults.headers.common['X-Auth'] = authToken;
                this.currentUser = user;
                this.$save('authToken', authToken);
                this.$save('currentUser', user);
            },
        },

        mounted: function() {
            // Need to call another method, or components dont update if done in here
            this.init();
        }
    };
</script>
