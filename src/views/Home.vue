<template>
  <div>
    <span v-title data-title="traVlog"></span>
    <br />
    <br />
    <img src="travlog_main_logo.png" alt="" style="" />
    <br />
    <br />
    <h1 id="tag1" style="font-size: 100px">Discover the outdoors.</h1>
    <h1 id="tag1" style="font-size: 75px">Share your story.</h1>
    <br />
    <h1 id="tag" style="font-size: 25px">Never stay at a crappy campsite again.</h1>
    <br />
    <button v-on:click="parksNav()" class="btn btn-outline-success btn-customized">START EXPLORING</button>

    <div>
      <br />
      <br />
    </div>
  </div>
</template>

<style>
#tag {
  color: #e90000;
}
#tag1 {
  color: #303030;
}
#headline {
  font-size: 75px;
}
#logo {
  width: 100vw;
}
#main {
  background-image: "trees.jpg";
  background-size: cover;
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
    parksNav: function () {
      this.$router.push("/parks");
    },
    // searchByState: function () {
    //   console.log("search by state ->", this.searchParams);
    // },
  },
};
</script>
