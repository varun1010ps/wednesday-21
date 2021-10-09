import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTopics } from "../../actions/topic";
import "./TopicShow.css";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

class TopicShow extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  renderAdmin(topic) {
    const iconStyles = {
      color: "black",
      fontSize: "1.5em",
      marginLeft: "10px",
    };
    return (
      <div className="admin-bar">
        <Link to={`library-topics/edit/${topic._id}`}>
          <BiEdit style={iconStyles} />
        </Link>
        <Link to={`library-topics/delete/${topic._id}`}>
          <AiOutlineDelete style={iconStyles} />
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.topics.map((topic) => {
      return (
        <div className="scrollmenu" key={topic._id}>
          <div class="image">
            <img
              className="res"
              src={
                "https://portfoilo.s3.us-east-2.amazonaws.com/" + topic.imageurl
              }
            />
          </div>
          <div className="title-text">
            <span className="title-text">{topic.title}</span>
          </div>
          <div className="admin-bar">{this.renderAdmin(topic)}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ProjectsList">
        <div className="container justify-content-center">
          <h1 style={{ textAlign: "center" }}>All topic </h1>
          <div className="scroll">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topics: Object.values(state.topic),
  };
};

export default connect(mapStateToProps, { fetchTopics })(TopicShow);
