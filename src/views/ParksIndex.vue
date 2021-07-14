<template>
  <div>
    <span v-title data-title="traVlog"></span>
    <p></p>
    <h2>Explore the National Parks</h2>

    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
          <!-- Form -->
          <form class="form-example" action="" method="">
            <!-- Input fields -->
            <select
              id="stateCode"
              name="stateCode"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Select State</option>
              <option value="al">ALABAMA</option>
              <option value="ak">ALASKA</option>
              <option value="az">ARIZONA</option>
              <option value="ar">ARKANSAS</option>
              <option value="ca">CALIFORNIA</option>
              <option value="co">COLORADO</option>
              <option value="ct">CONNECTICUT</option>
              <option value="de">DELAWARE</option>
            </select>

            <select
              id="activities"
              name="activities"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option value="" selected>Select Activity</option>
              <option value="camping">Camping</option>
              <option value="fishing">Fishing</option>
              <option value="hiking">Hiking</option>
              <option value="swimming">Swimming</option>
            </select>
            <!-- End input fields -->
          </form>
          <!-- Form end -->
        </div>
      </div>
    </div>

    <button v-on:click="parksIndex()" class="btn btn-primary btn-customized">Search</button>

    <p></p>

    <!-- \/  display parks search results with aligned cards  \/ -->
    <div class="container">
      <div class="row row-cols-3">
        <div v-for="park in parks" v-bind:key="park.id" class="col">
          <div class="card">
            <img
              style="max-height: 250px; max-width: 450px; object-fit: contain"
              v-bind:src="park.images[0].url"
              v-bind:key="park.id"
              class="card-img-top"
              alt=""
            />

            <div class="card-body">
              <h5 class="card-title">{{ park.fullName }}</h5>
              <!-- <a v-on:click="parksShow(park)" href="#" class="btn btn-primary">Details</a> -->
              <button
                v-on:click="parksShow(park)"
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#park-details-modal"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- \/  New Details Modal \/-->
    <div
      id="park-details-modal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div style="overflow: auto" class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ currentPark.fullName }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>

          <!-- \/  park content goes here: decr, images, weather, etc  \/ -->

          <!-- \/  image carousel \/ -->
          <div id="parkImages" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                data-bs-interval="2000"
                v-for="(currentImage, index) in currentImages"
                :class="{ active: index == 0 }"
                v-bind:key="currentImage.id"
              >
                <img
                  style="max-height: 250px; max-width: 450px; object-fit: contain"
                  v-bind:src="currentImage"
                  v-bind:key="currentImage.id"
                  class="d-block w-100"
                  alt=""
                />
              </div>
            </div>
            <a class="carousel-control-prev" href="#parkImages" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#parkImages" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <p></p>
          <!-- \/  park details  \/ -->
          <h3>About</h3>
          <p>{{ currentPark.description }}</p>

          <h3>Activities</h3>
          <p>{{ currentActivities }}</p>

          <h3>Weather</h3>
          <p>{{ currentPark.weatherInfo }}</p>

          <h3>Directions</h3>
          <p>{{ currentPark.directionsInfo }}</p>

          <h3>Entrance Fees</h3>
          <p>{{ entranceFee }}</p>

          <!-- \/ render Mapbox map  \/ -->
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
            <!-- <input id="jeffstienstra/ckqxyj14u1rsh17nvihai24i8" type="radio" name="rtoggle" value="dark" />
      <label for="jeffstienstra/ckqxyj14u1rsh17nvihai24i8">dark</label> -->
          </div>
          <div id="map"></div>

          <!-- \/  modal close buttons  \/ -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            <input
              v-if="isLoggedIn()"
              v-on:click="addFavorite(currentPark)"
              type="button"
              class="btn btn-success"
              value="+Favorites"
            />
            <!-- \/  modal +favorites buttons  \/ -->
            <button
              v-if="!isLoggedIn()"
              v-on:click="addFavorite(currentPark)"
              type="button"
              class="btn btn-success"
              disabled
            >
              +Favorites
            </button>

            <p style="color: red" v-if="!isLoggedIn()">Please log in to use the 'Favorites' feature.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="park in parks" v-bind:key="park.id">
      <h3>{{ park.fullName }}</h3>
      <img v-bind:src="park.images[0].url" v-bind:key="park.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="parksShow(park)">details</button>
        <input v-on:click="addFavorite(park)" type="button" value="+Favorites" />
      </div>
      <p>________________________________________</p>
    </div> -->
  </div>
</template>

<style>
.carousel-item img {
  margin: auto;
}
.marker {
  background-image: url("https://res.cloudinary.com/nacho-files/image/upload/v1626207290/travlog%20logos/travlog_marker_wht_xxsm_1_vzs3fc.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.modal-content {
  overflow-y: auto;
}
body {
  margin: 0;
  padding: 0;
}

#map {
  height: 50vh%;
  top: 0;
  bottom: 0;
  width: 100vw;
  margin: auto;
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
      currentActivities: {},
      currentPark: {},
      currentImages: {},
      park_name: "",
      address: "",
      parkCode: "",
      image_url: "",
      entranceFee: {},
      index: {},
    };
  },

  created: function () {},

  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    // searchByState: function () {
    //   console.log("search by state ->", this.searchParams);
    // },
    parksIndex: function () {
      axios.get("/parks").then((response) => {
        console.log("Parks ->", response);
        this.parks = response.data;
      });
    },
    // moreParks: function () {
    //   console.log("show the next set of parks...");
    //   // add 10 to the 'limit' param in the NPS search URL
    // },
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

      // format entrance fee
      console.log(park.entranceFees[0]);
      var entranceFee = `$${park.entranceFees[0]["cost"]}
        ${park.entranceFees[0]["description"]}`;
      this.entranceFee = entranceFee;
      this.currentActivities = activities.sort().join(", ");

      // document.querySelector("#park-details-modal").showModal();

      //    \/render map \/
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/jeffstienstra/ckqxyevbn0mff17qgpmz4ned8", // style URL
        center: [this.currentPark.longitude, this.currentPark.latitude], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      var layerList = document.getElementById("menu");
      var inputs = layerList.getElementsByTagName("input");

      //    \/ set up map styles toggle \/
      function switchLayer(layer) {
        var layerId = layer.target.id;
        console.log(layerId);
        map.setStyle("mapbox://styles/" + `${layerId}`);
      }

      for (i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }

      // create the map popup
      var popup = new mapboxgl.Popup({ offset: -5 }).setHTML(`<p><strong>${park.fullName}</strong><br>
      ${park.addresses[0]["line1"]}<br>${park.addresses[0]["city"]}, ${park.addresses[0]["stateCode"]} ${park.addresses[0]["postalCode"]}<br>
      Get driving directions <a href='${park.directionsUrl}' target="_blank">here</a></p>`);

      // create DOM element for the marker
      var el = document.createElement("div");
      el.className = "marker";

      var marker1 = new mapboxgl.Marker(el)
        .setLngLat([this.currentPark.longitude, this.currentPark.latitude])
        .setPopup(popup)
        .addTo(map);
      console.log(marker1, map);
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
        longitude: park.longitude,
        latitude: park.latitude,
        visited: false,
      };
      axios
        .post("/favorites", params)
        .then((response) => {
          this.favorites = response.data.data;
          console.log("added to favorites", response);
        })
        .catch((error) => {
          console.log("ERRRR:: ", error.response.data);
        });
    },
  },
};
</script>
