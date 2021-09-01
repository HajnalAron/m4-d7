import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NetflixNavbar from "./components/Navbar";
import GetMovies from "./components/GetMovies";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    query: ""
  };
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <NetflixNavbar
          query={this.state.query}
          onChange={(value) => this.setState({ query: value })}
        />
        {this.state.query.length === 0 && (
          <>
            {" "}
            <GetMovies search="marvel" />
            <GetMovies search="harry potter" />
            <GetMovies search="lord of the rings" />{" "}
          </>
        )}
        {this.state.query.length > 3 && <GetMovies search={this.state.query} />}
      </div>
    );
  }
}

export default App;
