<template>
    <v-overlay absolute :value="loading">
        <v-progress-circular indeterminate :size="50" color="primary">
        </v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        name: "Loader",
        props: ['loading']
    }
</script>

<style scoped>

</style>
