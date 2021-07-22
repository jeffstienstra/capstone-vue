<template>
  <div>
    <span v-title data-title="traVlog"></span>
    <p></p>
    <h2>Favorites</h2>

    <!-- \/  show all favorites with tiled cards  \/ -->
    <div class="container">
      <div class="row row-cols-3">
        <div v-for="favorite in myFavorites" v-bind:key="favorite.id" class="col">
          <div class="card">
            <div class="img-container">
              <div v-if="favorite.visited" class="tag">Visited!</div>
              <img
                style="max-height: 100%; max-width: 100%; object-fit: contain"
                v-bind:src="favorite.image_url"
                v-bind:key="favorite.id"
                class="card-img-top"
                alt=""
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ favorite.park_name }}</h5>

              <!-- \/  action buttons on card  \/ -->
              <div class="btn-group-sm" role="group" aria-label="Basic example">
                <button v-on:click="destroyFavorite(favorite)" type="button" class="btn btn-outline-danger">X</button>
                <button v-on:click="favoriteShow(favorite)" type="button" class="btn btn-outline-dark">Details</button>

                <button
                  v-if="favorite.journals.length > 0"
                  v-on:click="showJournals(favorite)"
                  type="button"
                  class="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#journals"
                >
                  Journals
                </button>

                <button v-on:click="showCreateJournalModal(favorite)" type="button" class="btn btn-outline-success">
                  +Journal
                </button>
                <button
                  v-if="favorite.journals.length > 0"
                  v-on:click="showFieldNotesMap(favorite)"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Travlog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <p>________________________________________</p>
    <div v-for="favorite in myFavorites" v-bind:key="favorite.id">
      <h3 style="color: #006400" v-if="favorite.visited">{{ favorite.park_name }}</h3>
      <h3 v-if="favorite.visited != true">{{ favorite.park_name }}</h3>
      <img v-bind:src="favorite.image_url" v-bind:key="favorite.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="destroyFavorite(favorite)">Remove</button>
        <button v-on:click="favoriteShow(favorite)">Park Details</button>
        <button v-on:click="showJournals(favorite)">Field Notes</button>
        <button v-on:click="showCreateJournalModal(favorite)">Add Field Note</button>
        <button v-if="favorite.journals.length > 0" v-on:click="showFieldNotesMap(favorite)">Field Note Map</button>
       
        <p>________________________________________</p>
      </div>
    </div> -->

    <!-- show favorite park details modal -->
    <dialog id="park-details" style="width: 60%">
      <form method="dialog">
        <button float:right>Close</button>
        <!-- <button type="button" class="close" data-dismiss="modal">Close</button> -->
        <h1>{{ favorite.fullName }}</h1>

        <!-- create the map menu -->
        <div id="menu">
          <input
            id="jeffstienstra/ckqxyevbn0mff17qgpmz4ned8"
            type="radio"
            name="rtoggle"
            value="satellite"
            checked="checked"
          />
          <label for="jeffstienstra/ckqxyevbn0mff17qgpmz4ned8">satellite</label>
          <input id="jeffstienstra/ckqx6hkw40yp618mvdg4hbjoc" type="radio" name="rtoggle" value="terrain" />
          <label for="jeffstienstra/ckqx6hkw40yp618mvdg4hbjoc">terrain</label>
        </div>

        <!-- render the map window -->
        <div id="map"></div>

        <!-- display details of the selected favorite park -->
        <div>
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
        </div>
      </form>
    </dialog>

    <!-- \/  show all journals of favorite with tiled cards  \/ -->
    <div class="container">
      <div id="journals" class="modal fade row" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div style="overflow: auto" class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-header">
              <div class="card">
                <div v-for="journal in journals" v-bind:key="journal.id">
                  <h5 class="modal-title" id="exampleModalLabel">{{ journal.date }}</h5>
                  <img
                    style="max-height: 250px; max-width: 450px; object-fit: contain"
                    v-bind:src="journal.image"
                    v-bind:key="journal.id"
                    class="card-img-top"
                    alt=""
                  />

                  <h1>{{ journal.title }}</h1>

                  <p>{{ journal.body }}</p>

                  <div class="btn-group-sm" role="group" aria-label="Basic example">
                    <button v-on:click="destroyJournal(journal)" type="button" class="btn btn-outline-danger">X</button>
                    <button v-on:click="editJournal(journal)" type="button" class="btn btn-outline-dark">Edit</button>
                  </div>
                  <p>________________________________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- journalCreate modal: add field note to a favorite park -->
    <dialog id="journal-create" style="width: 100%">
      <button v-on:click="hideCreateJournalModal()">Cancel</button>
      <form v-on:submit.prevent="createJournal(favorite)">
        <h1>New Field Note</h1>
        <p>
          Note: {{ favorite.park_name }}'s coordinates are
          <br />
          Latitude {{ favorite.latitude }} Longitude {{ favorite.longitude }}
        </p>
        <button v-on:click="confirmUserGeolocation()" type="button">Add GPS Data</button>

        <v-alert v-if="gpsConfirmation" border="right" dismissible elevation="11" type="success">
          GPS data added to Field Note
        </v-alert>
        <!-- <p v-if="gpsConfirmation" style="color: green"><strong>GPS data added to Field Note</strong></p> -->

        <div>
          <label>Latitude:</label>
          <input type="text" v-model="latitude" />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" v-model="longitude" />
        </div>

        <div>
          <label>Date:</label>
          <input type="text" v-model="date" />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" v-model="body" />
        </div>
        <div>
          Image:
          <input type="file" v-on:change="setFile($event)" ref="fileInput" />
        </div>
        <input type="submit" value="Submit" />
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
          <label>Latitude:</label>
          <input type="text" v-model="favorite.latitude" />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" v-model="favorite.longitude" />
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

    <!-- show Field Notes map -->
    <dialog id="field-notes-map" style="width: 60%">
      <!-- create the map menu -->
      <div id="field-menu">
        <input
          id="jeffstienstra/ckqxyevbn0mff17qgpmz4ned8"
          type="radio"
          name="rtoggle"
          value="satellite"
          checked="checked"
        />
        <label for="jeffstienstra/ckqxyevbn0mff17qgpmz4ned8">satellite</label>
        <input id="jeffstienstra/ckqx6hkw40yp618mvdg4hbjoc" type="radio" name="rtoggle" value="terrain" />
        <label for="jeffstienstra/ckqx6hkw40yp618mvdg4hbjoc">terrain</label>
      </div>

      <!-- render the map window -->
      <div id="field-map"></div>
    </dialog>
  </div>
