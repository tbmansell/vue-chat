s<template>
    <v-container>
        <v-form>
            <v-container center>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="username"
                                      @keyup.enter="login"
                                      label="Username"
                                      outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field type="password"
                                      v-model="password"
                                      @keyup.enter="login"
                                      label="Password"
                                      outlined shaped filled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-btn color="green" @click="login" :disabled="!submitAllowed">Login</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col color="red">{{ loginError }}</v-col>
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
            loginError: '',
        }),

        computed: {
            submitAllowed() {
                return this.username && this.password;
            }
        },

        methods: {
            login: async function() {
                try {
                    const user = { username: this.username, password: this.password };
                    const url = this.$config.userServiceDomain + '/api/sessions';
                    const response = await this.$http.post(url, user);

                    if ([200, 201, 202].includes(response.status)) {
                        this.loginError = '';
                        this.$http.defaults.headers.common['X-Auth'] = response.data;
                        this.$parent.$emit('loggedin', {
                            username: this.username,
                            signedIn: new Date().toLocaleString(),
                        });
                        window.location = '/';
                    } else {
                        this.loginError = `Error: ${response.status}: ${response.data}`;
                    }
                } catch (err) {
                    this.loginError = err;
                }
            },
        }
    };
</script>

