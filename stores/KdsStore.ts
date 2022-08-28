import { defineStore } from 'pinia'
import axios from 'axios'

interface Entry {
  time: string[],
  title: string,
  date: string,
  color: string,
  darkColor: string,
  username: string,
  userId?: string
}

export const useKdsStore = defineStore('KdsStore', {
  state: () => ({
      entries: [] as Entry[]
  }),
  getters: {
    count(): number {
      return this.entries.length
    }
  },
  actions: {
    async fill(start_date?: string, how_long?: number) {
      // this.entries = (await import("@/assets/json/entries.json")).default
      if (start_date && how_long) { // Если определен интервал
        // const dayInterval = (Number(new Date(end_date)) - Number(new Date(start_date)))/(1000*60*60*24);
        const dayInterval = how_long

        // Получаем массив всех запрошенных дат
        const dayArray = [] as string[]
        for (let i = 0; i <= dayInterval; i++) {
          dayArray.push(new Date(new Date().setDate(new Date().getDate() + i)).toJSON().slice(0, 10))
        }
        
        const allEntries = await axios.get("/api/entries")
        .then(res => res.data)
        .catch(e => console.error(e))
  
        this.entries = allEntries.filter(entry => dayArray.includes(entry.date))
        
      } else { // Вывод всех записей        
        this.entries = await axios.get("/api/entries")
        .then(res => res.data)
        .catch(e => console.error(e))
      }

      console.log(this.entries);
    },

    async addEntry(entry: Entry) {
      this.entries = await axios.post("/api/entries", {
        ...entry
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.data)
      .catch(e => console.error(e))

      // this.entries.push({
      //   ...entry,
      //   id: new Date().toLocaleString()
      // })
    },
    async deleteEntry(id: string) {
      this.entries = await axios.delete("/api/entries/" + id)
      .then(res => res.data)
      .catch(e => console.error(e))
    }
  }
})