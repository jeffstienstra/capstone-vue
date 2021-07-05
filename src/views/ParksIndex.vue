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
        <!-- <a v-bind:href="`/parks/show`">More info</a> -->
      </div>
    </div>

    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <h1>{{ currentPark.fullName }}</h1>
        <!-- <h3>{{ currentPark.images[0].url }}</h3> -->
        <h3>About</h3>
        <p>{{ currentPark.description }}</p>
        <h3>Activities</h3>
        <div>
          <datalist id="park-activities">
            <option v-for="activity in activities" v-bind:key="activity.id">">{{ activity["name"] }}</option>
          </datalist>
        </div>
        <!-- <p>{{ currentPark.activities["name"] }}</p> -->
        <h3>Weather</h3>
        <p>{{ currentPark.weatherInfo }}</p>
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
      activities: {},
      currentPark: {},
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
      console.log("show a park", park);
      console.log("show this park's activities", park.activities);
      this.currentPark = park;
      this.currentActivities = park.activities;

      document.querySelector("#park-details").showModal();
    },
  },
};
</script>
