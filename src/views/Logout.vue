<template>
  <div class="logout">
    <span v-title data-title="traVlog"></span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$router.push("/");
  },
};
</script>
