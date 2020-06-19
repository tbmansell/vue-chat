<style>
    .status {
        color: green;
    }
    .post {
        border: 1px solid #aaa;
    }
    .post strong {
        margin-right: 10px;
    }
</style>

<template>
    <v-container @newpost="newPost">
        <div v-if="status" class="status">{{ status }}</div>
        <v-container>
            <v-row v-for="post in posts" :key="post.id">
                <v-col cols="12" sm="12" class="post">
                    <strong>@{{ post.username }}</strong>
                    <span>{{ post.body }}</span>
                    <div>
                        <sub>{{ post.date ? post.date.toLocaleString() : '' }}</sub>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: 'PostListing',

        data: () => ({
            status: 'Initialising...',
            posts: null,
        }),

        methods: {
            async loadPosts() {
                this.status = 'Loading posts...';
                const url = this.$config.postServiceDomain + '/api/posts';
                const response = await this.$http.get(url);

                if (response.status !== 200) {
                    this.status = `HTTP Response ${response.status}: ${response.statusText}`;
                    return;
                }

                this.posts = response.data.map(post => ({
                    id: post._id,
                    username: post.username,
                    body: post.body,
                    date: new Date(post.date),
                }));
                this.status = '';
            },

            newPost(post) {
                console.log("New post added: ", post)
                this.posts.unshift(post);
            }
        },

        created() {
            this.$bus.$on('newpost', post => this.newPost(post));
        },

        mounted: async function() {
            try {
                await this.loadPosts();
            } catch (err) {
                this.status = `Error loading posts: ${err}`;
            }
        }
    };
</script>
