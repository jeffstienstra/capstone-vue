<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>How it works:</h2>
    <h4 style="padding: 0px 100px, align: center">
      Collect dinosaurs by spotting them with your phone's camera! Select the dinosaur you'd like to find and see which
      National Park it lives in!
    </h4>
    <h4>
      Or search the National Park Service database to find parks you want to visit, then see which dinisaur lives there!
    </h4>
    <h5>Get Started!</h5>
    <h3>search by state</h3>

    <!-- format this drop down for initial park search -->
    <form action="/action_page.php">
      <label for="activities">Search by State:</label>
      <select id="activities" name="activities">
        <option value="" selected>all</option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AR">AR</option>
        <option value="AZ">AZ</option>
      </select>
      <input type="submit" />
    </form>

    <h3>search by activity</h3>
    <form action="/action_page.php">
      <label for="activities">Search by activity:</label>
      <select id="activities" name="activities">
        <option value="" selected>all</option>
        <option value="camping">AL</option>
        <option value="fishing">AK</option>
        <option value="hiking">AR</option>
        <option value="swimming">AZ</option>
      </select>
      <input type="submit" />
    </form>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "DinoSpotr!",
    };
  },
  created: function () {},
  methods: {},
};
</script>
