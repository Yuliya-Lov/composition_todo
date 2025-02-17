<template>
  <div class="switcher">
    <input class="switcher_input" type="checkbox" id="switch" :checked="isChecked" @change="onSwitch" />
    <label class="switcher_label" for="switch"></label>
    <p class="switcher_text">{{ label }}</p>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['switch']);
const onSwitch = () => emit('switch', !props.isChecked);
</script>

<style scoped lang="scss">
@use '@/scss' as styles;
.switcher {
  @include styles.flex(row, flex-start);
  gap: 10px;
  position: relative;
  width: fit-content;

  &_input {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
    &:checked + label {
      background: styles.$green;
    }
    &:checked + label:after {
      left: calc(100% - 3px);
      transform: translateX(-100%);
    }
  }

  &_label {
    cursor: pointer;
    text-indent: -9999px;
    width: 44px;
    height: 24px;
    background: styles.$grey;
    display: block;
    border-radius: 100px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      background: styles.$white;
      border-radius: 90px;
      transition: 0.3s;
      &:active:after {
        width: 130px;
      }
    }
  }
  &_text {
    @include styles.mainText(16px);
    width: max-content;
  }
}
</style>
