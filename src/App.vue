<template>
  <div id="app">
    <!-- <span v-title data-title="traVlog"></span> -->

    <nav>
      <div class="nav-wrapper">
        <div id="nav-logo-div">
          <a href="/home" class="brand-logo left" style="align">
            <img id="nav-logo" src="./assets/travlog_logo_wht_xsm.png" />
          </a>
        </div>
        <ul class="right hide-on-med-and-down">
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
.nav-wrapper {
  background-color: rgb(20, 90, 18);
}
#nav-logo {
  position: relative;
  top: 50%;
  transform: translateY(15%) translateX(-552%);
}
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
