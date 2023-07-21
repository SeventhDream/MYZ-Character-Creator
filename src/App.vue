<template>
  <div id="app">
    <NavBar ref="navbar" />

    <div class="container main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <!--router-link to="/character-viewer">View All Characters</router-link-->
            <!--router-link to="/character-creator">Create a Character</router-link-->
            <router-view
              :characters="characters"
              :getCharacters="getCharacters"
            ></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import axios from "axios";


export default {
  name: "App",
  components: {
    NavBar,
  },
  data: function () {
    return {
      characters: null, // Data property to hold the characters retrieved from the server
    };
  },
  methods: {
    getCharacters() {
      const token = this.$store.state.user.token; // Access the authentication token from the Vuex store
      if (token) {
        axios
          .get("http://localhost:3000/characters", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.characters = response.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    },
  },
  mounted: function () {
    console.log("App component mounted.");


    
  },
  beforeUnmount() {

  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

.main-content {
  transition: margin-left 0.3s ease-in-out;
  width: 100vw;
  height: 100vh;
}

.offset-menu {
  margin-left: 200px; /* Set the width of the menu */
}

#app {
  background-color: #000000;
  background-image: url("./images/backdrop3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
@media (min-width: 992px) {
  #app {
    margin-left: 199px;
  }
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
