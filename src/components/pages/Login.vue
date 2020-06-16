s<template>
    <v-container>
        <v-form>
            <v-container center>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="username" label="Username" outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="password" label="Password" outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-btn color="green" @click="login" :disabled="!submitAllowed">Login</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',

        data: () => ({
            username: '',
            password: '',
        }),

        computed: {
            submitAllowed() {
                return this.username && this.password;
            }
        },

        methods: {
            login: function(event) {
                console.log('login: ', event);
            },
        }
    };
</script>

