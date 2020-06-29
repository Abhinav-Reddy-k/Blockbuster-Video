import React from "react";
import Forms from "./common/forms";

const Joi = require("@hapi/joi");

class Register extends Forms {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(3).alphanum().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required().label("Email"),
  }).options({ abortEarly: false });

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="col-6 container">
        <h1 className="bm">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
