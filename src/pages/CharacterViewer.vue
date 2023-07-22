<template>
  <div class="character-viewer">
    <h1>Characters</h1>
    <div
      class="character-card"
      v-for="(character, index) in characters"
      :key="index"
    >
      <img
        :src="getCharacterImage(character)"
        alt="Character Image"
        class="character-image"
        @error="handleImageError"
      />
      <div class="character-footer">
        <h2 class="character-name">{{ character.name }}</h2>
        <p class="character-info">
          {{ character.profession }} with mutation: {{ character.mutation }}
        </p>
        <button @click="deleteCharacter(character._id)" class="delete-button">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CharacterViewer",
  props: {
    getCharacters: Function,
    characters: Array,
  },
  methods: {
    deleteCharacter(id) {
      this.$axios
        .delete(`http://localhost:3000/characters/${id}`)
        .then((response) => {
          alert(response.data);
          this.$props.getCharacters();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    getCharacterImage(character) {
      if (character.avatar && this.isValidURL(character.avatar)) {
        return character.avatar;
      } else {
        return "http://localhost:3000/default-profile.jpg";
      }
    },
    isValidURL(url) {
      const urlRegex = /^(http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    },
    handleImageError(event) {
  event.preventDefault(); // Prevent the default error behavior
  event.target.src = "http://localhost:3000/default-profile.jpg";
},

  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$props.getCharacters();
    });
  },
  beforeRouteUpdate(to, from, next) {
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

.character-card {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
}

.character-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.character-footer {
  flex-grow: 1;
}

.character-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.character-info {
  margin-bottom: 10px;
}

.delete-button {
  background-color: #ff5252;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
