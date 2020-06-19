<style>
  h1 {
    margin-left: 15px;
  }
  .formError {
    color: red;
    margin-top: -50px;
  }
</style>

<template>
  <v-container class="container">
    <h1>Recent posts</h1>
    <v-form @submit="postMessage" onSubmit="return false;">
      <v-container center>
        <v-row>
          <v-col cols="12" sm="10">
            <v-text-field v-model="message"
                          @keyup.enter="postMessage"
                          label="Say something"
                          outlined shaped filled></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-btn @click="postMessage" color="green" :disabled="!canPost">Add Post</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="formError">{{ postError }}</v-col>
        </v-row>
      </v-container>
    </v-form>

    <PostListing/>
  </v-container>
</template>

<script>
  import PostListing from '../controls/PostListing';

  export default {
      name: 'Posts',

      components: {
          PostListing,
      },

      props: {
          'user': Object,
      },

      data: () => ({
          message: '',
          postError: '',
      }),

      computed: {
          canPost() {
              return this.user !== null && this.message.length > 0;
          }
      },

      methods: {
          async postMessage() {
              if (this.message.trim().length < 1) {
                return;
              }

              const post = {
                  username: this.user.username,
                  body: this.message,
              };

              try {
                  await this.sendMessage(post);
              } catch (err) {
                  this.postError = err;
              }
          },

          async sendMessage(post) {
              const url = this.$config.postServiceDomain + '/api/posts';
              const response = await this.$http.post(url, post, {
                  // Dont throw error on these codes (400 so we can read error message)
                  validateStatus: status => [200, 201, 202, 400].includes(status)
              });

              if ([200, 201, 202].includes(response.status)) {
                  this.postError = '';
                  this.message = '';
                  this.$bus.$emit('newpost', response.data);
              } else {
                  this.postError = `Error: ${response.status}: ${response.data}`;
              }
          }
      }
  }
</script>
