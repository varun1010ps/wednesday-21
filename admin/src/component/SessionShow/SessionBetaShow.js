import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchSessionBetas } from "../../actions/sessionBeta";

class SessionBetaShow extends Component {
  componentDidMount() {
    this.props.fetchSessionBetas();
  }

  renderAdmin(sessionBeta) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div>
        <Link to={`library-sessionBeta/view/${sessionBeta._id}`}>
          <GrFormView style={iconStyles} />
        </Link>
        <Link to={`library-sessionBeta/edit/${sessionBeta._id}`}>
          <BiEdit style={iconStyles} />
        </Link>
        <Link to={`library-sessionBeta/delete/${sessionBeta._id}`}>
          <AiOutlineDelete style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.sessionBeta.map((sessionbeta) => {
      return (
        <div className="card" key={sessionbeta._id}>
          <div className="content negative">
            <div className="header">
              {sessionbeta.title}
              <span className="ui big right floated">
                {this.renderAdmin(sessionbeta)}
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
        <h1 className="content-text">ALL Session Beta</h1>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionBeta: Object.values(state.sessionBeta),
  };
};

export default connect(mapStateToProps, { fetchSessionBetas })(SessionBetaShow);
