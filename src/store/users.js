import { defineStore } from "pinia";

export const usersStore = defineStore("users", {
  state() {
    return {
      users: localStorage.users ? JSON.parse(localStorage.users) : [],
    };
  },

  actions: {
    updateArray() {
      // this.users = users;
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    /**
     * adds new user created on register
     * @param {*} username
     * @param {*} password
     */
    addUser(username, password, today) {
      this.users.push({
        username: username,
        password: password,
        nutrition: [
          {
            type: "protein",
            unit: "g",
            goal: "70",
            history: [
              {
                date: today,
                reachedGoal: false,
                consumed: "0",
              },
            ],
          },
          {
            type: "water",
            unit: "L",
            goal: "2.5",
            history: [
              {
                date: today,
                reachedGoal: false,
                consumed: "0",
              },
            ],
          },
          {
            type: "calories",
            unit: "cal",
            goal: "2500",
            history: [
              {
                date: today,
                reachedGoal: false,
                consumed: "0",
              },
            ],
          },
        ],
        groups: ["Protein", "Dairy", "Grains", "Produce", "Pantry", "Canned", "Frozen", "Snacks"],
        ingredients: [
          {
            ingredient: "Potato sticks",
            group: "Pantry",
            weight: 100,
            protein: 6.9,
            calories: 520,
            quantity: 0,
            onShoppingList: false,
            cart: {
              onCart: false,
              quantity: 0,
            },
          },
          {
            ingredient: "Canned tuna",
            group: "Canned",
            weight: 100,
            protein: 25,
            calories: 116,
            quantity: 0,
            onShoppingList: false,
            cart: {
              onCart: false,
              quantity: 0,
            },
          },
          {
            ingredient: "Onion",
            group: "Produce",
            weight: 100,
            protein: 1,
            calories: 420,
            quantity: 0,
            onShoppingList: false,
            cart: {
              onCart: false,
              quantity: 0,
            },
          },
          {
            ingredient: "Garlic",
            group: "Produce",
            weight: 5,
            protein: 0.2,
            calories: 0,
            quantity: 0,
            onShoppingList: false,
            cart: {
              onCart: false,
              quantity: 0,
            },
          },
          {
            ingredient: "Egg",
            group: "Protein",
            weight: 63,
            protein: 6,
            calories: 65,
            quantity: 0,
            onShoppingList: false,
            cart: {
              onCart: false,
              quantity: 0,
            },
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
                ingredient: "Potato sticks",
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

    addTodaysDate(username, today) {
      const user = this.getUser(username);

      for (let i = 0; i < user.nutrition.length; i++) {
        const nutrient = user.nutrition[i];

        nutrient.history.push({
          date: today,
          reachedGoal: false,
          consumed: "0",
        });
      }

      this.updateArray();
    },

    /**
     * changes the goal of the nutrition targeted (which can be: water, protein, calories)
     */
    changeNutritionGoal(username, type, newGoal) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      const indexType = user.nutrition.findIndex((pos) => pos.type == type.toLowerCase());

      if (indexType === -1) {
        return { txt: "Nutrition type not found!", success: false };
      }

      user.nutrition[indexType].goal = newGoal;

      this.updateArray();
      return { txt: `Changed goal of ${type}!`, success: true };
    },

    /**
     * lets user add the amount of nutrition they had in a day
     * @param {*} username
     */
    addNutritionConsumedToday(username, type, date, increment) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      const indexType = user.nutrition.findIndex((pos) => pos.type == type.toLowerCase());

      if (indexType === -1) {
        return { txt: "Nutrition type not found!", success: false };
      }

      const indexDay = user.nutrition[indexType].history.findIndex((index) => index.date == date);

      user.nutrition[indexType].history[indexDay].consumed =
        +increment + +user.nutrition[indexType].history[indexDay].consumed;

      // if goal hasn't been reached out yet, it checks if the goal was surpassed. If it was, it registers that the goal was surpassed
      if (!user.nutrition[indexType].history[indexDay].reachedGoal) {
        if (user.nutrition[indexType].history[indexDay].consumed > user.nutrition[indexType].goal) {
          user.nutrition[indexType].history[indexDay].reachedGoal = true;
        }
      }

      this.updateArray();
      return { txt: `Added ${increment} to goal!`, success: true };
    },

    /**
     * adds activity chosen to the parameter of the object corresponding to the week selected
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
    addManualIngredient(username, ingredient, group, weight, protein, calories) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      if (!user.ingredients.find((ing) => ing.ingredient == ingredient)) {
        user.ingredients.push({
          ingredient: ingredient,
          group: group,
          weight: +weight,
          protein: +protein,
          calories: +calories,
          quantity: 1,
          onShoppingList: false,
        });

        this.updateArray();

        return { txt: "Ingredient added!", success: true };
      } else {
        return { txt: "This ingredient already exists!", success: false };
      }
    },

    editIngredient(
      username,
      oldIngredientName,
      newIngredientName,
      group,
      weight,
      protein,
      calories,
    ) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      if (!user.ingredients.find((ing) => ing.ingredient == oldIngredientName)) {
        return { txt: "This ingredient doesn't exist!", success: false };
      } else {
        if (user.ingredients.find((ing) => ing.ingredient == newIngredientName)) {
          return { txt: `The ingredient "${newIngredientName}" already exist!`, success: false };
        } else {
          const ingredientIndex = user.ingredients.findIndex(
            (ing) => ing.ingredient == oldIngredientName,
          );

          user.ingredients[ingredientIndex] = {
            ingredient: newIngredientName,
            group: group,
            weight: +weight,
            protein: +protein,
            calories: +calories,
            quantity: user.ingredients[ingredientIndex].quantity,
            onShoppingList: user.ingredients[ingredientIndex].onShoppingList,
          };

          this.updateArray();

          return { txt: "Ingredient changed!", success: true };
        }
      }
    },

    /**
     * removes the ingredient the user clicked on
     */
    removeIngredient(username, ingredient) {
      const user = this.getUser(username);

      if (!user) {
        return { txt: "User not found!", success: false };
      }

      user.ingredients = user.ingredients.filter((ing) => ing.ingredient != ingredient);
      this.updateArray();

      return { txt: "Ingredient removed!", success: true };
    },

    /**
     * changes the quantity in the pantry of the ingredient triggered
     * @param {*} username user logged in
     * @param {*} ingredient ingredient of which the button as been clicked
     * @param {*} isPlus is true if the button clicked was "plus", false if it was the button "minus"
     */
    changePantryIngredientQuantity(username, ingredient, isPlus) {
      //customAddition
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      // increases the quantity
      if (isPlus) {
        // if (customAddition != 0) {
        //   user.ingredients[ingredientIndex].quantity += customAddition;

        //   user.ingredients[ingredientIndex].onShoppingList = false;
        // } else {
        user.ingredients[ingredientIndex].quantity++;
        // }

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

    /**
     * changes the quantity in the grocery list of the ingredient triggered
     */
    changeGroceriesIngredientQuantity(username, ingredient, isPlus) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      if (isPlus) {
        user.ingredients[ingredientIndex].cart.quantity++;

        this.updateArray();
      }

      // decreases the quantity
      else {
        // only decreases the quantity of the ingredient if it isn't already at 0 quantity
        if (user.ingredients[ingredientIndex].cart.quantity > 0) {
          user.ingredients[ingredientIndex].cart.quantity--;
        }

        this.updateArray();
      }
    },

    /**
     * adds or removes a ingredient to/from the card
     */
    ingredientOnCart(username, ingredient, isAdding) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      if (isAdding) {
        user.ingredients[ingredientIndex].cart.onCart = true;
      } else {
        user.ingredients[ingredientIndex].cart.onCart = false;
      }

      this.updateArray();
    },

    addOrRemoveIngredientFromGroceryList(username, ingredient, addingToGroceryList) {
      const user = this.getUser(username);
      const ingredientIndex = user.ingredients.findIndex((index) => index.ingredient == ingredient);

      user.ingredients[ingredientIndex].onShoppingList = addingToGroceryList;

      // if ingredient is removed from the grocery list, then it is also automatically removed from the cart
      if (!addingToGroceryList) {
        user.ingredients[ingredientIndex].cart.onCart = false;
        user.ingredients[ingredientIndex].cart.quantity = 0;
      }

      this.updateArray();
    },

    addRecipe(username, recipe) {
      const user = this.getUser(username);

      console.log(recipe);

      if (
        !recipe.recipe ||
        !recipe.description ||
        recipe.ingredients.length === 0 ||
        recipe.steps.length === 0
      ) {
        return {
          txt: "Recipe must have title, description, ingredients and steps!",
          success: false,
        };
      }

      if (
        user.recipes.find(
          (recipeOfArray) =>
            recipeOfArray.recipe.trim().toLowerCase() === recipe.recipe.trim().toLowerCase(),
        )
      ) {
        return { txt: "A recipe with this title already exists!", success: false };
      }

      user.recipes.push({
        ...recipe,
      });

      this.updateArray();

      return { txt: "Recipe added successfully!", success: true };
    },

    addRecipeIngredient(recipe, newIngredient) {
      if (!newIngredient.ingredient || !newIngredient.weight) {
        return { txt: "Fill all ingredient fields!", success: false };
      }

      const exists = recipe.ingredients.find(
        (ing) =>
          ing.ingredient.trim().toLowerCase() === newIngredient.ingredient.trim().toLowerCase(),
      );

      if (exists) {
        return { txt: "Ingredient already added!", success: false };
      }

      recipe.ingredients.push({
        ingredient: newIngredient.ingredient.trim(),
        weight: +newIngredient.weight,
      });

      return { txt: "Ingredient added!", success: true };
    },

    addRecipeStep(recipe, step) {
      if (!step || step.trim() === "") {
        return { txt: "Instruction cannot be empty!", success: false };
      }

      recipe.steps.push(step.trim());

      return { txt: "Instruction added!", success: true };
    },
  },
});
