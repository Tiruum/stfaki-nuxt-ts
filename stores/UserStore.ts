import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  balance: number,
  status: string,
  image: string
}

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    users: [] as User[],
    currentUser: {} as User | undefined,
    userById: {} as User | undefined
  }),
  getters: {
    
  },
  actions: {
    async getUsers() {
      this.users = await axios.get("/api/users")
      .then(res => res.data)
    },
    async registerUser(user: User) {
      await axios.post('/api/users', {
        id: new Date().toLocaleString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        balance: user.balance,
        status: user.status,
        image: user.image
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.users.push({...user, id: new Date().toLocaleString()})    
    },
    async getUserByEmail(email: unknown | string) {
      this.users = await axios.get("/api/users")
      .then(res => res.data)
      this.currentUser = this.users.find(user => user.email === email)
    },
    async getUserById(id: unknown | string) {
      this.users = await axios.get("/api/users")
      .then(res => res.data)
      this.userById = this.users.find(user => user.id === id)
    },
  }
})