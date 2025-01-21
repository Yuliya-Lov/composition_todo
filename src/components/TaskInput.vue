<script setup>
import {useTaskInput} from '@/composables';
const {text, addNewTask} = useTaskInput();
</script>

<template>
  <form class="form">
    <input type="text" class="form_input" placeholder="Добавить задачу" v-model="text" />
    <button class="form_button" type="submit" area-label="Добавить задачу" @click="addNewTask">
      <span class="form_button-icon">+</span>
    </button>
  </form>
</template>

<style scoped lang="scss">
@use '../scss' as styles;
.form {
  @include styles.flex(row, center);
  background: white;
  border-radius: 4px;
  &_input {
    width: 100%;
    right: 5rem;
    height: 3rem;
    padding: 0 10px;
    border: none;
    font-size: 2rem;
    outline: none;
    border: none;
    @include styles.mainText(24px);

    &::placeholder {
      color: styles.$green;
      //@include styles.mainText(24px);
    }
  }

  &_button {
    height: 3rem;
    width: 5rem;
    font-size: 2rem;
    color: styles.$green;
    background: white;
    cursor: pointer;
    transition: all 0.5s ease-out;
    &:hover {
      color: white;
      background: styles.$green;
      transition: all 0.5s ease-out;
    }
    &:hover .form_button-icon {
      background: styles.$green;
      color: white;
      transition: all 0.5s ease-out;
    }
  }
  &_button-icon {
    font-size: 34px;
    color: styles.$green;
    background: white;
    transition: all 0.5s ease-out;
  }
}
</style>
