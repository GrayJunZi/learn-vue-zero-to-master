<template>
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">上传</span>
            <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
            <!-- Upload Dropbox -->
            <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
                :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }" @drag.prevent.stop=""
                @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)">
                <h5>拖拽文件到这里</h5>
            </div>
            <hr class="my-6" />
            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
                <!-- File Name -->
                <div class="font-bold text-sm" :class="upload.text_class">
                    <i :class="upload.icon"></i>{{ upload.name }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <!-- Inner Progress Bar -->
                    <div class="transition-all progress-bar" :class="upload.variant"
                        :style="{ width: upload.current_progress + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { auth, songCollection } from '@/includes/localStore'
export default {
    name: 'Upload',
    props: {
        addSong: {
            type: Function
        }
    },
    data() {
        return {
            is_dragover: false,
            uploads: []
        }
    },
    methods: {
        upload(event) {
            this.is_dragover = false

            const files = [...event.dataTransfer.files]

            files.forEach((file) => {
                const types = ['audio/x-m4a', 'audio/mpeg']
                if (!types.includes(file.type)) {
                    return
                }

                const uploadIndex = this.uploads.push({
                    name: file.name,
                    current_progress: 10,
                    variant: 'bg-blue-400',
                    icon: 'fas fa-spinner fa-spin',
                    text_class: ''
                }) - 1

                this.uploads[uploadIndex].current_progress = 30

                var formData = new FormData()
                formData.append('file', file)

                fetch('http://localhost:5174/api/upload', {
                    method: 'POST',
                    body: formData,
                }).then(res => res.json()).then(res => {
                    const song = {
                        uid: auth.currentUser().uid,
                        display_name: auth.currentUser().name,
                        original_name: res.originalname,
                        modified_name: res.filename,
                        genre: '',
                        comment_count: 0,
                        url: res.url
                    }

                    songCollection.add(song)
                    this.addSong(song)

                    this.uploads[uploadIndex].current_progress = 100
                    this.uploads[uploadIndex].variant = 'bg-green-400'
                    this.uploads[uploadIndex].icon = 'fas fa-check'
                    this.uploads[uploadIndex].text_class = 'text-green-400'
                }).catch(err => {
                    console.log(err)
                    this.uploads[uploadIndex].variant = 'bg-red-400'
                    this.uploads[uploadIndex].icon = 'fas fa-times'
                    this.uploads[uploadIndex].text_class = 'text-red-400'
                })
            })
        }
    }
}
</script>