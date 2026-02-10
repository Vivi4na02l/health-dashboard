<template>
  <nav>
    <h1>Health</h1>

    <div>
      <ul>
        <li class="active">
          <a href="">Dashboard</a>
        </li>
        <li>
          <a href="">Week day</a>
        </li>
        <li>
          <a href="">Daily intakes</a>
        </li>
        <li>
          <a href="">Pantry</a>
        </li>
        <li>
          <a href="">Shopping list</a>
        </li>
        <li>
          <a href="">Recipes</a>
        </li>
      </ul>

      <button class="btn-logout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style scoped>
nav {
  padding-left: 2rem;
  padding-right: 2rem;

  display: flex;
  justify-content: space-between;
}

div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

ul {
  border-radius: 100px;
  padding: 0;

  display: flex;

  background-color: var(--white);

  overflow: hidden;
}

li {
  padding: 1rem;

  list-style: none;
}

a {
  text-decoration: none;
}

.active {
  border-radius: 100px;

  background-color: #000;
}
.active a {
  color: var(--white);
}

.btn-logout {
  border: none;
  border-radius: 100px;
  padding: 1rem;

  background-color: #c73c3c;
  color: #fff;
}
</style>
