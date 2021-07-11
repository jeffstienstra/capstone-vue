<template>
  <div id="app">
    <div id="nav">
      <router-link style="padding: 0px 10px" to="/">Home</router-link>

      <router-link style="padding: 0px 10px" to="/parks">Parks</router-link>

      <router-link style="padding: 0px 10px" to="/plants">Plants</router-link>

      <router-link style="padding: 0px 10px" v-if="isLoggedIn()" to="/favorites">Favorites</router-link>

      <router-link style="padding: 0px 10px" v-if="!isLoggedIn()" to="/login">Login</router-link>

      <router-link style="padding: 0px 10px" v-if="isLoggedIn()" to="/logout">Logout</router-link>

      <router-link style="padding: 0px 10px" v-if="!isLoggedIn()" to="/signup">Signup</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

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
