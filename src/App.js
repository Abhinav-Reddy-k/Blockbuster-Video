import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PageNotFound from "./components/common/pageNotFound";
import ProtectedRoute from "./components/common/protectedRoute";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Customers from "./components/Navbar/customers";
import NavBar from "./components/Navbar/navbar";
import Rentals from "./components/Navbar/rentals";
import Register from "./components/register";
import { getCurrentUser } from "./services/authService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    let user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const user = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies" component={Movies} />
            <Route path="/pageNotFound" component={PageNotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/pageNotFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
