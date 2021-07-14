<template>
  <div id="app">
    <!-- <span v-title data-title="traVlog"></span> -->

    <nav>
      <div>
        <ul>
          <li><a href="/home">Home</a></li>
          <li v-if="isLoggedIn()"><a href="/parks">Find Parks</a></li>
          <li v-if="isLoggedIn()"><a href="/favorites">Favorites</a></li>
          <li v-if="isLoggedIn()"><a href="/plants">Plants</a></li>
          <li v-if="!isLoggedIn()"><a href="/login">Login</a></li>
          <li v-if="isLoggedIn()"><a href="/logout">Logout</a></li>
          <li v-if="!isLoggedIn()"><a href="/signup">Signup</a></li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      flashMessage: null,
    };
  },

  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
