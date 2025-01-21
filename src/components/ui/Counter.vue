<script setup>
import {defineProps} from 'vue';
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="counter">
    <p class="counter_text">
      {{ label }}: <span>{{ count }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss' as styles;
.counter {
  @include styles.flex(row, flex-start);
  gap: 10px;
  position: relative;
  width: max-content;
  &_text {
    @include styles.mainText(16px);
    text-wrap: nowrap;
    span {
      padding: 0 5px;
      @include styles.garamondText(19px);
      font-weight: 600;
      min-width: 2ch;
    }
  }
}
</style>
