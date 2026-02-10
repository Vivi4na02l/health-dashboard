<template>
  <section class="component">
    <div id="imgRecipe">
      <!-- image of recipe dish -->
    </div>
    <div>
      <h2>Francesinha</h2>
      <p>1h</p>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 2fr;

  background-color: var(--light-green);

  overflow: hidden;
}

#imgRecipe {
  background-image: url("https://imgs.search.brave.com/WOSEXf_1ojCjclu8QTFvWrs2sPa6Zx-CVWXyUwf13V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTYy/NDM4NjU5L3Bob3Rv/L2ZyYW5jZXNpbmhh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1USW5tTXNqSDZP/dDJUR0dSeHZzdS1Y/REJ2dF9XN28wcl9k/YUZFd3gyN0w4PQ");
  background-position: center;
  background-size: cover;
}
</style>
