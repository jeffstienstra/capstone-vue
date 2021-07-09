<template>
  <div>
    <h1>Favorites</h1>
    <p>________________________________________</p>
    <div v-for="favorite in myFavorites" v-bind:key="favorite.id">
      <h3>{{ favorite.park_name }}</h3>
      <img v-bind:src="favorite.image_url" v-bind:key="favorite.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="favoriteShow(favorite)">Park Details</button>
        <button v-on:click="showJournals()">Journals</button>
        <button v-on:click="addJournal()">+Journal</button>
        <p>________________________________________</p>
      </div>
    </div>

    <!-- modal -->
    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <button v-on:click="destroyPark(favorite)">Remove</button>
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
        <p>{{ favorite.weatherInfo }}</p>

        <h3>Directions</h3>
        <p>{{ favorite.directionsInfo }}</p>

        <h3>Entrance Fees</h3>
        <p>{{ favorite.entranceFees }}</p>

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
      myFavorites: {},
      favorite: {},
      park: {},
      // parkCode: {},
    };
  },
  created: function () {
    this.favoritesIndex();
  },
  methods: {
    favoritesIndex: function () {
      axios.get("/favorites").then((response) => {
        console.log("Favorites ->", response);
        this.myFavorites = response.data;
      });
    },
    favoriteShow: function (favorite) {
      axios.get(`parks/${favorite.parkCode}`).then((response) => {
        console.log("This Favorite ->", response);
        this.favorite = response.data[0]; // <-hard-coded for now. can't get park.parkCode to pass in params
        // console.log("favorite->", this.favorite);

        // get favorite's images
        var images = [];
        var i = 0;
        while (i < this.favorite.images.length) {
          images.push(this.favorite.images[i]["url"]);
          i++;
        }
        this.currentImages = images;

        // get park's activities
        var activities = [];
        i = 0;
        while (i < this.favorite.activities.length) {
          activities.push(this.favorite.activities[i]["name"]);
          i++;
        }
        this.currentActivities = activities.sort().join(", ");

        document.querySelector("#park-details").showModal();
      });
    },
    destroyPark: function (favorite) {
      console.log("destroy favorite", favorite);
      axios.delete(`/favorites/${favorite.parkCode}`).then((response) => {
        console.log("Destroy successful", response.data);
        window.location.reload();
        favorite = {};
        // this.$router.push("/favorites");
      });
    },
    addJournal: function () {},
  },
};
</script>
