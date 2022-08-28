<template>
    <div>
        <div class="mb-8">
            <h1 class="font-semibold text-3xl">Прачечная 🧺</h1>
            <p class="text-base mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem
                Ipsum
                has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of
                type and scrambled it to make a type specimen book.</p>
        </div>
        <div class="rounded-xl px-6 py-1 w-fit mx-auto mb-2 bg-white dark:bg-gray-700 shadow-sm shadow-gray-200/50 dark:shadow-black/50 overflow-auto">
            <select @change="changeDay" v-model="selectedDate" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 focus-visible:outline-none">
                <option v-for="index of 8" :key="index">{{getDay(index-2)}}</option>
            </select>
        </div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 overflow-auto">
            <LaundrySchedule :selectedDate="selectedDate" :scheduleData="laundryStore.entriesByDay" @addEntry="addEntry" @deleteEntry="deleteEntry" />
        </div>
    </div>
</template>

<script lang="ts">
import LaundrySchedule from '~/components/LaundrySchedule.vue'
import { useLaundryStore } from '~/stores/LaundryStore'
import { useToastStore } from '~/stores/ToastStore'
import { useUserStore } from '~/stores/UserStore'
interface LaundryEntry {
  id: string, // 2022-08-17_time_washing-machine-number
  time: string, // 00:00-02:00
  wmn: number, // 1-6
  date: string, // 2022-08-17
  username: string, // Тимур Селин
  userId?: string //12345678
  status: "active" | "closed" | "passed"
}
export default {
    name: 'Laundry',
    components: {
        LaundrySchedule
    },
    data() {
        return {
            selectedDate: new Date().toLocaleDateString() as string,
            laundryStore: useLaundryStore(),
            toastStore: useToastStore(),
            userStore: useUserStore(),
            entries: [] as LaundryEntry[]
        }
    },
    mounted() {
        this.laundryStore.fill(this.selectedDate as string)
    },
    methods: {
        changeDay() {
            this.laundryStore.fill(this.selectedDate as string)
        },
        numberToTime(time: number) {
            switch (time) {
                case 1:
                    return "00:00 - 02:00"
                case 2:
                    return "02:40 - 04:40"
                case 3:
                    return "05:20 - 07:20"
                case 4:
                    return "08:00 - 10:00"
                case 5:
                    return "10:40 - 12:40"
                case 6:
                    return "13:20 - 15:20"
                case 7:
                    return "16:00 - 18:00"
                case 8:
                    return "18:40 - 20:40"
                case 9:
                    return "21:20 - 23:20"
            }
        },
        addEntry(entry: LaundryEntry) {
            if (this.$auth.loggedIn) {
                const newId = this.selectedDate + '_' + this.numberToTime(entry.w) + '_' + entry.h;
                this.laundryStore.fill(this.selectedDate)
                const arr = this.laundryStore.entriesByDay.map(x => x.id)
                if (!(arr.find((i) => i === newId))) {
                    this.laundryStore.addEntry({
                        id: newId,
                        userId: this.userStore.currentUser.id,
                        username: this.$auth.user.given_name + ' ' + this.$auth.user.family_name,
                        time: entry.w,
                        wmn: entry.h,
                        status: "active",
                        date: this.selectedDate,
                    })
                    this.laundryStore.fill(this.selectedDate)
                    
                    this.toastStore.addToast({
                        type: "success",
                        message: "Запись создана",
                        timeout: 4000
                    })
                } else {
                    this.toastStore.addToast({
                        type: "error",
                        message: "Такая запись уже существует",
                        timeout: 4000
                    })
                }
            }
            else {
                this.toastStore.addToast({
                    type: "error",
                    message: "Вы не вошли",
                    timeout: 4000
                })
            }
        },
        deleteEntry(entry: LaundryEntry) {
            if (this.$auth.loggedIn) {
                if (this.userStore.currentUser.id === entry.userId) {
                    if (confirm('Вы уверены, что хотите удалить запись?')) {
                        
                        if (new Date(entry.date.split('.').reverse().join('-') + ' ' + this.numberToTime(entry.time).split(' - ')[0]) > new Date()) {
                            this.laundryStore.deleteEntry(entry)
                            this.laundryStore.fill(this.selectedDate)
                            this.toastStore.addToast({
                                type: "warning",
                                message: "Запись удалена",
                                timeout: 4000
                            })
                        } else {
                            this.toastStore.addToast({
                                type: "error",
                                message: "Вы не можете удалить запись, которая уже началась.",
                                timeout: 4000
                            })
                        }
                    }
                }
                else {
                    this.toastStore.addToast({
                        type: "error",
                        message: "Вы не можете удалить не свою запись",
                        timeout: 4000
                    })
                }
            }
            else {
                this.toastStore.addToast({
                    type: "error",
                    message: "Вы не вошли",
                    timeout: 4000
                })
            }
        },
        getDay(skip: number) {
            const today = new Date()
            var nextDay = new Date(today)
            nextDay.setDate(today.getDate() + Number(skip))
            return nextDay.toLocaleDateString()
        }
    },
}
</script>

<style scope>

</style>