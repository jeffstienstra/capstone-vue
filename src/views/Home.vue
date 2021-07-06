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
