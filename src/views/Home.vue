<template>
  <div class="">
    <span v-title data-title="traVlog"></span>

    <h1>Discover the outdoors. Share your story.</h1>

    <!-- <md-button class="md-raised md-primary">Primary</md-button> -->

    <!-- <h4 style="padding: 0px 100px, align: center"></h4> -->
    <h2>
      <router-link style="padding: 0px 10px" to="/parks">START EXPLORING</router-link>
    </h2>

    <div>
      <br />
      <br />
    </div>
  </div>
</template>

<style>
#headline {
  font-size: 75px;
}
#logo {
  width: 100vw;
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
    // searchByState: function () {
    //   console.log("search by state ->", this.searchParams);
    // },
  },
};
</script>
