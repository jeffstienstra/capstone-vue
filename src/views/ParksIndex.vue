<template>
  <div>
    <div>
      <h1>Find Dinos by Exploring the National Parks!</h1>
      <datalist id="park-titles">
        <option v-for="park in parks" v-bind:key="park.id">">{{ park.fullName }}</option>
        <img v-bind:src="park.images[0][:url]" v-bind:key="park.id" alt="" style="width: 50%" />
      </datalist>
    </div>

    <div v-for="park in parks" v-bind:key="park.id">
      <h3>{{ park.fullName }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      parks: {},
    };
  },
  created: function () {
    this.parksIndex();
  },
  methods: {
    parksIndex: function () {
      axios.get("/parks").then((response) => {
        console.log("parks index", response);
        this.parks = response.data.data;
      });
    },
    // parksByState: function () {
    //   axios.get("/parks/state").then((response) => {
    //     console.log("parks index", response);
    //     this.parks = response.data.data;
    //   });
    // },
  },
};
</script>
