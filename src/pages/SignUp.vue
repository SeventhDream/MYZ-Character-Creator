<template>
  <div class="flex-container">
    <div class="login-form">
      <div class="form-header">
        <h3>Signup</h3>
        <hr />
      </div>
      <form>
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url('../images/backdrop.jpg');
   background-size: fill;
   background-repeat: no-repeat;
   background-position: center;
}

.login-form {
  max-width: 400px;
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

.btn-primary {
  width: 100%;
}
</style>