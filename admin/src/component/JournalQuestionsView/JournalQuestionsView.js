import React, { Component } from "react";
import { connect } from "react-redux";
import "./JournalQuestionsView.css";

import { fetchJournalQuestion } from "../../actions/journalQuestions";

class JournalQuestionsView extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchJournalQuestion(this.props.match.params.id);
  }

  render() {
    const { question, type} = this.props.journalQuestion;
    return (
      <div className="TeamAccessView">
        <div className="ui container">
          <div className="justify-content-md-center">
            <h1 className="admin_text_box font-weight-bold">{question}</h1>
            <p>{type}</p>
         </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { journalQuestion : state.journalQuestion[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchJournalQuestion })(JournalQuestionsView);
