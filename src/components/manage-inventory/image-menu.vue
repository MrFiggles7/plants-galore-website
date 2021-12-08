<template>
    <v-card style="position: absolute;
                top: 50%;
                left: 50%; transform: translate(-50%, -50%); z-index: 5"
            width="500"
            v-show="show">
        <v-card-title class="text-h5 grey lighten-2">
            Upload Image
        </v-card-title>

        <v-divider></v-divider>

        <v-file-input
                :rules="rules"
                v-model="files"
                outlined
                type="file"
                class="ml-16 mr-16 mt-10 mb-4"
                prepend-icon="photo_camera"
        ></v-file-input>

        <v-card-actions>
            <v-btn
                    color=""
                    @click="$emit('close-image')"
            >
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="Upload"
            >
                Upload
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {storageRef} from '../../models/FirebaseContext'
    export default {
        name: "image-menu",

        data() {
            return {
                files: [],
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
            }
        },

        props: {
            show: Boolean,
            item: Object
        },

        methods: {
            Upload: function () {
                this.$emit('close-image')
                var metadata = {
                    contentType: 'image/jpeg' || 'image/png'
                }
                storageRef.child(this.item.id).put(this.files, metadata).then(()=>{
                    console.log('Added Image: ' + this.files)
                })
            }

        }
    }
</script>

<style scoped>
    .theme--light.v-file-input .v-file-input__text {
        cursor: pointer !important;
    }
</style>
