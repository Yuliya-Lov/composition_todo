<script setup>
import TaskItem from './TaskItem.vue';
import {useTaskList} from '@/composables';
const {tasks} = useTaskList();
</script>

<template>
  <section class="task-list" area-label="Список задач">
    <article class="task-list__empty" v-if="tasks.length === 0">
      <p>Список задач пуст</p>
    </article>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use '../scss' as styles;
.task-list {
  @include styles.flex(column, flex-start);
  margin: 20px 0;
  max-height: 55vh;
  height: 55vh;
  overflow-y: auto;
  ul {
    @include styles.flex(column, flex-start);
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0 5px 0 0;
    width: calc(100% - 5px);
  }
  li {
    width: 100%;
  }
  &__empty {
    @include styles.flex(column, center);
    gap: 10px;
    p {
      @include styles.mainText(20px);
    }
  }
}
</style>
