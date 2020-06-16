<style>
  h1 {
    margin-left: 15px;
  }
</style>

<template>
  <v-container class="container">
    <h1>Recent posts</h1>
    <v-form>
      <v-container center>
        <v-row>
          <v-col cols="12" sm="10">
            <v-text-field v-model="message" label="Say something" outlined shaped filled></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
            <v-btn color="green" :disabled="!canPost">Add Post</v-btn>
          </v-col>
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
      }),

      computed: {
          canPost() {
              return this.user !== null && this.message.length > 0;
          }
      }
  }
</script>
