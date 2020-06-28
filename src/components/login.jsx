import React, { Component } from "react";

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
          <div className="form-group">
            <label htmlFor="username"></label>Username
            <input
              autoFocus
              onChange={this.handleChange}
              name="username"
              id="username"
              value={account.username}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>Password
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={account.password}
              className="form-control bm"
            />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
