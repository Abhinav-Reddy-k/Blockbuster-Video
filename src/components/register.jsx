import React from "react";
import Forms from "./common/forms";
import { register } from "./../services/userService";
import { toast } from "react-toastify";

const Joi = require("@hapi/joi");

class Register extends Forms {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
  }).options({ abortEarly: false });

  doSubmit = async () => {
    try {
      await register(this.state.data);
      toast.success(`Successfully added ${this.state.data.username}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User Already Registered");
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
