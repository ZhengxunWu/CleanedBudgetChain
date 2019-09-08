import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Campaigns } from "./pages/campaign";
import { HomePage } from "./pages/home/Home";

ReactDOM.render(
  <Router>
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={HomePage} />
        <Route path="/Campaigns/:campaignId" component={Campaigns} />
      </header>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
