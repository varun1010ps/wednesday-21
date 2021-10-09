import React, { Component } from "react";
import "./SessionBeta.css";
import { Link } from "react-router-dom";
import SessionBetaShow from "../SessionShow/SessionBetaShow";

class SessionBeta extends Component {
  state = {};
  renderCreate() {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Link to={`library-sessionBeta/new`}>
          <button className="ui big circular right floated black button">
            Upload New SessionBeta
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="Session Beta">
        <div className="container justify-content-center">
          <div className="admin_text_box">
            <h1 className="d-flex justify-content-start admin_text">
              SessionBeta
            </h1>
            <h1 className="d-flex justify-content-start content-text">
              Upload New&nbsp;&nbsp;
              <span style={{ color: "#699447" }}>SessionBeta</span>
            </h1>
          </div>
          {this.renderCreate()}
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <SessionBetaShow/>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBeta;
