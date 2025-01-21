/*
<template>
  <popup>
    <div class="task-popup">
      <h2 class="task-popup__title">{{ title }}</h2>
      <div class="task-popup__content">
        <span class="task-popup__text">Прикрепить файл</span>
        <input type="file" class="task-popup__input" @click.stop />
      </div>
    </div>
  </popup>
</template>
<script setup>
import Popup from './ui/Popup.vue';
import {defineProps, computed, defineEmits} from 'vue';
import {useTaskStore} from '@/store';
const emit = defineEmits(['closePopup']);

const {id, isTaskPopupOpen} = defineProps({
  id: String,
  isTaskPopupOpen: Boolean,
});

const taskStore = useTaskStore();
const title = computed(() => taskStore.tasks.find((t) => t.id === id)?.title || '');

const onClosePopup = () => emit('closePopup');
</script>
<style lang="scss" scoped>
@use '../scss' as styles;
.task-popup__wrapper {
  @include styles.flex(column, center);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.task-popup {
  @include styles.flex(column, center);
  position: relative;
  padding: 20px;
  background: styles.$white;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  &__title {
    @include styles.flex(row, space-between);
    width: 100%;
    margin: 0;
    padding: 0;
    @include styles.mainText(20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
  }
  &__content {
    @include styles.flex(row, flex-start, center);
    gap: 10px;
    &::before {
      display: inline-block;
      content: 'dg';
      height: 3rem;
      width: 3rem;
      min-width: 3rem;
    }
  }
  &__text {
    margin: 0;
    padding: 0;
    @include styles.mainText(20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }
  }
}
</style>
*/
