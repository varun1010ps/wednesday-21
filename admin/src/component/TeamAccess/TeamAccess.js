import React, { Component } from "react";
import TeamAccessShow from "../TeamAccessShow/TeamAccessShow";
import "./TeamAccess.css";

class TeamAccess extends Component {
  state = {};
  render() {
    return (
      <div className="TeamAceess">
          <div className="container justify-content-center">
          <div className="admin_text_box">
            <h1 className="d-flex justify-content-start content-text">
              <span style={{ color: "#FF5F5F" }}>Team Access</span>
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <TeamAccessShow />
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamAccess;
