import React, { Component } from "react";
import "./Story.css";
import { Link } from "react-router-dom";
import StoryShow from "../StoryShow/StoryShow";

class Episode extends Component {
  state = {};
  renderCreate() {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Link to={`library-stories/new`}>
          <button className="ui big circular right floated black button">
            Upload New Stories
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="Story">
        <div className="container justify-content-center">
          <div className="admin_text_box">
            <h1 className="d-flex justify-content-start admin_text">
              Stories
            </h1>
            <h1 className="d-flex justify-content-start content-text">
              Upload New&nbsp;&nbsp;
              <span style={{ color: "#199447" }}> Stories </span>
            </h1>
          </div>
          {this.renderCreate()}
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <StoryShow/>
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
