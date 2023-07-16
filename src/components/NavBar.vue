<template>
  <nav class="navbar fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler d-lg-none" type="button" @click="toggleMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" data-bs-backdrop="false" data-bs-scroll="true" :class="{ 'show': isMenuVisible }" id="offcanvasNavbar">
        <div class="offcanvas-header">
            <img src="../images/icons8-virus-dna-64.png" alt="Italian Trulli">
          <h5 class="offcanvas-title">Menu</h5>
          <button type="button" class="btn-close d-lg-none" @click="toggleMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
            <li class="nav-item">
                <router-link class="nav-link" to="/"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-fill" viewBox="0 1 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
</svg> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link class="navlink" to="/Login"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-key-fill" viewBox="0 1 16 16">
  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg> Login </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Signup"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 1 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
</svg> Signup </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/character-viewer"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-square" viewBox="0 1 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
</svg> Characters </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import eventBus from '../event-bus.js';

export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
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
      eventBus.emit('menu-visibility-changed');
    },
  },
};
</script>

<style scoped>
.offcanvas {
    background-color: #928E85;
    font-family: 'Courier New', monospace; /* Set your desired font-family */
  font-weight: bold; /* Make the font bold */
  color: #ff0000; /* Set your desired font color */
  font-size: 15px;
  /* Add any other custom styles as needed */
}

.offcanvas-start {
  width: 200px; /* Set your desired width here */
}
 h5 {
    font-size: 40px;
    font-weight: bold;
 }
/* Media query for screens larger than or equal to 992 pixels */
@media (min-width: 992px) {
  .offcanvas-start {
    display: block !important;
    transform: none !important;
    visibility: visible !important;
  }
}
</style>
