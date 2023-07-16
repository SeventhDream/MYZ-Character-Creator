<template>
  <div id="app">
    <router-link to="/character-viewer">View All Characters</router-link>
    <router-link to="/character-creator">Create a Character</router-link>
    <router-view :characters="characters"
  :getCharacters="getCharacters"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from './event-bus.js';

export default {
  name: "App",

  data: function () {
    return {
      characters: null, // Data property to hold the characters retrieved from the server
    };
  },
  methods: {
    getCharacters: function () {
      // Make an HTTP GET request to retrieve characters from the server
      axios
        .get("http://localhost:3000/characters")
        .then((response) => (this.characters = response.data)); // Store the retrieved characters in the data property
    },
    handleCharacterDeleted(id) {
      this.characters = this.characters.filter((character) => character._id !== id);
    },
  },
  mounted: function () {
    console.log("App component mounted.");
    // Subscribe to the character deleted event
    eventBus.on('character-deleted', this.handleCharacterDeleted);

    this.getCharacters(); // Retrieve characters when the component is mounted
  },
  beforeUnmount() {
    // Unsubscribe from the character deleted event
    eventBus.off('character-deleted', this.handleCharacterDeleted);
  },
};
</script>



<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

* {
  box-sizing: border-box;
}

body {
  background: #1c8ef9 !important;
  min-heihgt: 100vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: "Fira Sans", sans-seriff;
}

body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}
</style>
