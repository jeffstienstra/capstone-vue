<template>
  <div>
    <h1>Favorites</h1>
    <p>________________________________________</p>
    <div v-for="favorite in myFavorites" v-bind:key="favorite.id">
      <h3>{{ favorite.park_name }}</h3>
      <img v-bind:src="favorite.image_url" v-bind:key="favorite.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="destroyFavorite(favorite)">Remove</button>
        <button v-on:click="favoriteShow(favorite)">Park Details</button>
        <button v-on:click="showJournals(favorite)">Field Notes</button>
        <button v-on:click="addJournal(favorite)">+</button>
        <p>________________________________________</p>
      </div>
    </div>

    <!-- favorites modal -->
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
        <p>{{ favorite.weatherInfo }}</p>

        <h3>Directions</h3>
        <p>{{ favorite.directionsInfo }}</p>

        <h3>Entrance Fees</h3>
        <p>{{ entranceFee }}</p>

        <!-- <button>Close</button> -->
      </form>
    </dialog>

    <!-- journals modal -->
    <dialog id="journals" style="width: 60%">
      <form method="dialog">
        <div>
          <!-- <input v-on:click="addJournal(favorite)" type="button" value="Add Field Note" /> -->
          <button style="float: right">Close</button>
        </div>

        <div v-for="journal in journals" v-bind:key="journal.id">
          <p>{{ journal.date }}</p>

          <h1>{{ journal.title }}</h1>

          <p>{{ journal.body }}</p>
          <button v-on:click="destroyJournal(journal)">Delete</button>
          <button v-on:click="editJournal(journal)">Edit</button>
          <p>________________________________________</p>
        </div>
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
      journals: {},
      entranceFee: {},
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
        this.favorite = response.data[0];

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

        // format entranceFee fee
        console.log(this.favorite.entranceFees[0]);
        var entranceFee = `$${this.favorite.entranceFees[0]["cost"]} 
        ${this.favorite.entranceFees[0]["description"]}`;
        this.entranceFee = entranceFee;

        document.querySelector("#park-details").showModal();
      });
    },
    destroyFavorite: function (favorite) {
      console.log("destroy favorite", favorite);
      axios.delete(`/favorites/${favorite.parkCode}`).then((response) => {
        console.log("Destroy successful", response.data);
        window.location.reload();
        favorite = {};
        // this.$router.push("/favorites");
      });
    },
    showJournals: function (favorite) {
      console.log(favorite["journals"]);
      this.journals = favorite["journals"];
      // axios.get(`journals/${journal.favorite_id}`).then((response) => {
      //   console.log("This journal ->", response);
      //   this.journal = response.data;
      //   console.log(this.journal);
      document.querySelector("#journals").showModal();
      // });
    },
    destroyJournal: function (journal) {
      console.log("destroy journal", journal);
      axios.delete(`/journals/${journal.id}`).then((response) => {
        console.log("Journal destroyed", response.data);
        window.location.reload();
      });
    },
    addJournal: function (favorite) {
      console.log("add journal, favorite_id =", favorite.id);
    },
    editJournal: function (journal) {
      console.log("edit journal, id = ", journal.id);
    },
  },
};
</script>
