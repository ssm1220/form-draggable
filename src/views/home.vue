<template>
  <div class="app">
    <Editor v-model="state"></Editor>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import data from "@/data.json";
import Editor from "@/packages/editor";
import { registerConfig } from "@/utils/editor-config.jsx";
const state = ref(data);
provide('config',registerConfig)
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>
