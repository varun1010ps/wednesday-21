import React, { Component } from "react";
import _, { sum } from "lodash";

import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";

import topicField from "../TopicForm/topicfield";
import topictextarea from "../TopicForm/topictextarea";
import InputField from "../InputField/InputField";
import InputTextArea from "../InputTextArea/InputTextArea";
import { fetchTopic, editTopic } from "../../actions/topic";

class TopicEdit extends Component {
  state = { file: null };

  componentDidMount() {
    this.props.fetchTopic(this.props.match.params.id);
  }

  renderFields() {
    const { title } = this.props.topic;
    return _.map(topicField, ({ label, name }) => {
      return (
        <div>
          <label className="input_label">{label}</label>
          <p>{title}</p>
          <Field key={name} component={InputField} type={name} name={name} />
        </div>
      );
    });
  }
  renderTextArea() {
    const { summary } = this.props.topic;
    return _.map(topictextarea, ({ label, name }) => {
      return (
        <div>
          <label className="input_label">{label}</label>
          <p>{summary}</p>
          <Field key={name} component={InputTextArea} name={name} />
        </div>
      );
    });
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }
  onSubmit = (formValues) => {
    const { editTopic } = this.props;
//     const image = this.state.file
//     if (!image){
// 
//     }
    editTopic(this.props.match.params.id, formValues,this.state.file );
  };

  render() {
    const { handleSubmit } = this.props;
    const { imageurl } = this.props.topic;
    return (
      <div className="TopicEdit">
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Edit Topic </h1>
          <div className="row justify-content-md-center">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {this.renderFields()}
              <label className="input_label">Image</label>
              <p>please upload new image </p>
              <div class="image">
                <img
                  className="res"
                  src={
                    "https://portfoilo.s3.us-east-2.amazonaws.com/" + imageurl
                  }
                />
              </div>

              <br />
              <input
                accept="image/*"
                type="file"
                onChange={this.onFileChange.bind(this)}
              />
              <br />
              {this.renderTextArea()}
              <Link
                to="/admin/library-topics"
                className="ui big circular left floated black basic button"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="ui big circular right floated black button"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(topicField, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

function validatetextarea(values) {
  const errors = {};

  _.each(topictextarea, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

const mapStateToProps = (state, ownProps) => {
  return { topic: state.topic[ownProps.match.params.id] };
};

export default compose(
  connect(mapStateToProps, { fetchTopic, editTopic }),
  reduxForm({
    form: "TopicEdit",
    validate,
    validatetextarea,
  })
)(TopicEdit);
