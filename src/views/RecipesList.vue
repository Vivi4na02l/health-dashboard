<template>
  <section>
    <aside>
      <input
        v-model="formSearch"
        type="text"
        id="txtSearchRecipe"
        placeholder="Search for a recipe"
      />
      <button class="btnAddNew">Add new recipe</button>
    </aside>

    <div class="catalog">
      <article v-for="recipe of getRecipes" :key="recipe.key">
        <div class="recipeImg" :style="{ backgroundImage: `url(${recipe.img})` }">
          <!-- image -->
        </div>

        <div>
          <h3>{{ recipe.recipe }}</h3>
          <p>{{ recipe.description }}</p>
        </div>
      </article>
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
  },
};
</script>

<style scoped>
section {
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
</style>
