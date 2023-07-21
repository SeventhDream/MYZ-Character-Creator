<template>
  <div class="flex-container">
    <div class="login-form">
      <div class="form-header">
        <h3>Login</h3>
        <hr />
      </div>
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email" />
          <div class="error" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" />
          <div class="error" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
      <div v-if="success" class="success-message">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidaitons from "@/services/SignupValidations";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      success: "",
    };
  },
  methods: {
    onLogin() {
      this.success = "";
      // Check validations
      let validations = new SignupValidaitons(this.email, this.password);

      this.errors = validations.checkValidations();
      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }

      // Make HTTP request to login endpoint
      axios
        .post("http://localhost:3000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle successful login
          const token = response.data.token;
          const refreshToken = response.data.refreshToken;
          const message = response.data.message;
          const username = response.data.username;
          // After successful login, dispatch the setUser action to set the user data in Vuex store
          this.$store.dispatch("setUser", {
            username: username,
            refreshToken: refreshToken,
            token: token,
          });
          this.success = message;
        })
        .catch((error) => {
          // Handle login error
          if (error.response) {
            const { data } = error.response;
            if (data.status === 404) {
              this.errors = { email: data.message };
            } else if (data.status === 401) {
              this.errors = { password: data.message };
            } else {
              console.log("An error occurred:", data.message);
            }
          } else {
            console.log("An error occurred:", error.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.login-form {
  width: 300px;
  padding: 20px;
  background-color: #333333; /* Set your desired background color */
  border-radius: 5px;
  color: #ffffff;
}

.form-header {
  text-align: center;
  color: #ffffff; /* Set your desired text color */
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: #f5f5f5; /* Set your desired background color */
}

.btn {
  width: 9em;
  height: 3em;
  border-radius: 30em;
  background-color: black;
  font-size: 15px;
  font-family: inherit;
  border: none;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  box-shadow: 3px 3px 12px #000000, -3px -3px 12px #c5c5c5;
}

.btn::before {
  content: "";
  width: 0;
  height: 3em;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, #dc143c 0%, #0fd850 100%);
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

.btn:hover::before {
  width: 9em;
}

.form-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
