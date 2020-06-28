import React, { Component } from "react";
import Input from "./common/inputLogin";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { account } = this.state;

    return (
      <div className="col-6 container">
        <h1 className="bm">Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            onChange={this.handleChange}
            label="Username"
          />
          <Input
            name="password"
            value={account.password}
            onChange={this.handleChange}
            label="Password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
