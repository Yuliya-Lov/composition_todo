<script setup>
import {Switcher, Counter, Filter} from './ui';
import {useSwitcher, useCounter} from '@/composables';
const {isDoneExcludes, onSwitch} = useSwitcher();
const {tasksCount, doneTasksCount} = useCounter();
</script>

<template>
  <header class="header">
    <h1 class="header_logo">TODOSHKA</h1>
    <div class="header_controls">
      <div class="header_counters">
        <Counter label="Всего задач" :count="tasksCount" />
        <Counter label="Выполнено" :count="doneTasksCount" />
        <Filter />
      </div>
      <Switcher label="Без выполненных" :isChecked="isDoneExcludes" @switch="onSwitch" />
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../scss' as styles;
.header {
  @include styles.flex(column, flex-start, flex-end);
  padding: 20px 0;
  &_controls {
    @include styles.flex(row, space-between, center);
    width: 100%;
    gap: 20px;
  }
  &_counters {
    @include styles.flex(row, flex-start);
    gap: 20px;
  }
  &_logo {
    @include styles.garamondText(40px);
    align-self: center;
  }
}
</style>
