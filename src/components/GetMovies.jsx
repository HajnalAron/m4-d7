import { Component } from "react";
import DisplayMovies from "./DisplayMovies";
import { Spinner } from "react-bootstrap";

class GetMovies extends Component {
  state = {
    movies: [],
    isLoading: true
  };
  fetchMovies = async () => {
    try {
      let resp = await fetch(
        `http://www.omdbapi.com/?apikey=92c48a5d&s=${this.props.search}`
      );
      if (resp.ok) {
        let fetchedMovies = await resp.json();

        this.setState({
          movies: fetchedMovies.Search,
          isLoading: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchMovies();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.search !== this.props.search) {
      this.fetchMovies();
    }
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Spinner className={"mx-auto"} animation="border" variant="dark" />
        ) : (
          <DisplayMovies movies={this.state.movies} />
        )}
      </>
    );
  }
}

export default GetMovies;
