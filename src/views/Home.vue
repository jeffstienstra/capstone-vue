<template>
  <div class="">
    <span v-title data-title="traVlog"></span>

    <img src="/src/assets/travlog_logo" alt="" />
    <p id="headline">TraVlog</p>
    <h1>Discover the outdoors. Share your story.</h1>
    <h4 style="padding: 0px 100px, align: center"></h4>
    <h2>
      <router-link style="padding: 0px 10px" to="/parks">START EXPLORING</router-link>
    </h2>

    <div>
      <br />
      <br />
    </div>
    <!-- <h3>search by activity</h3>
    <form action="">
      <label for="activities">Search by activity:</label>
      <select id="activities" name="activities">
        <option value="" selected>all</option>
        <option value="camping">AL</option>
        <option value="fishing">AK</option>
        <option value="hiking">AR</option>
        <option value="swimming">AZ</option>
      </select>
      <input type="submit" />
    </form> -->
  </div>
</template>

<style>
#headline {
  font-size: 75px;
}
</style>

<script>
export default {
  data: function () {
    return {
      searchParams: {},
    };
  },
  created: function () {},
  methods: {
    searchByState: function () {
      console.log("search by state ->", this.searchParams);
    },
  },
};
</script>
