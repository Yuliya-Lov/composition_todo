<script setup>
import {ref, watch} from 'vue';
import {UiInput, UiList} from '@/components/ui';
import TaskItem from '@/components/TaskItem.vue';
import FiltersRow from '@/components/FiltersRow.vue';
import {useTodoPage} from '@/composables';
const newTaskName = ref('');
const {tasks, addNewTask} = useTodoPage();
watch(newTaskName, () => addNewTask(newTaskName.value));
</script>

<template>
  <FiltersRow />
  <UiInput v-model="newTaskName" placeholder="Добавить задачу" />
  <UiList :list="tasks" empty-text="Список задач пуст">
    <template #item="{item}">
      <TaskItem :task="item" />
    </template>
  </UiList>
</template>
