<template>
    <p v-if="age >= 25">
        {{ message }}
    </p>
    <p v-else>You must be 25 years or older to view this message</p>
</template>

<script>
export default {
    name: 'Greeting',
    props: ['age'],
    data() {
        return {
            message: 'Hello World!'
        }
    }
}
</script>


<style scoped lang="scss">
p:hover {
    color: darken(#cc4444, 15%);
}
</style>