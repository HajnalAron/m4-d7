import { Component } from "react";
import CommentList from "./CommentList";

class DisplayMovies extends Component {
  state = {
    selected: undefined
  };
  render() {
    return (
      <>
        <div className="container-fluid margins mt-4">
          <div className="row">
            {this.props.movies &&
              this.props.movies.slice(0, 6).map((movie) => {
                return (
                  <div
                    className="col-2 mb-3"
                    onClick={() => this.setState({ selected: movie.imdbID })}
                  >
                    <img
                      className="w-80 img-fluid mb-2 mb-lg-0 rounded"
                      src={movie.Poster}
                      alt=""
                    />
                    <CommentList imdbID={movie.imdbID} />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default DisplayMovies;
