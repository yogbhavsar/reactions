<script lang="ts">
import Sudoku from './components/Sudoku.vue';

export default {
    components: { Sudoku }
}
</script>

<template>
  <div className="App">
    <header className="App-header">
      Sudoku
    </header>
  </div>
  <div className="gridContainer">
    <Sudoku></Sudoku>
  </div>
</template>

<!--<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>-->
