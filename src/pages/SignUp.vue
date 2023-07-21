<template>
  <div class="flex-container">
    <div class="login-form">
      <div class="form-header">
        <h3>Signup</h3>
        <hr />
      </div>
      <form @submit.prevent="OnSignup()">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" v-model.trim="username" />
          <div class="error" v-if="errors.username">
            {{ errors.username }}
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model.trim="email" />
          <div class="error" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model.trim="password" />
          <div class="error" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SignupValidaitons from "@/services/SignupValidations";
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errors: [],
      success: "",
    };
  },
  methods: {
    OnSignup() {
      this.success = "";
      // Check validations
      let validations = new SignupValidaitons(this.email, this.password);

      this.errors = validations.checkValidations();
      if (
        "email" in this.errors ||
        "password" in this.errors ||
        "username" in this.errors
      ) {
        return false;
      }

      // Make HTTP request to register endpoint
      axios
        .post("http://localhost:3000/api/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle successful login
          const message = response.data.message;

          alert(message);

          // Route to the login page after successful registration
          router.push("/login"); // Replace "/login" with the path to your login page

        })
        .catch((error) => {
          // Handle login error
          if (error.response) {
            const { data } = error.response;
            this.success = data.message;
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
