<script setup lang="ts">
import DasrLogo from '@/components/DasrLogo.vue';
import { useUserStore } from '~/stores/UserStore';
import { useLaundryStore } from '~/stores/LaundryStore';


</script>

<template>
    <aside class="lg:w-64 sm:w-16 w-0 h-screen fixed transition-all overflow-auto" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 bg-white dark:bg-gray-800 h-full left-0 shadow-sm">
            <ul class="space-y-2">
                <li>
                    <!-- <NuxtLink to="/">
                        <span
                            class="items-center hidden lg:block p-2 text-xl font-semibold text-gray-900 dark:text-white">Сервисы
                            ФАКТ</span>
                        <span
                            class="items-center flex lg:hidden p-2 text-2xl font-semibold text-gray-900 dark:text-white">
                            <DasrLogo v-bind:fill="'#fff'" />
                        </span>
                    </NuxtLink> -->

                    <span v-if="$auth.loggedIn" class="items-center flex p-2 text-xl font-semibold text-gray-900 dark:text-white">
                        <div class="aspect-square lg:h-12 h-6 rounded-full bg-white overflow-hidden">
                            <img class="w-full h-full object-center object-cover rounded-full" :src="$auth.$state.user.picture" alt="ProfilePicture" />
                        </div>
                        <span class="ml-3 hidden lg:flex lg:flex-col">
                            <span class="text-md">{{$auth.$state.user.name}}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Баланс: {{balance}}₽</span>
                        </span>
                    </span>
                    <span v-else class="items-center flex p-2 text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                            <div class="aspect-square h-6 rounded-full bg-white overflow-hidden"></div>
                            <NuxtLink to="/auth"><span class="ml-3 hidden lg:block">Войти</span></NuxtLink>
                    </span>
                </li>
                <li>
                    <NuxtLink to="/" exact active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 p-0.5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z"/>
		                    <path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"/>
                        </svg>
                        <span class="ml-3 hidden lg:block">Главная</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/laundry" active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.43,10v6.25a1.7,1.7,0,0,1-1.27,1.69,2.07,2.07,0,0,1-.5.06H3.49a1.71,1.71,0,0,1-1.77-1.77q0-6.23,0-12.46A1.7,1.7,0,0,1,3.48,2H13.66a1.71,1.71,0,0,1,1.77,1.77ZM8.56,16.29A4.58,4.58,0,1,0,4,11.71,4.57,4.57,0,0,0,8.56,16.29ZM4.86,4.86h.82a.59.59,0,0,0,.61-.57.58.58,0,0,0-.6-.57c-.56,0-1.11,0-1.66,0a.57.57,0,0,0-.6.57A.57.57,0,0,0,4,4.86Zm8.29,0a.59.59,0,0,0,.57-.58.58.58,0,0,0-1.15,0A.58.58,0,0,0,13.15,4.86ZM11.43,3.72a.57.57,0,0,0-.57.56.57.57,0,1,0,1.14,0A.57.57,0,0,0,11.43,3.72Z"
                                transform="translate(1.71 0)" />
                            <path
                                d="M12,11.73a3.37,3.37,0,0,1-.59,1.91,3.42,3.42,0,0,1-6.22-1.37.41.41,0,0,1,0-.11c0-.53-.13-.42.39-.62a3.71,3.71,0,0,1,3,.16,3.9,3.9,0,0,0,2,.41,3.66,3.66,0,0,0,1.22-.31Z"
                                transform="translate(1.71 0)" />
                        </svg>
                        <span class="ml-3 hidden lg:block">Прачечная</span>
                        <template v-if="$auth.loggedIn">
                            <span v-if="useLaundryStore().getEntryAmount($auth.user.given_name + ' ' + $auth.user.family_name) != 0" class="inline-flex justify-center items-center w-3 h-3 p-2 text-xs lg:p-3 lg:ml-3 lg:text-sm font-medium text-green-600 bg-green-200 rounded-full dark:bg-green-800 dark:text-green-200">{{useLaundryStore().getEntryAmount($auth.user.given_name + ' ' + $auth.user.family_name)}}</span>
                        </template>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/club" active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                        <svg class="flex-shrink-0 w-6 h-6 p-0.5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z"/>
                        </svg>
                        <i class="fi fi-sr-tool-box"></i>
                        <span class="ml-3 hidden lg:block">Клуб Романтики</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/kds" no-prefetch
                        active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                            </path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap hidden lg:block">Комната для собраний</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/meetingroom" no-prefetch
                        active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.85,9.37a.63.63,0,0,1-.63-.62,5,5,0,0,0-5-5,.63.63,0,0,1,0-1.25,6.25,6.25,0,0,1,6.25,6.25A.62.62,0,0,1,16.85,9.37ZM15,8.75A3.75,3.75,0,0,0,11.22,5a.63.63,0,0,0,0,1.25,2.5,2.5,0,0,1,2.5,2.5.63.63,0,0,0,1.25,0Zm1.37,7.6.56-.65a1.93,1.93,0,0,0,0-2.74l-1.52-1.18a1.93,1.93,0,0,0-2.67,0l-1.19,1A8,8,0,0,1,7.18,8.45l1-1.18a1.94,1.94,0,0,0,0-2.68L7,3.07a1.92,1.92,0,0,0-2.7,0l-.72.62c-4.25,4.93,4.9,14,10,13.84A3.89,3.89,0,0,0,16.34,16.35Z" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap hidden lg:block">Переговорная</span>
                    </NuxtLink>
                </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <li>
                    <NuxtLink to="/instruments" no-prefetch active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 p-0.5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19,12h5v7c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5v-7H5v1c0,.552,.447,1,1,1s1-.448,1-1v-1h10v1c0,.552,.447,1,1,1s1-.448,1-1v-1Zm5-3v1h-5v-1c0-.552-.447-1-1-1s-1,.448-1,1v1H7v-1c0-.552-.447-1-1-1s-1,.448-1,1v1H0v-1c0-2.757,2.243-5,5-5h1.101C6.566,1.721,8.586,0,11,0h2c2.414,0,4.434,1.721,4.899,4h1.101c2.757,0,5,2.243,5,5ZM8.184,4h7.631c-.414-1.161-1.514-2-2.816-2h-2c-1.302,0-2.402,.839-2.816,2Z"/>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap hidden lg:block">Инструментарий</span>
                        <span
                            class="justify-center items-center hidden lg:inline-flex px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Скоро</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/vacuumcleaner" no-prefetch active-class="bg-gray-100 dark:bg-gray-700 text-gray-900 text-white"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 p-0.5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5,24a1,1,0,0,1-.929-.628l-.844-2.113-2.116-.891a1.007,1.007,0,0,1,.035-1.857l2.088-.791.837-2.092a1.008,1.008,0,0,1,1.858,0l.841,2.1,2.1.841a1.007,1.007,0,0,1,0,1.858l-2.1.841-.841,2.1A1,1,0,0,1,19.5,24ZM10,21a2,2,0,0,1-1.936-1.413L6.45,14.54,1.387,12.846a2.032,2.032,0,0,1,.052-3.871L6.462,7.441,8.154,2.387A1.956,1.956,0,0,1,10.108,1a2,2,0,0,1,1.917,1.439l1.532,5.015,5.03,1.61a2.042,2.042,0,0,1,0,3.872h0l-5.039,1.612-1.612,5.039A2,2,0,0,1,10,21ZM20.5,7a1,1,0,0,1-.97-.757l-.357-1.43L17.74,4.428a1,1,0,0,1,.034-1.94l1.4-.325L19.53.757a1,1,0,0,1,1.94,0l.354,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355L21.47,6.243A1,1,0,0,1,20.5,7Z"/>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap hidden lg:block">Пылесос</span>
                        <span
                            class="justify-center items-center hidden lg:inline-flex px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Скоро</span>
                    </NuxtLink>
                </li>
            </ul>
            <ul v-if="$auth.loggedIn" class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <li>
                    <span @click="() => {$auth.logout(); $forceUpdate()}" href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap hidden lg:block cursor-pointer">Выйти</span>
                    </span>
                </li>
            </ul>
            <span class="absolute text-gray-500 text-xs mt-auto bottom-3">Alpha v1.1.2.3</span>
            <!-- prealpha(0)-alpha(1)-beta(2)-releasecandidate(3)-release(4).major-changes.minor-changes.amount-of-fixed-bugs -->
        </div>
    </aside>
</template>

<script lang="ts">
export default {
    data() {
        return {
            userStore: useUserStore(),
            laundryStore: useLaundryStore(),
            balance: 0 as number,
            status: 'user',
            entryAmount: 0 as null | number
        }
    },
    methods: {
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.$axios.$get('/users')
            .then(res => {
                const user = res.find(obj => obj.email === this.$auth.user.email)
                if (user) {
                    this.balance = user.balance
                    this.status = user.status
                } else {
                    this.userStore.registerUser({
                        first_name: this.$auth.user.given_name,
                        last_name: this.$auth.user.family_name,
                        email: this.$auth.user.email,
                        balance: 0,
                        status: "user",
                        image: this.$auth.user.picture
                    })
                }
                this.entryAmount = this.laundryStore.getEntryAmount("Тимур Селин")
            })

        }
    }
}
</script>

<style scope>

</style>