</template>

<style>
.img-container {
  border: 1px solid #dddddd;

  position: relative;
}
.tag {
  float: left;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1000;
  background-color: #05af0d;
  padding: 5px;
  color: #ffffff;
  font-weight: bold;
}
#popup-image {
  max-width: 75%;
  height: 100px;
}
.marker {
  background-image: url("https://res.cloudinary.com/nacho-files/image/upload/v1626207290/travlog%20logos/travlog_marker_wht_xxsm_1_vzs3fc.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
body {
  margin: 0;
  padding: 0;
}

#field-map {
  position: relative;
  height: 450px;
  top: 0;
  bottom: 0;
  width: 100%;
}

#map {
  position: relative;
  height: 50vh;
  top: 0;
  bottom: 0;
  width: 100%;
}

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
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
      parkCode: "",
      date: "",
      title: "",
      body: "",
      imageFile: "",
      latitude: "",
      longitude: "",
      gpsConfirmation: false,
    };
  },
  created: function () {
    this.favoritesIndex();
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
        console.log(this.createJournalParams.image);
      }
    },
    favoritesIndex: function () {
      axios.get("/favorites").then((response) => {
        console.log("Favorites ->", response);
        this.myFavorites = response.data;
      });
    },
    favoriteShow: function (favorite) {
      console.log("Favorite parkCode ->", favorite.parkCode);

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
        // console.log(this.favorite.entranceFees[0]);
        var entranceFee = `$${this.favorite.entranceFees[0]["cost"]}
        ${this.favorite.entranceFees[0]["description"]}`;
        this.entranceFee = entranceFee;

        document.querySelector("#park-details").showModal();

        //    \/render map \/
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
        var map = new mapboxgl.Map({
          container: "map", // container id
          style: "mapbox://styles/jeffstienstra/ckqxyevbn0mff17qgpmz4ned8", // style URL
          center: [this.favorite.longitude, this.favorite.latitude], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        var layerList = document.getElementById("field-menu");
        var inputs = layerList.getElementsByTagName("field-input");

        //    \/ set up map styles toggle \/
        function switchLayer(layer) {
          var layerId = layer.target.id;
          map.setStyle("mapbox://styles/" + `${layerId}`);
        }

        for (i = 0; i < inputs.length; i++) {
          inputs[i].onclick = switchLayer;
        }

        // create the popup
        var popup = new mapboxgl.Popup({ offset: 0 }).setHTML(`<p><strong>${this.favorite.fullName}</strong><br>
      ${this.favorite.addresses[0]["line1"]}<br>${this.favorite.addresses[0]["city"]}, ${this.favorite.addresses[0]["stateCode"]} ${this.favorite.addresses[0]["postalCode"]}<br>
      Get driving directions <a href='${this.favorite.directionsUrl}' target="_blank">here</a></p>`);

        // create DOM element for the marker
        var el = document.createElement("div");
        el.className = "marker";

        var marker1 = new mapboxgl.Marker(el)
          .setLngLat([this.favorite.longitude, this.favorite.latitude])
          .setPopup(popup)
          .addTo(map);
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
      this.favorite = favorite;
      console.log("all journals of this favorite", favorite);
      this.journals = favorite["journals"];
      // document.querySelector("#journals").showModal();
    },

    createJournal: function (favorite) {
      this.favorite = favorite;
      console.log(favorite);

      console.log("create journal ->", favorite);

      var formData = new FormData();
      formData.append("favorite_id", this.favorite.id);
      formData.append("parkCode", this.favorite.parkCode);
      formData.append("date", this.date);
      formData.append("title", this.title);
      formData.append("body", this.body);
      formData.append("latitude", this.latitude);
      formData.append("longitude", this.longitude);
      formData.append("image_file", this.imageFile);
      console.log("image ->", this.imageFile);

      axios
        .post(`/journals`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("ERRRR:: ", error.response.data);
          this.latitude = "";
          this.longitude = "";
          this.date = "";
          this.title = "";
          this.body = "";
          this.$refs.fileInput.value = "";
        });
      window.location.reload();
    },

    editJournal: function (journal) {
      console.log("this journal ->", journal);
      this.updateJournalParams = journal;
      document.querySelector("#journal-update").showModal();
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

    hideCreateJournalModal: function () {
      console.log("close the modal");
      window.location.reload();
      // document.querySelector("#journal-create").hideModal();   <--such a thing as hideModal()????
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

    confirmUserGeolocation: function () {
      let confirmUserGeolocation = confirm("Would like to apply your GPS location to this Field Note?");
      if (confirmUserGeolocation) {
        const success = (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude = latitude;
          this.longitude = longitude;
          this.gpsConfirmation = true;
          console.log(`Your coordinates: ${this.latitude} lat and ${this.longitude} lng`);
        };

        const error = (err) => {
          console.log(err);
        };

        navigator.geolocation.getCurrentPosition(success, error);

        alert(`GPS Data successfully applied.`);
      } else {
        alert("Action canceled. No GPS Data was inspected.");
      }
    },

    showFieldNotesMap: function (favorite) {
      document.querySelector("#field-notes-map").showModal();
      this.journals = favorite["journals"];

      //    \/render map \/
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "field-map", // container ID
        style: "mapbox://styles/jeffstienstra/ckqxyevbn0mff17qgpmz4ned8", // style URL
        center: [this.journals[0].longitude, this.journals[0].latitude], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });
      console.log(map);
      console.log("this.journal ->", this.journals);
      console.log("lat: ", this.journals[0].latitude, " long: ", this.journals[0].longitude);

      var layerList = document.getElementById("field-menu");
      var inputs = layerList.getElementsByTagName("input");

      //    \/ set up map styles toggle \/
      function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle("mapbox://styles/" + `${layerId}`);
      }
      var i = 0;
      for (i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }

      // create popups for each journal \/ ! BUT IMAGES WILL NOT APPEAR ! \/
      i = 0;
      for (i = 0; i < this.journals.length; i++) {
        var popup = new mapboxgl.Popup({ offset: 0 }).setHTML(
          `<img id="popup-image" src="${this.journals[i].image}"/>
        <p><strong>${this.journals[i].date}<br>
        ${this.journals[i].title}</strong><br>
        ${this.journals[i].body}<br>
        </p>`
        );

        // create DOM element for the marker
        var el = document.createElement("div");
        el.className = "marker";

        var field_marker = new mapboxgl.Marker(el)

          .setLngLat([this.journals[i].longitude, this.journals[i].latitude])
          .setPopup(popup)
          .addTo(map);
        console.log(field_marker, map);
      }
    },
  },
};
</script>
