<template>
    <div>
        <div class="mb-8">
            <h1 class="font-semibold text-3xl">Пылесос 🌟</h1>
            <p class="text-base mt-2">
                Здесь вы можете записаться в очередь на пользование пылесосом
            </p>
        </div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 overflow-auto">
            <Schedule :scheduleData="[]" />
        </div>
    </div>
</template>

<script>
import Schedule from '~/components/Schedule.vue'
    export default {
        name: 'VacuumCleaner',
        props: [''],
        components: {
    Schedule
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