import { defineStore } from 'pinia'

interface FullToast {
  id: string,
  type: "success" | "warning" | "error" | "info",
  message: string,
  timeout: number
}

interface Toast {
  type: "success" | "warning" | "error" | "info",
  message: string,
  timeout: number
}

export const useToastStore = defineStore('ToastStore', {
  state: () => ({
    toasts: [] as FullToast[]
  }),
  getters: {
    count(): number {
      return this.toasts.length
    }
  },
  actions: {
    addToast(toast: Toast): void {
      this.toasts.push({...toast, id: new Date().toString() + Math.random().toString(36).substring(2)})
    },
    deleteToast(id: string): void {
      this.toasts = this.toasts.filter(toast => {return toast.id != id})     
      console.log('%cToast with id ' + id + '%c has  been deleted', 'color: green; font-weight: thin;');
    }
  }
})