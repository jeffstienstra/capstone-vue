<template>
  <div>
    <span v-title data-title="traVlog"></span>
    <br />
    <br />
    <br />
    <h1>Discover the outdoors.</h1>
    <br />
    <h1>Share your story.</h1>
    <br />

    <button v-on:click="parksNav()" class="btn btn-outline-success btn-customized">START EXPLORING</button>

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
