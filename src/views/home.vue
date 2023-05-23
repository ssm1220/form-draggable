<template>
    <div class="app">
        <Editor :jsonData="data"></Editor>
    </div>
</template>

<script setup>
import data from "@/data.json"
import Editor from "@/packages/editor"
console.log(data, 'data')
</script>

<style scoped>
.app {
    padding: 20px;
}
</style>
