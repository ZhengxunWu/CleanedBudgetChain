import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./pages/home/Home";
import { BrowserRouter as Router, Route, Link } from "react-dom";
import { Campaigns } from "./pages/campaign";
//import {CampaignShow} from "./pages/show";

const TestComonent = props => {
  return <div>hello world</div>;
};
function App() {
  return (
    <Router>
      {/* <div className="App">
        <header className="App-header"> */}
      <Route path="/" component={TestComonent} />
      <Route path="/Campaigns" component={Campaigns} />
      <Route path="./pages/home.Home" component={HomePage}/>
      
      {/* </div> */}
    </Router>
  );
}

export default App;
