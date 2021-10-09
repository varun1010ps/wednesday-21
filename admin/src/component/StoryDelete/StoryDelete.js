import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Model/Model";
import history from "../../history";
import { fetchStory } from "../../actions/story";
import { deleteStory } from "../../actions/story";

class TopicDelete extends Component {
  componentDidMount() {
    this.props.fetchStory(this.props.match.params.id);
  }

  renderAction() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStory(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/admin/library-episode`} className="ui button">
          cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.episode) {
      return "Are you sure you want to delete the topic ?";
    }
    return `Are you sure you want to delete the topic with title: ${this.props.episode.title} ?`;
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Story"
          content={this.renderContent()}
          actions={this.renderAction()}
          onDismiss={() => history.push("/admin/library-episode")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    episode: state.episode[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStory, deleteStory })(
  TopicDelete
);
