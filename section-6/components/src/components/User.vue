<template>
    <button type="button" @click="onClickAge">Update Age</button>
    <button type="button" @click="ageChangeFn(3)">Update Age Callback</button>
    <p>The user is {{ age }} years old</p>
    <p>{{ ageDouble }}</p>
</template>

<script>
export default {
    name: 'User',
    // props: ['age'],
    props: {
        age: {
            type: Number,
            required: true,
            default: 20,
            validator(value) {
                return value < 130
            }
        },
        ageChangeFn: Function
    },
    emits: ['age-change'],
    methods: {
        onClickAge() {
            this.$emit('age-change', 3)
        }
    },
    computed: {
        ageDouble() {
            return this.age * 2
        }
    }
}
</script>

<style lang="scss" scoped></style>