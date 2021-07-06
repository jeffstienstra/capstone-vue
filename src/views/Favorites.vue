<template>
  <div>
    <h1>Favorites</h1>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <h3>{{ favorite.park_name }}</h3>
      <img v-bind:src="favorite.image_url" v-bind:key="favorite.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="parkShow(park)">details</button>
      </div>
    </div>

    <!-- modal -->
    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <button float:right>Close</button>
        <!-- <button type="button" class="close" data-dismiss="modal">Close</button> -->
        <h1>{{ favorite.fullName }}</h1>
        <p>\/ this should be an image carousel \/</p>

        <div v-for="currentImage in currentImages" v-bind:key="currentImage.id">
          <img v-bind:src="currentImage" v-bind:key="currentImage.id" alt="" style="width: 50%" />
        </div>

        <h3>About</h3>
        <p>{{ favorite.description }}</p>

        <h3>Activities</h3>
        <p>{{ currentActivities }}</p>

        <h3>Weather</h3>
        <p>{{ park.weatherInfo }}</p>

        <h3>Directions</h3>
        <p>{{ park.directionsInfo }}</p>

        <h3>Entrance Fees</h3>
        <p>{{ park.entranceFees }}</p>

        <!-- <button>Close</button> -->
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      parks: {},
      currentPark: {},
      currentActivities: {},
      currentImages: {},
      favorites: {},
      favorite: {},
      park: {},
    };
  },
  created: function () {
    this.favoritesIndex();
  },
  methods: {
    favoritesIndex: function () {
      axios.get("/favorites").then((response) => {
        console.log("Favorites ->", response);
        this.favorites = response.data;
      });
    },
    parkShow: function (park) {
      axios.get("parks/" + park.parkCode).then((response) => {
        console.log("This Favorite ->", response);
        var favorite = response.data.data[0];
        console.log("favorite->", favorite);

        // get favorite's images
        var images = [];
        var i = 0;
        while (i < favorite.images.length) {
          images.push(favorite.images[i]["url"]);
          i++;
        }
        this.currentImages = images;

        // get park's activities
        var activities = [];
        i = 0;
        while (i < favorite.activities.length) {
          activities.push(favorite.activities[i]["name"]);
          i++;
        }
        this.currentActivities = activities.sort().join(", ");

        document.querySelector("#park-details").showModal();
      });
    },
  },
};
</script>
