import { Component } from "react";
import { ListGroup, Spinner, Button, Form } from "react-bootstrap";

class CommentList extends Component {
  state = {
    comment: {
      comment: "",
      rate: 1,
      elementId: this.props.imdbID
    },
    comments: [],
    isLoading: true
  };
  createComment = async (event) => {
    event.preventDefault();
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjY5MTJkNTI2MjAwMTViNmRjOTciLCJpYXQiOjE2Mjk5ODMwMjMsImV4cCI6MTYzMTE5MjYyM30.kZueZZ8UW_1TIU6mPpYYQkcIQ8RyOTIBddtspnqXlsQ"
          }
        }
      );
      if (resp.ok) {
        let deleteResponse = await resp.json();
        console.log(deleteResponse);
        this.setState({
          isLoading: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteComment = async (id) => {
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjY5MTJkNTI2MjAwMTViNmRjOTciLCJpYXQiOjE2Mjk5ODMwMjMsImV4cCI6MTYzMTE5MjYyM30.kZueZZ8UW_1TIU6mPpYYQkcIQ8RyOTIBddtspnqXlsQ"
          }
        }
      );
      if (resp.ok) {
        let deleteResponse = await resp.json();
        console.log(deleteResponse);
        this.setState({
          isLoading: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getComments = async () => {
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.imdbID}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjY5MTJkNTI2MjAwMTViNmRjOTciLCJpYXQiOjE2Mjk5ODMwMjMsImV4cCI6MTYzMTE5MjYyM30.kZueZZ8UW_1TIU6mPpYYQkcIQ8RyOTIBddtspnqXlsQ"
          }
        }
      );
      if (resp.ok) {
        let comments = await resp.json();
        console.log(comments);
        this.setState({
          comments: comments,
          isLoading: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoading !== this.state.isLoading) this.getComments();
  }
  componentDidMount() {
    this.getComments();
  }
  render() {
    return (
      <div key={this.props.imdbID}>
        <ListGroup>
          {this.state.isLoading ? (
            <Spinner className={"mx-auto"} animation="border" variant="dark" />
          ) : this.state.comments.length ? (
            this.state.comments.map((comment) => {
              return (
                <ListGroup>
                  <ListGroup.Item key={comment._id}>
                    {comment.rate}/5, {comment.comment}
                    by: <ListGroup.Item>{comment.author}</ListGroup.Item>{" "}
                  </ListGroup.Item>
                  <Button
                    onClick={() => this.deleteComment(comment._id)}
                    className={"btn btn-danger"}
                  >
                    Delete Comment
                  </Button>
                </ListGroup>
              );
            })
          ) : (
            <ListGroup.Item>This movie has no comments!</ListGroup.Item>
          )}
        </ListGroup>
        <Form key={this.props.imdbID}>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add comment here"
              value={this.state.comment.comment}
              onChange={(event) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: event.target.value
                  }
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              min={1}
              max={5}
              type="number"
              value={this.state.comment.rate}
              onChange={(event) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: event.target.value
                  }
                })
              }
            />
          </Form.Group>
          <Button
            onClick={(event) => this.createComment(event)}
            variant="primary"
            type="submit"
          >
            Add Comment
          </Button>
        </Form>
      </div>
    );
  }
}

export default CommentList;
