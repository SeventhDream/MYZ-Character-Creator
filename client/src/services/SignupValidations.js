import Validations from "./Validations";

export default class SignupValidaitons {
    constructor(email, password, username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    checkValidations() {
        let errors = [];
        
        // email validation
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }
        
        // password validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'Password should be a minimum of 6 characters';
        }

        // username validation (if ti exists)
        if (this.username && !Validations.minLength(this.username, 3)) {
            errors['username'] = 'Username should be a minimum of 3 characters'
        }

        return errors;
    }
}