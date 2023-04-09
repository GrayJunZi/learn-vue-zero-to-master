let vm = Vue.createApp({
  data() {
    return {
      message: " Hello World !",
    };
  },
  // 生命周期钩子
  beforeCreate() {
    // 此时还未代理数据属性，所以访问不到message数据
    console.log(`beforeCreate() 函数被调用!`, this.message);
  },
  created() {
    // 此时数据属性已被代理，所以可以访问到message数据
    console.log(`created() 函数被调用！`, this.message);
  },
  beforeMount() {
    // 此时视图没有访问数据属性的权限，所以访问不到message数据
    console.log(`beforeMount() 函数被调用！`, this.message);
  },
  mounted() {
    // 此时可以访问message数据
    console.log(`mounted() 函数被调用！`, this.message);
  },
  beforeUpdate() {
    console.log(`beforeUpdate() 函数被调用！`);
  },
  updated() {
    console.log(`updated() 函数被调用！`);
  },
  beforeUnmount() {
    console.log(`beforeUnmount() 函数被调用！`);
  },
  unmounted() {
    console.log(`unmounted() 函数被调用！`);
  },
});

vm.mount("#app");
