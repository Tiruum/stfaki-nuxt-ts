<script lang="ts">
interface Login {
    username: String,
    password: String
}
export default {
    data() {
        return {
            login: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
    async userLogin() {
        this.$axios.post('auth/login', {
            username: this.login.username,
            password: this.login.password 
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    //   try {
    //     let response = await this.$auth.loginWith('local', { data: this.login })
    //     console.log(response)
    //   } catch (err) {
    //     console.log(err)
    //   }
    }
  }
}
</script>

<template>
    <div>
        <div class="mb-8">
            <h1 class="font-semibold text-3xl">Авторизация</h1>
            <p class="text-base mt-2">
                Войдите в свою учетную запись, чтобы пользоваться сервисами Тройки!
            </p>
        </div>

        <div class="rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm shadow-gray-200/50 dark:shadow-black/50 overflow-auto p-6">
            <form @submit.prevent="userLogin" class="space-y-2">
                <div>
                    <label>Username</label>
                    <input type="text" v-model="login.username" class="inpt bg-gray-800 text-gray-50" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" v-model="login.password" class="inpt bg-gray-800 text-gray-50" />
                </div>
                <div>
                    <button type="submit" class="px-4 py-2 rounded border">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scope>

</style>