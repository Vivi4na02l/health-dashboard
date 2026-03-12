<template>
  <section class="component">
    <aside id="imgRecipe" :style="{ backgroundImage: `url(${getRecipes[0].img})` }">
      <!-- image of recipe dish -->
    </aside>

    <div>
      <!-- <div :style="{ fontSize: data + 'px' }"></div> -->
      <header>
        <h2>{{ getRecipes[0].recipe }}</h2>
      </header>

      <p>{{ getRecipes[0].description }}</p>

      <div class="ingredients">
        <h3>Ingredients</h3>

        <ul>
          <li v-for="ingredient of getRecipes[0].ingredients" :key="ingredient.key">
            <p>{{ ingredient.ingredient }} ({{ ingredient.weight }}g)</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

export default {
  data() {
    return {};
  },

  computed: {
    user() {
      const auth = authStore();
      return usersStore().getUser(auth.currentUsername);
    },

    getRecipes() {
      if (!this.user) {
        return [];
      }

      return [...this.user.recipes];
    },

    getRecipe() {
      if (!this.user) {
        return [];
      }

      return this.user.recipes.find((recipe) => recipe.recipe == this.recipeName);
    },
  },
};
</script>

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
  /* background-image: url("https://imgs.search.brave.com/WOSEXf_1ojCjclu8QTFvWrs2sPa6Zx-CVWXyUwf13V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTYy/NDM4NjU5L3Bob3Rv/L2ZyYW5jZXNpbmhh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1USW5tTXNqSDZP/dDJUR0dSeHZzdS1Y/REJ2dF9XN28wcl9k/YUZFd3gyN0w4PQ"); */
  background-position: center;
  background-size: cover;
}
</style>
