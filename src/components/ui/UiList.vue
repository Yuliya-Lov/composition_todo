<template>
  <section class="list" area-label="Список">
    <article class="list__empty" v-if="list.length === 0">
      <p>{{ emptyText }}</p>
    </article>
    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id">
        <slot name="item" :item="item" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import {defineProps} from 'vue';
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  emptyText: {
    type: String,
    default: 'Список  пуст',
  },
});
</script>

<style scoped lang="scss">
@use '@/scss' as styles;
.list {
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
