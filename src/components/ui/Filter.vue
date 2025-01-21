<script setup>
import {ref, watch} from 'vue';
import {useSearchInput} from '@/composables';
const input = ref(null);
const searchString = ref('');
const {focusInput, setSearchString} = useSearchInput();
watch(searchString, () => {
  setSearchString(searchString.value);
});
</script>

<template>
  <form class="form">
    <button class="form_button" type="button" area-label="Найти задачу" @click="focusInput(input)" />
    <input ref="input" type="text" class="form_input" placeholder="найти задачу" v-model="searchString" />
    <hr class="form_line" />
  </form>
</template>

<style scoped lang="scss">
@use '@/scss' as styles;
.form {
  position: relative;
  @include styles.flex(row, flex-start);

  &_button {
    background-color: transparent;
    height: 2rem;
    width: 2rem;
    min-width: 2rem;
    padding: 0;
    cursor: pointer;
    transition: all 0.5s ease-out;
    background-image: url('./search-icon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: 1px;
    &:hover {
      transition: all 0.5s ease-out;
    }
  }
  &_input {
    right: 1rem;
    height: 1.5rem;
    padding: 0 10px;
    border: none;
    font-size: 2rem;
    outline: none;
    border: none;
    background-color: transparent;
    @include styles.mainText(16px);
    border-bottom: 1px solid transparent;
    width: 100%;

    &::placeholder {
      @include styles.mainText(16px);
      color: styles.$greyText;
      display: block;
      width: 0;
      transition: width 0.5s ease-out;
    }
  }
  &_line {
    padding: 0;
    height: 0;
    border: none;
    position: absolute;
    bottom: 3px;
    left: 2rem;
    width: 0;
    margin: 0;
    border-top: 1px solid styles.$greyText;
    transition: width 0.5s ease-out;
  }
  &:has(> .form_input:focus) &_line {
    width: calc(100% - 2rem);
    transition: width 0.5s ease-out;
  }
  &:has(> .form_input:focus) &_input::placeholder {
    width: 100%;
    transition: width 0.5s ease-out;
  }
}
</style>
