<template>
  <section>
    <!-- form -->
    <div>
      <p class="intro">
        Search for an ingredient where we will estimate the amount of its nutrients. Or manually add
        and edit one yourself.
      </p>

      <form>
        <input type="text" id="txtIngredient" v-model="form.txtIngredient" required />
        <input type="number" class="grams" v-model="form.grams" required />
        <button type="submit">&#x2714;</button>
        <button>Add manually</button>
      </form>

      <aside>
        <p>Type an ingredient for results...</p>
      </aside>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: {
        txtIngredient: "",
        grams: 100,
      },
    };
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

section div {
  width: 40%;

  border-radius: 0.5rem;
  padding: 2rem;

  background-color: var(--light-green);
}

.intro {
  margin: 0 0 0.5rem 0;
}

form {
  height: 3rem;

  display: grid;
  grid-template-columns: 4fr 1fr 1fr 2fr;
  gap: 0.5rem;
  align-items: stretch;
}

input,
aside {
  border: solid 0.1rem #cbcbcb;
  border-radius: 0.5rem;
}

input {
  text-align: center;
  font-size: 1rem;
}

#txtIngredient {
  background-image: url("../assets/images/icon-search.png");
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: 5% 50%;

  text-indent: 2rem;
}

button {
  border: none;
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  background-color: #000;
  color: var(--white);
  font-size: 1rem;
}

aside {
  margin-top: 0.5rem;

  background-color: var(--white);
}
aside p {
  width: 100%;
  text-align: center;
}
</style>
