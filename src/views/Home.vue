<template>
  <div class="">
    <p id="headline">Park Spotr</p>
    <h2>How it works:</h2>
    <h4 style="padding: 0px 100px, align: center">
      Explore the National Parks and collect native plants with your phone's camera.
      <br />
      When a plant photo is positively identified it will be added to your collection along with its GPS coordinates.
      <br />
      But a spotting only counts if your GPS coordinates are within a National Park!
    </h4>
    <h2>
      <router-link style="padding: 0px 10px" to="/parks">START EXPLORING</router-link>
    </h2>

    <!-- <h5>Let's get started!</h5> -->
    <h3>search by state</h3>

    <!-- format this drop down for initial park search -->
    <form action="/">
      <label for="stateCode">Search by State:</label>
      <select id="stateCode" name="stateCode">
        <option value="" selected>all</option>
        <option value="al">ALABAMA</option>
        <option value="ak">ALASKA</option>
        <option value="az">ARIZONA</option>
        <option value="ar">ARKANSAS</option>
        <option value="ca">CALIFORNIA</option>
        <option value="co">COLORADO</option>
        <option value="ct">CONNECTICUT</option>
        <option value="de">DELAWARE</option>
      </select>
      <br />
      <label for="activities">Search by activity:</label>
      <select id="activities" name="activities">
        <option value="" selected>all</option>
        <option value="camping">Camping</option>
        <option value="fishing">Fishing</option>
        <option value="hiking">Hiking</option>
        <option value="swimming">Swimming</option>
      </select>
      <br />
      <input v-on:click="searchByState()" type="submit" />
    </form>

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
