<template>
  <div id="app">
    <!-- <span v-title data-title="traVlog"></span> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="travlog_logo_35px.png" alt="" /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/parks"><strong>Find Parks</strong></a>
            </li>
            <li class="nav-item">
              <a v-if="isLoggedIn()" class="nav-link" href="/favorites"><strong>Favorites</strong></a>
            </li>
            <li class="nav-item">
              <a v-if="isLoggedIn()" class="nav-link" href="/plants"><strong>Collections</strong></a>
            </li>
            <li class="nav-item">
              <a v-if="!isLoggedIn()" class="nav-link" href="/login"><strong>Login</strong></a>
            </li>
            <li class="nav-item">
              <a v-if="isLoggedIn()" class="nav-link" href="/logout"><strong>Logout</strong></a>
            </li>
            <li class="nav-item">
              <a v-if="!isLoggedIn()" class="nav-link" href="/signup"><strong>Signup</strong></a>
            </li>
          </ul>

          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
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
