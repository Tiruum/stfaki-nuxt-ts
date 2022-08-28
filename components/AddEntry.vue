<script setup lang="ts">
import { useToastStore } from '~/stores/ToastStore';


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

    let form: EntryForm = ({
        title: '',
        start_date: '',
        end_date: '',
        start_time: new Date().toJSON().slice(0, 10),
        end_time: new Date().toJSON().slice(0, 10),
        periodic: 'no-repeat',
        color: 'blue'
    })
</script>

<script lang="ts">
export default {
    props: ['scheduleData'],
    data() {
        return {
            toastStore: useToastStore()
        }
    },
    methods: {
        validateDateTime(form: EntryForm, scheduleData: Entry[]) {
            function range(start: string, end: string): number[] {
                var ans = [];
                for (let i = Number(start.slice(0, 2)); i <= Number(end.slice(0, 2)); i++) {
                    ans.push(i);
                }
                return ans;
            };
            function timeToNum(time: string): number {
                return Number(time.slice(0, 2))
            };
            function getEmptySpace(todayEntries: Entry[]): number[] {
                let emptySpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                todayEntries.forEach(function(entry: Entry){
                    emptySpace = emptySpace.filter(x => !range(entry.time[0], entry.time[1]).includes(x))
                    console.log('emptySpace after filter: ', emptySpace);
                    console.log(entry);
                    
                    
                    emptySpace.push(timeToNum(entry.time[0]), timeToNum(entry.time[1])) // Здесь я включаю границу множества, чтобы можно было, например, начинать запись с 05:00,
                    // если предыдущая запись закончилась в 05:00
                    console.log(emptySpace.sort());
                    
                });
                return emptySpace;
            };

            if (this.$auth.loggedIn) {
                if (form.start_date === form.end_date) {
                    
                    if ( Number(form.end_time.slice(0, 2))-Number(form.start_time.slice(0, 2)) <= 6 && Number(form.end_time.slice(0, 2)) > Number(form.start_time.slice(0, 2)) && Number(form.start_time.slice(0, 2)) >= 0 && Number(form.end_time.slice(0, 2)) <= 23 ) {
                        console.log(scheduleData);
                        
                        let todayEntries = scheduleData.filter(entry => entry.date === form.start_date)
                        console.log(todayEntries);
                        
                        if (todayEntries) {
                            let emptySpace = [] as number[]
                            if (Array.isArray(todayEntries)) {
                                emptySpace = getEmptySpace(todayEntries)
                            } else {
                                emptySpace = getEmptySpace([todayEntries])
                            }
                            if (range(form.start_time, form.end_time).sort().join(',') === emptySpace.filter(x => range(form.start_time, form.end_time).includes(x)).sort().join(',')) {
                                this.$emit('addEntry', form) // Добавить запись, которая прошла валидацию
                                this.toastStore.addToast({
                                    type: "success",
                                    message: "Запись успешно создана",
                                    timeout: 4000
                                })
                                // form.title = form.start_date = form.end_date = form.start_time = form.end_time = ""
                                // console.log(range(form.start_time, form.end_time).sort());
                                // console.log(emptySpace.sort());
                            } else {
                                this.toastStore.addToast({
                                    type: "error",
                                    message: "Записи перекрывают друг друга",
                                    timeout: 4000
                                })
                            }
                        }
                    } else {
                        this.toastStore.addToast({
                            type: "error",
                            message: "Нельзя делать бронь дольше 6 часов или равной нулю",
                            timeout: 4000
                        })
                    }
                    //this.$emit('addEntry', form)
                } else {
                    this.toastStore.addToast({
                        type: "error",
                        message: "Пока что можно бронировать комнату в пределах одного дня",
                        timeout: 4000
                    })
                }
            } else {
                this.toastStore.addToast({
                    type: "error",
                    message: "Вы не зарегистрированы",
                    timeout: 4000
                })
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="validateDateTime(form, scheduleData)">
        <h2 class="font-semibold text-lg">Название и дата</h2>
        
        <div class="w-full">
            <label class="text-xs text-gray-500" html-for="title">Название</label><br />
            <input class="inpt" type="text" id="title" name="title" v-model=form.title placeholder="Название мероприятия" required />
        </div>

        <div class="flex flex-row gap-4 justify-evenly w-full">
            <div class="w-1/2">
                <label class="text-xs text-gray-500" html-for="start_date">Дата начала</label>
                <input class="inpt" type="date" value="form.start_date" v-model=form.start_date id="start_date" name="start_date" required />
            </div>
            <div class="w-1/2">
                <label class="text-xs text-gray-500" html-for="end_date">Дата конца</label>
                <input class="inpt" type="date" v-model=form.end_date id="end_date" name="end_date" required />
            </div>
        </div>

        <h2 class="font-semibold text-lg mt-4">Время</h2>
        <div class="flex flex-row gap-4 justify-evenly w-full">
            <div class="w-1/2">
                <label class="text-xs text-gray-500" html-for="start_time">Время начала</label><br />
                <input class="inpt" type="time" value="form.start_time" v-model=form.start_time id="start_time" name="start_time" step="3600" required />
            </div>
            <div class="w-1/2">
                <label class="text-xs text-gray-500" html-for="end_time">Время конца</label><br />
                <input class="inpt" type="time" value="form.end_time" v-model=form.end_time id="end_time" name="end_time" step="3600" required />
            </div>
        </div>

        <h2 class="font-semibold text-lg mt-4">Периодичность и цвет</h2>
        <div class="flex flex-row gap-4 justify-evenly w-full">
            <div class="w-full">
                <label class="text-xs text-gray-500" html-for="repeat">Периодичность</label><br />
                <select class="inpt" disabled name="type" id="repeat" v-model=form.periodic required >
                    <option value="no-repeat">Не повторять</option>
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                    <option value="monthly">Ежемесячно</option>
                </select>
            </div>

            <div class="w-full">
                <label class="text-xs text-slate-500" html-for="color">Цвет</label><br />
                <select class="inpt" name="color" id="color" v-model=form.color required >
                    <option value="blue">Голубой</option>
                    <option value="purple">Фиолетовый</option>
                    <option value="pink">Розовый</option>
                </select>
            </div>
        </div>

        <div class="mt-4 w-fit ml-auto">
            <button class="bg-green-500 text-white px-3 py-2 rounded-md" type="submit">Создать</button>
            <button class="ml-1 border border-gray-200 px-3 py-2 rounded-md" @click="$emit('closeModal')">Не, проехали</button>
        </div>
    </form>
</template>

<style scope>

</style>