import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    console.log(this.options);
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }
    
    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=5230ad75d7624818a97070c9910d409d&redirect_uri=http://localhost:3000/login",
      this.options.endpoints.user
    ).then((response) => {
        console.log(response);
    //   const user = getProp(response.data, this.options.user.property)
      
    //   // Transform the user object
    //   const customUser = {
    //     ...user,
    //     fullName: user.firstName + ' ' + user.lastName,
    //     roles: ['user']
    //   }
      
    //   // Set the custom user
    //   // The `customUser` object will be accessible through `this.$auth.user`
    //   // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
    //   this.$auth.setUser(customUser)

    //   return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}