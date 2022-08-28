<script>
export default {
    layout: 'empty',
    mounted() {
        const token = /access_token=([^&]+)/.exec(this.$route.hash)[1];
        alert(token)
        this.$axios.get('https://login.yandex.ru/info?oauth_token=' + token)

    }
}
</script>

<template>
<div class="w-screen h-screen bg-[#025fa2]">
    <div class="w-screen h-screen lg:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
        <DasrLogo :classes="'lg:block hidden mx-auto my-[5vh] h-[90vh] hidden lg:block'"
                    :fill="'none'" :strokeColor="'#fff'" :strokeWidth="'2px'" />
        <!-- <template>
            <form @submit="login()" v-if="!$auth.loggedIn" class="relative h-fit my-auto bg-white items-center rounded-3xl mx-auto lg:w-full md:w-3/4 w-full xl:p-14 lg:p-8 md:p-6 p-6">
                <DasrLogo :classes="'mx-auto h-14'" :fill="'#000'" />
                <h1 class="font-black text-3xl text-center">Добро пожаловать!</h1>
                <p class="font-light text-center mt-1">Введите свои данные ниже</p>
                
                <div class="mt-0">
                    <label class="font-bold mt-6">Почта</label>
                    <input class="inpt mt-1" type="text"
                            placeholder="Введите свою почту"/>
                </div>

                <div class="mt-2">
                    <label class="font-bold mt-3">Пароль</label>
                    <input class="inpt mt-1" type="password"
                            placeholder="•••••••••••"/>
                </div>

                <div class="mt-2 flex flex-row justify-between">
                    <div>
                        <input class="inline-block" style="transform: scale(1.2, 1.2)" type="checkbox"/>
                        <label class="ml-1 font-semibold text-sm">Запомнить</label>
                    </div>
                    <p class="text-[#025fa2] text-sm">Забыли пароль</p>
                </div>
                
                <NuxtLink to="/" exact><button class="w-full py-2 rounded-md mt-2 bg-[#025fa2] text-white uppercase">Войти</button></NuxtLink>
                <button class="w-full py-2 rounded-md mt-2 border border-[#025fa2] text-[#025fa2] uppercase hover:bg-[#025fa2] hover:text-white transition-all">Войти через Google</button>

                <p class="text-sm text-center mt-1">Еще не зарегистрированы? <a class="text-[#025fa2] cursor-pointer">Зарегистрируйтесь!</a></p>

            </form>
        </template> -->
    </div>
</div>
</template>