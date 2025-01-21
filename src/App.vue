<script setup>
import TodoPage from './components/TodoPage.vue';
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <main class="content">
    <TodoPage />
  </main>
</template>

<style scoped lang="scss">
@use './scss' as styles;
.content {
  @include styles.flex(column, flex-start, stretch);
  max-width: 900px;
}
</style>
