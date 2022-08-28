import { Context, Plugin } from "@nuxt/types";
import { defineStore } from "pinia";
import Vue from "vue";

interface IMutationPayload {
  key: string;
  value: any;
}

interface IAuthTinyStore<S> {
  readonly state: { [p: string]: S };

  registerModule(
    namespace: string,
    module: any,
    options: { preserveState?: boolean }
  ): void;

  commit(mutationName: string, payload: IMutationPayload): void;

  watch<T>(
    getter: (state: S, getters: any) => T,
    cb: (value: T, oldValue: T) => void,
    options?: any
  ): void;
}

export class FakeVuexAuthStore<S> implements IAuthTinyStore<S> {
  _ctx: Context;
  _namespace: string = "auth"; // equals with auth.vuex.namespace in nuxt.config
  _authStore: any;
  _watcherVM = new Vue();

  constructor(ctx: Context) {
    this._ctx = ctx;
  }

  private initCustomStore(id: string, initialState: {}) {
    // 1. PINIA Auth State
    const useAuthStore = defineStore({
      id,
      state: () => ({
        busy: false,
        ...initialState
      })
    });

    return useAuthStore;
  }

  // Fake vuex registerModule
  public registerModule(name: string, module: any, _options?: any) {
    this._namespace = name;

    // 1. Create Auth Store
    const useAuthStore = this.initCustomStore(this._namespace, module.state());
    this._authStore = useAuthStore(this._ctx.$pinia);
  }

  // Fake vuex state contain module 'auth'
  public get state() {
    return {
      // 2. implement full state getter
      [this._namespace]: (this._authStore?.$state ?? {}) as S
    };
  }

  public commit(mutationName: string, payload: IMutationPayload) {
    if (mutationName === `${this._namespace}/SET` && this._authStore) {
      // 3. implement state property setter
      this._authStore.$patch({
        [payload.key]: payload.value
      });
    }
  }

  // Fake vuex watch
  public watch<T>(
    getter: (state: any, getters: any) => T,
    cb: (value: T, oldValue: T) => void,
    options: any
  ): void {
    const this$1 = this;

    this._watcherVM.$watch(
      // 4. PINIA getters direct access as state properties
      () => getter(this$1.state, this$1.state),
      cb,
      options
    );
  }
}

// NUXT PLUGIN for inject $store
const piniaAuthStorePlugin: Plugin = (context) => {
  const fakeStore = new FakeVuexAuthStore(context);

  // @ts-ignore
  context.store = fakeStore;
};

export default piniaAuthStorePlugin;