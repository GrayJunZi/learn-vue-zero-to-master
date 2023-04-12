import { defineStore } from 'pinia'
import { userCollection, auth } from '@/includes/localStore'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      var userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      const user = await userCollection.set({
        uid: userCred.user.uid,
        name: values.name,
        email: values.email,
        password: values.password,
        age: values.age,
        country: values.country
      })

      auth.currentUser(user)
      this.userLoggedIn = true
    },
    async authenticate(values) {
      const user = await auth.signInWithEmailAndPassword(values.email, values.password)
      auth.currentUser(user)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
