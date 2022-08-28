<template>
    <div class="flex flex-col justify-center items-center w-screen h-screen fixed text-gray-800 dark:text-gray-200 font-mono">
        <span class="text-9xl">{{ error.statusCode }}</span>
        <span class="text-4xl">Возникла ошибка</span>
        <span class="text-xl">Вернуться на<nuxt-link to="/" class="text-green-500"> главную</nuxt-link></span>
    </div>
</template>

<script>
    export default {
        layout: 'empty',
        name: 'Error',
        props: ['error'],
        components: {
            
        },
        data() {
            return {
            }
        },
        methods: {
            
        },
    }

</script>

<style scope>

</style>