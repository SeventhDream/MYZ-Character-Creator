<template>
  <div class="flex-container">
    <div class="user-panel">
      <div class="user-header">
        <h3>User Info</h3>
        <hr />
      </div>

      <div class="user-group">
        <label>Username</label>
        <input type="text" placeholder="Username goes here" readonly />
      </div>

      <div class="user-group">
        <label>Email</label>
        <input type="text" placeholder="Email goes here" readonly />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" @click="onLogout()">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
