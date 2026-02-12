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
            },
          ],
    };
  },

  actions: {
    addUser(user) {
      this.users.push(user);

      localStorage.users = JSON.stringify(this.users);
    },

    getUser(username) {
      return this.users.find((user) => user.username == username);
    },
  },
});
