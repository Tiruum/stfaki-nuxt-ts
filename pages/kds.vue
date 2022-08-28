<script setup lang="ts">
import { useKdsStore } from '~/stores/KdsStore';
import { ref } from 'vue'
import { useUserStore } from '~/stores/UserStore';
import { useToastStore } from '~/stores/ToastStore';

const kdsStore = useKdsStore()
kdsStore.fill("2022-08-15", 6)

interface Entry {
    id: string,
    time: string[],
    title: string,
    userName: string,
    date: string,
    color: string,
    darkColor: string,
    username: string,
    userId?: string
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

function deleteEntry(object: Entry): void {
    if (useUserStore().currentUser?.id === object.userId) {
        const isDelete = confirm('Вы уверены, что хотите удалить запись?')
        if (isDelete) {
            // kdsStore.entries = kdsStore.entries.filter(entry => entry.id !== object.id)
            kdsStore.deleteEntry(object.id)
            kdsStore.fill()
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
            <h1 class="font-semibold text-3xl">Комната для собраний 👥</h1>
            <p class="text-base mt-2">Здесь вы можете записаться в КДС</p>
            <p class="text-base mt-2">Всего записей на эту неделю: {{kdsStore.count}}</p>
            <button @click="showModal()" class="px-3 py-1 mt-2 border border-gray-50 rounded-md">Записаться</button>
        </div>

        <div v-show="ifAdd" class="p-6 lg:w-1/2 w-full mb-8 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 max-w-full overflow-auto">
            <AddEntry @addEntry="addEntry" @closeModal="closeModal" :scheduleData="kdsStore.entries" />
        </div>

        {{userStore.currentUser}}

        <div class="rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 max-w-full overflow-auto">
            <client-only>
                <Schedule @load="() => {$forceUpdate()}" :scheduleData="kdsStore.entries" @deleteEntry="deleteEntry" />
            </client-only>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            userStore: useUserStore(),
            kdsStore: useKdsStore(),
            toastStore: useToastStore()
        }
    },
    methods: {
        addEntry(form: EntryForm): void {
            this.kdsStore.addEntry({
                time: [form.start_time, form.end_time],
                title: form.title,
                date: form.start_date,
                color: form.color,
                darkColor: form.color,
                username: useUserStore().currentUser?.first_name + " " + useUserStore().currentUser?.last_name,
                userId: useUserStore().currentUser?.id
            })
            this.kdsStore.fill()
        }
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.userStore.getUserByEmail(this.$auth.user.email)
        } else {
            console.log('%cВы не зарегистрированы', 'color: #0ea5e9; font-size: 3em; font-weight: bold;text-stroke: 1px black;');
        }
    }
}
</script>