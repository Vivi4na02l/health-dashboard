import ShoppingList from "@/components/ShoppingList.vue";
import { defineStore } from "pinia";

export const usersStore = defineStore("users", {
  state() {
    return {
      users: localStorage.users
        ? JSON.parse(localStorage.users)
        : [
            {
              username: "user",
              password: "1234",
              ingredients: [
                // {
                //   ingredient: 'example',
                //   weight: 10,
                //   protein: 10,
                //   quantity: 1,
                //   onShoppingList: false,
                // },
              ],
              recipes: [
                // {
                //   name: 'francesinha',
                //   image: 'https://imgs.search.brave.com/WOSEXf_1ojCjclu8QTFvWrs2sPa6Zx-CVWXyUwf13V0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTYy/NDM4NjU5L3Bob3Rv/L2ZyYW5jZXNpbmhh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1USW5tTXNqSDZP/dDJUR0dSeHZzdS1Y/REJ2dF9XN28wcl9k/YUZFd3gyN0w4PQ',
                //   description: 'sanduíche portuguesa deliciosa',
                //   ingredientsList: [],
                //   instructions: [],
                // }
              ],
            },
          ],
    };
  },

  actions: {
    updateArray() {
      // this.users = users;
      localStorage.users = JSON.stringify(this.users);
    },

    /**
     * adds new user created on register
     * @param {*} username
     * @param {*} password
     */
    addUser(username, password) {
      this.users.push({
        username: username,
        password: password,
        ingredients: [],
        recipes: [],
      });

      this.updateArray();
    },

    /**
     * returns full user data of the logged user
     * @param {*} username
     * @returns
     */
    getUser(username) {
      return this.users.find((user) => user.username == username);
    },

    /**
     * adds the ingredient the user typed manually to its ingredients array
     * @param {*} ingredient
     * @param {*} weight
     * @param {*} protein
     */
    addManualIngredient(username, ingredient, weight, protein) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      if (!user.ingredients.find((ing) => ing.ingredient == ingredient)) {
        user.ingredients.push({
          ingredient: ingredient,
          weight: +weight,
          protein: +protein,
          quantity: 1,
          onShoppingList: false,
        });

        this.updateArray();

        return { txt: "Ingredient added!", success: true };
      } else {
        return { txt: "This ingredient already exists!", success: false };
      }
    },

    /**
     * changes the quantity of the ingredient triggered
     * @param {*} username user logged in
     * @param {*} ingredient ingredient of which the button as been clicked
     * @param {*} isPlus is true if the button clicked was "plus", false if it was the button "minus"
     */
    changeIngredientQuantity(username, ingredient, isPlus) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      // increases the quantity
      if (isPlus) {
        user.ingredients[ingredientIndex].quantity++;

        this.updateArray();
      }

      // decreases the quantity
      else {
        // only decreases the quantity of the ingredient if it isn't already at 0 quantity
        if (user.ingredients[ingredientIndex].quantity > 0) {
          user.ingredients[ingredientIndex].quantity--;
        }

        this.updateArray();
      }
    },

    changeIngredientList(username, ingredient, toShoppingList) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      user.ingredients[ingredientIndex].onShoppingList = toShoppingList;

      this.updateArray();
    },
  },
});
