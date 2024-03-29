<template>
    <main>
        <!-- Music Header -->
        <section class="w-full mb-8 py-14 text-center text-white relative">
            <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
                style="background-image: url(/assets/img/song-header.png)"></div>
            <div class="container mx-auto flex items-center">
                <!-- Play/Pause Button -->
                <button 
                id="play.btn"
                type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
                    @click.prevent="newSong(song)">
                    <i class="fas fa-play"></i>
                </button>
                <div class="z-50 text-left ml-8">
                    <!-- Song Info -->
                    <div class="text-3xl font-bold">{{ song.modified_name }}</div>
                    <div>{{ song.genre }}</div>
                    <div class="song-price">{{ $n(1, "currency","en") }}</div>
                </div>
            </div>
        </section>
        <!-- Form -->
        <section class="container mx-auto mt-6">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                    <!-- Comment Count -->
                    <span class="card-title">{{ $t("song.comment_count", comments.length, {
                        count: comments.length
                    }) }}</span>
                    <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
                </div>
                <div class="p-6">
                    <div class="text-white text-center font-bold p-4 mb-4" v-if="comment_show_alert"
                        :class="comment_alert_variant">
                        {{ comment_alert_message }}
                    </div>
                    <vee-form :validation-schema="shcema" @submit="addComment" v-if="userLoggedIn">
                        <vee-field as="textarea" name="comment"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                            placeholder="Your comment here..."></vee-field>
                        <ErrorMessage class="text-red-600" name="comment" />
                        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block"
                            :disabled="comment_in_submission">
                            Submit
                        </button>
                    </vee-form>
                    <!-- Sort Comments -->
                    <select v-model="sort"
                        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                    </select>
                </div>
            </div>
        </section>
        <!-- Comments -->
        <ul class="container mx-auto" id="comments">
            <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.cID">
                <!-- Comment Author -->
                <div class="mb-5">
                    <div class="font-bold">{{ comment.displayName }}</div>
                    <time>{{ comment.dataPosted }}</time>
                </div>

                <p>{{ comment.content }}</p>
            </li>
        </ul>
    </main>
</template>

<script>
import { auth, songCollection, commentCollection } from '@/includes/localStore'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'
export default {
    name: 'Song',
    data() {
        return {
            song: {},
            comments: [],
            shcema: {
                comment: 'required|min:3'
            },
            comment_in_submission: false,
            comment_show_alert: false,
            comment_alert_variant: 'bg-blue-500',
            comment_alert_message: 'Please wait! Your comment is being submmited.',
            sort: '1'
        }
    },
    computed: {
        ...mapState(useUserStore, ["userLoggedIn"]),
        sortedComments() {
            return this.comments.slice().sort((a, b) => {
                if (this.sort === '1') {
                    return new Date(b.dataPosted) - new Date(a.dataPosted)
                }

                return new Date(a.dataPosted) - new Date(b.dataPosted)
            })
        }
    },
    created() {
        const snapshot = songCollection.getSongByDocID(this.$route.params.id)
        if (!snapshot) {
            this.$router.push({ name: 'home' })
            return;
        }

        const { sort } = this.$route.query

        this.sort = sort === '1' || sort === '2' ? sort : '1'

        this.song = snapshot
        this.getComments()
    },
    methods: {
        ...mapActions(usePlayerStore, ['newSong']),
        addComment(values, { resetForm }) {
            this.comment_in_submission = true
            this.comment_show_alert = true
            this.comment_alert_variant = 'bg-blue-500'
            this.comment_alert_message = 'Please wait! Your comment is being submmited.'

            const user = auth.currentUser()
            const comment = {
                content: values.comment,
                dataPosted: new Date().toString(),
                sid: this.$route.params.id,
                name: user.displayName,
                uid: user.uid
            }
            commentCollection.set(comment)

            this.getComments()

            this.comment_in_submission = false
            this.comment_show_alert = false
            this.comment_alert_variant = 'bg-green-500'
            this.comment_alert_message = 'Comment added!'

            resetForm()
        },
        getComments() {
            const snapshots = commentCollection.getCommentsBySID(this.$route.params.id)
            this.comments = snapshots
        }
    },
    watch: {
        sort(newVal) {
            if (newVal === this.$route.query.sort) {
                return
            }
            this.$router.push({
                query: {
                    sort: newVal
                }
            })
        }
    }
}
</script>