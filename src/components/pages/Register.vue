<template>
    <v-container>
        <h1>Create a new user account</h1>
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
                        <v-btn color="green" @click.native="register" :disabled="!submitAllowed">Register</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: 'Register',

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
            register: function(event) {
                console.log('register: ', event);
            },
        }
    };
</script>

