<template>
  <div class="character-viewer">
    <h1>Characters</h1>
    <!-- Loop through each character in the characters array -->
    <p v-for="(character, index) in characters" v-bind:key="index">
      <!-- Display the name and profession of each character -->
      {{ character.name }} is a {{ character.profession }} with mutation:
      {{ character.mutation }}
      <button @click="deleteCharacter(character._id)">Delete</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from '../event-bus.js';
export default {
  name: "CharacterViewer",
  props: {
    getCharacters: Function,
    characters: Array, // Prop to receive an array of characters from the parent component
  },
  methods: {
    deleteCharacter(id) {
      axios
        .delete(`http://localhost:3000/characters/${id}`)
        .then((response) => {
          // Character successfully deleted
          console.log(response.data); // Log the response data
          eventBus.emit("character-deleted", id); // Emit an event to notify the parent component about the deleted character
        })
        .catch((error) => {
          // Error occurred while deleting character
          console.log(error.response.data); // Log the error response data
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // Fetch the characters when entering the route
      vm.$props.getCharacters();
    });
  },
  beforeRouteUpdate(to, from, next) {
    // Fetch the characters when the route parameters change
    this.$props.getCharacters();
    next();
  },
};
</script>

<style scoped>
/* CSS styles specific to this component */
h1 {
  color: red;
}
</style>
