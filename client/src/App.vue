<template>
  <div id="main">
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
import { getStorage } from "./storageUtils";
import { ref, onMounted, inject, reactive } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
  },

  setup() {
    // Use the "inject" function to get the store instance
    const store = reactive(inject("store"));
    const characters = ref("null")
    // Subscribe to changes in the Vuex store user state
    onMounted(() => {
      store.subscribe((mutation) => {
        if (mutation.type === "setUser") {
          characters.value = null;
        }
      });
    });

    return {
      characters,
    };
  },
  methods: {
    getCharacters() {
      const accessToken = this.$store.state.user.accessToken; // Access the authentication accessToken from the Vuex store
      if (accessToken) {
        this.$axios
          .get("http://localhost:3000/characters", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            this.characters = response?.data;
          })
          .catch((error) => {
            alert(error.response?.data);
          });
      }
    },
  },
  mounted: function () {
    // Check if there's any user info in local storage
    const storedUser = getStorage("user");

    // If user info is found in local storage, set it to the Vuex store
    if (storedUser) {
      this.$store.commit("setUser", storedUser);
    }
  },
  beforeUnmount() {},
};
</script>

<style>
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
  #main {
    margin-left: 200px;
  }
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
