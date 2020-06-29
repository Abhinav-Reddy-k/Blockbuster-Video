import React, { Component } from "react";
import LoginForm from './components/login';
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/Navbar/navbar";
import Rentals from "./components/Navbar/rentals";
import Customers from "./components/Navbar/customers";
import PageNotFound from "./components/common/pageNotFound";
import MovieForm from "./components/movieForm";
import "./App.css";
import Register from './components/register';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
          <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
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
