<template>
  <div class="login">
    <span v-title data-title="traVlog"></span>

    <form v-on:submit.prevent="submit()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-10 col-md-8 col-lg-6">
            <!-- Form -->
            <form class="form-example" action="" method="">
              <h1>Login</h1>
              <br />
              <h4 class="description">Welcome back!</h4>
              <br />
              <!-- Input fields -->
              <div class="form-group">
                <div class="form-floating mb-3">
                  <input type="email" v-model="email" class="form-control" placeholder="email address" />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
              <div class="form-group">
                <div class="form-floating mb-3">
                  <input type="password" v-model="password" class="form-control" placeholder="password" />
                  <label for="floatingInput">Password</label>
                </div>
              </div>
              <!-- End input fields -->
            </form>
            <!-- Form end -->
          </div>
        </div>
      </div>

      <button type="submit" value="Submit" class="btn btn-outline-primary btn-customized">Login</button>
      <p>
        <a href="https://jeffstienstra.github.io/">Forgot password?</a>
      </p>
    </form>
    <!-- <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <input type="submit" value="Submit" /> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "jeff@test.com",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/parks");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
