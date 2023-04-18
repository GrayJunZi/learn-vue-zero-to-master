import { ref, watchEffect, watch } from "vue";
export const usePhrase = () => {
  const phrase = ref("");
  const reversedPhrase = ref("");
  const reversedPhrase2 = ref("");

  watchEffect(() => {
    reversedPhrase.value = phrase.value.split("").reverse().join("");
  });

  watch([phrase], ([newValue, oldValue]) => {
    reversedPhrase2.value = newValue.split("").reverse().join();
  });

  return {
    phrase,
    reversedPhrase,
    reversedPhrase2,
  };
};
