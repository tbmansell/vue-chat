<template>
    <v-container>
        <h1>Create a new user account</h1>
        <v-form>
            <v-container center>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="username"
                                      @keyup.enter="register"
                                      label="Username"
                                      outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field type="password"
                                      v-model="password"
                                      @keyup.enter="register"
                                      label="Password"
                                      outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-btn color="green" @click="register" :disabled="!submitAllowed">Register</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col color="red">{{ registerError }}</v-col>
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
            registerError: '',
        }),

        computed: {
            submitAllowed() {
                return this.username && this.password;
            }
        },

        methods: {
            register: async function() {
                try {
                    const user = { username: this.username, password: this.password };
                    const url = this.$config.userServiceDomain + '/api/users';
                    const response = await this.$http.post(url, user, {
                        // Dont throw error on these codes (400 so we can read error message)
                        validateStatus: status => [200, 201, 202, 400].includes(status)
                    });

                    if ([200, 201, 202].includes(response.status)) {
                        this.registerError = '';
                        this.$parent.$emit('loggedin', response.data, {
                            username: this.username,
                            signedIn: new Date().toLocaleString(),
                        });
                        window.location = '/';
                    } else {
                        this.registerError = `Error: ${response.status}: ${response.data}`;
                    }
                } catch (err) {
                    this.registerError = err;
                }
            },
        }
    };
</script>

