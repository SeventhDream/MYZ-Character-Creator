<template>
  <div class="character-creator">
    <h1>Character Creator</h1>

    <!-- Input field for character name -->
    <label for="character-name">Character Name: </label>
    <input type="text" id="character-name" v-model="name" placeholder="Enter a name" />
    <br />

    <!-- Dropdown menu for character profession -->
    <label for="professions-list">Character Profession: </label>
    <select id="professions-list" v-model="profession">
      <option value="Enforcer">Enforcer</option>
      <option value="Gearhead">Gearhead</option>
      <option value="Stalker">Stalker</option>
      <option value="Fixer">Fixer</option>
      <option value="Dog Handler">Dog Handler</option>
      <option value="Chronicler">Chronicler</option>
      <option value="Boss">Boss</option>
      <option value="Slave">Slave</option>
    </select>
    <br /><br />

    <!-- Dropdown menu for character mutation -->
    <label for="mutations-list">Character Mutation: </label>
    <select id="mutations-list" v-model="mutation">
      <!-- options for character mutations -->
      <option value="Rot-Eater">Rot-Eater</option>
      <option value="Extra Limbs">Extra Limbs</option>
    </select>
    <br /><br />

    <!-- Input field for image URL -->
    <label for="image-url">Image URL: </label>
    <input type="text" id="image-url" v-model="avatar" placeholder="Enter an image URL" />
    <br /><br />

    <!-- Button to create the character -->
    <button v-on:click="postCharacter">Create Character</button>
  </div>
</template>

<script>
import DOMPurify from "dompurify";

export default {
  name: "CharacterCreator",

  data: function () {
    return {
      name: null, // Data property to hold the character's name
      profession: null, // Data property to hold the character's profession
      mutation: null, // Data property to hold the character's mutation
      avatar: null,
    };
  },
  methods: {
    postCharacter: function () {
      // Assign a default image URL if the imageUrl field is empty

      if (!this.avatar) {
        this.avatar = "http://localhost:3000/default-profile.jpg";
      }
      const accessToken = this.$store.state.user.accessToken; // Access the authentication accessToken from the Vuex store
      if (accessToken) {
        // Make an HTTP POST request to create a new character
        this.$axios.post(
          "http://localhost:3000/characters",
          {
            name: DOMPurify.sanitize(this.name), // Pass the character's name
            profession: DOMPurify.sanitize(this.profession), // Pass the character's profession
            mutation: DOMPurify.sanitize(this.mutation), // Pass the character's mutation
            avatar: DOMPurify.sanitize(this.avatar),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    },
  },
};
</script>

<style scoped>
/* CSS styles specific to this component */
</style>
