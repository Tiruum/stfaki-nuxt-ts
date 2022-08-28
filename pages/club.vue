<script setup lang="ts">
import { useKdsStore } from '~/stores/KdsStore';
import { ref } from 'vue'
import { v4 } from 'uuid'

const kdsStore = useKdsStore()
kdsStore.fill()

interface Entry {
    id: number,
    time: string[],
    title: string,
    userName: string,
    date: string,
    color: string,
    darkColor: string,
    userId: number | null
}

interface EntryForm {
    title: string,
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string,
    periodic: string,
    color: string
}

let ifAdd = ref(false)

function showModal(): void {
    console.log('yeah');
    ifAdd.value = true
}

function closeModal(): void {
    console.log('nope');
    ifAdd.value = false
}

function addEntry(form: EntryForm): void {
    console.log(form);
    
    kdsStore.addEntry({
        id: v4(),
        time: [form.start_time, form.end_time],
        title: form.title,
        userName: 'Тимур Селин',
        date: form.start_date,
        color: form.color,
        darkColor: form.color,
        userId: "1"
    })
}

function deleteEntry(object: Entry): void {
    console.log(object);
    
    const currentUserId = 1
    if (currentUserId === object.userId) {
        const isDelete = confirm('Вы уверены, что хотите удалить запись?')
        if (isDelete) {
            kdsStore.entries = kdsStore.entries.filter(entry => entry.id !== object.id)
        }
    }
    else {
        alert('Вы не можете удалить не свою запись')
    }
}
</script>

<template>
    <div>
        <div class="mb-8">
            <h1 class="font-semibold text-3xl">Клуб Романтики 🙋</h1>
            <p class="text-base mt-2">
                Здесь вы можете записаться в клуб Романтики
            </p>
            <button @click="showModal()" class="px-3 py-1 mt-2 border border-gray-50 rounded-md">Записаться</button>
        </div>

        <div v-show="ifAdd" class="p-6 mb-8 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 max-w-full overflow-auto">
            <AddEntry @addEntry="addEntry" @closeModal="closeModal" />
        </div>

        <div class="rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 overflow-auto">
            <Schedule :scheduleData="kdsStore.entries" @deleteEntry="deleteEntry" />
        </div>
    </div>
</template>

<style scope>

</style>