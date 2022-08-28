import { defineStore, PiniaPluginContext } from "pinia";

export const useAuthStore = defineStore({
  id: "AuthStore",
  state: () => ({
    busy: false,
    user: null as null | false | Record<string, unknown>,
    loggedIn: false,
    strategy: undefined,
    redirect: undefined as undefined | string,
  }),
  actions: {
    fill(obj: Record<string, unknown>) {
      this.user = obj
    }
  }
});