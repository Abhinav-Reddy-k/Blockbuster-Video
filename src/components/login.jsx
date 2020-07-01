import React from "react";
import Forms from "./common/forms";

const Joi = require("@hapi/joi");

class LoginForm extends Forms {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(3).alphanum().label("Username"),
    password: Joi.string().required().min(3).label("Password"),
  }).options({ abortEarly: false });

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="col-6 container">
        <h1 className="bm">Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
