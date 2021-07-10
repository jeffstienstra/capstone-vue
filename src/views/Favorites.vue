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
        <button v-on:click="showCreateJournalModal(favorite)">Add Field Note</button>
        <p>________________________________________</p>
      </div>
    </div>

    <!-- favorites modal -->
    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <button float:right>Close</button>
        <!-- <button type="button" class="close" data-dismiss="modal">Close</button> -->
        <h1>{{ favorite.fullName }}</h1>

        <div id="map"></div>

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
      </form>
    </dialog>

    <!-- show all journals of favorite park modal -->
    <dialog id="journals" style="width: 60%">
      <form method="dialog">
        <div>
          <!-- <input v-on:click="addJournal(favorite)" type="button" value="Add Field Note" /> -->
          <button>Close</button>
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

    <!-- edit a journal of favorite park -->
    <dialog id="journal-update" style="width: 60%">
      <form v-on:submit.prevent="updateJournal(updateJournalParams)">
        <button>Cancel</button>

        <h1>Edit Post</h1>
        <div>
          <label>Date:</label>
          <input type="text" v-model="updateJournalParams.date" />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" v-model="updateJournalParams.title" />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" v-model="updateJournalParams.body" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </dialog>

    <!-- create a journal to favorite park -->
    <dialog id="journal-create" style="width: 60%">
      <form v-on:submit.prevent="createJournal(favorite)">
        <button>Cancel</button>

        <h1>New Field Note</h1>
        <div>
          <label>Date:</label>
          <input type="text" v-model="createJournalParams.date" />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" v-model="createJournalParams.title" />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" v-model="createJournalParams.body" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </dialog>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 300px;
}
</style>

<script>
/* global mapboxgl */

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
      updateJournalParams: {},
      createJournalParams: {},
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

        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
        var map = new mapboxgl.Map({
          container: "map", // container id
          style: "mapbox://styles/mapbox/streets-v11", // style URL
          center: [this.favorite.longitude, this.favorite.latitude], // starting position [lng, lat]
          zoom: 12, // starting zoom
        });

        var marker1 = new mapboxgl.Marker().setLngLat([this.favorite.longitude, this.favorite.latitude]).addTo(map);
        console.log(marker1, map);
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
      console.log("all journals of this favorite", favorite["journals"]);
      this.journals = favorite["journals"];
      // axios.get(`journals/${journal.favorite_id}`).then((response) => {
      //   console.log("This journal ->", response);
      //   this.journal = response.data;
      //   console.log(this.journal);
      document.querySelector("#journals").showModal();
      // });
    },
    editJournal: function (journal) {
      console.log("this journal ->", journal);
      this.updateJournalParams = journal;

      document.querySelector("#journal-update").showModal();
      // });
    },
    destroyJournal: function (journal) {
      console.log("destroy journal", journal);
      axios.delete(`/journals/${journal.id}`).then((response) => {
        console.log("Journal destroyed", response.data);
        window.location.reload();
      });
    },
    showCreateJournalModal: function (favorite) {
      this.favorite = favorite;
      document.querySelector("#journal-create").showModal();
    },
    createJournal: function (favorite) {
      this.favorite = favorite;
      this.createJournalParams.favorite_id = favorite.id;
      console.log("create journal ->", this.favorite, this.createJournalParams);
      axios
        .post(`/journals`, this.createJournalParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
      window.location.reload();
    },
    updateJournal: function (updateJournalParams) {
      console.log("edit journal", updateJournalParams);
      axios.patch(`journals/${updateJournalParams.id}`, updateJournalParams).then((response) => {
        console.log("web response ->", response.data);
        // document.querySelector("#journal-update").style.display = "none";
        // document.querySelector("#journals").showModal();

        window.location.reload();
      });
    },
  },
};
</script>
