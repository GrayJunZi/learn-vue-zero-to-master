<template>
  <div>
    <p>{{ num }}</p>
    <p>{{ double }}</p>
    <button type="button" @click.prevent="increment">Click me</button>

    <p>{{ user.name }}</p>
    <p>{{ name }}</p>

    <p>
      <input type="text" v-model="phrase" />
    </p>
    <p>{{ reversedPhrase }}</p>
    <p>{{ reversedPhrase2 }}</p>

    <app-alert :user="user" />

    <button type="button" ref="btn">Button</button>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import AppAlert from '@/components/Alert.vue'
import { useNumber } from '@/hooks/number';
import { usePhrase } from '@/hooks/phrase'
export default {
  name: 'App',
  components: {
    AppAlert
  },
  setup() {
    const { num, increment, user } = useNumber()
    const { phrase, reversedPhrase, reversedPhrase2 } = usePhrase()
    return {
      num,
      increment,
      double,
      user,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      reversedPhrase2,
      btn
    }
  }
}
</script>
