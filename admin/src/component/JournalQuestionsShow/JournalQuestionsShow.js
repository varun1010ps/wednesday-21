import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchJournalQuestions } from "../../actions/journalQuestions";

class JournalQuestionsShow extends Component {
  componentDidMount() {
    this.props.fetchJournalQuestions();
  }

  renderAdmin(journalQuestion) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div>
        <Link to={`library-journalquestion/view/${journalQuestion._id}`}>
          <GrFormView style={iconStyles} />
        </Link>
        <Link to={`library-journalquestion/edit/${journalQuestion._id}`}>
          <BiEdit style={iconStyles} />
        </Link>
        <Link to={`library-journalquestion/delete/${journalQuestion._id}`}>
          <AiOutlineDelete style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.journalQuestion.map((journalquestion) => {
      return (
        <div className="card" key={journalquestion._id}>
          <div className="content negative">
            <div className="header">
              {journalquestion.question}
             <span className="ui big right floated">
                {this.renderAdmin(journalquestion)}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ProjectsList">
        <h1 className="content-text">ALL Journal Questions</h1>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    journalQuestion: Object.values(state.journalQuestion)
  };
};

export default connect(mapStateToProps, { fetchJournalQuestions })(JournalQuestionsShow);
