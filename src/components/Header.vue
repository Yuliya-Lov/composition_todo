<template>
  <header class="header">
    <h1 class="header_logo">TODOSHKA</h1>
  </header>
</template>

<style scoped lang="scss">
@use '../scss' as styles;
.header {
  @include styles.flex(column, flex-start, flex-end);
  padding: 20px 0;
  &_logo {
    @include styles.garamondText(40px);
    align-self: center;
  }
}
</style>
