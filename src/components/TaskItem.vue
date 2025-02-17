<script setup>
import {UiPopup, UiFileArea} from '@/components/ui';
import {defineProps} from 'vue';
import {useTaskItem} from '@/composables';
import {useTaskStore, useFileStore} from '@/store';
const taskStore = useTaskStore();
const fileStore = useFileStore();
const {task} = defineProps({
  task: Object,
});
const {openTaskPopup, closeTaskPopup, toggleCompleteTask, deleteTask, isTaskPopupOpen, taskTitle, debounceTaskTitle} =
  useTaskItem(task);
function addFiles(files) {
  files.forEach((file) => {
    fileStore.addFile(file);
    taskStore.addTaskFile(task, file.id);
  });
}
function deleteFile(fileId) {
  taskStore.removeTaskFile(task.id, fileId);
  fileStore.removeFile(fileId);
}
</script>

<template>
  <Transition name="slide-task">
    <article class="task" area-label="Задача">
      <div class="task_content" @click="openTaskPopup">
        <input
          class="task_text short"
          :class="{task_text_done: task.isDone}"
          v-model="taskTitle"
          @input="debounceTaskTitle"
          :disabled="task.isDone"
          @click.stop
        />
      </div>
      <div class="task_controls">
        <button
          class="task_button task_button_done"
          :class="!task.isDone ? 'task_button_done' : 'task_button_revert'"
          type="button"
          area-label="Выполнить задачу"
          @click.stop="toggleCompleteTask(task)"
        ></button>
        <button
          class="task_button task_button_delete"
          type="button"
          @click.stop="deleteTask"
          area-label="Удалить задачу"
        ></button>
      </div>
      <UiPopup :isOpen="isTaskPopupOpen" @closePopup="closeTaskPopup">
        <template #content>
          <div class="popup__wrapper">
            <h2 class="task_text" :class="{task_text_done: task.isDone}">{{ task.title }}</h2>
            <UiFileArea
              :task-files="task.documents"
              :is-disabled="task.isDone"
              @addFiles="addFiles"
              @deleteFile="deleteFile"
            />
          </div>
        </template>
      </UiPopup>
    </article>
  </Transition>
</template>

<style scoped lang="scss">
@use '../scss' as styles;
.task {
  @include styles.flex(row, space-between, center);
  gap: 10px;
  &_content {
    @include styles.flex(row, flex-start, center);
    width: 87%;
    gap: 10px;
    &::before {
      display: inline-block;
      content: url('./task-icon.svg');
      height: 3rem;
      width: 3rem;
      min-width: 3rem;
    }
  }
  &_text {
    margin: 0;
    padding: 0;
    @include styles.mainText(20px);
    vertical-align: middle;
    border: none;
    background-color: transparent;
    color: inherit;
    &.short {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      width: inherit;
    }
    &_done {
      text-decoration: line-through;
    }
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  &_controls {
    @include styles.flex(row, flex-end, center);
    gap: 10px;
    width: fit-content;
  }
}
.task_button {
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  padding: 1rem;
  border-radius: styles.$border-radius;
  min-height: 3rem;
  min-width: 3rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80%;
  &_done {
    background-color: styles.$green;
    background-image: url('/done-icon.svg');
  }
  &_revert {
    background-color: styles.$green;
    background-size: 60%;
    background-image: url('/revert-icon.svg');
  }
  &_delete {
    background-color: styles.$orange;
    background-image: url('/delete-icon.svg');
  }
}
.slide-task-enter-active,
.slide-task-leave-active {
  transition: all 0.5s ease;
}
.slide-task-enter-from,
.slide-task-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
.slide-task-leave-from,
.slide-task-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.popup__wrapper {
  @include styles.flex(column, flex-start, flex-start);
}
</style>
