<template>
    <h1>Home Page</h1>
</template>

<script>
export default {
    unmounted() {
        console.log(`home component unmounted`)
    },
    activated() {
        console.log(`home component activate`)
    },
    deactivated() {
        console.log(`home component deactivated`)
    }
}
</script>