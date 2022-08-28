<template>
<div class="fixed top-5 right-5 z-30">
    <ToastNotification v-for="toastObj in toastStore.toasts" :key="toastObj.id" :toast="toastObj"  />
</div>
</template>

<script>
import ToastNotification from './ToastNotification.vue';
import { useToastStore } from '~/stores/ToastStore';
export default {
    name: 'ToastList',
    props: [''],
    components: {
        ToastNotification
    },
    data() {
        return {
            toastStore: useToastStore(),
            timeout: null
        }
    },
    mounted() {
        // Test requests
        // this.toastStore.addToast({
        //     type: "error",
        //     message: "Item has been deleted.",
        //     timeout: 4000
        // })
        // setTimeout(() => {
        //     this.toastStore.addToast({
        //         type: "warning",
        //         message: "Item can been deleted.",
        //         timeout: 4000
        //     })
        // }, 1000);

        // setTimeout(() => {
        //     this.toastStore.addToast({
        //         type: "info",
        //         message: "You have a new message.",
        //         timeout: 4000
        //     })
        // }, 2000);

    }
}
</script>

<style scope>

</style>