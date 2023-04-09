let vm = Vue.createApp({
  data() {
    return {
      message: " Hello World !",
    };
  },
  template: `{{message}}`,
});

vm.component("hello", {
  template: `<h1>{{ message }}</h1>`,
  data() {
    return {
      message: "HELLO WORLD!",
    };
  },
});

vm.mount("#app");
