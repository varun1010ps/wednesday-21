import React, { Component } from "react";
import "./JournalQuestions.css";
import { Link } from "react-router-dom";
import JournalQuestionsShow from "../JournalQuestionsShow/JournalQuestionsShow";

class JournalQuestions extends Component {
  state = {};
  renderCreate() {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Link to={`library-journalquestion/new`}>
          <button className="ui big circular right floated black button">
            Upload New Journal Questions
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="JournalQuestions">
        <div className="container justify-content-center">
          <div className="admin_text_box">
            <h1 className="d-flex justify-content-start admin_text">
              Journal Questions
            </h1>
            <h1 className="d-flex justify-content-start content-text">
              Upload New&nbsp;&nbsp;
              <span style={{ color: "#199447" }}> Journal Questions </span>
            </h1>
          </div>
          {this.renderCreate()}
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <JournalQuestionsShow/>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalQuestions;
