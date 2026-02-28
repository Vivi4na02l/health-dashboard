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
              week: {
                // activities: [],
                // monday: [],
                // tuesday: [],
                // wednesday: [],
                // thrusday: [],
                // friday: [],
                // saturday: [],
                // sunday: [],
              },
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
        ingredients: [
          {
            ingredient: "Straw potato",
            weight: 100,
            protein: 6.9,
            quantity: 0,
            onShoppingList: false,
          },
          {
            ingredient: "Canned tuna",
            weight: 100,
            protein: 25,
            quantity: 0,
            onShoppingList: false,
          },
          {
            ingredient: "Onion",
            weight: 100,
            protein: 1,
            quantity: 0,
            onShoppingList: false,
          },
          {
            ingredient: "Garlic",
            weight: 5,
            protein: 0.2,
            quantity: 0,
            onShoppingList: false,
          },
          {
            ingredient: "Egg",
            weight: 63,
            protein: 6,
            quantity: 0,
            onShoppingList: false,
          },
        ],
        recipes: [
          {
            recipe: "Atum à Brás",
            description:
              '"Atum à Brás" is a practical and tasty variation to the classic portuguese dish "Bacalhau à Brás", maintaining the traditional base of scrambled eggs, straw potatoes and onions wrapped in a creamy and comforting preparation.',
            ingredients: [
              {
                ingredient: "Onion",
                weight: 100,
              },
              {
                ingredient: "Garlic",
                weight: 5,
              },
              {
                ingredient: "Canned tuna",
                weight: 200,
              },
              {
                ingredient: "Straw potato",
                weight: 250,
              },
              {
                ingredient: "Egg",
                weight: 63,
              },
            ],
            img: "https://imgs.search.brave.com/FA5TlTZBZ3Fr-XVLZg3xXphq8U5-pDXgwCWfp-JL278/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydXJh/bGVhLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC9J/TUdfNzA1Ni1lMTU5/MzI3Mzk3MjYwMi0y/LTUwMHg1MDAuanBn",
            steps: [
              "Cut 1 full onion in slices and 1 garlic clove",
              "Add the onion and garlic to a hot pan with olive oil and let it stir for 1 minute",
              "Add 2/3 of the straw potato",
              "In a ball, add the egg and mix with salt and black pepper",
              "In low heat, add the egg to the pan and mix very well",
              "Turn off the stove and add the rest of the potato fries",
            ],
          },
        ],
        week: {
          activities: [
            {
              activity: "stretching",
            },
            {
              activity: "climbing",
            },
            {
              activity: "running",
            },
            {
              activity: "gym",
            },
          ],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
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
     * adds activity choosen to the parameter of the object corresponding to the week selected
     * @param {*} day
     * @param {*} activity
     */
    addActivity(username, day, activity) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      if (!user.week[day].find((act) => act == activity)) {
        user.week[day].push(activity);

        this.updateArray();
        return { txt: `Activity added to ${day}!`, success: true };
      } else {
        return { txt: `Activity is already added to ${day}!`, success: false };
      }
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
    changeIngredientQuantity(username, ingredient, isPlus, customAddition) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      // increases the quantity
      if (isPlus) {
        if (customAddition != 0) {
          user.ingredients[ingredientIndex].quantity += customAddition;

          user.ingredients[ingredientIndex].onShoppingList = false;
        } else {
          user.ingredients[ingredientIndex].quantity++;
        }

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
