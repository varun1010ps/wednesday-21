import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { fetchTeamAccesss } from "../../actions/teamAccess";

class TeamAccessShow extends Component {
  componentDidMount() {
    this.props.fetchTeamAccesss();
  }

  renderAdmin(team) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div>
        <Link to={`team-access/view/${team._id}`}>
          <GrFormView style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.teamAccess.map((team) => {
      return (
        <div className="card" key={team._id}>
          <div className="content negative">
            <div className="header">
              {team.name}
              <span className="ui big right floated">
                {this.renderAdmin(team)}
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
        <h1 className="content-text">All inquiry</h1>
        <div className="ui cards">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teamAccess: Object.values(state.teamAccess),
  };
};

export default connect(mapStateToProps, { fetchTeamAccesss })(TeamAccessShow);
