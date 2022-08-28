<script setup lang="ts">
import ToastList from '~/components/ToastList.vue';

</script>

<template>
    <div v-cloak class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white h-full min-h-screen relative overflow-auto">
        <ToastList />
        <div class="flex md:gap-4 gap-0 transition-all">
            <div class="flex-none lg:w-64 sm:w-16 w-0">
                <Sidebar />
            </div>
            <div class="sm:hidden fixed text-white bg-gray-800 w-10 h-10 top-3 left-3 rounded-full flex items-baseline justify-center text-3xl font-semibold cursor-pointer opacity-90">+</div>
            <div class="md:mr-8 md:mt-8 md:ml-4 md:mb-8 mr-2 mt-2 ml-2 mb-2 w-full h-fit overflow-auto">
                <Nuxt />
            </div>
        </div>
    </div>
</template>

<style scope>
    [v-cloak] {
        display: none;
    }
</style>