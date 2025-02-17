<template>
  <Teleport to="body">
    <div class="popup" v-if="isOpen" @click.self="onClosePopup">
      <div class="popup-content">
        <slot name="content" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
const emit = defineEmits(['closePopup']);
const {isOpen} = defineProps({
  isOpen: Boolean,
});
const onClosePopup = () => emit('closePopup');
</script>

<style lang="scss" scoped>
@use '@/scss' as styles;
.popup {
  @include styles.flex(column, center);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: styles.$overlay;
  z-index: 5;
  &-content {
    @include styles.flex(column, center);
    position: relative;
    padding: 30px;
    background: styles.$white;
    background-image: styles.$mainGradient;
    border-radius: 10px;
    max-width: 850px;
    width: 100%;
  }
}
</style>
