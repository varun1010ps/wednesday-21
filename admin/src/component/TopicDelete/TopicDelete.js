import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Model/Model";
import history from "../../history";
import { fetchTopic } from "../../actions/topic";
import { deleteTopic } from "../../actions/topic";

class TopicDelete extends Component {
  componentDidMount() {
    this.props.fetchTopic(this.props.match.params.id);
  }

  renderAction() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteTopic(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/admin/library-topics`} className="ui button">
          cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.topic) {
      return "Are you sure you want to delete the topic ?";
    }
    return `Are you sure you want to delete the topic with title: ${this.props.topic.title} ?`;
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Topic"
          content={this.renderContent()}
          actions={this.renderAction()}
          onDismiss={() => history.push("/admin/library-topics")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topic: state.topic[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchTopic, deleteTopic })(
  TopicDelete
);
