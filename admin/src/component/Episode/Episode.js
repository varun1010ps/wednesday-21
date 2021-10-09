import React, { Component } from "react";
import "./Episode.css";
import { Link } from "react-router-dom";
import EpisodeShow from "../EpisodeShow/EpisodeShow";

class Episode extends Component {
  state = {};
  renderCreate() {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Link to={`library-episodes/new`}>
          <button className="ui big circular right floated black button">
            Upload New Epsiode
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="Episodes">
        <div className="container justify-content-center">
          <div className="admin_text_box">
            <h1 className="d-flex justify-content-start admin_text">
              Episodes
            </h1>
            <h1 className="d-flex justify-content-start content-text">
              Upload New&nbsp;&nbsp;
              <span style={{ color: "#699447" }}>Episodes</span>
            </h1>
          </div>
          {this.renderCreate()}
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <EpisodeShow/>
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
