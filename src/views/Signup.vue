<template>
  <div class="signup">
    <span v-title data-title="traVlog"></span>

    <div class="container h-100">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-10 col-md-8 col-lg-6">
            <!-- Form -->
            <form class="form-example" action="" method="">
              <b></b>
              <h1>Signup</h1>
              <br />
              <h4 class="description">Start sharing your story!</h4>
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
              <div class="form-group">
                <div class="form-floating mb-3">
                  <input type="password" v-model="password_confirmation" class="form-control" placeholder="password" />
                  <label for="floatingInput">Password confirmation</label>
                </div>
              </div>
              <!-- End input fields -->
            </form>
            <!-- Form end -->
          </div>
        </div>
      </form>
    </div>
    <button type="submit" value="Submit" class="btn btn-outline-primary btn-customized">Signup</button>
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="password_confirmation" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      axios
        .post("/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
