const vm = Vue.createApp({
  data() {
    return {
      firstName: "John",
      lastName: "Doe",
      url: "https://bing.com",
      raw_url: '<a href="https://bing.com" target="_blank">必应</a>',
      age: 20,
    };
  },
  methods: {
    increment() {
      this.age++;
    },
    updateLastName(event) {
      this.lastName = event.target.value;
    },
    updateLastNameLog(msg, event) {
      event.preventDefault();

      console.log(msg);

      this.lastName = event.target.value;
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName.toUpperCase()}`;
    },
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 20;
      }, 3000);
    },
  },
}).mount("#app");

/**
 * 
setTimeout(() => {
  vm.firstName = "Jane";
});
*/
