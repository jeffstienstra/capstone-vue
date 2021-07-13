<template>
  <div>
    <span v-title data-title="traVlog"></span>
    <div>
      <h2>Explore the National Parks</h2>
    </div>

    <!-- format this drop down for initial park search -->
    <form action="/">
      <label for="stateCode">Search by State:</label>
      <select id="stateCode" name="stateCode">
        <option value="" selected>all</option>
        <option value="al">ALABAMA</option>
        <option value="ak">ALASKA</option>
        <option value="az">ARIZONA</option>
        <option value="ar">ARKANSAS</option>
        <option value="ca">CALIFORNIA</option>
        <option value="co">COLORADO</option>
        <option value="ct">CONNECTICUT</option>
        <option value="de">DELAWARE</option>
      </select>
      <br />
      <label for="activities">Search by activity:</label>
      <select id="activities" name="activities">
        <option value="" selected>all</option>
        <option value="camping">Camping</option>
        <option value="fishing">Fishing</option>
        <option value="hiking">Hiking</option>
        <option value="swimming">Swimming</option>
      </select>
      <br />
      <!-- <input v-on:click="parksIndex()" type="submit" /> -->
    </form>
    <button v-on:click="parksIndex()">Submit</button>

    <div v-for="park in parks" v-bind:key="park.id">
      <h3>{{ park.fullName }}</h3>
      <img v-bind:src="park.images[0].url" v-bind:key="park.id" alt="" style="width: 25%" />
      <div>
        <button v-on:click="parksShow(park)">details</button>
        <input v-on:click="addFavorite(park)" type="button" value="+Favorites" />
      </div>
      <p>________________________________________</p>
    </div>

    <dialog id="park-details" style="width: 65%">
      <form method="dialog">
        <button float:right>Close</button>
        <input v-on:click="addFavorite(currentPark)" type="button" value="+Favorites" />
        <!-- <button type="button" class="close" data-dismiss="modal">Close</button> -->

        <h1>{{ currentPark.fullName }}</h1>

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
        <p>{{ entranceFee }}</p>

        <!-- <button>Close</button> -->
      </form>
    </dialog>
    <!-- \/ how to get the next 10 parks? \/ -->
    <!-- <button v-on:click="moreParks()">more... ></button> -->
    <!-- <a v-bind:href="`/parks/`">next</a> -->
  </div>
</template>

<style>
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

#map {
  position: relative;
  height: 300px;
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
      currentActivities: {},
      currentPark: {},
      currentImages: {},
      park_name: "",
      address: "",
      parkCode: "",
      image_url: "",
      entranceFee: {},
    };
  },

  created: function () {},

  methods: {
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

      document.querySelector("#park-details").showModal();

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

      // create the popup
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
