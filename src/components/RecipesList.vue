<template>
  <section class="component">
    <aside id="imgRecipe">
      <!-- image of recipe dish -->
    </aside>

    <div>
      <header>
        <h2>Francesinha</h2>
      </header>
      <p>1h</p>
    </div>
  </section>
</template>

<script></script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 2fr;

  background-color: var(--light-green);

  overflow: hidden;
}

section > div {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
}

header {
  width: 100%;

  border-bottom: solid 0.1rem #000;
  padding-bottom: 1rem;

  text-align: center;
}

h2 {
  padding: 0;
  margin: 0;
}

#imgRecipe {
  background-image: url("https://imgs.search.brave.com/WOSEXf_1ojCjclu8QTFvWrs2sPa6Zx-CVWXyUwf13V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTYy/NDM4NjU5L3Bob3Rv/L2ZyYW5jZXNpbmhh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1USW5tTXNqSDZP/dDJUR0dSeHZzdS1Y/REJ2dF9XN28wcl9k/YUZFd3gyN0w4PQ");
  background-position: center;
  background-size: cover;
}
</style>
