<template>
  <div>
    <div>
      <h1>Spot Dinos by Exploring the National Parks!</h1>
      <datalist id="park-titles">
        <option v-for="park in parks" v-bind:key="park.parkCode">{{ park.fullName }}</option>
      </datalist>
    </div>

    <div v-for="park in parks" v-bind:key="park.parkCode">
      <h3>{{ park.fullName }}</h3>
      <img v-bind:src="park.images[0].url" v-bind:key="park.parkCode" alt="" style="width: 25%" />
      <div>
        <button v-on:click="parksShow(park)">details</button>
      </div>
    </div>

    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <h1>{{ currentPark.fullName }}</h1>
        <p>\/ this should an image carousel \/</p>

        <div v-for="currentImage in currentImages" v-bind:key="currentImage.id">
          <img v-bind:src="currentImage" v-bind:key="currentImage.id" alt="" style="width: 50%" />
        </div>

        <h3>About</h3>
        <p>{{ currentPark.description }}</p>

        <h3>Activities</h3>
        <p>{{ currentActivities }}</p>

        <h3>Weather</h3>
        <p>{{ currentPark.weatherInfo }}</p>

        <h3>Directions</h3>
        <p>{{ currentPark.directionsInfo }}</p>

        <h3>Entrance Fees</h3>
        <p>{{ currentPark.entranceFees }}</p>

        <button>Close</button>
      </form>
    </dialog>
    <!-- \/ how to get the next 10 parks? \/ -->
    <button v-on:click="moreParks()">next ></button>
    <!-- <a v-bind:href="`/parks/`">next</a> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      parks: {},
      currentActivities: {},
      currentPark: {},
      currentImages: {},
    };
  },
  created: function () {
    this.parksIndex();
  },
  methods: {
    parksIndex: function () {
      axios.get("/parks").then((response) => {
        console.log("Parks ->", response);
        this.parks = response.data.data;
      });
    },
    moreParks: function () {
      console.log("show the next set of parks...");
      // add 10 to the 'limit' param in the NPS search URL
    },
    parksShow: function (park) {
      console.log("show current park", park);
      console.log("current park's activities", park.activities);
      this.currentPark = park;

      // get park's images
      var images = [];
      var i = 0;
      while (i < park.images.length) {
        images.push(park.images[i]["url"]);
        i++;
      }
      this.currentImages = images;
      console.log(this.currentImages);

      // get park's activities
      var activities = [];
      i = 0;
      while (i < park.activities.length) {
        activities.push(park.activities[i]["name"]);
        i++;
      }
      console.log(activities);
      this.currentActivities = activities.sort().join(", ");

      document.querySelector("#park-details").showModal();
    },
  },
};
</script>
