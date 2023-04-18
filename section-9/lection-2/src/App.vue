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
import { ref, reactive, toRefs, watchEffect, watch, computed, onBeforeMount, onMounted, isRef, isReactive } from 'vue'
import AppAlert from '@/components/Alert.vue'

export default {
  name: 'App',
  components: {
    AppAlert
  },
  setup() {

    const btn = ref(null)

    onBeforeMount(() => {
      console.log('onBeforeMount()')
    })

    onMounted(() => {
      console.log('onMounted()')

      btn.value.addEventListener('click', () => console.log('Button Click'))
    })

    let num = ref(0)

    const increment = () => {
      num.value++
    }

    const double = computed(() => {
      return num.value * 2
    })

    const user = reactive({
      name: "John",
      age: 20,
    });

    console.log(isRef(num))
    console.log(isReactive(user))

    setTimeout(() => {
      user.name = 'Luis'
    }, 3000)

    const phrase = ref("")
    const reversedPhrase = ref("")
    const reversedPhrase2 = ref("")

    watchEffect(() => {
      reversedPhrase.value = phrase.value.split("").reverse().join("")
    })

    watch([phrase], ([newValue, oldValue]) => {
      reversedPhrase2.value = newValue.split("").reverse().join()
    })

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
