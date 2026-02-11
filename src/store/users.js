import { defineStore } from "pinia";

export const usersStore = defineStore("users", {
  state() {
    return {
      users: [
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
    },

    getUser(username) {
      return this.users.find((user) => user.username == username);
    },
  },
});
