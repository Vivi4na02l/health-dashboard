<template>
  <section>
    <aside v-if="onCatalog">
      <input
        v-model="formSearch"
        type="text"
        id="txtSearchRecipe"
        placeholder="Search for a recipe"
      />
      <button class="btnAddNew">Add new recipe</button>
    </aside>

    <div v-else>
      <button class="btnBack" @click="onCatalog = true">
        <img src="../assets/images/icon-arrow.png" alt="arrow pointing left" />
        <p>Go back</p>
      </button>
    </div>

    <div class="catalog" v-if="onCatalog">
      <article
        v-for="recipe of getRecipes"
        :key="recipe.key"
        @click="((onCatalog = false), (recipeName = recipe.recipe))"
      >
        <div class="recipeImg" :style="{ backgroundImage: `url(${recipe.img})` }">
          <!-- recipe image -->
        </div>

        <div>
          <h3>{{ recipe.recipe }}</h3>
          <p>{{ recipe.description }}</p>
        </div>
      </article>
    </div>

    <div class="recipe" v-else>
      <div class="recipeImg" :style="{ backgroundImage: `url(${getRecipe.img})` }">
        <!-- recipe image as background -->

        <header>
          <h2>{{ getRecipe.recipe }}</h2>
        </header>
      </div>

      <div class="body">
        <div class="ingredients">
          <h3>Ingredients</h3>

          <ul>
            <li v-for="ingredient of getRecipe.ingredients" :key="ingredient.key">
              <p>{{ ingredient.ingredient }} ({{ ingredient.weight }}g)</p>
            </li>
          </ul>
        </div>

        <div class="steps">
          <h3>Instructions</h3>

          <ul>
            <li v-for="steps of getRecipe.steps" :key="steps.key">
              <p>{{ steps }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { authStore } from "@/store/auth";
import { usersStore } from "@/store/users";

export default {
  data() {
    return {
      formSearch: "",

      onCatalog: true,
      recipeName: "",
    };
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
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

section > * {
  width: 50%;
}

aside {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.btnBack {
  border: 0.1rem #000 solid;
  border-radius: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  background-color: transparent;
}

.btnBack:hover {
  cursor: pointer;
  background-color: #ffffff;
}

.btnBack img {
  width: 100%;
  max-width: 2rem;
  height: fit-content;

  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

#txtSearchRecipe {
  padding: 1rem;
  border-radius: 1rem;
  border: 0.1rem #cbcbcb solid;

  background-image: url("../assets/images/icon-search.png");
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: 5% 50%;

  text-indent: 4rem;
  text-align: center;
}

.btnAddNew {
  background-color: #000;
  color: white;

  border-radius: 1rem;
  border: none;
  padding: 1rem;
}

.btnAddNew:hover {
  cursor: pointer;
  background-color: #252525;
}

.catalog {
  border-radius: 1rem;
  padding: 1rem;

  background-color: var(--white);
}

article {
  border: solid 0.1rem #cbcbcb;
  border-radius: 1rem;

  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;

  overflow: hidden;
}

article:hover {
  cursor: pointer;
  background-color: #efefef;
}

.recipeImg {
  background-position: 50% 50%;
  background-size: cover;
}

.recipe {
  height: 80%;
  border-radius: 1rem;

  display: grid;
  grid-template-rows: 20% 50%;
  gap: 1rem;

  background-color: var(--white);
  overflow-y: auto;
}

.recipe header {
  height: 100%;

  backdrop-filter: blur(0.5rem);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}

h3,
h2 {
  margin: 0;
}

h2 {
  width: 100%;

  padding: 0.5rem;

  background-color: #ffffffb4;
}

.recipe .body {
  padding: 1rem;
}

.ingredients,
.steps {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.steps {
  margin-top: 3rem;
}

ul {
  width: 100%;
}

li {
  border-bottom: solid 0.1rem #000;
  padding: 1rem;
}

li p {
  margin: 0;
  text-indent: 1rem;
}
</style>
