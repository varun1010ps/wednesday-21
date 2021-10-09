import React, { Component } from "react";
import { connect } from "react-redux";
import "./TeamAccessView.css";
import moment from "moment";
import { fetchTeamAccess } from "../../actions/teamAccess";

class TeamAccessView extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchTeamAccess(this.props.match.params.id);
  }

  render() {
    const { name, email, noOfUser, company, message, createdOn } = this.props.team;
    return (
      <div className="TeamAccessView">
        <div className="ui container">
          <div className="justify-content-md-center">
            <h1 className="admin_text_box font-weight-bold">inquiry</h1>
            <p className="font-weight-bold" >Name : {name}</p>
            <p className="font-weight-bold" >Email : {email}</p>
            <p className="font-weight-bold">#OfUser : {noOfUser}</p>
            <p className="font-weight-bold">company : {company}</p>
            <p className="font-weight-bold" >message : {message}</p>
            <p className="font-weight-bold" >Date : {moment(`${createdOn}`).format('MMMM Do YYYY')}</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { team: state.teamAccess[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTeamAccess })(TeamAccessView);
