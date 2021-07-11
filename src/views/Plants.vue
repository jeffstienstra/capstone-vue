<template>
  <div class="plants">
    <button v-on:click="getUserGeolocation()" type="button">Find my location</button>
    <form>
      <input type="file" accept="image/*" />
      <button id="plant.id.button" type="button">OK</button>
    </form>
    <h3>This is where you'll see a list of plants you've collected.</h3>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      latitude: {},
      longitude: {},
    };
  },
  created: function () {},
  methods: {
    getUserGeolocation: function () {
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
    },
  },
};

// geolocation button

// //    \/Plant.id scripts \/
// document.getElementById("plant.id.button").onclick = function sendIdentification() {
//   const files = [...document.querySelector("input[type=file]").files];
//   const promises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       console.log(reject);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const res = event.target.result;
//         console.log(res);
//         resolve(res);
//       };
//       reader.readAsDataURL(file);
//     });
//   });

//   Promise.all(promises).then((base64files) => {
//     console.log(base64files);

//     const data = {
//       api_key: "9gRZ5Hhf535FnpgMXTAZz8ODmAcndp7ojqEDugBkQHpI2pN2W4",
//       images: base64files,
//       modifiers: ["crops_fast", "similar_images"],
//       plant_language: "en",
//       plant_details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy", "synonyms"],
//     };

//     fetch("https://api.plant.id/v2/identify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// };
//
</script>
