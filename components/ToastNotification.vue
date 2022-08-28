<script setup>
import { useToastStore } from '~/stores/ToastStore';
</script>

<template>
<div :id="toast.id" :class="computedClass" class="toast flex relative items-center transition-transform p-4 mb-4 w-full max-w-xs overflow-hidden text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div v-if="toast.type == 'success'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-green-500 border-green-100 rounded-full dark:border-green-700 dark:text-green-500">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div v-else-if="toast.type == 'error'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-red-500 border-red-100 rounded-full dark:border-red-700 dark:text-red-500">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div v-else-if="toast.type == 'warning'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-yellow-500 border-yellow-100 rounded-full dark:border-yellow-700 dark:text-yellow-500">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Warning icon</span>
    </div>
    <div v-else-if="toast.type == 'info'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-blue-500 border-blue-100 rounded-full dark:border-blue-700 dark:text-blue-500">
        <svg aria-hidden="true" class="w-5 h-5 pl-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.608,17.013l-2.8-10.1A9.443,9.443,0,0,0,2.486,7.4L.321,17.14a2.5,2.5,0,0,0,2.441,3.042H6.905a5.285,5.285,0,0,0,10.154,0H21.2a2.5,2.5,0,0,0,2.409-3.169Zm-20.223.169,2.03-9.137a6.443,6.443,0,0,1,12.5-.326l2.628,9.463Z"/></svg>
        <span class="sr-only">Info icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{{toast.message}}</div>
    <button type="button" @click.prevent="deleteToast" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    <div v-if="toast.type === 'success'" class="progressbar bg-green-500 absolute w-full bottom-0 left-0 h-0.5"></div>
    <div v-else-if="toast.type === 'error'" class="progressbar bg-red-500 absolute w-full bottom-0 left-0 h-0.5"></div>
    <div v-else-if="toast.type === 'warning'" class="progressbar bg-yellow-500 absolute w-full bottom-0 left-0 h-0.5"></div>
    <div v-else-if="toast.type === 'info'" class="progressbar bg-sky-500 absolute w-full bottom-0 left-0 h-0.5"></div>
</div>
    <!-- <div id="toast-error" class="flex relative items-center transition-transform p-4 mb-4 w-full max-w-xs overflow-hidden text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-red-500 border-red-100 rounded-full dark:border-red-700 dark:text-red-500">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item has been deleted.</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div id="error-progressbar" class="absolute w-full bottom-0 left-0 h-0.5 bg-red-500"></div>
    </div>
    <div id="toast-warning" class="flex relative items-center transition-transform p-4 w-full max-w-xs overflow-hidden text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 border-2 text-yellow-500 border-yellow-100 rounded-full dark:border-yellow-700 dark:text-yellow-500">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Warning icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Improve password difficulty.</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div id="warning-progressbar" class="absolute w-full bottom-0 left-0 h-0.5 bg-yellow-500"></div>
    </div> -->
</template>

<script>
import { useToastStore } from '~/stores/ToastStore';
export default {
    name: 'ToastNotification',
    props: ['toast'],
    data() {
        return {
            toastStore: useToastStore(),
            timeout: null,
            animationTimeout: null,
            computedClass: 'slideIn'
        }
    },
    methods: {
        deleteToast() {
            this.computedClass = 'slideOut'
            setTimeout(() => {
                this.toastStore.deleteToast(this.toast.id)
            }, 500);
        }
    },
    created() {
        this.animationTimeout = setTimeout(() => {
            this.computedClass = 'stay'
            setTimeout(() => {
                this.computedClass = 'slideOut'
            }, this.toast.timeout - 1000);
        }, 500);
        this.timeout = setTimeout(() => {
            this.toastStore.deleteToast(this.toast.id)
        }, this.toast.timeout);
    },
    beforeDestroy() {
        clearTimeout(this.timeout)
        clearTimeout(this.animationTimeout)
    }
}

</script>

<style scope>
    .progressbar {
        display: hidden;
        animation: progress 3s linear .5s
    }

    .toast {
        transform: translateX(500px);
        /* display: hidden; */
        /* animation: slideInOut 4s ease .5s */
    }

    .slideIn {
        animation: slideIn .5s ease
    }

    .stay {
        transform: translateX(0px);
    }

    .slideOut {
        animation: slideOut .5s ease
    }

    @keyframes progress {
        0% {
            display: block;
            width: 100%;
            opacity: 100%;
        }
        99% {
            display: block;
            width: 1%;
            opacity: 100%;
        }
        100% {
            display: none;
            width: 0%;
            opacity: 0%;
        }
    }

    @keyframes slideOut {
        0% {
            display: block;
            transform: translateX(0);
            opacity: 100%;
        }
        100% {
            display: none;
            transform: translateX(500px);
            opacity: 0%;
        }
    }

    @keyframes slideIn {
        0% {
            display: none;
            transform: translateX(500px);
            opacity: 0%;
        }
        100% {
            display: block;
            transform: translateX(0);
            opacity: 100%;
        }
    }

    /* @keyframes slideInOut {
        0% {
            transform: translateX(500px);
            opacity: 0%;
            display: none;
        }
        10% {
            transform: translateX(0);
            opacity: 100%;
        }
        89% {
            transform: translateX(0);
            opacity: 100%;
        }
        90% {
            transform: translateX(0);
            opacity: 100%;
        }
        100% {
            transform: translateX(500px);
            opacity: 0%;
            display: none;
        }
    } */
</style>