<template>
  <div class="plants">
    <span v-title data-title="traVlog"></span>
    <button v-on:click="confirmUserGeolocation()" type="button">Add GPS Data</button>
    <form>
      <input type="file" accept="image/*" />
      <button v-on:click="getPlantId()" type="button">OK</button>
    </form>

    <h3>This is where you'll see a list of plants you've collected.</h3>

    <p>{{ match }}</p>
    <p>{{ image }}</p>
    <br />
    <!-- plant.id results modal -->
    <dialog id="plant-results" style="width: 75%">
      <h1>hello</h1>
      <button>close</button>
    </dialog>
  </div>
</template>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #1bc932;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1bc932;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<script>
export default {
  data: function () {
    return {
      latitude: {},
      longitude: {},
      matchingPlant: {},
      match: {},
      image: "",
    };
  },
  created: function () {},
  methods: {
    //   ask user for GPS coordinates \/
    confirmUserGeolocation: function () {
      let confirmUserGeolocation = confirm("Would like to apply your GPS location to your image?");
      if (confirmUserGeolocation) {
        const success = (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude = latitude;
          this.longitude = longitude;
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

    //    \/ Plant.id scripts \/
    getPlantId: function () {
      const files = [...document.querySelector("input[type=file]").files];
      const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          console.log(reject);
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((base64files) => {
        console.log(base64files);

        const data = {
          api_key: "9gRZ5Hhf535FnpgMXTAZz8ODmAcndp7ojqEDugBkQHpI2pN2W4",
          images: base64files,
          modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          plant_details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy", "synonyms"],
        };

        fetch("https://api.plant.id/v2/identify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.match = data.suggestions[0]["plant_details"];
            this.image = data.suggestions[0]["similar_images"][0]["url"];
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        this.matchingPlant = data;
        console.log("this.matchingPlant", this.matchingPlant);
      });
    },
  },
};
</script>
