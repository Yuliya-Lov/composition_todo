<template>
  <div class="filters">
    <div class="filters__counters">
      <UiCounter label="Всего задач" :count="tasksCount" />
      <UiCounter label="Выполнено" :count="doneTasksCount" />
      <UiFilter placeholder="найти задачу" @search-string="($event) => onFilter($event)" />
    </div>
    <UiSwitcher label="Без выполненных" :isChecked="taskStore.isDoneExcludes" @switch="onSwitch($event)" />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {UiSwitcher, UiCounter, UiFilter} from '@/components/ui';
import {useTaskStore} from '@/store';
const taskStore = useTaskStore();
const tasksCount = computed(() => taskStore.tasks.length || 0);
const doneTasksCount = computed(() => taskStore.tasks.filter((t) => t.isDone).length || 0);
function onSwitch(value) {
  taskStore.setIsDoneExcludes(value);
}
function onFilter(value) {
  taskStore.setSearchString(value);
}
</script>

<style scoped lang="scss">
@use '@/scss' as styles;
.filters {
  @include styles.flex(row, space-between, center);
  width: 100%;
  gap: 20px;
  &__counters {
    @include styles.flex(row, flex-start);
    gap: 20px;
  }
}
</style>
