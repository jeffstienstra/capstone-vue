<template>
  <div>
    <div>
      <h1>Explore the National Parks to see which dinosaur lives there!</h1>
    </div>

    <div v-for="park in parks" v-bind:key="park.id">
      <h3>{{ park.fullName }}</h3>
      <img v-bind:src="park.images[0].url" v-bind:key="park.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="parksShow(park)">details</button>
      </div>
    </div>

    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <input v-on:click="addFavorite(currentPark)" type="button" value="+Favorites" style="float: right" />
        <button float:right>Close</button>
        <!-- <button type="button" class="close" data-dismiss="modal">Close</button> -->

        <h1>{{ currentPark.fullName }}</h1>
        <p>\/ this should be an image carousel \/</p>

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

        <!-- <button>Close</button> -->
      </form>
    </dialog>
    <!-- \/ how to get the next 10 parks? \/ -->
    <button v-on:click="moreParks()">more... ></button>
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
      park_name: "",
      address: "",
      parkCode: "",
      image_url: "",
    };
  },
  created: function () {
    this.parksIndex();
  },
  methods: {
    parksIndex: function () {
      axios.get("/parks").then((response) => {
        console.log("Parks ->", response);
        this.parks = response.data;
      });
    },
    moreParks: function () {
      console.log("show the next set of parks...");
      // add 10 to the 'limit' param in the NPS search URL
    },
    parksShow: function (park) {
      console.log("Current Park", park);
      console.log("Current Park's Activities", park.activities);
      this.currentPark = park;

      // get park's images
      var images = [];
      var i = 0;
      while (i < park.images.length) {
        images.push(park.images[i]["url"]);
        i++;
      }
      this.currentImages = images;

      // get park's activities
      var activities = [];
      i = 0;
      while (i < park.activities.length) {
        activities.push(park.activities[i]["name"]);
        i++;
      }
      this.currentActivities = activities.sort().join(", ");

      document.querySelector("#park-details").showModal();
    },

    addFavorite: function (park) {
      var params = {
        park_name: park.fullName,
        address:
          park["addresses"][0]["line1"] +
          " " +
          park["addresses"][0]["city"] +
          ", " +
          park["addresses"][0]["stateCode"] +
          " " +
          park["addresses"][0]["postalCode"],
        parkCode: park.parkCode,
        image_url: park.images[0]["url"],
      };
      axios.post("/favorites", params).then((response) => {
        console.log("added to favorites", response);
        this.favorites = response.data.data;
      });
    },
  },
};
</script>
