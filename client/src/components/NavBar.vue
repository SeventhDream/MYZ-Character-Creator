<template>
  <div class="sideMenu" ref="navbar">
    <div></div>
    <nav class="navbar fixed-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          @click="toggleMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon navbar-dark"></span>
        </button>
        <div
          class="offcanvas offcanvas-start"
          data-bs-backdrop="false"
          data-bs-scroll="true"
          :class="{ show: isMenuVisible }"
          id="offcanvasNavbar"
        >
          <div class="text-left">
            <router-link
            class="nav-link"
            to="/user-bio"
            exact
            exact-active-class="active" v-if="user && user.username">
              <!-- Show the username if the user is logged in -->
              {{ user.username }}
          </router-link>
            <button
              type="button"
              class="btn-close btn-close-white d-lg-none"
              @click="toggleMenu"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-header">
            <img src="../images/icon-skull-invert.jpg" width="50" alt="Italian Trulli" />
            <h5 class="offcanvas-title">Menu</h5>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/" exact exact-active-class="active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-house-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6z"
                    />
                  </svg>
                  Home
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/Login"
                  exact
                  exact-active-class="active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-key-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                  </svg>
                  Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/Signup"
                  exact
                  exact-active-class="active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-vcard-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5zm-1 2c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5zm1 2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5zm-1-3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5z"
                    />
                  </svg>
                  Signup
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/character-viewer"
                  exact
                  exact-active-class="active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"
                    />
                  </svg>
                  Characters
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import eventBus from "../event-bus.js";
import { ref, onMounted, inject, reactive } from "vue";

export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  setup() {
    // Use the "inject" function to get the store instance
    const store = reactive(inject("store"));

    const user = ref(null);

    // Subscribe to changes in the Vuex store user state
    onMounted(() => {
      user.value = store.state.user;
      store.subscribe((mutation, state) => {
        if (mutation.type === "setUser") {
          user.value = state.user;
        }
      });
    });

    return {
      user,
    };
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      if (window.innerWidth >= 992) {
        this.isMenuVisible = true;
      } else {
        this.isMenuVisible = false;
      }
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      eventBus.emit("menu-visibility-changed");
    },
  },
};
</script>

<style scoped>
.offcanvas {
  background-color: #000000;
  font-family: inherit;
  font-weight: bold;
  color: #ffffff;
  font-size: 15px;
}

.offcanvas-start {
  width: 200px;
}

h5 {
  font-size: 40px;
  font-weight: bold;
}

.text-left {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}

@media (min-width: 992px) {
  .offcanvas-start {
    display: block !important;
    transform: none !important;
    visibility: visible !important;
  }
}

.btn-close,
.navbar-toggler {
  color: white;
}

.nav-item {
  transition: background-color 0.3s ease;
  padding: 0;
  margin: 0;
  width: 199px;
}

.nav-item.active {
  background-color: red !important;
}

.offcanvas-body {
  padding: 0;
}

.nav-link {
  color: #ffffff;
  display: block;
  padding: 1rem;
  text-decoration: none;
  font-size: 20px;
}

.nav-link.active {
  background-color: red;
}
</style>
